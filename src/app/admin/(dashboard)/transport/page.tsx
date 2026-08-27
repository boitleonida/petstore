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

const transports = [
  {
    id: "TR-1024",
    buyer: "John Doe",
    pet: "Luna (Golden Retriever)",
    origin: "Austin, TX",
    destination: "Denver, CO",
    status: "In Transit",
    date: "Aug 27, 2026",
    price: "$450.00"
  },
  {
    id: "TR-1025",
    buyer: "Sarah Smith",
    pet: "Milo (Frenchie)",
    origin: "Dallas, TX",
    destination: "Miami, FL",
    status: "Pending Pickup",
    date: "Aug 28, 2026",
    price: "$600.00"
  },
  {
    id: "TR-1023",
    buyer: "Emily Chen",
    pet: "Bella (Maine Coon)",
    origin: "Houston, TX",
    destination: "Seattle, WA",
    status: "Delivered",
    date: "Aug 25, 2026",
    price: "$550.00"
  },
  {
    id: "TR-1026",
    buyer: "Mike Johnson",
    pet: "Charlie (Labradoodle)",
    origin: "San Antonio, TX",
    destination: "Chicago, IL",
    status: "Processing",
    date: "Aug 29, 2026",
    price: "$500.00"
  }
]

export default function TransportOrders() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Transport & Orders</h1>
        <p className="text-muted-foreground mt-2">
          Manage pet transport status and review recent transactions.
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Active Transport Orders</CardTitle>
          <CardDescription>
            You can manually update the status of each transport here.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Order ID</TableHead>
                <TableHead>Buyer</TableHead>
                <TableHead>Pet</TableHead>
                <TableHead>Route</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Price</TableHead>
                <TableHead></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {transports.map((order) => (
                <TableRow key={order.id}>
                  <TableCell className="font-medium">{order.id}</TableCell>
                  <TableCell>{order.buyer}</TableCell>
                  <TableCell>{order.pet}</TableCell>
                  <TableCell className="text-xs text-muted-foreground">
                    {order.origin} &rarr; {order.destination}
                  </TableCell>
                  <TableCell>
                    <Badge 
                      variant={
                        order.status === "Delivered" ? "default" :
                        order.status === "In Transit" ? "secondary" : 
                        "outline"
                      }
                      className={order.status === "Delivered" ? "bg-green-600 hover:bg-green-700" : ""}
                    >
                      {order.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right font-medium">{order.price}</TableCell>
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
