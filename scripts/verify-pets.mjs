import { PrismaClient } from '@prisma/client'
import fs from 'node:fs'
import path from 'node:path'

const prisma = new PrismaClient()

async function main() {
  const dogs = await prisma.pet.count({ where: { species: 'Dog' } })
  const cats = await prisma.pet.count({ where: { species: 'Cat' } })
  const birds = await prisma.pet.count({ where: { species: 'Bird' } })
  const total = await prisma.pet.count()

  console.log(`Database Pet Counts:`)
  console.log(`  🐶 Dogs: ${dogs}`)
  console.log(`  🐱 Cats: ${cats}`)
  console.log(`  🦜 Birds: ${birds}`)
  console.log(`  🌟 Total in DB: ${total}`)

  // Verify downloaded image files
  const dogsDir = path.resolve('public/images/pets/dogs')
  const catsDir = path.resolve('public/images/pets/cats')
  const birdsDir = path.resolve('public/images/pets/birds')

  const dogImgs = fs.existsSync(dogsDir) ? fs.readdirSync(dogsDir).length : 0
  const catImgs = fs.existsSync(catsDir) ? fs.readdirSync(catsDir).length : 0
  const birdImgs = fs.existsSync(birdsDir) ? fs.readdirSync(birdsDir).length : 0

  console.log(`\nDownloaded Permanent Images in public/images/pets:`)
  console.log(`  🐶 Dog images: ${dogImgs}`)
  console.log(`  🐱 Cat images: ${catImgs}`)
  console.log(`  🦜 Bird images: ${birdImgs}`)
  console.log(`  📸 Total images: ${dogImgs + catImgs + birdImgs}`)

  // Sample check one pet per category
  const sampleDog = await prisma.pet.findFirst({ where: { species: 'Dog', mediaGallery: { isEmpty: false } }, orderBy: { createdAt: 'desc' } })
  const sampleCat = await prisma.pet.findFirst({ where: { species: 'Cat', mediaGallery: { isEmpty: false } }, orderBy: { createdAt: 'desc' } })
  const sampleBird = await prisma.pet.findFirst({ where: { species: 'Bird', mediaGallery: { isEmpty: false } }, orderBy: { createdAt: 'desc' } })

  console.log('\nSample Dog Record:', {
    name: sampleDog?.name,
    breed: sampleDog?.breed,
    price: sampleDog?.price,
    mediaGallery: sampleDog?.mediaGallery,
    descriptionPreview: sampleDog?.description?.slice(0, 80)
  })

  console.log('\nSample Cat Record:', {
    name: sampleCat?.name,
    breed: sampleCat?.breed,
    price: sampleCat?.price,
    mediaGallery: sampleCat?.mediaGallery,
    descriptionPreview: sampleCat?.description?.slice(0, 80)
  })

  console.log('\nSample Bird Record:', {
    name: sampleBird?.name,
    breed: sampleBird?.breed,
    price: sampleBird?.price,
    mediaGallery: sampleBird?.mediaGallery,
    descriptionPreview: sampleBird?.description?.slice(0, 80)
  })
}

main().finally(() => prisma.$disconnect())
