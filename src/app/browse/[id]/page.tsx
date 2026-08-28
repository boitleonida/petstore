import Image from "next/image"
import Link from "next/link"
import { notFound } from "next/navigation"
import { ArrowLeft, CheckCircle2, ShieldCheck, MapPin, Heart, Truck, Info, Phone, CalendarCheck } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import prisma from "@/lib/prisma"

export const dynamic = "force-dynamic"

export default async function PetProfilePage({
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

  // Parse temperament string to array for badges
  const temperaments = pet.temperament.split(',').map(t => t.trim())

  return (
    <div className="min-h-screen bg-muted/20 pb-24">
      {/* Back Navigation */}
      <div className="container mx-auto px-4 md:px-6 py-6">
        <Link href="/browse" className="inline-flex items-center text-sm font-medium text-muted-foreground hover:text-primary transition-colors">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Browse
        </Link>
      </div>

      <main className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          
          {/* Left Column: Image Gallery & Details */}
          <div className="lg:col-span-2 space-y-8">
            
            {/* Image Gallery */}
            <div className="space-y-4">
              <div className="relative h-[400px] md:h-[500px] w-full rounded-3xl overflow-hidden bg-muted border">
                {pet.mediaGallery[0] ? (
                  <Image
                    src={pet.mediaGallery[0]}
                    alt={pet.name}
                    fill
                    className="object-cover"
                    priority
                  />
                ) : (
                  <div className="absolute inset-0 flex items-center justify-center text-muted-foreground">
                    No image available
                  </div>
                )}
              </div>
              
              {pet.mediaGallery.length > 1 && (
                <div className="grid grid-cols-4 gap-4">
                  {pet.mediaGallery.slice(1, 5).map((img, idx) => (
                    <div key={idx} className="relative h-24 md:h-32 rounded-xl overflow-hidden bg-muted border cursor-pointer hover:opacity-80 transition-opacity">
                      <Image
                        src={img}
                        alt={`${pet.name} photo ${idx + 2}`}
                        fill
                        className="object-cover"
                      />
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Title & Description */}
            <div className="bg-background rounded-3xl p-8 border shadow-sm space-y-6">
              <div>
                <div className="flex justify-between items-start mb-2">
                  <h1 className="text-4xl font-bold tracking-tight">{pet.name}</h1>
                  <span className="text-3xl font-bold text-primary">${pet.price.toLocaleString()}</span>
                </div>
                <p className="text-lg text-muted-foreground font-medium">{pet.breed} • {pet.ageMonths} Months Old</p>
              </div>

              <div className="flex flex-wrap gap-2">
                <Badge variant="secondary" className="px-3 py-1 text-sm bg-blue-50 text-blue-700 hover:bg-blue-100 dark:bg-blue-900/30 dark:text-blue-400">
                  <MapPin className="w-3 h-3 mr-1" /> Texas
                </Badge>
                {temperaments.map((temp) => (
                  <Badge key={temp} variant="outline" className="px-3 py-1 text-sm">
                    {temp}
                  </Badge>
                ))}
              </div>

              <div className="pt-6 border-t space-y-4">
                <h3 className="text-xl font-bold">About {pet.name}</h3>
                <p className="text-muted-foreground leading-relaxed">
                  {pet.description}
                </p>
              </div>
              
              <div className="pt-6 border-t space-y-4">
                <h3 className="text-xl font-bold flex items-center gap-2">
                  <ShieldCheck className="w-5 h-5 text-green-500" /> Health & Guarantees
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {pet.healthBadges.map((badge) => (
                    <div key={badge} className="flex items-center gap-3 bg-muted/50 p-3 rounded-xl border">
                      <CheckCircle2 className="w-5 h-5 text-primary" />
                      <span className="font-medium text-sm">{badge}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Sticky CTA & Breeder Info */}
          <div className="space-y-6">
            
            {/* Action Card */}
            <Card className="sticky top-24 border shadow-md overflow-hidden rounded-3xl">
              <div className="bg-primary/10 p-6 text-center border-b">
                <h3 className="font-bold text-xl mb-1">Ready to bring {pet.name} home?</h3>
                <p className="text-sm text-muted-foreground">Applications are reviewed within 24 hours.</p>
              </div>
              <CardContent className="p-6 space-y-6">
                
                <div className="space-y-4">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground flex items-center gap-2">
                      <Truck className="w-4 h-4" /> Transport
                    </span>
                    <span className="font-medium">{pet.isLocalOnly ? 'Local Pickup Only' : 'Nationwide Available'}</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground flex items-center gap-2">
                      <CalendarCheck className="w-4 h-4" /> Go Home Date
                    </span>
                    <span className="font-medium text-green-600 dark:text-green-400">Ready Now</span>
                  </div>
                </div>

                <Button size="lg" className="w-full rounded-full text-base h-14" render={<Link href={`/browse/${pet.id}/apply`} />}>
                  <Heart className="w-5 h-5 mr-2" /> Apply for Adoption
                </Button>
                
                <p className="text-xs text-center text-muted-foreground flex items-center justify-center gap-1 mt-4">
                  <Info className="w-3 h-3" /> Secure payment via Texas Pet Hub Escrow
                </p>
              </CardContent>
            </Card>

            {/* Breeder Info */}
            <Card className="border shadow-sm rounded-3xl">
              <CardContent className="p-6">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center text-primary font-bold text-xl">
                    {pet.breeder.firstName?.[0]}{pet.breeder.lastName?.[0]}
                  </div>
                  <div>
                    <h4 className="font-bold flex items-center gap-1">
                      {pet.breeder.firstName} {pet.breeder.lastName}
                      <ShieldCheck className="w-4 h-4 text-blue-500" />
                    </h4>
                    <p className="text-xs text-muted-foreground">Verified Premium Breeder</p>
                  </div>
                </div>
                <div className="space-y-3 pt-4 border-t">
                  <div className="flex items-center gap-3 text-sm text-muted-foreground">
                    <CheckCircle2 className="w-4 h-4 text-green-500" /> Identity Verified
                  </div>
                  <div className="flex items-center gap-3 text-sm text-muted-foreground">
                    <CheckCircle2 className="w-4 h-4 text-green-500" /> Facility Inspected
                  </div>
                </div>
                <Button variant="outline" className="w-full mt-6 rounded-full" render={<Link href={`/breeders/${pet.breeder.id}`} />}>
                  View Breeder Profile
                </Button>
              </CardContent>
            </Card>

          </div>

        </div>
      </main>
    </div>
  )
}
