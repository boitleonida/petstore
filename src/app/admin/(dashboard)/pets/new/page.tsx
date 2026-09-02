import Link from "next/link"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button, buttonVariants } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Checkbox } from "@/components/ui/checkbox"
import { addPetAction } from "./actions"
import prisma from "@/lib/prisma"

export const dynamic = "force-dynamic"

export default async function AddPetPage() {
  // Fetch breeders to assign the pet to
  const breeders = await prisma.user.findMany({
    where: { role: 'BREEDER' }
  })

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Add New Pet</h1>
        <p className="text-muted-foreground mt-1">
          Create a new pet listing on the platform.
        </p>
      </div>

      <form action={addPetAction} className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Basic Details</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="name">Pet Name</Label>
                <Input id="name" name="name" required placeholder="Luna" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="species">Species</Label>
                <select id="species" name="species" className="flex h-9 w-full items-center justify-between whitespace-nowrap rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-ring disabled:cursor-not-allowed disabled:opacity-50" required>
                  <option value="Dog">Dog</option>
                  <option value="Cat">Cat</option>
                  <option value="Bird">Bird</option>
                  <option value="Reptile">Reptile</option>
                  <option value="Small Pet">Small Pet</option>
                </select>
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="breed">Breed</Label>
                <Input id="breed" name="breed" required placeholder="Golden Retriever" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="price">Price ($)</Label>
                <Input id="price" name="price" type="number" required placeholder="1500" />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="ageMonths">Age (Months)</Label>
                <Input id="ageMonths" name="ageMonths" type="number" required placeholder="3" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="weightLbs">Weight (Lbs)</Label>
                <Input id="weightLbs" name="weightLbs" type="number" required placeholder="15" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Description & Temperament</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="temperament">Temperament</Label>
              <Input id="temperament" name="temperament" required placeholder="Friendly, Intelligent, Active" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="description">Full Description</Label>
              <Textarea id="description" name="description" required placeholder="Tell the story of this wonderful pet..." rows={5} />
            </div>
            <div className="space-y-2 pt-4">
              <Label htmlFor="breederId">Assign to Breeder</Label>
              <select id="breederId" name="breederId" className="flex h-9 w-full items-center justify-between whitespace-nowrap rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-ring disabled:cursor-not-allowed disabled:opacity-50" required>
                {breeders.map(b => (
                  <option key={b.id} value={b.id}>{b.firstName} {b.lastName} ({b.email})</option>
                ))}
              </select>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Media & Options</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="photoUrl">Photo URL (Primary)</Label>
              <Input id="photoUrl" name="photoUrl" required placeholder="https://images.unsplash.com/..." />
              <p className="text-xs text-muted-foreground">For now, paste a direct URL to an image.</p>
            </div>
            <div className="flex items-center space-x-2 pt-4">
              <Checkbox id="isLocalOnly" name="isLocalOnly" value="true" />
              <Label htmlFor="isLocalOnly" className="font-normal cursor-pointer">
                Local pickup only (Disable flight nanny transport)
              </Label>
            </div>
          </CardContent>
        </Card>

        <div className="flex justify-end gap-4">
          <Link href="/admin/pets" className={buttonVariants({ variant: "outline" })}>
            Cancel
          </Link>
          <Button type="submit">Create Pet Listing</Button>
        </div>
      </form>
    </div>
  )
}
