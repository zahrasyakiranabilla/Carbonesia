import * as React from "react"
import { Toaster } from "@repo/ui/components/sonner"
import { TooltipProvider } from "@repo/ui/components/tooltip"
import appCss from "@repo/ui/globals.css?url"
import { createRootRoute, HeadContent, Scripts } from "@tanstack/react-router"

import { QueryProvider } from "../components/providers/query-provider"
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
        title: "Absensi",
      },
    ],
    links: [
      {
        rel: "stylesheet",
        href: appCss,
      },
    ],
  }),
  shellComponent: RootDocument,
})

function RootDocument({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <HeadContent />
      </head>
      <body>
        <QueryProvider>
          <AuthProvider>
            <TooltipProvider>{children}</TooltipProvider>
            <Toaster />
          </AuthProvider>
        </QueryProvider>
        <Scripts />
      </body>
    </html>
  )
}
