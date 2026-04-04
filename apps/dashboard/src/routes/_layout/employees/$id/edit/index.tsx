"use client"

import { EmployeeForm, useUpdateEmployee } from "@/features/employee"
import { getEmployee } from "@/features/employee/api/employee-api"
import type { UpdateEmployeeRequest } from "@/features/employee/types"
import { ArrowLeftIcon, LoadingIcon } from "@hugeicons/core-free-icons"
import { HugeiconsIcon } from "@hugeicons/react"
import { Button } from "@repo/ui/components/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@repo/ui/components/card"
import { useQuery } from "@tanstack/react-query"
import { createFileRoute, useNavigate, useParams } from "@tanstack/react-router"
import { toast } from "sonner"

export const Route = createFileRoute("/_layout/employees/$id/edit/")({
  component: EditEmployeePage,
})

function EditEmployeePage() {
  const navigate = useNavigate()
  const params = useParams({ from: "/_layout/employees/$id/edit/" })
  const employeeId = params.id

  const { data: employee, isLoading } = useQuery({
    queryKey: ["employee", employeeId],
    queryFn: () => getEmployee(employeeId),
  })

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

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-8">
        <HugeiconsIcon
          icon={LoadingIcon}
          className="animate-spin"
          strokeWidth={2}
        />
        <span className="ml-2">Memuat...</span>
      </div>
    )
  }

  if (!employee) {
    return (
      <div className="flex flex-col items-center justify-center py-8">
        <p className="text-muted-foreground">Karyawan tidak ditemukan</p>
        <Button variant="link" onClick={() => navigate({ to: "/employees" })}>
          Kembali ke daftar karyawan
        </Button>
      </div>
    )
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

      {/* Form */}
      <Card>
        <CardHeader>
          <CardTitle>Informasi Karyawan</CardTitle>
          <CardDescription>
            Perbarui formulir di bawah untuk mengubah data karyawan
          </CardDescription>
        </CardHeader>
        <CardContent>
          <EmployeeForm
            employee={employee}
            onSubmit={handleSubmit}
            isSubmitting={updateMutation.isPending}
          />
        </CardContent>
      </Card>
    </div>
  )
}
