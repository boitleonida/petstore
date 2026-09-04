import fs from 'node:fs'
import path from 'node:path'
import puppeteer from 'puppeteer-core'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

const CHROME_PATH = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe'
const PUBLIC_DIR = path.resolve('public')
const IMAGES_BASE_DIR = path.join(PUBLIC_DIR, 'images', 'pets')
const TARGET_IMAGES_PER_CATEGORY = 70

// Ensure local image directories exist
for (const sub of ['dogs', 'cats', 'birds']) {
  fs.mkdirSync(path.join(IMAGES_BASE_DIR, sub), { recursive: true })
}

function delay(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms))
}

async function downloadImage(url, destPath) {
  try {
    let fullUrl = url
    if (!fullUrl.startsWith('http://') && !fullUrl.startsWith('https://')) {
      fullUrl = 'https://' + fullUrl
    }
    const res = await fetch(fullUrl, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
      }
    })
    if (!res.ok) return false
    const buffer = Buffer.from(await res.arrayBuffer())
    if (buffer.length < 1000) return false
    fs.writeFileSync(destPath, buffer)
    return true
  } catch (err) {
    console.warn(`  ⚠️ Failed to download image: ${url} (${err.message})`)
    return false
  }
}

function normalizeAgeToMonths(ageVal) {
  const v = (ageVal || '').toLowerCase()
  if (v.includes('baby')) return 2
  if (v.includes('young')) return 6
  if (v.includes('adult')) return 24
  if (v.includes('senior')) return 96
  return 12
}

function estimateWeightLbs(sizeObj, species) {
  if (sizeObj?.range?.max && sizeObj.range.max > 0) {
    return Math.min(120, Math.max(1, Math.round((sizeObj.range.min + sizeObj.range.max) / 2)))
  }
  const label = (sizeObj?.label || '').toLowerCase()
  if (species === 'Dog') {
    if (label.includes('small')) return 12
    if (label.includes('medium')) return 35
    if (label.includes('large')) return 65
    if (label.includes('extra')) return 90
    return 25
  } else if (species === 'Cat') {
    return label.includes('large') ? 14 : 9
  } else {
    return 1.2
  }
}

function buildHealthBadges(animal) {
  const badges = []
  const phys = animal.physical || {}
  const beh = animal.behavior || {}
  const inter = beh.interactions || {}

  if (phys.vaccinated === 'Yes' || phys.vaccinated === true) badges.push('Vaccinated')
  if (phys.spayedNeutered === 'Yes' || phys.spayedNeutered === true) badges.push('Spayed / Neutered')
  if (beh.houseTrained === 'Yes' || beh.houseTrained === true) badges.push('House-trained')
  if (inter.childrenUnder8 === 'Yes' || inter.children8AndUp === 'Yes') badges.push('Good with children')
  if (inter.dogs === 'Yes') badges.push('Good with dogs')
  if (inter.cats === 'Yes') badges.push('Good with cats')

  badges.push('Shelter / Rescue Partner')
  return Array.from(new Set(badges))
}

function buildTemperament(animal, ageMonths) {
  const traits = []
  const beh = animal.behavior || {}
  const inter = beh.interactions || {}

  if (inter.childrenUnder8 === 'Yes' || inter.children8AndUp === 'Yes') traits.push('Gentle')
  if (inter.dogs === 'Yes' || inter.cats === 'Yes') traits.push('Social')
  if (ageMonths <= 6) traits.push('Playful', 'Curious')
  else traits.push('Friendly', 'Loving', 'Loyal')

  return Array.from(new Set(traits)).join(', ')
}

function generateAdoptionFee(species) {
  if (species === 'Dog') return Math.floor(Math.random() * 5 + 3) * 50 // $150 - $350
  if (species === 'Cat') return Math.floor(Math.random() * 3 + 2) * 40 // $80 - $160
  return Math.floor(Math.random() * 4 + 2) * 35 // $70 - $175
}

function generateDescription(animal, species, breed) {
  const name = animal.animalName
  const sex = animal.physical?.sex || 'Friendly'
  const age = animal.physical?.age?.value || 'Young'
  const city = animal.organization?.organizationCity || 'Austin'
  const state = animal.organization?.organizationState || 'TX'
  const org = animal.organization?.organizationName || 'Adopt-A-Pet Rescue Partner'

  return `Meet ${name}! ${name} is an adorable ${age} ${sex} ${breed} available for adoption. Currently cared for by ${org} in ${city}, ${state}. ${name} is looking for a warm and loving forever home where they can share unconditional companionship and joy with their new family.`
}

async function scrapePetfinderCategory(browser, categoryName, targetSpecies, startUrl, minImages = 70) {
  console.log(`\n========================================================================`)
  console.log(`🐾 Starting Petfinder scrape for: ${categoryName} (${targetSpecies})`)
  console.log(`🎯 Target: At least ${minImages} downloaded permanent images`)
  console.log(`========================================================================`)

  const folderName = targetSpecies === 'Dog' ? 'dogs' : targetSpecies === 'Cat' ? 'cats' : 'birds'
  let downloadedImagesCount = 0
  let pageNumber = 1
  const insertedPets = []

  // Ensure default breeder exists
  const breeder = await prisma.user.findFirst({ where: { role: 'BREEDER' } })
  if (!breeder) throw new Error('No breeder found in database')

  while (downloadedImagesCount < minImages && pageNumber <= 10) {
    console.log(`\n📄 [${targetSpecies}] Loading Petfinder Page ${pageNumber}...`)
    const page = await browser.newPage()
    await page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/128.0.0.0 Safari/537.36')

    const animalsOnPage = []
    let pageIntercepted = false

    page.on('response', async (res) => {
      const url = res.url()
      if (url.includes('graphql') && res.request().method() === 'POST') {
        try {
          const text = await res.text()
          if (text.includes('searchAnimal') && !pageIntercepted) {
            pageIntercepted = true
            const json = JSON.parse(text)
            const list = json.data?.searchAnimal?.animals || []
            animalsOnPage.push(...list)
          }
        } catch (_) {}
      }
    })

    const targetUrl = pageNumber === 1 ? startUrl : `${startUrl}?page=${pageNumber}`
    try {
      await page.goto(targetUrl, { waitUntil: 'networkidle2', timeout: 40000 })
    } catch (navErr) {
      console.warn(`  ⚠️ Navigation timeout or warning on page ${pageNumber}:`, navErr.message)
    }

    await delay(1500)
    await page.close()

    console.log(`  Found ${animalsOnPage.length} animals on page ${pageNumber}`)

    if (animalsOnPage.length === 0) {
      console.log(`  ⚠️ No animals returned on page ${pageNumber}. Trying next page...`)
      pageNumber++
      continue
    }

    for (const animal of animalsOnPage) {
      if (downloadedImagesCount >= minImages) {
        console.log(`\n🎉 Reached image target for ${targetSpecies}! Total images: ${downloadedImagesCount}`)
        break
      }

      const rawName = (animal.animalName || `${targetSpecies}`).trim()
      // Clean name: take before hyphen / comma / parenthetical
      const cleanName = rawName.split(/[-–,(]/)[0].trim().slice(0, 30) || rawName.slice(0, 30)
      const breed = animal.physical?.breed?.primary || 'Mixed Breed'
      const animalId = (animal.animalId || `${Date.now()}`).slice(0, 12)
      const safeSlug = cleanName.toLowerCase().replace(/[^a-z0-9]/g, '-').slice(0, 20)

      const mediaList = animal._media || []
      const localMediaGallery = []
      let imgIdx = 0

      for (const m of mediaList) {
        if (!m.publicUrl) continue
        imgIdx++
        const filename = `petfinder_${folderName}_${animalId}_${safeSlug}_${imgIdx}.jpg`
        const diskPath = path.join(IMAGES_BASE_DIR, folderName, filename)
        const publicPath = `/images/pets/${folderName}/${filename}`

        const ok = await downloadImage(m.publicUrl, diskPath)
        if (ok) {
          localMediaGallery.push(publicPath)
          downloadedImagesCount++
          process.stdout.write(`📸 [${targetSpecies}: ${downloadedImagesCount}/${minImages} imgs] `)
        }
        await delay(100)
      }

      if (localMediaGallery.length === 0) continue

      // Ingest into database
      const ageMonths = normalizeAgeToMonths(animal.physical?.age?.value)
      const weightLbs = estimateWeightLbs(animal.physical?.size, targetSpecies)
      const temperament = buildTemperament(animal, ageMonths)
      const healthBadges = buildHealthBadges(animal)
      const price = generateAdoptionFee(targetSpecies)
      const description = generateDescription(animal, targetSpecies, breed)

      try {
        const existing = await prisma.pet.findFirst({
          where: {
            name: cleanName,
            breed,
            species: targetSpecies
          }
        })

        if (!existing) {
          const record = await prisma.pet.create({
            data: {
              name: cleanName,
              species: targetSpecies,
              breed,
              ageMonths,
              weightLbs,
              temperament,
              healthBadges,
              price,
              description,
              isLocalOnly: false,
              mediaGallery: localMediaGallery,
              breederId: breeder.id
            }
          })
          insertedPets.push(record)
          console.log(`\n  ✨ Ingested: "${record.name}" (${record.breed}) - ${localMediaGallery.length} photos`)
        } else {
          console.log(`\n  ℹ️ "${cleanName}" already exists, photos saved.`)
        }
      } catch (dbErr) {
        console.error(`  [DB Error] ${cleanName}:`, dbErr.message)
      }
    }

    pageNumber++
    await delay(1500)
  }

  console.log(`\n✅ Finished ${categoryName}: ${downloadedImagesCount} images downloaded, ${insertedPets.length} new pets added.`)
  return { downloadedImagesCount, petCount: insertedPets.length }
}

async function main() {
  console.log('🚀 Petfinder Ingestion Script Initializing...')
  console.log(`Executable: ${CHROME_PATH}`)

  const browser = await puppeteer.launch({
    executablePath: CHROME_PATH,
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-dev-shm-usage']
  })

  try {
    // 1. Dogs (At least 70 images)
    const dogsResult = await scrapePetfinderCategory(
      browser,
      'Dogs & Puppies',
      'Dog',
      'https://www.petfinder.com/search/dogs-for-adoption/us/',
      TARGET_IMAGES_PER_CATEGORY
    )

    // 2. Cats (At least 70 images)
    const catsResult = await scrapePetfinderCategory(
      browser,
      'Cats & Kittens',
      'Cat',
      'https://www.petfinder.com/search/cats-for-adoption/us/',
      TARGET_IMAGES_PER_CATEGORY
    )

    // 3. Birds (At least 70 images)
    const birdsResult = await scrapePetfinderCategory(
      browser,
      'Birds & Parrots',
      'Bird',
      'https://www.petfinder.com/search/birds-for-adoption/us/',
      TARGET_IMAGES_PER_CATEGORY
    )

    console.log(`\n========================================================================`)
    console.log(`🎉 ALL PETFINDER CATEGORIES COMPLETED!`)
    console.log(`   🐶 Dogs: ${dogsResult.downloadedImagesCount} images, ${dogsResult.petCount} new pets`)
    console.log(`   🐱 Cats: ${catsResult.downloadedImagesCount} images, ${catsResult.petCount} new pets`)
    console.log(`   🦜 Birds: ${birdsResult.downloadedImagesCount} images, ${birdsResult.petCount} new pets`)
    const totalImgs = dogsResult.downloadedImagesCount + catsResult.downloadedImagesCount + birdsResult.downloadedImagesCount
    const totalPets = dogsResult.petCount + catsResult.petCount + birdsResult.petCount
    console.log(`   🌟 Total Images Downloaded: ${totalImgs}`)
    console.log(`   🌟 Total Pets Created: ${totalPets}`)
    console.log(`========================================================================`)

    const totalInDb = await prisma.pet.count()
    console.log(`📊 Total Pets now in Database: ${totalInDb}`)
  } finally {
    await browser.close()
    await prisma.$disconnect()
  }
}

main().catch((err) => {
  console.error('Fatal execution error:', err)
  process.exit(1)
})
