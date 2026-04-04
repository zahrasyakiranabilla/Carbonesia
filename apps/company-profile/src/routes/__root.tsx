import { TooltipProvider } from "@repo/ui/components/tooltip"
import appCss from "@repo/ui/globals.css?url"
import { createRootRoute, HeadContent, Scripts } from "@tanstack/react-router"

import { Footer } from "../components/footer"
import { Navbar } from "../components/navbar"

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
        title: "Apotek Asasi",
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
      <body className="flex min-h-dvh flex-col">
        <TooltipProvider>
          <Navbar />
          <main className="flex-1">{children}</main>
          <Footer />
        </TooltipProvider>
        <Scripts />
      </body>
    </html>
  )
}
