import { Button } from "@repo/ui/components/button"
import { Separator } from "@repo/ui/components/separator"
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@repo/ui/components/sidebar"
import { createFileRoute, Outlet } from "@tanstack/react-router"

import { AppSidebar } from "../components/dashboard/app-sidebar"
import { useAuth } from "../features/auth/hooks"

export const Route = createFileRoute("/_layout")({
  component: DashboardLayout,
})

function DashboardLayout() {
  const { logout, user, isLoading, isAuthenticated } = useAuth()

  // Show loading state while checking auth
  if (isLoading) {
    return (
      <div className="flex min-h-svh items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="size-8 animate-spin rounded-full border-4 border-primary border-t-transparent" />
          <p className="text-muted-foreground">Loading...</p>
        </div>
      </div>
    )
  }

  // Don't render layout if not authenticated (redirect will happen)
  if (!isAuthenticated) {
    return null
  }

  const handleLogout = async () => {
    try {
      await logout()
    } catch {
      // Clear local state regardless of API failure
    }
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
