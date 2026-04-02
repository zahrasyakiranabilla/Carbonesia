import { HeadContent, Scripts, createRootRoute } from "@tanstack/react-router"

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
  shellComponent: RootDocument,
})

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
