import Image from "next/image"
import Link from "next/link"
import { Search, MapPin, SlidersHorizontal } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import prisma from "@/lib/prisma"

export const dynamic = "force-dynamic"

export default async function BrowsePage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}) {
  const resolvedParams = await searchParams
  const searchCategory = resolvedParams.category as string | undefined

  // Build the Prisma where clause based on filters
  const whereClause: any = {}
  
  if (searchCategory) {
    if (searchCategory === 'dogs') whereClause.species = 'Dog'
    if (searchCategory === 'cats') whereClause.species = 'Cat'
    if (searchCategory === 'fish') whereClause.species = 'Fish'
    if (searchCategory === 'small-pets') whereClause.species = 'Small Pet'
  }

  // Fetch pets from Supabase database
  const pets = await prisma.pet.findMany({
    where: whereClause,
    include: {
      breeder: true,
    },
    orderBy: {
      createdAt: 'desc',
    }
  })

  return (
    <div className="min-h-screen bg-muted/20">
      <div className="container mx-auto px-4 md:px-6 py-12 flex flex-col md:flex-row gap-8">
        
        {/* Sidebar Filters */}
        <aside className="w-full md:w-64 shrink-0 space-y-8">
          <div>
            <h3 className="font-semibold text-lg flex items-center gap-2 mb-4">
              <SlidersHorizontal className="w-4 h-4" /> Filters
            </h3>
            
            {/* Search Input */}
            <div className="relative mb-6">
              <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input placeholder="Search breeds..." className="pl-9 bg-background" />
            </div>
            
            <div className="space-y-4">
              <h4 className="font-medium text-sm text-muted-foreground">Category</h4>
              <div className="space-y-3">
                <div className="flex items-center space-x-2">
                  <Checkbox id="dogs" defaultChecked={searchCategory === 'dogs'} />
                  <Label htmlFor="dogs" className="font-normal">Dogs</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox id="cats" defaultChecked={searchCategory === 'cats'} />
                  <Label htmlFor="cats" className="font-normal">Cats</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox id="birds" defaultChecked={searchCategory === 'birds'} />
                  <Label htmlFor="birds" className="font-normal">Birds</Label>
                </div>
              </div>
            </div>

            <div className="space-y-4 pt-4 border-t">
              <h4 className="font-medium text-sm text-muted-foreground">Location</h4>
              <div className="space-y-3">
                <div className="flex items-center space-x-2">
                  <Checkbox id="texas" defaultChecked />
                  <Label htmlFor="texas" className="font-normal">Texas Only</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox id="nationwide" />
                  <Label htmlFor="nationwide" className="font-normal">Nationwide</Label>
                </div>
              </div>
            </div>
          </div>
        </aside>

        {/* Main Grid */}
        <main className="flex-1">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-3xl font-bold tracking-tight">Available Companions</h1>
            <span className="text-muted-foreground text-sm">{pets.length} results found</span>
          </div>

          {pets.length === 0 ? (
            <div className="text-center py-24 bg-background rounded-2xl border border-dashed">
              <h3 className="text-xl font-bold mb-2">No pets found</h3>
              <p className="text-muted-foreground">Try adjusting your filters or search terms.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {pets.map((pet) => (
                <div key={pet.id} className="group bg-background rounded-2xl border overflow-hidden shadow-sm hover:shadow-md transition-all">
                  <div className="relative h-56 w-full overflow-hidden bg-muted">
                    {pet.mediaGallery[0] ? (
                      <Image
                        src={pet.mediaGallery[0]}
                        alt={pet.name}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                    ) : (
                      <div className="absolute inset-0 flex items-center justify-center text-muted-foreground">
                        No image
                      </div>
                    )}
                  </div>
                  
                  <div className="p-5">
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <h3 className="font-bold text-lg">{pet.name}</h3>
                        <p className="text-sm text-muted-foreground">{pet.breed}</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-4 text-sm text-muted-foreground mt-4 mb-6">
                      <span className="bg-muted px-2 py-1 rounded-md">{pet.ageMonths} Months</span>
                      <div className="flex items-center gap-1">
                        <MapPin className="w-4 h-4" />
                        Texas
                      </div>
                    </div>

                    <Button className="w-full rounded-full" render={<Link href={`/browse/${pet.id}`} />}>
                      Meet {pet.name}
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </main>
      </div>
    </div>
  )
}
