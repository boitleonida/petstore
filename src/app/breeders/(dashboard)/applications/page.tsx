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

export default function BreederApplicationsPage() {
  const applications = [
    {
      id: "APP-001",
      buyer: "John Smith",
      pet: "Luna (Golden Retriever)",
      status: "Pending",
      date: "Oct 12, 2026",
      action: "Review"
    },
    {
      id: "APP-002",
      buyer: "Sarah Williams",
      pet: "Milo (French Bulldog)",
      status: "Approved",
      date: "Oct 11, 2026",
      action: "View"
    },
    {
      id: "APP-003",
      buyer: "Michael Brown",
      pet: "Bella (Maine Coon)",
      status: "Pending",
      date: "Oct 10, 2026",
      action: "Review"
    },
    {
      id: "APP-004",
      buyer: "Emily Davis",
      pet: "Charlie (Labradoodle)",
      status: "Rejected",
      date: "Oct 08, 2026",
      action: "View"
    }
  ]

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
            You have 2 pending applications that require your review.
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
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}
