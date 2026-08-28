import Image from "next/image"
import Link from "next/link"
import { notFound } from "next/navigation"
import { ArrowLeft, CheckCircle2 } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent } from "@/components/ui/card"
import prisma from "@/lib/prisma"
import { submitApplication } from "./actions"

export const dynamic = "force-dynamic"

export default async function ApplyPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const resolvedParams = await params
  
  const pet = await prisma.pet.findUnique({
    where: { id: resolvedParams.id },
    include: {
      breeder: true,
    }
  })

  if (!pet) {
    notFound()
  }

  return (
    <div className="min-h-screen bg-muted/20 pb-24">
      {/* Header */}
      <div className="bg-background border-b sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Link href={`/browse/${pet.id}`} className="inline-flex items-center text-sm font-medium text-muted-foreground hover:text-primary transition-colors">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to {pet.name}
          </Link>
          <div className="text-sm font-medium">
            Step 1 of 2: Application
          </div>
        </div>
      </div>

      <main className="container mx-auto px-4 py-12 max-w-3xl">
        <div className="text-center mb-10">
          <h1 className="text-4xl font-bold tracking-tight mb-4">Adoption Application</h1>
          <p className="text-lg text-muted-foreground">
            You are applying to adopt <strong>{pet.name}</strong> from {pet.breeder.firstName} {pet.breeder.lastName}.
          </p>
        </div>

        <form action={submitApplication} className="space-y-8">
          <input type="hidden" name="petId" value={pet.id} />
          
          <Card className="rounded-3xl border shadow-sm">
            <CardContent className="p-8 space-y-6">
              <h2 className="text-2xl font-bold border-b pb-4">Personal Information</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="firstName">First Name</Label>
                  <Input id="firstName" name="firstName" required placeholder="John" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="lastName">Last Name</Label>
                  <Input id="lastName" name="lastName" required placeholder="Doe" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email Address</Label>
                  <Input id="email" name="email" type="email" required placeholder="john@example.com" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone Number</Label>
                  <Input id="phone" name="phone" type="tel" required placeholder="(555) 123-4567" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="rounded-3xl border shadow-sm">
            <CardContent className="p-8 space-y-6">
              <h2 className="text-2xl font-bold border-b pb-4">Housing & Lifestyle</h2>
              
              <div className="space-y-6">
                <div className="space-y-2">
                  <Label>Do you rent or own your home?</Label>
                  <div className="flex gap-4 mt-2">
                    <label className="flex items-center gap-2 border rounded-xl p-4 cursor-pointer hover:bg-muted/50 transition-colors flex-1">
                      <input type="radio" name="housing" value="own" className="w-4 h-4" defaultChecked />
                      <span>Own</span>
                    </label>
                    <label className="flex items-center gap-2 border rounded-xl p-4 cursor-pointer hover:bg-muted/50 transition-colors flex-1">
                      <input type="radio" name="housing" value="rent" className="w-4 h-4" />
                      <span>Rent</span>
                    </label>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>Do you have a fenced yard?</Label>
                  <div className="flex gap-4 mt-2">
                    <label className="flex items-center gap-2 border rounded-xl p-4 cursor-pointer hover:bg-muted/50 transition-colors flex-1">
                      <input type="radio" name="yard" value="yes" className="w-4 h-4" defaultChecked />
                      <span>Yes</span>
                    </label>
                    <label className="flex items-center gap-2 border rounded-xl p-4 cursor-pointer hover:bg-muted/50 transition-colors flex-1">
                      <input type="radio" name="yard" value="no" className="w-4 h-4" />
                      <span>No</span>
                    </label>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="experience">Please describe your experience with pets (especially {pet.breed}s)</Label>
                  <textarea 
                    id="experience" 
                    name="experience" 
                    className="flex min-h-[120px] w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50" 
                    required 
                    placeholder="Tell the breeder about your previous pets..."
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="rounded-3xl border shadow-sm">
            <CardContent className="p-8 space-y-6">
              <h2 className="text-2xl font-bold border-b pb-4">Transport Preferences</h2>
              
              <div className="space-y-4">
                <label className="flex items-start gap-4 border rounded-xl p-4 cursor-pointer hover:bg-muted/50 transition-colors">
                  <input type="radio" name="transport" value="pickup" className="w-4 h-4 mt-1" defaultChecked />
                  <div>
                    <div className="font-bold flex items-center gap-2">Local Pickup <CheckCircle2 className="w-4 h-4 text-green-500" /></div>
                    <div className="text-sm text-muted-foreground">I will travel to the breeder's location in Texas to pick up {pet.name}.</div>
                  </div>
                </label>

                {!pet.isLocalOnly && (
                  <label className="flex items-start gap-4 border rounded-xl p-4 cursor-pointer hover:bg-muted/50 transition-colors">
                    <input type="radio" name="transport" value="nanny" className="w-4 h-4 mt-1" />
                    <div>
                      <div className="font-bold">Flight Nanny / Ground Transport</div>
                      <div className="text-sm text-muted-foreground">I need Texas Pet Hub to arrange secure transport to my location (additional fees apply).</div>
                    </div>
                  </label>
                )}
              </div>
            </CardContent>
          </Card>

          <div className="pt-6">
            <Button type="submit" size="lg" className="w-full h-14 text-lg rounded-full">
              Submit Application
            </Button>
            <p className="text-center text-sm text-muted-foreground mt-4">
              By submitting this application, you agree to Texas Pet Hub's Terms of Service.
              No payment is required until your application is approved.
            </p>
          </div>

        </form>
      </main>
    </div>
  )
}
