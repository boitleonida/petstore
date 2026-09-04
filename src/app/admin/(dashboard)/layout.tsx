"use client"

import * as React from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { 
  LayoutDashboard, 
  Users, 
  PawPrint, 
  LogOut,
  Menu,
  ShieldCheck
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { logoutAction } from "@/app/admin/actions"

const sidebarLinks = [
  { name: "Overview", href: "/admin", icon: LayoutDashboard },
  { name: "Users", href: "/admin/users", icon: Users },
  { name: "Pets", href: "/admin/pets", icon: PawPrint },
  { name: "Breeder Apps", href: "/admin/breeder-apps", icon: ShieldCheck },
]

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()

  const SidebarContent = () => (
    <div className="flex flex-col h-full bg-card border-r">
      <div className="p-6 border-b">
        <Link href="/" className="flex items-center gap-2 font-bold text-xl tracking-tight text-primary">
          <PawPrint className="w-6 h-6" />
          <span>Admin Hub</span>
        </Link>
      </div>
      <nav className="flex-1 p-4 space-y-2">
        {sidebarLinks.map((link) => {
          const isActive = pathname === link.href
          return (
            <Link
              key={link.name}
              href={link.href}
              className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                isActive 
                  ? "bg-primary text-primary-foreground font-medium" 
                  : "text-muted-foreground hover:bg-muted hover:text-foreground"
              }`}
            >
              <link.icon className="w-5 h-5" />
              {link.name}
            </Link>
          )
        })}
      </nav>
      <div className="p-4 border-t">
        <form action={logoutAction}>
          <Button variant="ghost" className="w-full justify-start text-muted-foreground hover:text-destructive" type="submit">
            <LogOut className="w-5 h-5 mr-3" />
            Log Out
          </Button>
        </form>
      </div>
    </div>
  )

  return (
    <div className="min-h-screen bg-muted/20 flex">
      {/* Desktop Sidebar */}
      <aside className="hidden md:block w-64 fixed inset-y-0 z-10">
        <SidebarContent />
      </aside>

      <div className="flex-1 md:ml-64 flex flex-col min-h-screen">
        {/* Mobile Header */}
        <header className="md:hidden sticky top-0 z-20 bg-background border-b h-16 flex items-center px-4">
          <Sheet>
            <SheetTrigger render={
              <Button variant="ghost" size="icon" className="mr-2">
                <Menu className="w-5 h-5" />
                <span className="sr-only">Toggle menu</span>
              </Button>
            } />
            <SheetContent side="left" className="p-0 w-64">
              <SidebarContent />
            </SheetContent>
          </Sheet>
          <span className="font-bold text-lg">Admin Hub</span>
        </header>

        {/* Main Content Area */}
        <main className="flex-1 p-4 md:p-8">
          {children}
        </main>
      </div>
    </div>
  )
}
