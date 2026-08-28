import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  console.log('Seeding database with rich pet data...')

  // Clear existing pets to avoid duplicates when re-seeding
  await prisma.pet.deleteMany()
  await prisma.user.deleteMany({ where: { email: 'demo.breeder@texaspethub.com' } })

  // 1. Create a dummy breeder
  const breeder = await prisma.user.create({
    data: {
      email: 'demo.breeder@texaspethub.com',
      role: 'BREEDER',
      firstName: 'Texas',
      lastName: 'Premium Breeders',
    },
  })

  // 2. Add realistic, highly accurate pets with multiple images
  const petsToSeed = [
    {
      name: 'Luna',
      species: 'Dog',
      breed: 'Golden Retriever',
      ageMonths: 2,
      weightLbs: 12.5,
      temperament: 'Friendly, Playful, Loyal',
      healthBadges: ['Vaccinated', 'Microchipped', 'Vet Checked', 'AKC Registered'],
      description: 'Luna is a gorgeous Golden Retriever puppy with a classic lush golden coat and an incredibly sweet disposition. Raised in a loving home environment, she is already well-socialized with children and other pets. Golden Retrievers are known for their intelligence and eager-to-please nature, making her the perfect addition to an active family looking for a lifelong companion.',
      price: 2500,
      isLocalOnly: false,
      breederId: breeder.id,
      mediaGallery: [
        'https://images.unsplash.com/photo-1600804340584-c7db2eacf0bf?q=80&w=1000&auto=format&fit=crop',
        'https://images.unsplash.com/photo-1552053831-71594a27632d?q=80&w=1000&auto=format&fit=crop',
        'https://images.unsplash.com/photo-1633722715463-d30f4f325e24?q=80&w=1000&auto=format&fit=crop'
      ],
    },
    {
      name: 'Milo',
      species: 'Dog',
      breed: 'French Bulldog',
      ageMonths: 3,
      weightLbs: 8.0,
      temperament: 'Calm, Affectionate, Comical',
      healthBadges: ['Vaccinated', 'AKC Registered', 'Dewormed'],
      description: 'Meet Milo, an absolutely stunning French Bulldog with signature bat ears and a beautifully compact, muscular build. Frenchies are famously adaptable and make excellent apartment dogs since they require minimal exercise. Milo loves to snuggle on the couch and has a hilarious, clownish personality that will keep you smiling all day.',
      price: 3200,
      isLocalOnly: false,
      breederId: breeder.id,
      mediaGallery: [
        'https://images.unsplash.com/photo-1583511655857-d19b40a7a54e?q=80&w=1000&auto=format&fit=crop',
        'https://images.unsplash.com/photo-1583337130417-3346a1be7dee?q=80&w=1000&auto=format&fit=crop',
        'https://images.unsplash.com/photo-1598133894008-61f7fbf8cb30?q=80&w=1000&auto=format&fit=crop'
      ],
    },
    {
      name: 'Bella',
      species: 'Cat',
      breed: 'Maine Coon',
      ageMonths: 4,
      weightLbs: 10.0,
      temperament: 'Independent, Gentle, Intelligent',
      healthBadges: ['Vaccinated', 'Flea Treated', 'Litter Trained'],
      description: 'Bella is a majestic Maine Coon kitten displaying the trademark luxurious coat and prominent ear tufts this gentle giant breed is known for. Despite her impressive size, she has a dog-like personality—she loves to follow her humans around and will even play fetch! She comes fully litter-trained and has been raised alongside dogs.',
      price: 1800,
      isLocalOnly: false,
      breederId: breeder.id,
      mediaGallery: [
        'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?q=80&w=1000&auto=format&fit=crop',
        'https://images.unsplash.com/photo-1533738363-b7f9aef128ce?q=80&w=1000&auto=format&fit=crop',
        'https://images.unsplash.com/photo-1511044568932-338cba0ad803?q=80&w=1000&auto=format&fit=crop'
      ],
    },
    {
      name: 'Charlie',
      species: 'Dog',
      breed: 'Labradoodle',
      ageMonths: 2,
      weightLbs: 14.0,
      temperament: 'Smart, Energetic, Loving',
      healthBadges: ['Vaccinated', 'Microchipped', 'Hypoallergenic'],
      description: 'Charlie is a highly sought-after F1B Labradoodle, boasting a wavy, low-shedding hypoallergenic coat that is perfect for families with allergies. Combining the brilliant intelligence of a Poodle with the gentle loyalty of a Labrador, Charlie is incredibly easy to train. He is already crate-trained and working on his basic commands!',
      price: 2100,
      isLocalOnly: false,
      breederId: breeder.id,
      mediaGallery: [
        'https://images.unsplash.com/photo-1574158622682-e40e69881006?q=80&w=1000&auto=format&fit=crop',
        'https://images.unsplash.com/photo-1591561582301-7ce6588cc286?q=80&w=1000&auto=format&fit=crop',
        'https://images.unsplash.com/photo-1605897472359-85e4b94d685d?q=80&w=1000&auto=format&fit=crop'
      ],
    },
    {
      name: 'Oliver',
      species: 'Cat',
      breed: 'Persian',
      ageMonths: 3,
      weightLbs: 5.5,
      temperament: 'Quiet, Sweet, Docile',
      healthBadges: ['Vaccinated', 'Vet Checked', 'Litter Trained'],
      description: 'Oliver is a stunning Persian kitten with a pristine white, cloud-like coat and expressive, soulful eyes. Persians are the epitome of lap cats—they are profoundly docile, sweet-tempered, and prefer lounging in a sunny window over high-energy play. Oliver requires daily grooming to maintain his beautiful coat, making him ideal for a dedicated owner looking for a quiet companion.',
      price: 1500,
      isLocalOnly: false,
      breederId: breeder.id,
      mediaGallery: [
        'https://images.unsplash.com/photo-1573865526739-10659fec78a5?q=80&w=1000&auto=format&fit=crop',
        'https://images.unsplash.com/photo-1518791841217-8f162f1e1131?q=80&w=1000&auto=format&fit=crop',
        'https://images.unsplash.com/photo-1513360371669-4adf3dd7dff8?q=80&w=1000&auto=format&fit=crop'
      ],
    },
    {
      name: 'Rio',
      species: 'Bird',
      breed: 'Macaw',
      ageMonths: 12,
      weightLbs: 2.0,
      temperament: 'Vocal, Intelligent, Social',
      healthBadges: ['Avian Vet Checked', 'DNA Sexed', 'Weaned'],
      description: 'Rio is a vibrantly colored Blue-and-Gold Macaw who is just starting to learn his first words! Macaws are highly intelligent and require extensive socialization and mental stimulation. Rio is fully weaned onto a healthy pellet and fresh chop diet. He loves solving puzzle toys and hanging out on his play stand. Please note that Macaws are a lifelong commitment and require experienced handlers.',
      price: 3500,
      isLocalOnly: false,
      breederId: breeder.id,
      mediaGallery: [
        'https://images.unsplash.com/photo-1522858474937-29ef31dce278?q=80&w=1000&auto=format&fit=crop',
        'https://images.unsplash.com/photo-1552728089-5716928224b2?q=80&w=1000&auto=format&fit=crop',
        'https://images.unsplash.com/photo-1582236528766-3d231a4731ed?q=80&w=1000&auto=format&fit=crop'
      ],
    },
  ]

  for (const pet of petsToSeed) {
    await prisma.pet.create({
      data: pet,
    })
  }

  console.log('Seeding completed successfully with rich pet data!')
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
