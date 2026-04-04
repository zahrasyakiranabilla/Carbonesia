"use client"

import * as React from "react"
import { Button } from "@repo/ui/components/button"
import { Checkbox } from "@repo/ui/components/checkbox"
import {
  Field,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@repo/ui/components/field"
import { Input } from "@repo/ui/components/input"
import { Label } from "@repo/ui/components/label"

import { isValidEmail, isValidPassword } from "../helpers/password"
import { useGeneratePassword } from "../hooks/use-generate-password"
import type {
  CreateEmployeeRequest,
  Employee,
  UpdateEmployeeRequest,
} from "../types"
import { PasswordInput } from "./password-input"

interface EmployeeFormProps {
  employee?: Employee
  onSubmit: (
    data: CreateEmployeeRequest | UpdateEmployeeRequest
  ) => Promise<void>
  isSubmitting?: boolean
}

export function EmployeeForm({
  employee,
  onSubmit,
  isSubmitting = false,
}: EmployeeFormProps) {
  const isEdit = !!employee
  const { password, regenerate } = useGeneratePassword()

  const [formData, setFormData] = React.useState({
    name: employee?.name ?? "",
    email: employee?.email ?? "",
    password: "",
  })
  const [errors, setErrors] = React.useState<Record<string, string>>({})
  const [passwordSaved, setPasswordSaved] = React.useState(false)

  const validate = (): boolean => {
    const newErrors: Record<string, string> = {}

    if (!formData.name.trim()) {
      newErrors.name = "Nama wajib diisi"
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email wajib diisi"
    } else if (!isValidEmail(formData.email)) {
      newErrors.email = "Format email tidak valid"
    }

    if (!isEdit && !formData.password) {
      newErrors.password = "Password wajib diisi"
    } else if (
      !isEdit &&
      formData.password &&
      !isValidPassword(formData.password)
    ) {
      newErrors.password = "Password minimal 8 karakter"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!validate()) return

    if (isEdit) {
      const updateData: UpdateEmployeeRequest = {
        name: formData.name,
        email: formData.email,
      }
      await onSubmit(updateData)
    } else {
      const createData: CreateEmployeeRequest = {
        name: formData.name,
        email: formData.email,
        password: formData.password,
      }
      await onSubmit(createData)
    }
  }

  const handlePasswordGenerate = () => {
    regenerate(16)
    setFormData((prev) => ({ ...prev, password }))
  }

  React.useEffect(() => {
    if (password) {
      setFormData((prev) => ({ ...prev, password }))
    }
  }, [password])

  return (
    <form onSubmit={handleSubmit}>
      <FieldGroup>
        <Field>
          <FieldLabel htmlFor="name">Nama Lengkap</FieldLabel>
          <Input
            id="name"
            value={formData.name}
            onChange={(e) =>
              setFormData((prev) => ({ ...prev, name: e.target.value }))
            }
            placeholder="Masukkan nama lengkap"
            disabled={isSubmitting}
          />
          {errors.name && <FieldError>{errors.name}</FieldError>}
        </Field>

        <Field>
          <FieldLabel htmlFor="email">Email</FieldLabel>
          <Input
            id="email"
            type="email"
            value={formData.email}
            onChange={(e) =>
              setFormData((prev) => ({ ...prev, email: e.target.value }))
            }
            placeholder="nama@email.com"
            disabled={isSubmitting}
          />
          {errors.email && <FieldError>{errors.email}</FieldError>}
        </Field>

        {!isEdit && (
          <Field>
            <FieldLabel htmlFor="password">Password</FieldLabel>
            <PasswordInput
              value={formData.password}
              onChange={(value) =>
                setFormData((prev) => ({ ...prev, password: value }))
              }
              onGenerate={handlePasswordGenerate}
              disabled={isSubmitting}
            />
            {errors.password && <FieldError>{errors.password}</FieldError>}
            <FieldDescription>
              Password minimal 8 karakter. Anda dapat menghasilkan password
              secara otomatis.
            </FieldDescription>
            {formData.password && (
              <div className="mt-2 flex items-center gap-2">
                <Checkbox
                  id="passwordConfirm"
                  checked={passwordSaved}
                  onCheckedChange={(checked) =>
                    setPasswordSaved(checked === true)
                  }
                />
                <Label
                  htmlFor="passwordConfirm"
                  className="cursor-pointer text-sm text-muted-foreground"
                >
                  Saya telah menyalin/menyimpan password ini
                </Label>
              </div>
            )}
          </Field>
        )}
      </FieldGroup>

      <div className="mt-6 flex justify-end gap-2">
        <Button
          type="submit"
          disabled={
            isSubmitting || (!isEdit && !!formData.password && !passwordSaved)
          }
        >
          {isSubmitting
            ? "Menyimpan..."
            : isEdit
              ? "Simpan Perubahan"
              : "Tambah Karyawan"}
        </Button>
      </div>
    </form>
  )
}
