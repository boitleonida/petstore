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
import prisma from "@/lib/prisma"
import { approveBreederApp, rejectBreederApp } from "./actions"
import { Check, X } from "lucide-react"

export const dynamic = "force-dynamic"

export default async function AdminBreederAppsPage() {
  const applications = await prisma.breederApplication.findMany({
    orderBy: {
      createdAt: 'desc'
    }
  })

  const pendingCount = applications.filter(a => a.status === 'PENDING').length

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Breeder Applications</h1>
        <p className="text-muted-foreground mt-1">
          Review and onboard new breeders to the Texas Pet Hub network.
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Application Queue</CardTitle>
          <CardDescription>
            You have {pendingCount} pending applications awaiting review.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Applicant</TableHead>
                <TableHead>Kennel Name</TableHead>
                <TableHead>Facility</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {applications.map((app) => (
                <TableRow key={app.id}>
                  <TableCell>
                    <div className="font-medium">{app.firstName} {app.lastName}</div>
                    <div className="text-xs text-muted-foreground">{app.email}</div>
                  </TableCell>
                  <TableCell>
                    {app.kennelName}
                    {app.usdaLicense && (
                      <div className="text-xs text-muted-foreground">USDA: {app.usdaLicense}</div>
                    )}
                  </TableCell>
                  <TableCell className="capitalize">{app.facilityType}</TableCell>
                  <TableCell>
                    {app.createdAt.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                  </TableCell>
                  <TableCell>
                    <Badge 
                      variant="outline" 
                      className={
                        app.status === 'PENDING' 
                          ? 'bg-yellow-50 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400' 
                          : app.status === 'APPROVED'
                          ? 'bg-green-50 text-green-700 dark:bg-green-900/30 dark:text-green-400'
                          : 'bg-red-50 text-red-700 dark:bg-red-900/30 dark:text-red-400'
                      }
                    >
                      {app.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    {app.status === 'PENDING' ? (
                      <div className="flex items-center justify-end gap-2">
                        <form action={rejectBreederApp}>
                          <input type="hidden" name="appId" value={app.id} />
                          <Button type="submit" variant="outline" size="sm" className="text-red-600 hover:text-red-700">
                            <X className="w-4 h-4" />
                          </Button>
                        </form>
                        <form action={approveBreederApp}>
                          <input type="hidden" name="appId" value={app.id} />
                          <Button type="submit" variant="default" size="sm" className="bg-green-600 hover:bg-green-700">
                            <Check className="w-4 h-4 mr-1" /> Approve
                          </Button>
                        </form>
                      </div>
                    ) : (
                      <Button variant="ghost" size="sm" disabled>Processed</Button>
                    )}
                  </TableCell>
                </TableRow>
              ))}
              {applications.length === 0 && (
                <TableRow>
                  <TableCell colSpan={6} className="text-center py-8 text-muted-foreground">
                    No breeder applications found.
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
