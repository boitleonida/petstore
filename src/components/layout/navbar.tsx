"use client"

import * as React from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Menu, PawPrint, Search, ShieldCheck } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet"
import { ThemeToggle } from "@/components/theme-toggle"

const navigation = [
  { name: "Browse Pets", href: "/browse" },
  { name: "Transport Tracking", href: "/tracking" },
]

export function Navbar({ session }: { session?: any }) {
  const pathname = usePathname()
  const [isScrolled, setIsScrolled] = React.useState(false)

  // Handle scroll for glassmorphism effect
  React.useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const handleLogout = async () => {
    // A quick client-side way to clear the cookie and reload
    document.cookie = "session=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    window.location.href = "/";
  }

  return (
    <header
      className={`fixed top-0 z-50 w-full transition-all duration-300 border-b ${
        isScrolled
          ? "bg-background/80 backdrop-blur-md border-border shadow-sm"
          : "bg-background border-transparent"
      }`}
    >
      <div className="container mx-auto px-4 md:px-6 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 transition-transform hover:scale-105">
          <div className="bg-primary p-2 rounded-lg text-primary-foreground">
            <PawPrint className="w-5 h-5" />
          </div>
          <span className="font-bold text-xl tracking-tight hidden sm:inline-block text-foreground">
            Texas Pet Hub
          </span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-8">
          {navigation.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`text-sm font-medium transition-colors hover:text-primary relative group ${
                pathname === item.href ? "text-foreground" : "text-muted-foreground"
              }`}
            >
              {item.name}
              {/* Hover Underline Animation */}
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full"></span>
            </Link>
          ))}
        </nav>

        {/* Actions (Desktop & Mobile) */}
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" className="hidden sm:inline-flex rounded-full text-muted-foreground">
            <Search className="w-5 h-5" />
            <span className="sr-only">Search</span>
          </Button>

          <ThemeToggle />

          {session ? (
            <div className="hidden sm:flex items-center gap-4">
              <span className="text-sm font-medium">Hello, {session.firstName}</span>
              {session.role === "ADMIN" && (
                <Button variant="outline" className="rounded-full" render={<Link href="/admin/dashboard" />}>
                  Dashboard
                </Button>
              )}
              {session.role === "BREEDER" && (
                <Button variant="outline" className="rounded-full" render={<Link href="/breeders" />}>
                  Dashboard
                </Button>
              )}
              <Button variant="ghost" className="rounded-full" onClick={handleLogout}>
                Sign Out
              </Button>
            </div>
          ) : (
            <>
              <Button variant="outline" className="hidden sm:inline-flex rounded-full" render={<Link href="/login" />}>
                Sign In
              </Button>
              <Button className="hidden sm:inline-flex rounded-full" render={<Link href="/register" />}>
                Sign Up
              </Button>
            </>
          )}

          {/* Mobile Navigation Sheet */}
          <Sheet>
            <SheetTrigger render={
              <Button variant="ghost" size="icon" className="md:hidden">
                <Menu className="w-6 h-6" />
                <span className="sr-only">Toggle navigation menu</span>
              </Button>
            } />
            <SheetContent side="right" className="w-[300px] sm:w-[400px]">
              <nav className="flex flex-col gap-6 mt-8">
                {navigation.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`text-lg font-medium transition-colors hover:text-primary ${
                      pathname === item.href ? "text-primary" : "text-muted-foreground"
                    }`}
                  >
                    {item.name}
                  </Link>
                ))}
                <div className="h-px bg-border my-2" />
                
                {session ? (
                  <>
                    <span className="text-lg font-medium">Hello, {session.firstName}</span>
                    {session.role === "ADMIN" && (
                      <Button variant="outline" className="w-full justify-start rounded-full" render={<Link href="/admin/dashboard" />}>
                        Dashboard
                      </Button>
                    )}
                    {session.role === "BREEDER" && (
                      <Button variant="outline" className="w-full justify-start rounded-full" render={<Link href="/breeders" />}>
                        Dashboard
                      </Button>
                    )}
                    <Button variant="ghost" className="w-full justify-start rounded-full text-red-500" onClick={handleLogout}>
                      Sign Out
                    </Button>
                  </>
                ) : (
                  <>
                    <Button variant="outline" className="w-full justify-start rounded-full" render={<Link href="/login" />}>
                      Sign In
                    </Button>
                    <Button className="w-full justify-start rounded-full" render={<Link href="/register" />}>
                      Sign Up
                    </Button>
                  </>
                )}
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  )
}
