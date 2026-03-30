import { Menu } from "@base-ui/react/menu"
import { Button } from "@repo/ui/components/button"
import { cn } from "@repo/ui/lib/utils"

interface NavbarLink {
  label: string
  href: string
}

interface NavbarProps {
  className?: string
  links?: NavbarLink[]
  brandName?: string
}

function Navbar({
  className,
  brandName = "Apotek Asasi",
  links = [
    { label: "Home", href: "/" },
    { label: "About", href: "/about" },
    { label: "Services", href: "/services" },
    { label: "Contact", href: "/contact" },
  ],
}: NavbarProps) {
  return (
    <header
      data-slot="navbar"
      className={cn(
        "sticky top-0 z-50 w-full border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60",
        className
      )}
    >
      <div className="container mx-auto flex h-14 items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Brand */}
        <a href="/" className="flex items-center gap-2 font-heading text-lg font-medium">
          {brandName}
        </a>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-1">
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="inline-flex items-center rounded-md px-3 py-1.5 text-sm font-medium text-muted-foreground transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Mobile Menu */}
        <div className="md:hidden">
          <MobileMenu links={links} />
        </div>
      </div>
    </header>
  )
}

function MobileMenu({ links }: { links: NavbarLink[] }) {
  return (
    <Menu.Root>
      <Menu.Trigger asChild>
        <Button variant="ghost" size="icon" aria-label="Open menu">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <line x1="4" x2="20" y1="12" y2="12" />
            <line x1="4" x2="20" y1="6" y2="6" />
            <line x1="4" x2="20" y1="18" y2="18" />
          </svg>
        </Button>
      </Menu.Trigger>
      <Menu.Portal>
        <Menu.Positioner>
          <Menu.Content
            className="z-50 min-w-[12rem] overflow-hidden rounded-md border border-border bg-popover p-2 text-popover-foreground shadow-md"
            sideOffset={8}
          >
            <nav className="flex flex-col gap-1">
              {links.map((link) => (
                <Menu.Item asChild key={link.href}>
                  <a
                    href={link.href}
                    className="flex items-center rounded-sm px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                  >
                    {link.label}
                  </a>
                </Menu.Item>
              ))}
            </nav>
          </Menu.Content>
        </Menu.Positioner>
      </Menu.Portal>
    </Menu.Root>
  )
}

export { Navbar }
