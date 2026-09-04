"use client"

import { useState, useTransition, useEffect } from "react"
import { useRouter, useSearchParams, usePathname } from "next/navigation"
import { Search, SlidersHorizontal, RotateCcw, X } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"

export function BrowseFilters() {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const [isPending, startTransition] = useTransition()

  // Read current filter state from URL search params
  const currentQ = searchParams.get("q") || searchParams.get("search") || ""
  const currentCategories = searchParams.get("category")
    ? searchParams.get("category")!.split(",").map(c => c.trim()).filter(Boolean)
    : []
  const currentLocation = searchParams.get("location") || ""
  const currentSort = searchParams.get("sort") || "newest"

  const [searchTerm, setSearchTerm] = useState(currentQ)

  // Sync internal search input state if URL param changes externally
  useEffect(() => {
    setSearchTerm(currentQ)
  }, [currentQ])

  // Helper to update query params cleanly
  function updateParams(newParams: Record<string, string | null>) {
    const params = new URLSearchParams(searchParams.toString())

    for (const [key, value] of Object.entries(newParams)) {
      if (value === null || value === "" || value === undefined) {
        params.delete(key)
      } else {
        params.set(key, value)
      }
    }

    startTransition(() => {
      router.push(`${pathname}?${params.toString()}`, { scroll: false })
    })
  }

  function handleSearchSubmit(e: React.FormEvent) {
    e.preventDefault()
    updateParams({ q: searchTerm.trim() || null })
  }

  function toggleCategory(cat: string) {
    let nextCats: string[]
    if (currentCategories.includes(cat)) {
      nextCats = currentCategories.filter(c => c !== cat)
    } else {
      nextCats = [...currentCategories, cat]
    }
    updateParams({ category: nextCats.length > 0 ? nextCats.join(",") : null })
  }

  function handleLocationToggle(loc: string) {
    if (currentLocation === loc) {
      updateParams({ location: null })
    } else {
      updateParams({ location: loc })
    }
  }

  function handleSortChange(sort: string) {
    updateParams({ sort: sort === "newest" ? null : sort })
  }

  function handleReset() {
    setSearchTerm("")
    startTransition(() => {
      router.push(pathname, { scroll: false })
    })
  }

  const hasActiveFilters = Boolean(
    currentQ || currentCategories.length > 0 || currentLocation || (currentSort && currentSort !== "newest")
  )

  return (
    <aside className="w-full md:w-64 shrink-0 space-y-6">
      <div className="bg-background rounded-2xl border p-5 shadow-sm space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b">
          <h3 className="font-semibold text-lg flex items-center gap-2">
            <SlidersHorizontal className="w-4 h-4 text-primary" /> Filters
          </h3>
          {hasActiveFilters && (
            <Button
              variant="ghost"
              size="sm"
              onClick={handleReset}
              className="h-8 px-2 text-xs text-muted-foreground hover:text-foreground"
            >
              <RotateCcw className="w-3.5 h-3.5 mr-1" /> Reset
            </Button>
          )}
        </div>

        {/* Search Input */}
        <form onSubmit={handleSearchSubmit} className="space-y-2">
          <Label htmlFor="search-input" className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
            Search
          </Label>
          <div className="relative">
            <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              id="search-input"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Breed, name, traits..."
              className="pl-9 pr-8 bg-muted/40 rounded-xl"
            />
            {searchTerm && (
              <button
                type="button"
                onClick={() => {
                  setSearchTerm("")
                  updateParams({ q: null })
                }}
                className="absolute right-2.5 top-2.5 text-muted-foreground hover:text-foreground"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>
          <Button type="submit" size="sm" variant="secondary" className="w-full rounded-xl text-xs">
            Apply Search
          </Button>
        </form>

        {/* Categories */}
        <div className="space-y-3 pt-3 border-t">
          <Label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
            Species
          </Label>
          <div className="space-y-2.5">
            {[
              { id: "dogs", label: "Dogs & Puppies", icon: "🐶" },
              { id: "cats", label: "Cats & Kittens", icon: "🐱" },
              { id: "birds", label: "Birds & Parrots", icon: "🦜" }
            ].map((cat) => {
              const isChecked = currentCategories.includes(cat.id)
              return (
                <div
                  key={cat.id}
                  onClick={() => toggleCategory(cat.id)}
                  className={`flex items-center justify-between p-2 rounded-xl cursor-pointer transition-colors ${
                    isChecked ? "bg-primary/10 text-primary font-medium" : "hover:bg-muted/50"
                  }`}
                >
                  <div className="flex items-center space-x-2.5">
                    <Checkbox
                      id={`category-${cat.id}`}
                      checked={isChecked}
                      onCheckedChange={() => toggleCategory(cat.id)}
                    />
                    <Label htmlFor={`category-${cat.id}`} className="cursor-pointer font-normal">
                      <span className="mr-1.5">{cat.icon}</span>
                      {cat.label}
                    </Label>
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        {/* Location Filter */}
        <div className="space-y-3 pt-3 border-t">
          <Label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
            Location
          </Label>
          <div className="space-y-2.5">
            <div
              onClick={() => handleLocationToggle("texas")}
              className={`flex items-center justify-between p-2 rounded-xl cursor-pointer transition-colors ${
                currentLocation === "texas" ? "bg-primary/10 text-primary font-medium" : "hover:bg-muted/50"
              }`}
            >
              <div className="flex items-center space-x-2.5">
                <Checkbox
                  id="loc-texas"
                  checked={currentLocation === "texas"}
                  onCheckedChange={() => handleLocationToggle("texas")}
                />
                <Label htmlFor="loc-texas" className="cursor-pointer font-normal">
                  Local Pickup Only
                </Label>
              </div>
            </div>
            <div
              onClick={() => updateParams({ location: null })}
              className={`flex items-center justify-between p-2 rounded-xl cursor-pointer transition-colors ${
                !currentLocation ? "bg-primary/10 text-primary font-medium" : "hover:bg-muted/50"
              }`}
            >
              <div className="flex items-center space-x-2.5">
                <Checkbox
                  id="loc-all"
                  checked={!currentLocation}
                  onCheckedChange={() => updateParams({ location: null })}
                />
                <Label htmlFor="loc-all" className="cursor-pointer font-normal">
                  Nationwide / Shipping
                </Label>
              </div>
            </div>
          </div>
        </div>

        {/* Sort By */}
        <div className="space-y-2 pt-3 border-t">
          <Label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
            Sort By
          </Label>
          <select
            value={currentSort}
            onChange={(e) => handleSortChange(e.target.value)}
            className="w-full bg-muted/40 border border-input rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
          >
            <option value="newest">Newest Listed</option>
            <option value="price_asc">Price: Low to High</option>
            <option value="price_desc">Price: High to Low</option>
            <option value="age_asc">Youngest First</option>
          </select>
        </div>
      </div>
    </aside>
  )
}
