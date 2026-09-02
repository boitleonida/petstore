"use client"

import Link from "next/link"
import { Globe, Mail, MessageCircle, PawPrint } from "lucide-react"
import { usePathname } from "next/navigation"

export function Footer() {
  const pathname = usePathname()
  
  if (pathname.startsWith('/admin')) {
    return null;
  }

  return (
    <footer className="border-t bg-muted/40">
      <div className="container mx-auto px-4 md:px-6 py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 md:gap-12">
          
          {/* Brand & Intro */}
          <div className="md:col-span-1 space-y-4">
            <Link href="/" className="flex items-center gap-2">
              <div className="bg-primary p-1.5 rounded-md text-primary-foreground">
                <PawPrint className="w-5 h-5" />
              </div>
              <span className="font-bold text-lg tracking-tight">Texas Pet Hub</span>
            </Link>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Connecting ethical breeders with loving families. Ensuring safe transport and transparent adoptions across the country.
            </p>
            <div className="flex gap-4 pt-2">
              <Link href="/social/website" className="text-muted-foreground hover:text-primary transition-colors">
                <Globe className="w-5 h-5" />
                <span className="sr-only">Website</span>
              </Link>
              <Link href="/social/messages" className="text-muted-foreground hover:text-primary transition-colors">
                <MessageCircle className="w-5 h-5" />
                <span className="sr-only">Social</span>
              </Link>
              <Link href="/social/email" className="text-muted-foreground hover:text-primary transition-colors">
                <Mail className="w-5 h-5" />
                <span className="sr-only">Email</span>
              </Link>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="font-semibold text-foreground">Explore</h3>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link href="/browse" className="text-muted-foreground hover:text-primary transition-colors">Browse Pets</Link>
              </li>
              <li>
                <Link href="/breeders" className="text-muted-foreground hover:text-primary transition-colors">Our Breeders</Link>
              </li>
              <li>
                <Link href="/transport" className="text-muted-foreground hover:text-primary transition-colors">Transport Services</Link>
              </li>
              <li>
                <Link href="/how-it-works" className="text-muted-foreground hover:text-primary transition-colors">How it Works</Link>
              </li>
            </ul>
          </div>

          {/* Resources */}
          <div className="space-y-4">
            <h3 className="font-semibold text-foreground">Resources</h3>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link href="/quiz" className="text-muted-foreground hover:text-primary transition-colors">Match Quiz</Link>
              </li>
              <li>
                <Link href="/support" className="text-muted-foreground hover:text-primary transition-colors">Support Center</Link>
              </li>
              <li>
                <Link href="/blog" className="text-muted-foreground hover:text-primary transition-colors">Pet Care Blog</Link>
              </li>
              <li>
                <Link href="/faq" className="text-muted-foreground hover:text-primary transition-colors">FAQ</Link>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div className="space-y-4">
            <h3 className="font-semibold text-foreground">Legal</h3>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link href="/privacy" className="text-muted-foreground hover:text-primary transition-colors">Privacy Policy</Link>
              </li>
              <li>
                <Link href="/terms" className="text-muted-foreground hover:text-primary transition-colors">Terms of Service</Link>
              </li>
              <li>
                <Link href="/licenses" className="text-muted-foreground hover:text-primary transition-colors">Breeder Licenses</Link>
              </li>
            </ul>
          </div>

        </div>

        <div className="mt-12 pt-8 border-t flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs text-muted-foreground">
            &copy; {new Date().getFullYear()} Texas Pet Hub. All rights reserved.
          </p>
          <div className="flex gap-4 text-xs text-muted-foreground">
            <Link href="/privacy" className="hover:text-primary transition-colors">Privacy</Link>
            <Link href="/terms" className="hover:text-primary transition-colors">Terms</Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
