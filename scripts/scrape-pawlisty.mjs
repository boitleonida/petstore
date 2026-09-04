import fs from 'node:fs'
import path from 'node:path'
import * as cheerio from 'cheerio'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

const BASE_URL = 'https://pawlisty.com'
const HEADERS = {
  'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/128.0.0.0 Safari/537.36',
  'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8',
  'Accept-Language': 'en-US,en;q=0.9',
}

const PUBLIC_DIR = path.resolve('public')
const IMAGES_BASE_DIR = path.join(PUBLIC_DIR, 'images', 'pets')

// Ensure image folders exist
for (const sub of ['dogs', 'cats', 'birds']) {
  fs.mkdirSync(path.join(IMAGES_BASE_DIR, sub), { recursive: true })
}

function delay(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms))
}

async function fetchHtml(url) {
  try {
    const res = await fetch(url, { headers: HEADERS })
    if (!res.ok) {
      console.warn(`[WARN] Fetch failed for ${url} (status: ${res.status})`)
      return null
    }
    return await res.text()
  } catch (err) {
    console.error(`[ERR] Fetch error for ${url}:`, err.message)
    return null
  }
}

async function downloadImage(imageUrl, destFilePath) {
  try {
    let targetUrl = imageUrl
    if (targetUrl.startsWith('/')) {
      targetUrl = BASE_URL + targetUrl
    }
    const res = await fetch(targetUrl, { headers: HEADERS })
    if (!res.ok) return false
    const contentType = res.headers.get('content-type') || ''
    if (!contentType.startsWith('image/') && !targetUrl.match(/\.(jpg|jpeg|png|webp)/i)) {
      return false
    }
    const buffer = Buffer.from(await res.arrayBuffer())
    if (buffer.length < 500) return false // skip corrupted / tiny tracking pixels
    fs.writeFileSync(destFilePath, buffer)
    return true
  } catch (err) {
    console.warn(`[WARN] Image download failed: ${imageUrl} - ${err.message}`)
    return false
  }
}

function extractListingLinksFromHtml(html) {
  const $ = cheerio.load(html)
  const links = new Set()

  $('a[href]').each((_, el) => {
    let href = $(el).attr('href')
    if (!href) return
    if (href.startsWith('/')) href = BASE_URL + href
    // PawListy listing URLs end with /{numericId} (e.g., https://pawlisty.com/yorkie-puppy/970)
    if (/https:\/\/pawlisty\.com\/[a-zA-Z0-9%_.-]+\/\d+$/.test(href)) {
      if (
        !href.includes('/category/') &&
        !href.includes('/location/') &&
        !href.includes('/user/') &&
        !href.includes('/search') &&
        !href.includes('/tag/')
      ) {
        links.add(href)
      }
    }
  })

  return Array.from(links)
}

function cleanPetName(rawTitle, breed, targetSpecies) {
  let name = rawTitle.replace(/\s+in\s+[A-Za-z\s,]+$/i, '').trim()
  name = name.replace(/^Finding\s+/i, '').replace(/,\s*a\s+new\s+home.*$/i, '')
  name = name.replace(/\s*needs\s+a\s+new\s+home.*$/i, '')
  name = name.replace(/\s*–.*$/, '').replace(/\s*-.*$/, '')
  name = name.replace(/[^\w\s&'-]/g, '').trim()

  if (name.length > 32) {
    // If still too long, use breed or first 3 words
    const words = name.split(/\s+/)
    if (words.length > 3) {
      name = words.slice(0, 3).join(' ')
    }
  }

  if (!name || name.length < 2) {
    name = breed ? `${breed}` : `${targetSpecies}`
  }

  return name
}

function parsePetDetails(html, pageUrl, targetSpecies) {
  const $ = cheerio.load(html)

  // Title
  let rawTitle = $('h1').first().text().trim()
  if (!rawTitle) {
    rawTitle = $('title').text().replace(/\s*\|\s*PawListy.*$/i, '').trim()
  }

  // Key-value attributes from lists
  const attributes = {}
  $('.list-group-item').each((_, el) => {
    const key = $(el).find('span.text-secondary').text().trim().toLowerCase()
    const val = $(el).find('span.text-end, span.fw-medium').last().text().trim()
    if (key && val) {
      attributes[key] = val
    }
  })

  // Breed
  let breed = attributes['breed'] || ''
  if (!breed) {
    if (targetSpecies === 'Dog') breed = rawTitle.includes('Yorkie') ? 'Yorkshire Terrier' : 'Mixed Breed'
    else if (targetSpecies === 'Cat') breed = rawTitle.includes('Maine Coon') ? 'Maine Coon' : 'Domestic Shorthair'
    else breed = 'Exotic Bird'
  }

  const cleanName = cleanPetName(rawTitle, breed, targetSpecies)

  // Price
  let price = 0
  const priceTag = $('.p-price-tag').text().trim()
  const priceMatch = priceTag.match(/\$([\d,]+(?:\.\d+)?)/) || $('body').text().match(/Price::?\s*\$([\d,]+)/i)
  if (priceMatch) {
    price = parseFloat(priceMatch[1].replace(/,/g, '')) || 0
  }

  // Age in months
  let ageMonths = 12
  const ageStr = (attributes['age'] || '').toLowerCase()
  if (ageStr.includes('newborn') || ageStr.includes('0-8 week') || ageStr.includes('baby')) {
    ageMonths = 2
  } else if (ageStr.includes('young') || ageStr.includes('puppy') || ageStr.includes('kitten')) {
    ageMonths = 5
  } else if (ageStr.includes('adult')) {
    ageMonths = 24
  } else if (ageStr.includes('senior')) {
    ageMonths = 96
  } else {
    const yrMatch = rawTitle.match(/(\d+)\s*(?:yr|year)s?/i)
    if (yrMatch) ageMonths = parseInt(yrMatch[1], 10) * 12
    const moMatch = rawTitle.match(/(\d+)\s*(?:mo|month)s?/i)
    if (moMatch) ageMonths = parseInt(moMatch[1], 10)
  }

  // Weight estimation
  let weightLbs = 10
  const petSize = (attributes['pet size'] || '').toLowerCase()
  if (targetSpecies === 'Dog') {
    if (petSize.includes('small') || breed.toLowerCase().includes('yorkie') || breed.toLowerCase().includes('shih')) weightLbs = 8
    else if (petSize.includes('medium')) weightLbs = 30
    else if (petSize.includes('large')) weightLbs = 60
    else if (petSize.includes('extra')) weightLbs = 85
    else weightLbs = 22
  } else if (targetSpecies === 'Cat') {
    weightLbs = petSize.includes('large') ? 14 : 9
  } else {
    weightLbs = 1.2
  }

  // Description
  const paragraphs = []
  $('.detail-line-content p').each((_, p) => {
    const text = $(p).text().trim()
    if (text) paragraphs.push(text)
  })
  let description = paragraphs.join('\n\n')
  if (!description) {
    description = $('.detail-line-content').text().trim()
  }
  if (!description) {
    description = $('meta[property="og:description"]').attr('content') || ''
  }
  if (!description) {
    description = $('meta[name="description"]').attr('content') || ''
  }
  description = description.replace(/\s+/g, ' ').trim()
  if (!description || description.length < 15) {
    description = `Beautiful and healthy ${cleanName} (${breed}). Looking for a loving and responsible forever home.`
  }

  // Health Badges & Compatibility
  const healthBadges = []
  if (attributes['vaccinated'] && attributes['vaccinated'].toLowerCase().includes('yes')) healthBadges.push('Vaccinated')
  if (attributes['neutered / spayed'] && attributes['neutered / spayed'].toLowerCase().includes('yes')) healthBadges.push('Neutered / Spayed')
  if (attributes['house-trained'] && attributes['house-trained'].toLowerCase().includes('yes')) healthBadges.push('House-trained')
  if (attributes['microchip number'] || $('body').text().includes('Microchip')) healthBadges.push('Microchipped')
  if (attributes['good with dogs'] && attributes['good with dogs'].toLowerCase().includes('yes')) healthBadges.push('Good with dogs')
  if (attributes['good with cats'] && attributes['good with cats'].toLowerCase().includes('yes')) healthBadges.push('Good with cats')
  if (attributes['good with children'] && attributes['good with children'].toLowerCase().includes('yes')) healthBadges.push('Good with children')
  if (healthBadges.length === 0) healthBadges.push('Vet Checked')

  // Temperament
  let temperamentList = []
  if (attributes['good with children'] && attributes['good with children'].toLowerCase().includes('yes')) temperamentList.push('Gentle')
  if (attributes['good with dogs'] || attributes['good with cats']) temperamentList.push('Sociable')
  if (ageMonths <= 6) temperamentList.push('Playful', 'Curious')
  else temperamentList.push('Friendly', 'Loving', 'Loyal')
  const temperament = Array.from(new Set(temperamentList)).join(', ')

  // Images
  const rawImageUrls = new Set()

  // 1. Swiper slides (best full resolution)
  $('.swiper.main-gallery .swiper-slide img, .gallery-container img').each((_, el) => {
    let src = $(el).attr('src')
    if (src && !src.includes('default/ico') && !src.includes('favicon')) {
      rawImageUrls.add(src)
    }
  })

  // 2. OpenGraph images
  $('meta[property="og:image"]').each((_, el) => {
    const content = $(el).attr('content')
    if (content && !content.includes('default/ico') && !content.includes('favicon')) {
      rawImageUrls.add(content)
    }
  })

  // 3. Fallback lazyload images in main-image
  $('.main-image img').each((_, el) => {
    let src = $(el).attr('src')
    if (src && !src.includes('default/ico')) rawImageUrls.add(src)
  })

  const imageUrls = Array.from(rawImageUrls)

  return {
    name: cleanName,
    species: targetSpecies,
    breed,
    ageMonths,
    weightLbs,
    temperament,
    healthBadges,
    description,
    price,
    isLocalOnly: false,
    imageUrls,
    sourceUrl: pageUrl
  }
}

async function scrapeCategory(species, startUrls, minCount = 20) {
  console.log(`\n======================================================`)
  console.log(`🔍 Starting scrape for ${species} (target: at least ${minCount})`)
  console.log(`======================================================`)

  const collectedListingUrls = new Set()

  for (const startUrl of startUrls) {
    if (collectedListingUrls.size >= minCount + 10) break
    console.log(`Fetching page: ${startUrl}`)
    const html = await fetchHtml(startUrl)
    if (!html) continue
    const links = extractListingLinksFromHtml(html)
    console.log(`  Found ${links.length} listing links on page`)
    for (const link of links) {
      collectedListingUrls.add(link)
    }
    await delay(500)
  }

  const listingUrlArray = Array.from(collectedListingUrls)
  console.log(`Total unique ${species} listings found: ${listingUrlArray.length}`)

  const speciesFolder = species.toLowerCase() === 'dog' ? 'dogs' : species.toLowerCase() === 'cat' ? 'cats' : 'birds'
  const petsToInsert = []

  let processedCount = 0
  for (const listingUrl of listingUrlArray) {
    if (petsToInsert.length >= minCount) {
      console.log(`✅ Reached target of ${minCount} pets for ${species}!`)
      break
    }

    processedCount++
    console.log(`\n[${species} ${processedCount}/${listingUrlArray.length}] Parsing: ${listingUrl}`)
    const html = await fetchHtml(listingUrl)
    if (!html) continue

    const petData = parsePetDetails(html, listingUrl, species)
    if (!petData.imageUrls || petData.imageUrls.length === 0) {
      console.log(`  ⚠️ No images found on detail page. Skipping.`)
      continue
    }

    // Extract listing numeric ID from URL for unique filename
    const idMatch = listingUrl.match(/\/(\d+)$/)
    const listingId = idMatch ? idMatch[1] : `${Date.now()}_${processedCount}`
    const safeSlug = petData.name.toLowerCase().replace(/[^a-z0-9]/g, '-').slice(0, 20)

    // Download images
    const localMediaGallery = []
    let imgIdx = 0
    for (const imgUrl of petData.imageUrls) {
      if (localMediaGallery.length >= 3) break // Up to 3 high-res photos per pet
      imgIdx++
      const ext = imgUrl.includes('.png') ? 'png' : imgUrl.includes('.webp') ? 'webp' : 'jpg'
      const filename = `${speciesFolder}_${listingId}_${safeSlug}_${imgIdx}.${ext}`
      const diskPath = path.join(IMAGES_BASE_DIR, speciesFolder, filename)
      const publicPath = `/images/pets/${speciesFolder}/${filename}`

      const downloaded = await downloadImage(imgUrl, diskPath)
      if (downloaded) {
        localMediaGallery.push(publicPath)
      }
      await delay(150)
    }

    if (localMediaGallery.length === 0) {
      console.log(`  ⚠️ Failed to download any valid image for ${petData.name}. Skipping.`)
      continue
    }

    petData.mediaGallery = localMediaGallery
    delete petData.imageUrls

    petsToInsert.push(petData)
    console.log(`  ✨ Ready: "${petData.name}" | ${petData.breed} | $${petData.price} | ${localMediaGallery.length} photos saved`)

    await delay(300)
  }

  return petsToInsert
}

async function main() {
  console.log('🚀 PawListy Permanent Pet Ingestion Script Started')
  
  // Find or create default breeder
  let breeder = await prisma.user.findFirst({
    where: { role: 'BREEDER' }
  })

  if (!breeder) {
    console.log('Creating breeder user...')
    breeder = await prisma.user.create({
      data: {
        email: 'pawlisty.breeder@texaspethub.com',
        firstName: 'Texas',
        lastName: 'Verified Breeders',
        role: 'BREEDER',
        phone: '555-0188'
      }
    })
  }

  console.log(`Using Breeder: ${breeder.firstName} ${breeder.lastName} (${breeder.id})`)

  // 1. Scrape Dogs / Puppies (At least 20)
  const dogUrls = [
    'https://pawlisty.com/category/animals-pets/dogs',
    'https://pawlisty.com/category/animals-pets/dogs?page=2',
    'https://pawlisty.com/category/animals-pets/dogs?page=3'
  ]
  const dogs = await scrapeCategory('Dog', dogUrls, 20)

  // 2. Scrape Cats (At least 20)
  const catUrls = [
    'https://pawlisty.com/category/animals-pets/cats',
    'https://pawlisty.com/category/animals-pets/cats?page=2'
  ]
  const cats = await scrapeCategory('Cat', catUrls, 20)

  // 3. Scrape Birds (All available, target up to 20)
  const birdUrls = [
    'https://pawlisty.com/category/animals-pets/birds',
    'https://pawlisty.com/category/animals-pets/birds?page=2',
    'https://pawlisty.com/search?q=parrot',
    'https://pawlisty.com/search?q=bird',
    'https://pawlisty.com/search?q=cockatiel',
    'https://pawlisty.com/search?q=macaw'
  ]
  const birds = await scrapeCategory('Bird', birdUrls, 20)

  const allPets = [...dogs, ...cats, ...birds]
  console.log(`\n======================================================`)
  console.log(`📦 Summary of Scraped Pets:`)
  console.log(`   - Dogs / Puppies: ${dogs.length}`)
  console.log(`   - Cats: ${cats.length}`)
  console.log(`   - Birds: ${birds.length}`)
  console.log(`   - Total: ${allPets.length}`)
  console.log(`======================================================`)

  console.log(`\n💾 Inserting into PostgreSQL database via Prisma...`)
  let insertedCount = 0

  for (const pet of allPets) {
    const { sourceUrl, ...createData } = pet
    try {
      const existing = await prisma.pet.findFirst({
        where: {
          name: pet.name,
          breed: pet.breed,
          species: pet.species
        }
      })
      if (existing) {
        console.log(`[SKIP] Pet already exists: ${pet.name} (${pet.species})`)
        continue
      }

      const record = await prisma.pet.create({
        data: {
          ...createData,
          breederId: breeder.id
        }
      })
      insertedCount++
      console.log(`[DB ${insertedCount}/${allPets.length}] Inserted: ${record.name} (${record.species} - ${record.breed}) ID: ${record.id}`)
    } catch (dbErr) {
      console.error(`[DB ERROR] Failed to insert ${pet.name}:`, dbErr.message)
    }
  }

  console.log(`\n🎉 INGESTION COMPLETE! Successfully added ${insertedCount} new pets to the database.`)
  const totalInDb = await prisma.pet.count()
  console.log(`📊 Total Pets now in Database: ${totalInDb}`)
}

main()
  .catch((err) => {
    console.error('Fatal execution error:', err)
    process.exit(1)
  })
  .finally(() => prisma.$disconnect())
