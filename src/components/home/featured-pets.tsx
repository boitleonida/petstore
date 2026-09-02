"use client"

import Image from "next/image"
import Link from "next/link"
import { motion } from "framer-motion"
import { MapPin, Heart } from "lucide-react"

import { Button } from "@/components/ui/button"

export function FeaturedPets({ pets }: { pets?: any[] }) {
  if (!pets || pets.length === 0) return null;

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
          {pets.map((pet, index) => (
            <motion.div
              key={pet.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ y: -5 }}
              className="group relative bg-background rounded-2xl border overflow-hidden shadow-sm hover:shadow-md transition-all flex flex-col"
            >
              <Link href={`/browse/${pet.id}`} className="absolute inset-0 z-10">
                <span className="sr-only">View {pet.name}</span>
              </Link>

              <div className="relative h-64 w-full overflow-hidden bg-muted shrink-0">
                {pet.mediaGallery && pet.mediaGallery[0] ? (
                  <Image
                    src={pet.mediaGallery[0]}
                    alt={pet.name}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                ) : (
                  <div className="absolute inset-0 flex items-center justify-center text-muted-foreground">
                    No image
                  </div>
                )}
                <Button 
                  size="icon" 
                  variant="ghost" 
                  className="absolute top-3 right-3 rounded-full bg-background/50 backdrop-blur-md hover:bg-background/80 hover:text-red-500 transition-colors z-20"
                >
                  <Heart className="w-5 h-5" />
                  <span className="sr-only">Add to favorites</span>
                </Button>
              </div>
              
              <div className="p-5 flex-1 flex flex-col justify-between relative z-0">
                <div>
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <h3 className="font-bold text-lg">{pet.name}</h3>
                      <p className="text-sm text-muted-foreground">{pet.breed}</p>
                    </div>
                    <span className="font-semibold text-primary">${pet.price.toLocaleString()}</span>
                  </div>
                </div>
                
                <div className="flex items-center gap-4 text-sm text-muted-foreground mt-4">
                  <span className="bg-muted px-2 py-1 rounded-md">{pet.ageMonths} Months</span>
                  <div className="flex items-center gap-1">
                    <MapPin className="w-4 h-4" />
                    Texas
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

