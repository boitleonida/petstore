"use client"

import Image from "next/image"
import Link from "next/link"
import { motion } from "framer-motion"
import { MapPin, Heart } from "lucide-react"

import { Button } from "@/components/ui/button"

const featuredPets = [
  {
    id: "1",
    name: "Luna",
    breed: "Golden Retriever",
    category: "Dog",
    age: "8 Weeks",
    location: "Austin, TX",
    image: "https://images.unsplash.com/photo-1600804340584-c7db2eacf0bf?q=80&w=1000&auto=format&fit=crop",
    price: "$2,500"
  },
  {
    id: "2",
    name: "Milo",
    breed: "French Bulldog",
    category: "Dog",
    age: "10 Weeks",
    location: "Dallas, TX",
    image: "https://images.unsplash.com/photo-1583511655857-d19b40a7a54e?q=80&w=1000&auto=format&fit=crop",
    price: "$3,200"
  },
  {
    id: "3",
    name: "Bella",
    breed: "Maine Coon",
    category: "Cat",
    age: "12 Weeks",
    location: "Houston, TX",
    image: "https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?q=80&w=1000&auto=format&fit=crop",
    price: "$1,800"
  },
  {
    id: "4",
    name: "Charlie",
    breed: "Labradoodle",
    category: "Dog",
    age: "9 Weeks",
    location: "San Antonio, TX",
    image: "https://images.unsplash.com/photo-1574158622682-e40e69881006?q=80&w=1000&auto=format&fit=crop",
    price: "$2,100"
  },
  {
    id: "5",
    name: "Oliver",
    breed: "Persian Cat",
    category: "Cat",
    age: "14 Weeks",
    location: "Austin, TX",
    image: "https://images.unsplash.com/photo-1573865526739-10659fec78a5?q=80&w=1000&auto=format&fit=crop",
    price: "$1,500"
  },
  {
    id: "6",
    name: "Koda",
    breed: "Siberian Husky",
    category: "Dog",
    age: "8 Weeks",
    location: "El Paso, TX",
    image: "https://images.unsplash.com/photo-1605568420189-ea20cce1d2f7?q=80&w=1000&auto=format&fit=crop",
    price: "$1,900"
  },
  {
    id: "7",
    name: "Daisy",
    breed: "Pembroke Welsh Corgi",
    category: "Dog",
    age: "10 Weeks",
    location: "Fort Worth, TX",
    image: "https://images.unsplash.com/photo-1546975490618-804192667104?q=80&w=1000&auto=format&fit=crop",
    price: "$2,800"
  },
  {
    id: "8",
    name: "Leo",
    breed: "Siamese",
    category: "Cat",
    age: "11 Weeks",
    location: "Dallas, TX",
    image: "https://images.unsplash.com/photo-1513245543132-31f507417b26?q=80&w=1000&auto=format&fit=crop",
    price: "$1,200"
  },
  {
    id: "9",
    name: "Buster",
    breed: "Beagle",
    category: "Dog",
    age: "9 Weeks",
    location: "Houston, TX",
    image: "https://images.unsplash.com/photo-1537151608805-ea9facca853c?q=80&w=1000&auto=format&fit=crop",
    price: "$1,600"
  },
  {
    id: "10",
    name: "Rio",
    breed: "Macaw Parrot",
    category: "Bird",
    age: "1 Year",
    location: "San Antonio, TX",
    image: "https://images.unsplash.com/photo-1522858474937-29ef31dce278?q=80&w=1000&auto=format&fit=crop",
    price: "$3,500"
  },
  {
    id: "11",
    name: "Bubbles",
    breed: "Goldfish",
    category: "Fish",
    age: "6 Months",
    location: "Austin, TX",
    image: "https://images.unsplash.com/photo-1524704791125-61266e704044?q=80&w=1000&auto=format&fit=crop",
    price: "$50"
  },
  {
    id: "12",
    name: "Thumper",
    breed: "Holland Lop Rabbit",
    category: "Small Pet",
    age: "10 Weeks",
    location: "Dallas, TX",
    image: "https://images.unsplash.com/photo-1585110396000-c9fac8e52a92?q=80&w=1000&auto=format&fit=crop",
    price: "$200"
  }
]

export function FeaturedPets() {
  return (
    <section className="py-20 bg-muted/30">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-4">
          <div className="max-w-2xl">
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">
              Recently Available Companions
            </h2>
            <p className="text-muted-foreground text-lg">
              Meet some of the newest additions from our verified breeders. Ready to find their forever homes.
            </p>
          </div>
          <Button variant="outline" className="rounded-full" render={<Link href="/browse" />}>
            View All Pets
          </Button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredPets.map((pet, index) => (
            <motion.div
              key={pet.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ y: -5 }}
              className="group relative bg-background rounded-2xl border overflow-hidden shadow-sm hover:shadow-md transition-all"
            >
              <div className="relative h-64 w-full overflow-hidden">
                <Image
                  src={pet.image}
                  alt={pet.name}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <Button 
                  size="icon" 
                  variant="ghost" 
                  className="absolute top-3 right-3 rounded-full bg-background/50 backdrop-blur-md hover:bg-background/80 hover:text-red-500 transition-colors"
                >
                  <Heart className="w-5 h-5" />
                  <span className="sr-only">Add to favorites</span>
                </Button>
              </div>
              
              <div className="p-5">
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <h3 className="font-bold text-lg">{pet.name}</h3>
                    <p className="text-sm text-muted-foreground">{pet.breed}</p>
                  </div>
                  <span className="font-semibold text-primary">{pet.price}</span>
                </div>
                
                <div className="flex items-center gap-4 text-sm text-muted-foreground mt-4">
                  <span className="bg-muted px-2 py-1 rounded-md">{pet.age}</span>
                  <div className="flex items-center gap-1">
                    <MapPin className="w-4 h-4" />
                    {pet.location}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
