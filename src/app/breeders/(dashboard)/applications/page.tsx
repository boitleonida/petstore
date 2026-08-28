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

export const dynamic = "force-dynamic"

export default async function BreederApplicationsPage() {
  // Fetch live applications for the demo breeder's pets
  const rawApplications = await prisma.adoptionApplication.findMany({
    where: {
      pet: {
        breeder: {
          email: 'demo.breeder@texaspethub.com'
        }
      }
    },
    include: {
      pet: true,
      adopter: true
    },
    orderBy: {
      createdAt: 'desc'
    }
  })

  // Format the dates and structure for the table
  const applications = rawApplications.map(app => ({
    id: app.id.split('-')[0].toUpperCase(), // Shorten UUID for display
    buyer: `${app.adopter.firstName} ${app.adopter.lastName}`,
    pet: `${app.pet.name} (${app.pet.breed})`,
    status: app.status.charAt(0).toUpperCase() + app.status.slice(1).toLowerCase(),
    date: app.createdAt.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
    action: app.status === 'PENDING' ? "Review" : "View"
  }))

  const pendingCount = applications.filter(a => a.status === 'Pending').length

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Adoption Applications</h1>
        <p className="text-muted-foreground mt-1">
          Review and manage incoming applications from potential buyers.
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Application Inbox</CardTitle>
          <CardDescription>
            You have {pendingCount} pending applications that require your review.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Application ID</TableHead>
                <TableHead>Applicant</TableHead>
                <TableHead>Pet Requested</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {applications.map((app) => (
                <TableRow key={app.id}>
                  <TableCell className="font-medium">{app.id}</TableCell>
                  <TableCell>{app.buyer}</TableCell>
                  <TableCell>{app.pet}</TableCell>
                  <TableCell>{app.date}</TableCell>
                  <TableCell>
                    <Badge 
                      variant="outline" 
                      className={
                        app.status === 'Pending' 
                          ? 'bg-yellow-50 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400' 
                          : app.status === 'Approved'
                          ? 'bg-green-50 text-green-700 dark:bg-green-900/30 dark:text-green-400'
                          : 'bg-red-50 text-red-700 dark:bg-red-900/30 dark:text-red-400'
                      }
                    >
                      {app.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <Button variant={app.status === 'Pending' ? 'default' : 'outline'} size="sm">
                      {app.action}
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
              {applications.length === 0 && (
                <TableRow>
                  <TableCell colSpan={6} className="text-center py-8 text-muted-foreground">
                    No applications received yet.
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
