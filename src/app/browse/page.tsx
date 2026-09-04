import Image from "next/image"
import Link from "next/link"
import { MapPin, Sparkles, Tag } from "lucide-react"

import { Button } from "@/components/ui/button"
import prisma from "@/lib/prisma"
import { BrowseFilters } from "@/components/browse/browse-filters"

export const dynamic = "force-dynamic"

export default async function BrowsePage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}) {
  const resolvedParams = await searchParams
  const categoryParam = resolvedParams.category
  const queryParam = (resolvedParams.q || resolvedParams.search) as string | undefined
  const locationParam = resolvedParams.location as string | undefined
  const sortParam = resolvedParams.sort as string | undefined

  // Parse categories into an array
  let selectedCategories: string[] = []
  if (Array.isArray(categoryParam)) {
    selectedCategories = categoryParam
  } else if (typeof categoryParam === "string") {
    selectedCategories = categoryParam.split(",").map((c) => c.trim().toLowerCase()).filter(Boolean)
  }

  // Build the Prisma where clause based on filters
  const whereClause: any = {}

  if (selectedCategories.length > 0) {
    const speciesList: string[] = []
    if (selectedCategories.includes("dogs") || selectedCategories.includes("dog")) speciesList.push("Dog")
    if (selectedCategories.includes("cats") || selectedCategories.includes("cat")) speciesList.push("Cat")
    if (selectedCategories.includes("birds") || selectedCategories.includes("bird")) speciesList.push("Bird")
    if (selectedCategories.includes("fish")) speciesList.push("Fish")
    if (selectedCategories.includes("small-pets")) speciesList.push("Small Pet")

    if (speciesList.length > 0) {
      whereClause.species = { in: speciesList }
    }
  }

  if (queryParam && queryParam.trim()) {
    const term = queryParam.trim()
    whereClause.OR = [
      { name: { contains: term, mode: "insensitive" } },
      { breed: { contains: term, mode: "insensitive" } },
      { temperament: { contains: term, mode: "insensitive" } },
      { description: { contains: term, mode: "insensitive" } },
    ]
  }

  if (locationParam === "texas") {
    whereClause.isLocalOnly = true
  }

  // Sorting
  let orderBy: any = { createdAt: "desc" }
  if (sortParam === "price_asc") {
    orderBy = { price: "asc" }
  } else if (sortParam === "price_desc") {
    orderBy = { price: "desc" }
  } else if (sortParam === "age_asc") {
    orderBy = { ageMonths: "asc" }
  }

  // Fetch pets from database
  const pets = await prisma.pet.findMany({
    where: whereClause,
    include: {
      breeder: true,
    },
    orderBy,
  })

  // Quick category helper URLs
  function getCategoryHref(catSlug: string | null) {
    const params = new URLSearchParams()
    if (queryParam) params.set("q", queryParam)
    if (locationParam) params.set("location", locationParam)
    if (sortParam && sortParam !== "newest") params.set("sort", sortParam)
    if (catSlug) params.set("category", catSlug)
    const qs = params.toString()
    return `/browse${qs ? `?${qs}` : ""}`
  }

  const isAllSelected = selectedCategories.length === 0

  return (
    <div className="min-h-screen bg-muted/20">
      <div className="container mx-auto px-4 md:px-6 py-10 flex flex-col md:flex-row gap-8">
        
        {/* Interactive Sidebar Filters */}
        <BrowseFilters />

        {/* Main Grid */}
        <main className="flex-1">
          {/* Header & Quick Category Tabs */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
            <div>
              <h1 className="text-3xl font-bold tracking-tight">Available Companions</h1>
              <p className="text-sm text-muted-foreground mt-1">
                Showing <span className="font-semibold text-foreground">{pets.length}</span> {pets.length === 1 ? "pet" : "pets"} matching your criteria
              </p>
            </div>

            {/* Quick Filter Pills */}
            <div className="flex flex-wrap items-center gap-2">
              <Link
                href={getCategoryHref(null)}
                className={`px-3.5 py-1.5 rounded-full text-xs font-medium transition-all ${
                  isAllSelected
                    ? "bg-primary text-primary-foreground shadow-sm"
                    : "bg-background border hover:bg-muted text-muted-foreground hover:text-foreground"
                }`}
              >
                All Pets
              </Link>
              <Link
                href={getCategoryHref("dogs")}
                className={`px-3.5 py-1.5 rounded-full text-xs font-medium transition-all ${
                  selectedCategories.includes("dogs")
                    ? "bg-primary text-primary-foreground shadow-sm"
                    : "bg-background border hover:bg-muted text-muted-foreground hover:text-foreground"
                }`}
              >
                🐶 Dogs
              </Link>
              <Link
                href={getCategoryHref("cats")}
                className={`px-3.5 py-1.5 rounded-full text-xs font-medium transition-all ${
                  selectedCategories.includes("cats")
                    ? "bg-primary text-primary-foreground shadow-sm"
                    : "bg-background border hover:bg-muted text-muted-foreground hover:text-foreground"
                }`}
              >
                🐱 Cats
              </Link>
              <Link
                href={getCategoryHref("birds")}
                className={`px-3.5 py-1.5 rounded-full text-xs font-medium transition-all ${
                  selectedCategories.includes("birds")
                    ? "bg-primary text-primary-foreground shadow-sm"
                    : "bg-background border hover:bg-muted text-muted-foreground hover:text-foreground"
                }`}
              >
                🦜 Birds
              </Link>
            </div>
          </div>

          {/* Active Filter Badges */}
          {(selectedCategories.length > 0 || queryParam || locationParam) && (
            <div className="flex flex-wrap items-center gap-2 mb-6 p-3 bg-background rounded-xl border text-xs">
              <span className="font-medium text-muted-foreground">Active Filters:</span>
              {selectedCategories.map((c) => (
                <span
                  key={c}
                  className="bg-primary/10 text-primary px-2.5 py-1 rounded-full font-medium capitalize"
                >
                  {c}
                </span>
              ))}
              {queryParam && (
                <span className="bg-muted px-2.5 py-1 rounded-full">
                  Search: &ldquo;{queryParam}&rdquo;
                </span>
              )}
              {locationParam && (
                <span className="bg-muted px-2.5 py-1 rounded-full">
                  Location: {locationParam === "texas" ? "Local Pickup Only" : locationParam}
                </span>
              )}
              <Link
                href="/browse"
                className="ml-auto text-primary hover:underline font-medium text-xs"
              >
                Clear all
              </Link>
            </div>
          )}

          {/* Pets Grid */}
          {pets.length === 0 ? (
            <div className="text-center py-20 bg-background rounded-2xl border border-dashed p-8">
              <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center mx-auto mb-4 text-2xl">
                🔍
              </div>
              <h3 className="text-xl font-bold mb-2">No companions found</h3>
              <p className="text-muted-foreground max-w-md mx-auto mb-6 text-sm">
                We couldn&apos;t find any pets matching your current filters. Try loosening your search criteria or reset filters.
              </p>
              <Button variant="outline" className="rounded-full" render={<Link href="/browse">Reset All Filters</Link>} />
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {pets.map((pet) => (
                <div
                  key={pet.id}
                  className="group bg-background rounded-2xl border overflow-hidden shadow-sm hover:shadow-lg transition-all flex flex-col"
                >
                  {/* Image Container */}
                  <div className="relative h-60 w-full overflow-hidden bg-muted">
                    {pet.mediaGallery && pet.mediaGallery[0] ? (
                      <Image
                        src={pet.mediaGallery[0]}
                        alt={pet.name}
                        fill
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                    ) : (
                      <div className="absolute inset-0 flex items-center justify-center text-muted-foreground">
                        No image
                      </div>
                    )}
                    
                    {/* Price Tag Overlay */}
                    {pet.price > 0 ? (
                      <div className="absolute top-3 right-3 bg-background/90 backdrop-blur-md px-3 py-1 rounded-full text-xs font-bold text-foreground shadow-sm flex items-center gap-1">
                        <Tag className="w-3 h-3 text-primary" />
                        ${pet.price.toLocaleString()}
                      </div>
                    ) : (
                      <div className="absolute top-3 right-3 bg-emerald-500/90 backdrop-blur-md px-3 py-1 rounded-full text-xs font-bold text-white shadow-sm">
                        Adoption
                      </div>
                    )}

                    {/* Species Badge */}
                    <div className="absolute top-3 left-3 bg-black/60 backdrop-blur-md px-2.5 py-1 rounded-full text-[11px] font-medium text-white shadow-sm">
                      {pet.species === "Dog" ? "🐶 Dog" : pet.species === "Cat" ? "🐱 Cat" : pet.species === "Bird" ? "🦜 Bird" : pet.species}
                    </div>
                  </div>

                  {/* Card Content */}
                  <div className="p-5 flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex justify-between items-start mb-1">
                        <div>
                          <h3 className="font-bold text-lg group-hover:text-primary transition-colors line-clamp-1">
                            {pet.name}
                          </h3>
                          <p className="text-sm text-muted-foreground font-medium">{pet.breed}</p>
                        </div>
                      </div>

                      {/* Badges / Traits */}
                      <div className="flex flex-wrap gap-1.5 my-3">
                        <span className="bg-muted text-muted-foreground text-xs px-2.5 py-0.5 rounded-md font-medium">
                          {pet.ageMonths < 12 ? `${pet.ageMonths} mo` : `${Math.floor(pet.ageMonths / 12)} yr`}
                        </span>
                        {pet.healthBadges && pet.healthBadges.slice(0, 2).map((badge, idx) => (
                          <span
                            key={idx}
                            className="bg-primary/5 text-primary text-xs px-2 py-0.5 rounded-md font-medium flex items-center gap-1"
                          >
                            <Sparkles className="w-2.5 h-2.5" />
                            {badge}
                          </span>
                        ))}
                      </div>

                      {/* Description Preview */}
                      <p className="text-xs text-muted-foreground line-clamp-2 mb-4">
                        {pet.description}
                      </p>
                    </div>

                    <div className="pt-2 border-t mt-auto">
                      <div className="flex items-center justify-between text-xs text-muted-foreground mb-3">
                        <div className="flex items-center gap-1">
                          <MapPin className="w-3.5 h-3.5" />
                          <span>{pet.isLocalOnly ? "Texas (Local)" : "Available Nationwide"}</span>
                        </div>
                      </div>

                      <Button className="w-full rounded-full font-medium" render={<Link href={`/browse/${pet.id}`}>Meet {pet.name}</Link>} />
                    </div>
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
