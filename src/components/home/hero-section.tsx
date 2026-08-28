"use client"

import Image from "next/image"
import Link from "next/link"
import { motion } from "framer-motion"
import { ArrowRight, ShieldCheck } from "lucide-react"

import { Button } from "@/components/ui/button"

export function HeroSection() {
  return (
    <section className="relative w-full h-[90vh] min-h-[600px] flex items-center justify-center overflow-hidden bg-background">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <Image
          src="https://images.unsplash.com/photo-1548199973-03cce0bbc87b?q=80&w=2938&auto=format&fit=crop"
          alt="Happy dog running in a field"
          fill
          priority
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-background/95 via-background/80 to-transparent dark:from-background/95 dark:via-background/90 dark:to-background/40" />
      </div>

      <div className="container relative z-10 px-4 md:px-6">
        <div className="max-w-2xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-3 py-1 mb-6 rounded-full bg-primary/10 text-primary ring-1 ring-primary/20 backdrop-blur-sm"
          >
            <ShieldCheck className="w-4 h-4" />
            <span className="text-sm font-medium">100% Verified Ethical Breeders</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-4xl md:text-6xl font-extrabold tracking-tight mb-6 text-foreground leading-[1.1]"
          >
            Find Your Perfect <br className="hidden md:block" />
            <span className="text-primary">Companion.</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-lg md:text-xl text-muted-foreground mb-8 max-w-[600px] leading-relaxed"
          >
            Texas Pet Hub connects you with loving, ethical breeders nationwide. Complete transparency, secure transactions, and safe door-to-door transport.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="flex flex-col sm:flex-row gap-4"
          >
            <Button size="lg" className="rounded-full text-base h-12 px-8" render={<Link href="/browse" />}>
              Browse Pets
              <ArrowRight className="ml-2 w-4 h-4" />
            </Button>
            <Button size="lg" variant="outline" className="rounded-full text-base h-12 px-8 bg-background/50 backdrop-blur-sm" render={<Link href="/quiz" />}>
              Take the Match Quiz
            </Button>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
