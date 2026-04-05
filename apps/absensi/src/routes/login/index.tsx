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

  useEffect(() => {
    if (!isLoading && isAuthenticated) {
      navigate({ to: "/" })
    }
  }, [isAuthenticated, isLoading, navigate])

  if (isLoading) {
    return null
  }

  if (isAuthenticated) {
    return null
  }

  return <LoginPage redirect={redirect} />
}
