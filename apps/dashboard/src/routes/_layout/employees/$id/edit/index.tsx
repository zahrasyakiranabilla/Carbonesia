"use client"

import {
  EmployeeForm,
  useSuspenseEmployee,
  useUpdateEmployee,
} from "@/features/employee"
import type { UpdateEmployeeRequest } from "@/features/employee/types"
import { ArrowLeftIcon } from "@hugeicons/core-free-icons"
import { HugeiconsIcon } from "@hugeicons/react"
import { Button } from "@repo/ui/components/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@repo/ui/components/card"
import { createFileRoute, useNavigate, useParams } from "@tanstack/react-router"
import { toast } from "sonner"

import { SuspenseLoader } from "@/components/suspense-loader/suspense-loader"

export const Route = createFileRoute("/_layout/employees/$id/edit/")({
  component: EditEmployeePage,
})

interface EmployeeFormContentProps {
  employeeId: string
  onSubmit: (data: UpdateEmployeeRequest) => Promise<void>
  isSubmitting: boolean
}

function EmployeeFormContent({
  employeeId,
  onSubmit,
  isSubmitting,
}: EmployeeFormContentProps) {
  const { employee } = useSuspenseEmployee(employeeId)

  return (
    <Card>
      <CardContent>
        <EmployeeForm
          employee={employee}
          onSubmit={onSubmit}
          isSubmitting={isSubmitting}
        />
      </CardContent>
    </Card>
  )
}

function EditEmployeePage() {
  const navigate = useNavigate()
  const params = useParams({ from: "/_layout/employees/$id/edit/" })
  const employeeId = params.id

  const updateMutation = useUpdateEmployee()

  const handleSubmit = async (data: UpdateEmployeeRequest) => {
    try {
      await updateMutation.mutateAsync({ id: employeeId, data })
      toast.success("Karyawan berhasil diperbarui")
      navigate({ to: "/employees" })
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : "Gagal memperbarui karyawan"
      )
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Button
          variant="ghost"
          size="icon-sm"
          onClick={() => navigate({ to: "/employees" })}
        >
          <HugeiconsIcon icon={ArrowLeftIcon} strokeWidth={2} />
        </Button>
        <div>
          <h1 className="text-2xl font-semibold">Edit Karyawan</h1>
          <p className="text-muted-foreground">Perbarui informasi karyawan</p>
        </div>
      </div>

      {/* Form with Suspense */}
      <SuspenseLoader>
        <EmployeeFormContent
          employeeId={employeeId}
          onSubmit={handleSubmit}
          isSubmitting={updateMutation.isPending}
        />
      </SuspenseLoader>
    </div>
  )
}
