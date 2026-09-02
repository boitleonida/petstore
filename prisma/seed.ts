import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  console.log('Seeding database with massive rich pet data...')

  // Clear existing data (optional, but good for resetting in dev)
  await prisma.adoptionApplication.deleteMany()
  await prisma.transportBooking.deleteMany()
  await prisma.appointment.deleteMany()
  await prisma.passportRecord.deleteMany()
  await prisma.pet.deleteMany()
  await prisma.user.deleteMany()
  await prisma.breederApplication.deleteMany()

  // Create Demo Breeder
  const breeder = await prisma.user.create({
    data: {
      email: 'demo.breeder@texaspethub.com',
      firstName: 'Texas',
      lastName: 'Premium Breeders',
      role: 'BREEDER',
      phone: '555-0199',
    },
  })

  // 15 High Quality Pets
  const petsData = [
    {
      name: "Luna",
      species: "Dog",
      breed: "Golden Retriever",
      ageMonths: 3,
      weightLbs: 15,
      temperament: "Friendly, Intelligent, Loyal",
      healthBadges: ["AKC Registered", "OFA Certified Parents", "Vaccinated", "Microchipped"],
      description: "Luna is a gorgeous, purebred Golden Retriever puppy with a heart of gold. She loves to retrieve tennis balls and cuddle on the couch. Her parents are both OFA certified for hips and elbows.",
      price: 2500,
      isLocalOnly: false,
      mediaGallery: [
        "https://images.unsplash.com/photo-1552053831-71594a27632d?auto=format&fit=crop&q=80&w=800",
        "https://images.unsplash.com/photo-1583337130417-3346a1be7dee?auto=format&fit=crop&q=80&w=800",
        "https://images.unsplash.com/photo-1591160690555-5debfba289f0?auto=format&fit=crop&q=80&w=800"
      ]
    },
    {
      name: "Milo",
      species: "Dog",
      breed: "French Bulldog",
      ageMonths: 12,
      weightLbs: 22,
      temperament: "Playful, Affectionate, Stubborn",
      healthBadges: ["Vet Checked", "Vaccinated", "Dewormed"],
      description: "Milo is a stocky and playful Frenchie who snorts when he's happy. He's great for apartment living but needs AC in the summer!",
      price: 3500,
      isLocalOnly: true,
      mediaGallery: [
        "https://images.unsplash.com/photo-1583511655857-d19b40a7a54e?auto=format&fit=crop&q=80&w=800",
        "https://images.unsplash.com/photo-1598133894008-61f7f98c4568?auto=format&fit=crop&q=80&w=800",
        "https://images.unsplash.com/photo-1516598540642-e8f40a084920?auto=format&fit=crop&q=80&w=800"
      ]
    },
    {
      name: "Bella",
      species: "Cat",
      breed: "Maine Coon",
      ageMonths: 6,
      weightLbs: 10,
      temperament: "Gentle, Giant, Vocal",
      healthBadges: ["TICA Registered", "Vaccinated", "Microchipped"],
      description: "Bella is a stunning Maine Coon with huge tufted ears and a massive fluffy tail. She trills instead of meows and loves playing in water.",
      price: 1800,
      isLocalOnly: false,
      mediaGallery: [
        "https://images.unsplash.com/photo-1629242954845-a7452d3a334a?auto=format&fit=crop&q=80&w=800",
        "https://images.unsplash.com/photo-1601053457593-9c8699b642e0?auto=format&fit=crop&q=80&w=800",
        "https://images.unsplash.com/photo-1574158622682-e40e69881006?auto=format&fit=crop&q=80&w=800"
      ]
    },
    {
      name: "Charlie",
      species: "Dog",
      breed: "Labradoodle",
      ageMonths: 4,
      weightLbs: 18,
      temperament: "Energetic, Smart, Hypoallergenic",
      healthBadges: ["Health Guarantee", "Vaccinated", "Microchipped", "Hypoallergenic"],
      description: "Charlie is an F1b Labradoodle, making him virtually non-shedding and great for allergy sufferers. He is incredibly smart and already knows basic commands.",
      price: 2800,
      isLocalOnly: false,
      mediaGallery: [
        "https://images.unsplash.com/photo-1596492784531-6e6eb5ea9993?auto=format&fit=crop&q=80&w=800",
        "https://images.unsplash.com/photo-1605244863945-ba3b708d7ef2?auto=format&fit=crop&q=80&w=800",
        "https://images.unsplash.com/photo-1579213838058-2a0a41d3b50c?auto=format&fit=crop&q=80&w=800"
      ]
    },
    {
      name: "Leo",
      species: "Cat",
      breed: "Persian",
      ageMonths: 24,
      weightLbs: 11,
      temperament: "Calm, Sweet, Couch Potato",
      healthBadges: ["Vet Checked", "Vaccinated"],
      description: "Leo is a gorgeous silver Persian who wants nothing more than a warm lap. He requires daily grooming to keep his luxurious coat pristine.",
      price: 1200,
      isLocalOnly: true,
      mediaGallery: [
        "https://images.unsplash.com/photo-1513245543132-31f507417b26?auto=format&fit=crop&q=80&w=800",
        "https://images.unsplash.com/photo-1513360371669-4adf3dd7dff8?auto=format&fit=crop&q=80&w=800",
        "https://images.unsplash.com/photo-1615592389070-bcc97e0504d3?auto=format&fit=crop&q=80&w=800"
      ]
    },
    {
      name: "Rio",
      species: "Bird",
      breed: "Blue and Gold Macaw",
      ageMonths: 8,
      weightLbs: 2,
      temperament: "Intelligent, Vocal, Demanding",
      healthBadges: ["Avian Vet Checked", "DNA Sexed Male", "Weaned"],
      description: "Rio is a brilliantly colored Macaw. He is highly intelligent, already says 'Hello' and 'Apple', and will need an experienced bird owner who understands his 50+ year lifespan.",
      price: 4500,
      isLocalOnly: false,
      mediaGallery: [
        "https://images.unsplash.com/photo-1552728089-571692ce01d8?auto=format&fit=crop&q=80&w=800",
        "https://images.unsplash.com/photo-1628172960613-2d0fa3ddab36?auto=format&fit=crop&q=80&w=800",
        "https://images.unsplash.com/photo-1544677942-8cbf282662fc?auto=format&fit=crop&q=80&w=800"
      ]
    },
    {
      name: "Thor",
      species: "Dog",
      breed: "Siberian Husky",
      ageMonths: 5,
      weightLbs: 28,
      temperament: "Active, Vocal, Escape Artist",
      healthBadges: ["AKC Registered", "Vaccinated", "Microchipped"],
      description: "Thor is a stunning blue-eyed Siberian Husky. He requires a highly active lifestyle and a very secure fenced yard. He loves to 'talk' and sing!",
      price: 2000,
      isLocalOnly: false,
      mediaGallery: [
        "https://images.unsplash.com/photo-1605568420105-beb2ce646739?auto=format&fit=crop&q=80&w=800",
        "https://images.unsplash.com/photo-1520601955685-1d41870ed2df?auto=format&fit=crop&q=80&w=800",
        "https://images.unsplash.com/photo-1549420042-83281beaf9fc?auto=format&fit=crop&q=80&w=800"
      ]
    },
    {
      name: "Daisy",
      species: "Dog",
      breed: "Dachshund",
      ageMonths: 3,
      weightLbs: 5,
      temperament: "Brave, Stubborn, Cuddly",
      healthBadges: ["Vet Checked", "Vaccinated", "Dewormed"],
      description: "Daisy is a miniature smooth-coat Dachshund. She is incredibly courageous and loves to burrow under blankets.",
      price: 1800,
      isLocalOnly: true,
      mediaGallery: [
        "https://images.unsplash.com/photo-1612195583950-b8fd34c87093?auto=format&fit=crop&q=80&w=800",
        "https://images.unsplash.com/photo-1533221376839-813f5dd4758d?auto=format&fit=crop&q=80&w=800",
        "https://images.unsplash.com/photo-1537151608828-ea2b11777ee8?auto=format&fit=crop&q=80&w=800"
      ]
    },
    {
      name: "Cleo",
      species: "Cat",
      breed: "Sphynx",
      ageMonths: 4,
      weightLbs: 4,
      temperament: "Affectionate, Energetic, Dog-like",
      healthBadges: ["TICA Registered", "HCM Scanned Parents", "Vaccinated"],
      description: "Cleo is a hairless wonder! Sphynx cats are known for their dog-like personalities and extreme affection. She needs weekly baths to maintain healthy skin.",
      price: 2200,
      isLocalOnly: false,
      mediaGallery: [
        "https://images.unsplash.com/photo-1520315342629-6ea920342047?auto=format&fit=crop&q=80&w=800",
        "https://images.unsplash.com/photo-1579212001556-9aeb24e54e4c?auto=format&fit=crop&q=80&w=800",
        "https://images.unsplash.com/photo-1518288774672-b94e808873ff?auto=format&fit=crop&q=80&w=800"
      ]
    },
    {
      name: "Max",
      species: "Dog",
      breed: "German Shepherd",
      ageMonths: 2,
      weightLbs: 18,
      temperament: "Loyal, Protective, Highly Trainable",
      healthBadges: ["AKC Registered", "OFA Certified Parents", "Vaccinated"],
      description: "Max is from working lines. He will need a 'job' to do and rigorous training. Excellent prospect for protection or obedience sports.",
      price: 3000,
      isLocalOnly: false,
      mediaGallery: [
        "https://images.unsplash.com/photo-1589924691995-400dc9ceb649?auto=format&fit=crop&q=80&w=800",
        "https://images.unsplash.com/photo-1558509893-623c2aeb37ab?auto=format&fit=crop&q=80&w=800",
        "https://images.unsplash.com/photo-1616769919532-680f4fcf6a78?auto=format&fit=crop&q=80&w=800"
      ]
    },
    {
      name: "Mango",
      species: "Bird",
      breed: "Sun Conure",
      ageMonths: 6,
      weightLbs: 0.3,
      temperament: "Playful, Clingy, Very Loud",
      healthBadges: ["Avian Vet Checked", "Weaned"],
      description: "Mango is a beautifully colored Sun Conure. Be warned: this species is extremely loud! However, they are incredibly affectionate and love to snuggle in your shirt.",
      price: 800,
      isLocalOnly: true,
      mediaGallery: [
        "https://images.unsplash.com/photo-1522276498395-f4f68f7f8454?auto=format&fit=crop&q=80&w=800",
        "https://images.unsplash.com/photo-1522277028441-df079b76313b?auto=format&fit=crop&q=80&w=800",
        "https://images.unsplash.com/photo-1452570053594-1b985d6ea890?auto=format&fit=crop&q=80&w=800"
      ]
    },
    {
      name: "Stella",
      species: "Dog",
      breed: "Poodle (Standard)",
      ageMonths: 3,
      weightLbs: 12,
      temperament: "Elegant, Smart, Active",
      healthBadges: ["AKC Registered", "Vaccinated", "Microchipped", "Hypoallergenic"],
      description: "Stella is an incredibly smart standard poodle. She is hypoallergenic and does not shed, but requires regular professional grooming.",
      price: 2600,
      isLocalOnly: false,
      mediaGallery: [
        "https://images.unsplash.com/photo-1620023617300-8d59858602b9?auto=format&fit=crop&q=80&w=800",
        "https://images.unsplash.com/photo-1598188185593-cc4952044820?auto=format&fit=crop&q=80&w=800",
        "https://images.unsplash.com/photo-1632128913917-1070fcb7e474?auto=format&fit=crop&q=80&w=800"
      ]
    },
    {
      name: "Oliver",
      species: "Cat",
      breed: "British Shorthair",
      ageMonths: 5,
      weightLbs: 7,
      temperament: "Easygoing, Chunky, Affectionate",
      healthBadges: ["TICA Registered", "Vaccinated", "Dewormed"],
      description: "Oliver has the classic 'teddy bear' look of a British Shorthair with dense blue fur and huge copper eyes. He is very laid back.",
      price: 2000,
      isLocalOnly: true,
      mediaGallery: [
        "https://images.unsplash.com/photo-1513360371669-4adf3dd7dff8?auto=format&fit=crop&q=80&w=800",
        "https://images.unsplash.com/photo-1573865526739-10659fec78a5?auto=format&fit=crop&q=80&w=800",
        "https://images.unsplash.com/photo-1606822837372-a4e9b9421258?auto=format&fit=crop&q=80&w=800"
      ]
    },
    {
      name: "Rocky",
      species: "Dog",
      breed: "Boxer",
      ageMonths: 4,
      weightLbs: 25,
      temperament: "Silly, High Energy, Loving",
      healthBadges: ["Vet Checked", "Vaccinated", "Dewormed"],
      description: "Rocky is a goofy boxer puppy who thinks he's a lap dog. He needs a lot of exercise and loves children.",
      price: 1500,
      isLocalOnly: true,
      mediaGallery: [
        "https://images.unsplash.com/photo-1593134257782-e89567b7718a?auto=format&fit=crop&q=80&w=800",
        "https://images.unsplash.com/photo-1601974780963-c7e1451f7bb6?auto=format&fit=crop&q=80&w=800",
        "https://images.unsplash.com/photo-1558349520-2b158097b83d?auto=format&fit=crop&q=80&w=800"
      ]
    },
    {
      name: "Simba",
      species: "Cat",
      breed: "Bengal",
      ageMonths: 6,
      weightLbs: 8,
      temperament: "Wild, Active, Vocal",
      healthBadges: ["TICA Registered", "Vaccinated", "Microchipped"],
      description: "Simba is a Bengal with stunning rosettes. He is not a couch potato cat—he needs a cat wheel and lots of high places to climb.",
      price: 2500,
      isLocalOnly: false,
      mediaGallery: [
        "https://images.unsplash.com/photo-1604085449298-63cb53528f1f?auto=format&fit=crop&q=80&w=800",
        "https://images.unsplash.com/photo-1616428751515-381a17fa2b67?auto=format&fit=crop&q=80&w=800",
        "https://images.unsplash.com/photo-1589146142751-40be357e60dc?auto=format&fit=crop&q=80&w=800"
      ]
    }
  ]

  for (const pet of petsData) {
    await prisma.pet.create({
      data: {
        ...pet,
        breederId: breeder.id
      }
    })
  }

  console.log('Seeding completed successfully with 15 highly detailed pets!')
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
