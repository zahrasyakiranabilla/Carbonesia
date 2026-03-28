import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@repo/ui/components/card"
import { createFileRoute } from "@tanstack/react-router"

export const Route = createFileRoute("/")({ component: UnderConstruction })

function UnderConstruction() {
  return (
    <div className="flex min-h-svh items-center justify-center p-6">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <div className="mb-2 text-6xl">🚧</div>
          <CardTitle>Under Construction</CardTitle>
        </CardHeader>
        <CardContent className="text-center text-muted-foreground">
          <p>We&apos;re building something amazing.</p>
          <p className="mt-2 text-sm">Check back soon!</p>
        </CardContent>
      </Card>
    </div>
  )
}
