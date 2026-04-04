import { cn } from "@repo/ui/lib/utils"

interface FooterLink {
  label: string
  href: string
}

interface FooterSection {
  title: string
  links: FooterLink[]
}

interface FooterProps {
  className?: string
  sections?: FooterSection[]
  companyName?: string
  copyrightYear?: string
}

function Footer({
  className,
  sections = [
    {
      title: "Company",
      links: [
        { label: "About", href: "/about" },
        { label: "Careers", href: "/careers" },
        { label: "Press", href: "/press" },
      ],
    },
    {
      title: "Resources",
      links: [
        { label: "Blog", href: "/blog" },
        { label: "FAQ", href: "/faq" },
        { label: "Support", href: "/support" },
      ],
    },
    {
      title: "Legal",
      links: [
        { label: "Privacy", href: "/privacy" },
        { label: "Terms", href: "/terms" },
        { label: "Cookies", href: "/cookies" },
      ],
    },
  ],
  companyName = "Apotek Asasi",
  copyrightYear = new Date().getFullYear().toString(),
}: FooterProps) {
  return (
    <footer
      data-slot="footer"
      className={cn("w-full border-t border-border bg-background", className)}
    >
      <div className="container mx-auto px-4 py-12 sm:px-6 lg:px-8">
        {/* Main Footer Content */}
        <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
          {/* Brand Section */}
          <div className="col-span-2 md:col-span-1">
            <h3 className="font-heading text-lg font-medium">{companyName}</h3>
            <p className="mt-4 text-sm text-balance text-muted-foreground">
              Your trusted healthcare partner.
            </p>
          </div>

          {/* Link Sections */}
          {sections.map((section) => (
            <div key={section.title}>
              <h4 className="font-heading text-sm font-medium">
                {section.title}
              </h4>
              <ul className="mt-4 space-y-3">
                {section.links.map((link) => (
                  <li key={link.href}>
                    <a
                      href={link.href}
                      className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 border-t border-border pt-8">
          <p className="text-sm text-muted-foreground">
            &copy; {copyrightYear} {companyName}. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}

export { Footer }
