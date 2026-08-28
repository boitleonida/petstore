import { Plus } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import prisma from "@/lib/prisma"
import Image from "next/image"

export const dynamic = "force-dynamic"

export default async function BreederPetsPage() {
  // Fetch pets for the demo breeder
  const pets = await prisma.pet.findMany({
    where: {
      breeder: {
        email: 'demo.breeder@texaspethub.com'
      }
    },
    orderBy: {
      createdAt: 'desc'
    }
  })

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">My Pets</h1>
          <p className="text-muted-foreground mt-1">
            Manage your active pet listings and add new ones.
          </p>
        </div>
        <Button className="rounded-full">
          <Plus className="w-4 h-4 mr-2" /> List New Pet
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Your Active Listings</CardTitle>
          <CardDescription>
            You currently have {pets.length} pets listed on the platform.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[80px]">Photo</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Breed / Species</TableHead>
                <TableHead>Age</TableHead>
                <TableHead>Price</TableHead>
                <TableHead>Status</TableHead>
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
                  <TableCell>{pet.ageMonths} mo</TableCell>
                  <TableCell>${pet.price.toLocaleString()}</TableCell>
                  <TableCell>
                    <Badge variant="outline" className="bg-green-50 text-green-700 dark:bg-green-900/30 dark:text-green-400">
                      Available
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right space-x-2">
                    <Button variant="outline" size="sm">Edit</Button>
                  </TableCell>
                </TableRow>
              ))}
              {pets.length === 0 && (
                <TableRow>
                  <TableCell colSpan={7} className="text-center py-8 text-muted-foreground">
                    You have no pets listed. Click "List New Pet" to get started.
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
