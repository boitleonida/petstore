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

const users = [
  {
    id: "USR-001",
    name: "John Doe",
    email: "john@example.com",
    role: "Buyer",
    status: "Active",
    joined: "Aug 15, 2026"
  },
  {
    id: "USR-002",
    name: "Sarah Smith",
    email: "sarah.smith@breeder.com",
    role: "Breeder",
    status: "Pending Verification",
    joined: "Aug 26, 2026"
  },
  {
    id: "USR-003",
    name: "Emily Chen",
    email: "emilyc@example.com",
    role: "Buyer",
    status: "Active",
    joined: "Aug 10, 2026"
  },
  {
    id: "USR-004",
    name: "Mike Johnson",
    email: "mj@example.com",
    role: "Buyer",
    status: "Active",
    joined: "Aug 05, 2026"
  },
  {
    id: "USR-005",
    name: "Happy Paws Kennel",
    email: "contact@happypaws.com",
    role: "Breeder",
    status: "Verified",
    joined: "Jul 22, 2026"
  }
]

export default function UsersAdmin() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">User Management</h1>
        <p className="text-muted-foreground mt-2">
          View all registered buyers and manage breeder verifications.
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Registered Users</CardTitle>
          <CardDescription>
            A list of all users on the platform.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>User ID</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Role</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Joined</TableHead>
                <TableHead></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {users.map((user) => (
                <TableRow key={user.id}>
                  <TableCell className="font-medium">{user.id}</TableCell>
                  <TableCell>{user.name}</TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell>
                    <Badge variant={user.role === "Breeder" ? "default" : "secondary"}>
                      {user.role}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Badge 
                      variant="outline"
                      className={
                        user.status === "Verified" || user.status === "Active" 
                          ? "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400" 
                          : "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400"
                      }
                    >
                      {user.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right text-muted-foreground">{user.joined}</TableCell>
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
