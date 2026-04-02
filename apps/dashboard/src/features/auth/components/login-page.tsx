"use client"

import * as React from "react"
import { useNavigate } from "@tanstack/react-router"
import { toast } from "sonner"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@repo/ui/components/card"
import { Input } from "@repo/ui/components/input"
import { Label } from "@repo/ui/components/label"
import { Button } from "@repo/ui/components/button"
import { useAuth } from "../hooks"
import type { LoginCredentials } from "../types"

export function LoginPage({ redirect = "/" }: { redirect?: string }) {
  const navigate = useNavigate()
  const { login } = useAuth()
  const [isLoading, setIsLoading] = React.useState(false)
  const [credentials, setCredentials] = React.useState<LoginCredentials>({
    email: "",
    password: "",
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      await login(credentials)
      toast.success("Login berhasil", {
        description: "Selamat datang!",
      })
      navigate({ to: redirect })
    } catch (error) {
      if (error instanceof Error) {
        if (error.message.includes("Invalid credentials")) {
          toast.error("Kredensial tidak valid", {
            description: "Periksa email dan kata sandi Anda.",
          })
        } else if (error.message.includes("Unable to connect") || error.message.includes("fetch")) {
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
      setCredentials((prev) => ({ ...prev, password: "" }))
    } finally {
      setIsLoading(false)
    }
  }

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCredentials((prev) => ({ ...prev, email: e.target.value }))
  }

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCredentials((prev) => ({ ...prev, password: e.target.value }))
  }

  return (
    <div className="flex min-h-svh items-center justify-center p-6">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <CardTitle className="text-xl">Login Admin</CardTitle>
          <CardDescription>
            Masukkan email dan kata sandi untuk mengakses dashboard
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <div className="flex flex-col gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="admin@contoh.com"
                value={credentials.email}
                onChange={handleEmailChange}
                disabled={isLoading}
                required
                autoComplete="email"
              />
            </div>
            <div className="flex flex-col gap-2">
              <Label htmlFor="password">Kata Sandi</Label>
              <Input
                id="password"
                type="password"
                placeholder="Masukkan kata sandi Anda"
                value={credentials.password}
                onChange={handlePasswordChange}
                disabled={isLoading}
                required
                autoComplete="current-password"
              />
            </div>
            <Button
              type="submit"
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
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
