/* eslint-disable react/no-children-prop */
"use client"

import { Button } from "@repo/ui/components/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@repo/ui/components/card"
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@repo/ui/components/field"
import { Input } from "@repo/ui/components/input"
import { useForm } from "@tanstack/react-form"
import { useNavigate } from "@tanstack/react-router"
import { toast } from "sonner"

import { useAuth } from "../hooks"
import { loginSchema } from "../schemas/login-schema"
import type { LoginCredentials } from "../types"

export function LoginPage({ redirect }: { redirect?: string }) {
  const navigate = useNavigate()
  const { login } = useAuth()

  const redirectPath = typeof redirect === "string" ? redirect : "/"

  const form = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
    validators: {
      onSubmit: loginSchema,
    },
    onSubmit: async ({ value }) => {
      try {
        await login(value as LoginCredentials)
        toast.success("Login berhasil", {
          description: "Selamat datang!",
        })
        navigate({ to: redirectPath })
      } catch (error) {
        if (error instanceof Error) {
          if (error.message.includes("Invalid credentials")) {
            toast.error("Kredensial tidak valid", {
              description: "Periksa email dan kata sandi Anda.",
            })
          } else if (
            error.message.includes("Unable to connect") ||
            error.message.includes("fetch")
          ) {
            toast.error("Kesalahan koneksi", {
              description: "Tidak dapat terhubung. Silakan coba lagi.",
            })
          } else {
            toast.error("Login gagal", {
              description: error.message,
            })
          }
        } else {
          toast.error("Login gagal", {
            description: "Terjadi kesalahan yang tidak diharapkan.",
          })
        }
      }
    },
  })

  const isLoading = form.state.isSubmitting

  return (
    <div className="flex min-h-svh items-center justify-center p-6">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <CardTitle className="text-xl">Login Admin</CardTitle>
          <CardDescription>
            Masukkan email dan kata sandi untuk mengakses website absensi
            pegawai.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form
            id="login-form"
            onSubmit={(e) => {
              e.preventDefault()
              form.handleSubmit()
            }}
          >
            <FieldGroup>
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
                        placeholder="admin@contoh.com"
                        disabled={isLoading}
                        aria-invalid={isInvalid}
                        autoComplete="email"
                      />
                      {isInvalid && (
                        <FieldError errors={field.state.meta.errors} />
                      )}
                    </Field>
                  )
                }}
              />

              <form.Field
                name="password"
                children={(field) => {
                  const isInvalid =
                    field.state.meta.isTouched && !field.state.meta.isValid
                  return (
                    <Field data-invalid={isInvalid}>
                      <FieldLabel htmlFor={field.name}>Kata Sandi</FieldLabel>
                      <Input
                        id={field.name}
                        name={field.name}
                        type="password"
                        value={field.state.value}
                        onBlur={field.handleBlur}
                        onChange={(e) => field.handleChange(e.target.value)}
                        placeholder="Masukkan kata sandi Anda"
                        disabled={isLoading}
                        aria-invalid={isInvalid}
                        autoComplete="current-password"
                      />
                      {isInvalid && (
                        <FieldError errors={field.state.meta.errors} />
                      )}
                    </Field>
                  )
                }}
              />

              <Button
                type="submit"
                form="login-form"
                className="w-full"
                disabled={isLoading}
              >
                {isLoading ? (
                  <span className="flex items-center gap-2">
                    <span className="size-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
                    Masuk...
                  </span>
                ) : (
                  "Masuk"
                )}
              </Button>
            </FieldGroup>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
