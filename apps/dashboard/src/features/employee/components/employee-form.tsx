/* eslint-disable react/no-children-prop */
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
import { useForm } from "@tanstack/react-form"

import { useGeneratePassword } from "../hooks/use-generate-password"
import {
  createEmployeeSchema,
  updateEmployeeSchema,
} from "../schemas/employee-schema"
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
  const { password: generatedPassword, regenerate } = useGeneratePassword()
  const [passwordSaved, setPasswordSaved] = React.useState(false)

  const form = useForm({
    defaultValues: {
      name: employee?.name ?? "",
      email: employee?.email ?? "",
      password: "",
    },
    validators: {
      onSubmit: isEdit ? updateEmployeeSchema : createEmployeeSchema,
    },
    onSubmit: async ({ value }) => {
      if (isEdit) {
        const updateData: UpdateEmployeeRequest = {
          name: value.name,
          email: value.email,
        }
        await onSubmit(updateData)
      } else {
        const createData: CreateEmployeeRequest = {
          name: value.name,
          email: value.email,
          password: value.password,
        }
        await onSubmit(createData)
      }
    },
  })

  // Handle password generation - update form field when password is generated
  React.useEffect(() => {
    if (generatedPassword) {
      form.setFieldValue("password", generatedPassword)
    }
  }, [generatedPassword, form])

  const handlePasswordGenerate = () => {
    regenerate(16)
  }

  const passwordValue = form.getFieldValue("password")

  return (
    <form
      id="employee-form"
      onSubmit={(e) => {
        e.preventDefault()
        form.handleSubmit()
      }}
    >
      <FieldGroup>
        <form.Field
          name="name"
          children={(field) => {
            const isInvalid =
              field.state.meta.isTouched && !field.state.meta.isValid
            return (
              <Field data-invalid={isInvalid}>
                <FieldLabel htmlFor={field.name}>Nama Lengkap</FieldLabel>
                <Input
                  id={field.name}
                  name={field.name}
                  value={field.state.value}
                  onBlur={field.handleBlur}
                  onChange={(e) => field.handleChange(e.target.value)}
                  placeholder="Masukkan nama lengkap"
                  disabled={isSubmitting}
                  aria-invalid={isInvalid}
                />
                {isInvalid && <FieldError errors={field.state.meta.errors} />}
              </Field>
            )
          }}
        />

        <form.Field
          name="email"
          children={(field) => {
            const isInvalid =
              field.state.meta.isTouched && !field.state.meta.isValid
            return (
              <Field data-invalid={isInvalid}>
                <FieldLabel htmlFor={field.name}>Email</FieldLabel>
                <Input
                  id={field.name}
                  name={field.name}
                  type="email"
                  value={field.state.value}
                  onBlur={field.handleBlur}
                  onChange={(e) => field.handleChange(e.target.value)}
                  placeholder="nama@email.com"
                  disabled={isSubmitting}
                  aria-invalid={isInvalid}
                />
                {isInvalid && <FieldError errors={field.state.meta.errors} />}
              </Field>
            )
          }}
        />

        {!isEdit && (
          <form.Field
            name="password"
            children={(field) => {
              const isInvalid =
                field.state.meta.isTouched && !field.state.meta.isValid
              return (
                <Field data-invalid={isInvalid}>
                  <FieldLabel htmlFor={field.name}>Password</FieldLabel>
                  <PasswordInput
                    id={field.name}
                    name={field.name}
                    value={field.state.value}
                    onChange={field.handleChange}
                    onGenerate={handlePasswordGenerate}
                    disabled={isSubmitting}
                    aria-invalid={isInvalid}
                  />
                  {isInvalid && <FieldError errors={field.state.meta.errors} />}
                  <FieldDescription>
                    Password minimal 8 karakter. Anda dapat menghasilkan
                    password secara otomatis.
                  </FieldDescription>
                  {field.state.value && (
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
              )
            }}
          />
        )}
      </FieldGroup>

      <div className="mt-6 flex justify-end gap-2">
        <Button
          type="submit"
          form="employee-form"
          disabled={
            isSubmitting || (!isEdit && !!passwordValue && !passwordSaved)
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
