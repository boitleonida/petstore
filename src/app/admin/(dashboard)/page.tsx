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
    value: "2,350",
    change: "+180 this month",
    icon: Users,
  },
  {
    title: "Active Listings",
    value: "142",
    change: "+12 since yesterday",
    icon: Activity,
  }
]

export default function AdminOverview() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Overview</h1>
        <p className="text-muted-foreground mt-2">
          Monitor your platform's activity, revenue, and ongoing pet transports.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <Card key={stat.title}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                {stat.title}
              </CardTitle>
              <stat.icon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
              <p className="text-xs text-muted-foreground mt-1">
                {stat.change}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <Card className="col-span-4">
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-8">
              {[
                { name: "John Doe", action: "purchased a Golden Retriever", time: "2 hours ago" },
                { name: "Sarah Smith", action: "registered as a verified breeder", time: "5 hours ago" },
                { name: "Transport #1024", action: "status updated to 'In Transit'", time: "6 hours ago" },
                { name: "Mike Johnson", action: "paid transport fee ($450.00)", time: "1 day ago" },
              ].map((item, index) => (
                <div key={index} className="flex items-center">
                  <div className="ml-4 space-y-1">
                    <p className="text-sm font-medium leading-none">
                      {item.name}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      {item.action}
                    </p>
                  </div>
                  <div className="ml-auto font-medium text-xs text-muted-foreground">
                    {item.time}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="col-span-3">
          <CardHeader>
            <CardTitle>Pending Approvals</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-center py-12 text-muted-foreground">
              No pending breeder approvals.
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
