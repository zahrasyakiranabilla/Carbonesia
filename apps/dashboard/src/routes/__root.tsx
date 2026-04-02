import { HeadContent, Scripts, createRootRoute } from "@tanstack/react-router"
import * as React from "react"

import appCss from "@repo/ui/globals.css?url"
import { TooltipProvider } from "@repo/ui/components/tooltip"
import { Toaster } from "@repo/ui/components/sonner"
import { AuthProvider } from "../features/auth"

export const Route = createRootRoute({
  head: () => ({
    meta: [
      {
        charSet: "utf-8",
      },
      {
        name: "viewport",
        content: "width=device-width, initial-scale=1",
      },
      {
        title: "Dashboard",
      },
    ],
    links: [
      {
        rel: "stylesheet",
        href: appCss,
      },
    ],
  }),
  notFoundComponent: NotFound,
  shellComponent: RootDocument,
})

function NotFound() {
  return (
    <div className="min-h-svh flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-2xl font-semibold">404</h1>
        <p className="text-muted-foreground">Page not found</p>
      </div>
    </div>
  )
}

function RootDocument({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <HeadContent />
      </head>
      <body>
        <AuthProvider>
          <TooltipProvider>{children}</TooltipProvider>
          <Toaster />
        </AuthProvider>
        <Scripts />
      </body>
    </html>
  )
}
