"use client"

import * as React from "react"
import {
  ActivateDialog,
  DeactivateDialog,
  EmployeeFilters,
  EmployeeList,
  useActivateEmployee,
  useDeactivateEmployee,
  useSuspenseEmployees,
} from "@/features/employee"
import type { Employee } from "@/features/employee/types"
import { Add01Icon } from "@hugeicons/core-free-icons"
import { HugeiconsIcon } from "@hugeicons/react"
import { Button } from "@repo/ui/components/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@repo/ui/components/card"
import { createFileRoute, useNavigate } from "@tanstack/react-router"
import { toast } from "sonner"

import { SuspenseLoader } from "@/components/suspense-loader/suspense-loader"

export const Route = createFileRoute("/_layout/employees/")({
  component: EmployeeManagement,
})

interface EmployeeListContentProps {
  filters: { search: string; page: number; limit: number }
  onActivate: (employee: Employee) => void
  onDeactivate: (employee: Employee) => void
}

function EmployeeListContent({
  filters,
  onActivate,
  onDeactivate,
}: EmployeeListContentProps) {
  const { employees, meta } = useSuspenseEmployees(filters)

  return (
    <>
      <div className="mb-4">
        <CardDescription>
          {meta
            ? `${meta.total} karyawan ditemukan`
            : "Menampilkan semua karyawan"}
        </CardDescription>
      </div>
      <EmployeeList
        employees={employees}
        onActivate={onActivate}
        onDeactivate={onDeactivate}
      />
    </>
  )
}

function EmployeeManagement() {
  const navigate = useNavigate()
  const [filters, setFilters] = React.useState({
    search: "",
    page: 1,
    limit: 20,
  })

  // Dialog states
  const [activateDialogOpen, setActivateDialogOpen] = React.useState(false)
  const [deactivateDialogOpen, setDeactivateDialogOpen] = React.useState(false)
  const [selectedEmployee, setSelectedEmployee] =
    React.useState<Employee | null>(null)

  // Mutations
  const activateMutation = useActivateEmployee()
  const deactivateMutation = useDeactivateEmployee()

  // Handlers
  const handleSearchChange = (search: string) => {
    setFilters((prev) => ({ ...prev, search, page: 1 }))
  }

  const handleActivate = (employee: Employee) => {
    setSelectedEmployee(employee)
    setActivateDialogOpen(true)
  }

  const handleDeactivate = (employee: Employee) => {
    setSelectedEmployee(employee)
    setDeactivateDialogOpen(true)
  }

  const confirmActivate = async () => {
    if (!selectedEmployee) return

    try {
      await activateMutation.mutateAsync(selectedEmployee.id)
      toast.success(`Karyawan ${selectedEmployee.name} berhasil diaktifkan`)
      setActivateDialogOpen(false)
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : "Gagal mengaktifkan karyawan"
      )
    }
  }

  const confirmDeactivate = async () => {
    if (!selectedEmployee) return

    try {
      await deactivateMutation.mutateAsync(selectedEmployee.id)
      toast.success(`Karyawan ${selectedEmployee.name} berhasil dinonaktifkan`)
      setDeactivateDialogOpen(false)
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : "Gagal menonaktifkan karyawan"
      )
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold">Manajemen Karyawan</h1>
        </div>
        <Button
          className="gap-2"
          onClick={() => navigate({ to: "/employees/create" })}
        >
          <HugeiconsIcon icon={Add01Icon} strokeWidth={2} />
          Tambah Karyawan
        </Button>
      </div>

      {/* Employee List */}
      <Card>
        <CardHeader className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <CardTitle>Daftar Karyawan</CardTitle>
          <EmployeeFilters
            search={filters.search}
            onSearchChange={handleSearchChange}
          />
        </CardHeader>
        <CardContent>
          <SuspenseLoader>
            <EmployeeListContent
              filters={filters}
              onActivate={handleActivate}
              onDeactivate={handleDeactivate}
            />
          </SuspenseLoader>
        </CardContent>
      </Card>

      {/* Dialogs */}
      <ActivateDialog
        open={activateDialogOpen}
        onOpenChange={setActivateDialogOpen}
        employee={selectedEmployee}
        onConfirm={confirmActivate}
        isLoading={activateMutation.isPending}
      />

      <DeactivateDialog
        open={deactivateDialogOpen}
        onOpenChange={setDeactivateDialogOpen}
        employee={selectedEmployee}
        onConfirm={confirmDeactivate}
        isLoading={deactivateMutation.isPending}
      />
    </div>
  )
}
