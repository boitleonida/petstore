"use client"

import Image from "next/image"
import { motion } from "framer-motion"
import { Star } from "lucide-react"

const testimonials = [
  {
    quote: "We were nervous about buying a puppy online, but Texas Pet Hub made it so secure. The breeder was verified, and the transport was incredibly professional.",
    author: "Sarah Jenkins",
    location: "Houston, TX",
    image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=200&auto=format&fit=crop"
  },
  {
    quote: "The transparency is unmatched. I saw all of the medical records before making a decision, and my Frenchie arrived healthy and happy.",
    author: "Michael Torres",
    location: "Dallas, TX",
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=200&auto=format&fit=crop"
  },
  {
    quote: "I love the breed match quiz! It led us to our perfect Maine Coon. The whole process from selection to delivery was seamless.",
    author: "Emily Chen",
    location: "Austin, TX",
    image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=200&auto=format&fit=crop"
  }
]

export function Testimonials() {
  return (
    <section className="py-24 bg-muted/50 border-t">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">
            Happy Families
          </h2>
          <p className="text-lg text-muted-foreground">
            Don't just take our word for it. Here is what families are saying about their experience with Texas Pet Hub.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.author}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.15 }}
              className="bg-background p-8 rounded-2xl shadow-sm border relative"
            >
              <div className="flex gap-1 text-yellow-400 mb-6">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-current" />
                ))}
              </div>
              <p className="text-muted-foreground mb-8 text-lg leading-relaxed italic">
                "{testimonial.quote}"
              </p>
              <div className="flex items-center gap-4 mt-auto">
                <div className="relative w-12 h-12 rounded-full overflow-hidden border-2 border-primary/20">
                  <Image
                    src={testimonial.image}
                    alt={testimonial.author}
                    fill
                    className="object-cover"
                  />
                </div>
                <div>
                  <h4 className="font-bold text-foreground">{testimonial.author}</h4>
                  <p className="text-sm text-muted-foreground">{testimonial.location}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
