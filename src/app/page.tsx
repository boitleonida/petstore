import { HeroSection } from "@/components/home/hero-section";
import { PetCategories } from "@/components/home/pet-categories";
import { FeaturedPets } from "@/components/home/featured-pets";
import { HowItWorks } from "@/components/home/how-it-works";
import { Testimonials } from "@/components/home/testimonials";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <HeroSection />
      <PetCategories />
      <FeaturedPets />
      <HowItWorks />
      <Testimonials />
      
      {/* Final Call to Action Section */}
      <section className="py-24 bg-primary text-primary-foreground relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-white via-transparent to-transparent" />
        <div className="container mx-auto px-4 md:px-6 relative z-10 text-center">
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-6">
            Ready to meet your new best friend?
          </h2>
          <p className="text-xl opacity-90 mb-10 max-w-2xl mx-auto">
            Join thousands of happy families who found their perfect companion through our trusted network.
          </p>
          <Button size="lg" variant="secondary" className="rounded-full text-lg h-14 px-10 text-primary hover:scale-105 transition-transform" render={<Link href="/browse" />}>
            Start Browsing Now
            <ArrowRight className="ml-2 w-5 h-5" />
          </Button>
        </div>
      </section>
    </div>
  );
}
