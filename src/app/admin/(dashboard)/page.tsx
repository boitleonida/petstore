import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Users, Truck, DollarSign, Activity } from "lucide-react"

const stats = [
  {
    title: "Total Revenue",
    value: "$45,231.89",
    change: "+20.1% from last month",
    icon: DollarSign,
  },
  {
    title: "Active Transports",
    value: "12",
    change: "+3 in the last week",
    icon: Truck,
  },
  {
    title: "Total Users",
import { Users, PawPrint, TrendingUp, AlertCircle, ShieldCheck } from "lucide-react"
import prisma from "@/lib/prisma"
import Link from "next/link"

export const dynamic = "force-dynamic"

export default async function AdminDashboardOverview() {
  const [totalPets, totalUsers, pendingBreederApps, totalApplications] = await Promise.all([
    prisma.pet.count(),
    prisma.user.count(),
    prisma.breederApplication.count({ where: { status: 'PENDING' } }),
    prisma.adoptionApplication.count()
  ])

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Platform Overview</h1>
        <p className="text-muted-foreground mt-2">Here's what's happening on Texas Pet Hub today.</p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Pets Listed</CardTitle>
            <PawPrint className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalPets}</div>
            <p className="text-xs text-muted-foreground">Active in database</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Users</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalUsers}</div>
            <p className="text-xs text-muted-foreground">Breeders & Adopters</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Adoption Apps</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalApplications}</div>
            <p className="text-xs text-muted-foreground">All time submissions</p>
          </CardContent>
        </Card>

        <Card className={pendingBreederApps > 0 ? "border-yellow-500 bg-yellow-500/10" : ""}>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Breeder Apps</CardTitle>
            {pendingBreederApps > 0 ? (
              <AlertCircle className="h-4 w-4 text-yellow-600 dark:text-yellow-500" />
            ) : (
              <ShieldCheck className="h-4 w-4 text-muted-foreground" />
            )}
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{pendingBreederApps}</div>
            <p className="text-xs text-muted-foreground">Pending review</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <Card className="col-span-4">
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-center py-12 text-muted-foreground">
              Live activity feed coming in next phase.
            </div>
          </CardContent>
        </Card>

        <Card className="col-span-3">
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <Link href="/admin/pets" className="flex items-center justify-between p-4 border rounded-xl hover:bg-muted/50 transition-colors">
              <div className="flex items-center gap-3">
                <PawPrint className="w-5 h-5 text-primary" />
                <span className="font-medium">Manage Pets</span>
              </div>
            </Link>
            <Link href="/admin/breeder-apps" className="flex items-center justify-between p-4 border rounded-xl hover:bg-muted/50 transition-colors">
              <div className="flex items-center gap-3">
                <ShieldCheck className="w-5 h-5 text-blue-500" />
                <span className="font-medium">Review Breeders</span>
              </div>
            </Link>
            <Link href="/admin/users" className="flex items-center justify-between p-4 border rounded-xl hover:bg-muted/50 transition-colors">
              <div className="flex items-center gap-3">
                <Users className="w-5 h-5 text-green-500" />
                <span className="font-medium">Manage Users</span>
              </div>
            </Link>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
