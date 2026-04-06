"use client"

import * as React from "react"
import {
  EmployeeForm,
  GeneratePasswordDialog,
  useCreateEmployee,
} from "@/features/employee"
import type {
  CreateEmployeeRequest,
  UpdateEmployeeRequest,
} from "@/features/employee/types"
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
import { createFileRoute, useNavigate } from "@tanstack/react-router"
import { toast } from "sonner"

export const Route = createFileRoute("/_layout/employees/create/")({
  component: CreateEmployeePage,
})

function CreateEmployeePage() {
  const navigate = useNavigate()
  const createMutation = useCreateEmployee()
  const [showPasswordDialog, setShowPasswordDialog] = React.useState(false)
  const [createdPassword, setCreatedPassword] = React.useState("")
  const [formKey, setFormKey] = React.useState(0)

  const handleSubmit = async (
    data: CreateEmployeeRequest | UpdateEmployeeRequest
  ) => {
    if ("password" in data) {
      try {
        const result = await createMutation.mutateAsync(data)
        toast.success("Karyawan berhasil ditambahkan")
        setCreatedPassword(result.plainPassword ?? "")
        setShowPasswordDialog(true)
        setFormKey((prev) => prev + 1)
      } catch (error) {
        toast.error(
          error instanceof Error ? error.message : "Gagal menambahkan karyawan"
        )
      }
    }
  }

  const handlePasswordDialogClose = () => {
    setShowPasswordDialog(false)
    navigate({ to: "/employees" })
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
          <h1 className="text-2xl font-semibold">Tambah Karyawan</h1>
          <p className="text-muted-foreground">
            Tambahkan karyawan baru ke sistem
          </p>
        </div>
      </div>

      {/* Form */}
      <Card>
        <CardContent>
          <EmployeeForm
            key={formKey}
            onSubmit={handleSubmit}
            isSubmitting={createMutation.isPending}
          />
        </CardContent>
      </Card>

      {/* Password Dialog */}
      {createdPassword && (
        <GeneratePasswordDialog
          open={showPasswordDialog}
          onOpenChange={handlePasswordDialogClose}
          password={createdPassword}
          title="Karyawan Berhasil Ditambahkan"
          description="Berikut adalah password untuk karyawan baru. Silakan salin dan simpan password ini."
        />
      )}
    </div>
  )
}
