import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@repo/ui/components/card"
import { Button } from "@repo/ui/components/button"
import { createFileRoute } from "@tanstack/react-router"
import { HugeiconsIcon } from "@hugeicons/react"
import { UserGroupIcon, Add01Icon } from "@hugeicons/core-free-icons"

export const Route = createFileRoute("/_layout/employees/")({
  component: EmployeeManagement,
})

function EmployeeManagement() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold">Employee Management</h1>
          <p className="text-muted-foreground">
            Manage employee records and information
          </p>
        </div>
        <Button className="gap-2">
          <HugeiconsIcon icon={Add01Icon} strokeWidth={2} />
          Add Employee
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <HugeiconsIcon icon={UserGroupIcon} strokeWidth={2} />
            Employee List
          </CardTitle>
          <CardDescription>
            View and manage all employees in the system
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="text-center py-8 text-muted-foreground">
            Employee list will be displayed here.
            <p className="text-sm mt-2">
              This feature is currently being developed.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}