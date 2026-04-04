import { useEffect } from "react"
import { useAuth } from "@/features/auth"
import { LoginPage } from "@/features/auth/components/login-page"
import { createFileRoute, useNavigate, useSearch } from "@tanstack/react-router"

export const Route = createFileRoute("/login/")({
  component: RouteComponent,
  validateSearch: (search: Record<string, unknown>) => {
    return {
      redirect: typeof search.redirect === "string" ? search.redirect : "/",
    }
  },
})

function RouteComponent() {
  const { redirect } = useSearch({ strict: false })
  const { isAuthenticated, isLoading } = useAuth()
  const navigate = useNavigate()

  // Redirect to dashboard if already authenticated
  useEffect(() => {
    if (!isLoading && isAuthenticated) {
      navigate({ to: "/" })
    }
  }, [isAuthenticated, isLoading, navigate])

  // Show nothing while checking auth state to prevent flash
  if (isLoading) {
    return null
  }

  // Don't render login page if authenticated (will redirect)
  if (isAuthenticated) {
    return null
  }

  return <LoginPage redirect={redirect} />
}
