import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Plus } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import prisma from "@/lib/prisma"

export const dynamic = "force-dynamic"

export default async function AdminPetsPage() {
  const pets = await prisma.pet.findMany({
    include: {
      breeder: true
    },
    orderBy: { createdAt: 'desc' }
  })

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Manage Pets</h1>
          <p className="text-muted-foreground mt-1">
            View all pets currently listed on the platform and add new ones.
          </p>
        </div>
        <Button className="rounded-full" render={<Link href="/admin/pets/new" />}>
          <Plus className="w-4 h-4 mr-2" /> Add New Pet
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>All Listings</CardTitle>
          <CardDescription>
            There are {pets.length} active pets on Texas Pet Hub.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[80px]">Photo</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Breed / Species</TableHead>
                <TableHead>Price</TableHead>
                <TableHead>Breeder</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {pets.map((pet) => (
                <TableRow key={pet.id}>
                  <TableCell>
                    <div className="relative w-12 h-12 rounded-md overflow-hidden bg-muted">
                      {pet.mediaGallery[0] && (
                        <Image src={pet.mediaGallery[0]} alt={pet.name} fill className="object-cover" />
                      )}
                    </div>
                  </TableCell>
                  <TableCell className="font-medium">{pet.name}</TableCell>
                  <TableCell>
                    {pet.breed}
                    <div className="text-xs text-muted-foreground">{pet.species}</div>
                  </TableCell>
                  <TableCell>${pet.price.toLocaleString()}</TableCell>
                  <TableCell>
                    {pet.breeder.firstName} {pet.breeder.lastName}
                  </TableCell>
                  <TableCell className="text-right space-x-2">
                    <Button variant="outline" size="sm" render={<Link href={`/browse/${pet.id}`} />}>View</Button>
                  </TableCell>
                </TableRow>
              ))}
              {pets.length === 0 && (
                <TableRow>
                  <TableCell colSpan={6} className="text-center py-8 text-muted-foreground">
                    No pets found. Add one to get started!
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}
