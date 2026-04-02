import {
  DashboardSquare01Icon,
  UserGroupIcon,
} from "@hugeicons/core-free-icons"
import { HugeiconsIcon } from "@hugeicons/react"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@repo/ui/components/card"
import { createFileRoute, Link } from "@tanstack/react-router"

export const Route = createFileRoute("/_layout/")({ component: DashboardHome })

function DashboardHome() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold">Dashboard</h1>
        <p className="text-muted-foreground">Welcome to the admin dashboard</p>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <HugeiconsIcon icon={DashboardSquare01Icon} strokeWidth={2} />
              Dashboard Overview
            </CardTitle>
            <CardDescription>
              View system statistics and reports
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">
              Dashboard statistics will be displayed here.
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <HugeiconsIcon icon={UserGroupIcon} strokeWidth={2} />
              Employee Management
            </CardTitle>
            <CardDescription>Manage employee records and data</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="mb-4 text-muted-foreground">
              View and manage all employee information.
            </p>
            <Link to="/employees">
              <Card className="cursor-pointer transition-colors hover:bg-muted/50">
                <CardContent className="p-4">
                  <span className="text-sm font-medium">
                    Go to Employee Management →
                  </span>
                </CardContent>
              </Card>
            </Link>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
