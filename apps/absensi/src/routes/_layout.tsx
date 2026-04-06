import { useEffect, useMemo } from "react"
import logo from "@repo/assets/images/logo-apotek.png"
import { Button } from "@repo/ui/components/button"
import { createFileRoute, Outlet, useNavigate } from "@tanstack/react-router"

import { useAuth } from "../features/auth/hooks"
import { isEmployee } from "../features/auth/types"

export const Route = createFileRoute("/_layout")({
  component: AbsensiLayout,
})

function AbsensiLayout() {
  const { logout, user, isLoading, isAuthenticated } = useAuth()
  const navigate = useNavigate()

  const userIsEmployee = useMemo(() => isEmployee(user), [user])

  const handleLogout = async () => {
    try {
      await logout()
    } catch {
      // Clear local state regardless of API failure
    }
  }

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      navigate({ to: "/login", search: { redirect: window.location.pathname } })
    }
  }, [isAuthenticated, isLoading, navigate])

  if (!isLoading && isAuthenticated && !userIsEmployee) {
    return (
      <div className="flex min-h-svh items-center justify-center">
        <div className="flex flex-col items-center gap-4 text-center">
          <h2 className="text-xl font-semibold">Access Denied</h2>
          <p className="text-muted-foreground">
            You do not have permission to access this page.
          </p>
          <Button variant="outline" size="sm" onClick={handleLogout}>
            Logout
          </Button>
        </div>
      </div>
    )
  }

  if (isLoading) {
    return (
      <div className="flex min-h-svh items-center justify-center">
        <img
          src={logo}
          alt="Apotek Asasi"
          className="animate-pulse-opacity h-24 w-auto"
        />
      </div>
    )
  }

  if (!isAuthenticated) {
    return null
  }

  return (
    <div className="flex min-h-svh flex-col">
      <header className="flex h-14 shrink-0 items-center justify-between border-b bg-background px-4 lg:px-6">
        <div className="flex items-center gap-4">
          <span className="font-semibold">Absensi App</span>
        </div>
        <div className="flex items-center gap-4">
          {user && (
            <span className="hidden text-xs text-muted-foreground sm:inline-block">
              {user.email}
            </span>
          )}
          <Button variant="outline" size="sm" onClick={handleLogout}>
            Logout
          </Button>
        </div>
      </header>
      <main className="flex-1 p-4 lg:p-6">
        <Outlet />
      </main>
    </div>
  )
}
