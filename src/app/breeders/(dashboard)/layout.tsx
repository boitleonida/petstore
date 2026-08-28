"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { LayoutDashboard, Dog, FileText, Settings, Menu, Bell, ShieldCheck, LogOut } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger, SheetTitle } from "@/components/ui/sheet"
import { ThemeToggle } from "@/components/theme-toggle"

const sidebarLinks = [
  { name: "Overview", href: "/breeders/dashboard", icon: LayoutDashboard },
  { name: "My Pets", href: "/breeders/dashboard/pets", icon: Dog },
  { name: "Applications", href: "/breeders/dashboard/applications", icon: FileText },
  { name: "Settings", href: "/breeders/dashboard/settings", icon: Settings },
]

export default function BreederDashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const pathname = usePathname()

  const SidebarContent = () => (
    <div className="flex flex-col h-full bg-muted/40 border-r border-border">
      <div className="p-6 border-b border-border flex items-center justify-between">
        <Link href="/" className="font-black text-2xl tracking-tighter text-primary flex items-center gap-2">
          Texas Pet Hub <span className="text-xs bg-primary/20 text-primary px-2 py-0.5 rounded-full font-bold">BREEDER</span>
        </Link>
      </div>

      <div className="p-4 flex-1 space-y-1">
        {sidebarLinks.map((link) => {
          const Icon = link.icon
          const isActive = pathname === link.href
          
          return (
            <Link key={link.href} href={link.href}>
              <div className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
                isActive 
                  ? "bg-primary text-primary-foreground font-medium shadow-sm" 
                  : "text-muted-foreground hover:bg-muted hover:text-foreground"
              }`}>
                <Icon className="w-5 h-5" />
                {link.name}
              </div>
            </Link>
          )
        })}
      </div>

      <div className="p-4 border-t border-border">
        <div className="flex items-center gap-3 px-4 py-3 rounded-xl text-muted-foreground hover:bg-muted hover:text-foreground cursor-pointer transition-all">
          <LogOut className="w-5 h-5" />
          Logout
        </div>
      </div>
    </div>
  )

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-background">
      {/* Desktop Sidebar */}
      <div className="hidden md:block w-72 h-screen sticky top-0">
        <SidebarContent />
      </div>

      <div className="flex-1 flex flex-col min-w-0">
        {/* Top Header */}
        <header className="h-16 border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 flex items-center justify-between px-4 sticky top-0 z-10">
          <div className="flex items-center gap-4">
            {/* Mobile Sidebar */}
            <Sheet>
              <SheetTrigger render={<Button variant="ghost" size="icon" className="md:hidden" />}>
                <Menu className="w-5 h-5" />
                <span className="sr-only">Toggle navigation menu</span>
              </SheetTrigger>
              <SheetContent side="left" className="p-0 w-72">
                <SheetTitle className="sr-only">Navigation Menu</SheetTitle>
                <SidebarContent />
              </SheetContent>
            </Sheet>
            
            <div className="hidden md:flex items-center gap-2">
              <span className="font-semibold text-lg">Texas Premium Breeders</span>
              <ShieldCheck className="w-5 h-5 text-blue-500" />
            </div>
          </div>
          
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon" className="relative rounded-full">
              <Bell className="w-5 h-5" />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full"></span>
            </Button>
            <ThemeToggle />
            <div className="w-9 h-9 rounded-full bg-primary/20 flex items-center justify-center text-primary font-bold">
              TP
            </div>
          </div>
        </header>

        {/* Main Content Area */}
        <main className="flex-1 p-4 md:p-8 overflow-y-auto">
          {children}
        </main>
      </div>
    </div>
  )
}
