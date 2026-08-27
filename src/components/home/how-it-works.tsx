"use client"

import { motion } from "framer-motion"
import { Search, ShieldCheck, Truck } from "lucide-react"

const steps = [
  {
    icon: Search,
    title: "1. Find Your Match",
    description: "Browse our network of verified breeders or take our specialized quiz to find the perfect breed for your lifestyle.",
  },
  {
    icon: ShieldCheck,
    title: "2. Secure & Transparent",
    description: "Review detailed health records and breeder licenses. Pay securely through our platform with full buyer protection.",
  },
  {
    icon: Truck,
    title: "3. Safe Transport",
    description: "Track your new companion's journey to your door with our professional, stress-free USDA-certified transport services.",
  },
]

export function HowItWorks() {
  return (
    <section className="py-24 bg-background overflow-hidden relative">
      {/* Decorative background blur */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/5 rounded-full blur-3xl -z-10" />

      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">
            How Texas Pet Hub Works
          </h2>
          <p className="text-lg text-muted-foreground">
            We've simplified the process of bringing a new pet into your home, ensuring safety, transparency, and joy at every step.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 relative">
          {/* Connecting Line for Desktop */}
          <div className="hidden md:block absolute top-12 left-[15%] right-[15%] h-0.5 bg-border -z-10" />

          {steps.map((step, index) => (
            <motion.div
              key={step.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              className="flex flex-col items-center text-center group"
            >
              <div className="w-24 h-24 rounded-full bg-background border-2 border-primary/20 flex items-center justify-center mb-6 shadow-sm group-hover:scale-110 group-hover:border-primary transition-all duration-300">
                <step.icon className="w-10 h-10 text-primary" />
              </div>
              <h3 className="text-xl font-bold mb-3">{step.title}</h3>
              <p className="text-muted-foreground leading-relaxed">
                {step.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
