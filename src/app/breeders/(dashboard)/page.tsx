"use client"

import { Activity, Dog, FileText, TrendingUp } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function BreederOverview() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Welcome Back, Texas Premium Breeders!</h1>
        <p className="text-muted-foreground mt-2">
          Here is what's happening with your listings today.
        </p>
      </div>

      {/* Metrics Row */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Listings</CardTitle>
            <Dog className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">12</div>
            <p className="text-xs text-muted-foreground">
              +2 added this week
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pending Applications</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">5</div>
            <p className="text-xs text-muted-foreground text-yellow-600 dark:text-yellow-400">
              Needs your review
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Completed Adoptions</CardTitle>
            <Activity className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">34</div>
            <p className="text-xs text-muted-foreground">
              +4 from last month
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Estimated Revenue</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$12,450</div>
            <p className="text-xs text-muted-foreground">
              Past 30 days
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <Card className="col-span-4">
          <CardHeader>
            <CardTitle>Recent Applications</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {[
                { name: "John Smith", pet: "Luna (Golden Retriever)", status: "Pending", time: "2 hours ago" },
                { name: "Sarah Williams", pet: "Milo (French Bulldog)", status: "Approved", time: "5 hours ago" },
                { name: "Michael Brown", pet: "Bella (Maine Coon)", status: "Pending", time: "1 day ago" },
              ].map((app, i) => (
                <div key={i} className="flex items-center justify-between border-b pb-4 last:border-0 last:pb-0">
                  <div className="space-y-1">
                    <p className="text-sm font-medium leading-none">{app.name}</p>
                    <p className="text-sm text-muted-foreground">Applied for {app.pet}</p>
                  </div>
                  <div className="text-right space-y-1">
                    <p className={`text-sm font-medium ${app.status === 'Pending' ? 'text-yellow-600 dark:text-yellow-400' : 'text-green-600 dark:text-green-400'}`}>
                      {app.status}
                    </p>
                    <p className="text-xs text-muted-foreground">{app.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="col-span-3">
          <CardHeader>
            <CardTitle>Upcoming Tasks</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {[
                { title: "Vet Appointment for Charlie", date: "Tomorrow, 10:00 AM", type: "Health" },
                { title: "Transport Pickup for Milo", date: "Oct 15, 2:00 PM", type: "Transport" },
                { title: "Review 3 new applications", date: "Due Today", type: "Admin" },
              ].map((task, i) => (
                <div key={i} className="flex items-start gap-4 border-b pb-4 last:border-0 last:pb-0">
                  <div className={`mt-0.5 w-2 h-2 rounded-full ${
                    task.type === 'Health' ? 'bg-red-500' : 
                    task.type === 'Transport' ? 'bg-blue-500' : 'bg-yellow-500'
                  }`} />
                  <div className="space-y-1">
                    <p className="text-sm font-medium leading-none">{task.title}</p>
                    <p className="text-sm text-muted-foreground">{task.date}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
