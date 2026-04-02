import { Outlet, createFileRoute } from "@tanstack/react-router"
import { Button } from "@repo/ui/components/button"
import { Separator } from "@repo/ui/components/separator"
import { useAuth } from "../features/auth/hooks"
import { Sidebar } from "../components/dashboard/sidebar"

export const Route = createFileRoute("/_layout")({
  component: DashboardLayout,
})

function DashboardLayout() {
  const { logout, user, isLoading, isAuthenticated } = useAuth()

  // Show loading state while checking auth
  if (isLoading) {
    return (
      <div className="min-h-svh flex items-center justify-center">
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
    <div className="min-h-svh flex flex-col">
      <header className="border-b bg-background">
        <div className="flex h-14 items-center justify-between px-4">
          <div className="flex items-center gap-4">
            <Sidebar />
          </div>
          <div className="flex items-center gap-4">
            {user && (
              <span className="text-xs text-muted-foreground">
                {user.email}
              </span>
            )}
            <Separator orientation="vertical" className="h-6" />
            <Button variant="outline" size="sm" onClick={handleLogout}>
              Logout
            </Button>
          </div>
        </div>
      </header>
      <div className="flex flex-1">
        <main className="flex-1 p-6">
          <Outlet />
        </main>
      </div>
    </div>
  )
}
