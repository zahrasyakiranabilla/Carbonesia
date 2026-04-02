import { createFileRoute, useSearch } from "@tanstack/react-router"
import { LoginPage } from "../../features/auth/components/login-page"

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
  return <LoginPage redirect={redirect} />
}
