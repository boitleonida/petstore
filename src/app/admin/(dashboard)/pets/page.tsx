"use client"

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
import { MoreHorizontal } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

const pets = [
  {
    id: "PET-001",
    name: "Luna",
    breed: "Golden Retriever",
    category: "Dog",
    status: "Available",
    price: "$2,500"
  },
  {
    id: "PET-002",
    name: "Milo",
    breed: "French Bulldog",
    category: "Dog",
    status: "Pending Transport",
    price: "$3,200"
  },
  {
    id: "PET-003",
    name: "Bella",
    breed: "Maine Coon",
    category: "Cat",
    status: "Adopted",
    price: "$1,800"
  },
  {
    id: "PET-004",
    name: "Charlie",
    breed: "Labradoodle",
    category: "Dog",
    status: "Available",
    price: "$2,100"
  },
  {
    id: "PET-005",
    name: "Rio",
    breed: "Macaw Parrot",
    category: "Bird",
    status: "Available",
    price: "$3,500"
  }
]

export default function PetsAdmin() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Pet Management</h1>
        <p className="text-muted-foreground mt-2">
          View and manage all pets currently listed by verified breeders.
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Listed Pets</CardTitle>
          <CardDescription>
            A comprehensive list of all pets on the platform.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Pet ID</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Breed</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Price</TableHead>
                <TableHead></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {pets.map((pet) => (
                <TableRow key={pet.id}>
                  <TableCell className="font-medium">{pet.id}</TableCell>
                  <TableCell>{pet.name}</TableCell>
                  <TableCell>{pet.breed}</TableCell>
                  <TableCell>{pet.category}</TableCell>
                  <TableCell>
                    <Badge 
                      variant="outline"
                      className={
                        pet.status === "Available" 
                          ? "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400" 
                          : pet.status === "Adopted"
                          ? "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-400"
                          : "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400"
                      }
                    >
                      {pet.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right font-medium">{pet.price}</TableCell>
                  <TableCell className="text-right">
                    <Button variant="ghost" size="icon">
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}
