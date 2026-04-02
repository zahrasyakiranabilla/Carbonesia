import { Outlet, createFileRoute, redirect } from "@tanstack/react-router"
import { Button } from "@repo/ui/components/button"
import { hasAccessToken } from "../features/auth"
import { useAuth } from "../features/auth/hooks"

export const Route = createFileRoute("/_layout")({
  beforeLoad: async ({ location }) => {
    // Check for auth token in memory
    // Note: On page refresh, token is lost - use hasAccessToken() to check
    // The AuthProvider will attempt to restore session via refresh cookie
    if (!hasAccessToken()) {
      // Redirect to login with redirect state
      throw redirect({
        to: "/login",
        search: {
          redirect: location.pathname + location.search || "/",
        },
      })
    }
  },
  component: DashboardLayout,
})

function DashboardLayout() {
  const { logout, user } = useAuth()

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
            <h1 className="text-sm font-semibold">Dashboard</h1>
          </div>
          <div className="flex items-center gap-4">
            {user && (
              <span className="text-xs text-muted-foreground">
                {user.email}
              </span>
            )}
            <Button variant="outline" size="sm" onClick={handleLogout}>
              Logout
            </Button>
          </div>
        </div>
      </header>
      <main className="flex-1 p-4">
        <Outlet />
      </main>
    </div>
  )
}
