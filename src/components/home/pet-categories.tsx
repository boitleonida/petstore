"use client"

import Image from "next/image"
import Link from "next/link"
import { motion } from "framer-motion"

const categories = [
  {
    name: "Dogs",
    href: "/browse?category=dogs",
    image: "https://images.unsplash.com/photo-1543466835-00a7907e9de1?q=80&w=600&auto=format&fit=crop",
    description: "Loyal companions for every family."
  },
  {
    name: "Cats",
    href: "/browse?category=cats",
    image: "https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?q=80&w=600&auto=format&fit=crop",
    description: "Independent and affectionate friends."
  },
  {
    name: "Birds",
    href: "/browse?category=birds",
    image: "/images/pets/birds/birds_456_talking-catalina-mac_1.jpg",
    description: "Vibrant, intelligent avian friends."
  },
  {
    name: "All Pets",
    href: "/browse",
    image: "https://images.unsplash.com/photo-1552053831-71594a27632d?q=80&w=600&auto=format&fit=crop",
    description: "Explore all available companions."
  }
]

export function PetCategories() {
  return (
    <section className="py-20 bg-background border-t">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">
            Browse by Category
          </h2>
          <p className="text-muted-foreground text-lg">
            Find exactly the type of companion you're looking for, from energetic pups to tranquil aquatics.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {categories.map((category, index) => (
            <motion.div
              key={category.name}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
            >
              <Link href={category.href} className="group block relative rounded-2xl overflow-hidden aspect-[4/5] bg-muted">
                <Image
                  src={category.image}
                  alt={category.name}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent transition-opacity group-hover:opacity-90" />
                <div className="absolute bottom-0 left-0 p-6">
                  <h3 className="text-2xl font-bold text-white mb-2">{category.name}</h3>
                  <p className="text-white/80 text-sm transform translate-y-4 opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
                    {category.description}
                  </p>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
