import { useEffect, useMemo } from "react"
import logo from "@repo/assets/images/logo-apotek.png"
import { Button } from "@repo/ui/components/button"
import { Separator } from "@repo/ui/components/separator"
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@repo/ui/components/sidebar"
import { createFileRoute, Outlet, useNavigate } from "@tanstack/react-router"

import { AppSidebar } from "../components/dashboard/app-sidebar"
import { useAuth } from "../features/auth/hooks"
import { isAdmin } from "../features/auth/types"

export const Route = createFileRoute("/_layout")({
  component: DashboardLayout,
})

function DashboardLayout() {
  const { logout, user, isLoading, isAuthenticated } = useAuth()
  const navigate = useNavigate()

  const userIsAdmin = useMemo(() => isAdmin(user), [user])

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

  if (!isLoading && isAuthenticated && !userIsAdmin) {
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

  // Show loading state while checking auth
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

  // Don't render layout if not authenticated (redirect will happen)
  if (!isAuthenticated) {
    return null
  }

  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <header className="flex h-14 shrink-0 items-center justify-between border-b bg-background px-4 lg:px-6">
          <div className="flex items-center gap-4">
            <SidebarTrigger />
          </div>
          <div className="flex items-center gap-4">
            {user && (
              <span className="hidden text-xs text-muted-foreground sm:inline-block">
                {user.email}
              </span>
            )}
            <Separator orientation="vertical" className="hidden h-6 sm:block" />
            <Button variant="outline" size="sm" onClick={handleLogout}>
              Logout
            </Button>
          </div>
        </header>
        <main className="flex-1 p-4 lg:p-6">
          <Outlet />
        </main>
      </SidebarInset>
    </SidebarProvider>
  )
}
