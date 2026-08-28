import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  console.log('Seeding database...')

  // 1. Create a dummy breeder
  const breeder = await prisma.user.upsert({
    where: { email: 'demo.breeder@texaspethub.com' },
    update: {},
    create: {
      email: 'demo.breeder@texaspethub.com',
      role: 'BREEDER',
      firstName: 'Texas',
      lastName: 'Premium Breeders',
    },
  })

  // 2. Add realistic pets
  const petsToSeed = [
    {
      name: 'Luna',
      species: 'Dog',
      breed: 'Golden Retriever',
      ageMonths: 2,
      weightLbs: 12.5,
      temperament: 'Friendly, Playful',
      healthBadges: ['Vaccinated', 'Microchipped', 'Vet Checked'],
      isLocalOnly: false,
      breederId: breeder.id,
      mediaGallery: ['https://images.unsplash.com/photo-1600804340584-c7db2eacf0bf?q=80&w=1000&auto=format&fit=crop'],
    },
    {
      name: 'Milo',
      species: 'Dog',
      breed: 'French Bulldog',
      ageMonths: 3,
      weightLbs: 8.0,
      temperament: 'Calm, Affectionate',
      healthBadges: ['Vaccinated', 'AKC Registered'],
      isLocalOnly: false,
      breederId: breeder.id,
      mediaGallery: ['https://images.unsplash.com/photo-1583511655857-d19b40a7a54e?q=80&w=1000&auto=format&fit=crop'],
    },
    {
      name: 'Bella',
      species: 'Cat',
      breed: 'Maine Coon',
      ageMonths: 4,
      weightLbs: 10.0,
      temperament: 'Independent, Gentle',
      healthBadges: ['Vaccinated', 'Flea Treated'],
      isLocalOnly: false,
      breederId: breeder.id,
      mediaGallery: ['https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?q=80&w=1000&auto=format&fit=crop'],
    },
    {
      name: 'Charlie',
      species: 'Dog',
      breed: 'Labradoodle',
      ageMonths: 2,
      weightLbs: 14.0,
      temperament: 'Smart, Energetic',
      healthBadges: ['Vaccinated', 'Microchipped', 'Hypoallergenic'],
      isLocalOnly: false,
      breederId: breeder.id,
      mediaGallery: ['https://images.unsplash.com/photo-1574158622682-e40e69881006?q=80&w=1000&auto=format&fit=crop'],
    },
    {
      name: 'Oliver',
      species: 'Cat',
      breed: 'Persian',
      ageMonths: 3,
      weightLbs: 5.5,
      temperament: 'Quiet, Sweet',
      healthBadges: ['Vaccinated', 'Vet Checked'],
      isLocalOnly: false,
      breederId: breeder.id,
      mediaGallery: ['https://images.unsplash.com/photo-1573865526739-10659fec78a5?q=80&w=1000&auto=format&fit=crop'],
    },
    {
      name: 'Rio',
      species: 'Bird',
      breed: 'Macaw',
      ageMonths: 12,
      weightLbs: 2.0,
      temperament: 'Vocal, Intelligent',
      healthBadges: ['Avian Vet Checked'],
      isLocalOnly: false,
      breederId: breeder.id,
      mediaGallery: ['https://images.unsplash.com/photo-1522858474937-29ef31dce278?q=80&w=1000&auto=format&fit=crop'],
    },
  ]

  for (const pet of petsToSeed) {
    await prisma.pet.create({
      data: pet,
    })
  }

  console.log('Seeding completed successfully!')
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
