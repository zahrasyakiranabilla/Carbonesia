"use client"

import { useEffect, useRef, useState } from "react"

import { cn } from "@/lib/utils"

interface NavbarLink {
  label: string
  href: string
}

interface NavbarItem {
  label: string
  href?: string
  children?: NavbarLink[]
}

interface NavbarProps {
  className?: string
}

const SHOPPING_URL = "https://linktr.ee/ApotekAsasiOnline"

const navbarItems: NavbarItem[] = [
  { label: "BERANDA", href: "/" },
  {
    label: "TENTANG KAMI",
    children: [
      { label: "PROFIL", href: "/tentang/profil" },
      { label: "VISI MISI", href: "/tentang/visi-misi" },
      { label: "SEJARAH", href: "/tentang/sejarah" },
      { label: "STRUKTUR PERUSAHAAN", href: "/tentang/struktur" },
      { label: "PROFIL KEPENGURUSAN", href: "/tentang/kepengurusan" },
    ],
  },
  {
    label: "INFORMASI",
    children: [
      { label: "ARTIKEL", href: "/informasi/artikel" },
      { label: "EVENT", href: "/informasi/event" },
      { label: "MEMBERSHIP", href: "/informasi/membership" },
      { label: "PROMO", href: "/informasi/promo" },
      { label: "LAYANAN", href: "/informasi/layanan" },
    ],
  },
  { label: "KARIR", href: "/karir" },
  { label: "PENGAJUAN", href: "/pengajuan" },
  { label: "APOTEK KAMI", href: "/apotek-kami" },
  { label: "KRITIK DAN SARAN", href: "/kritik-dan-saran" },
]

function DesktopMenu({ activePath }: { activePath: string }) {
  const [openDropdown, setOpenDropdown] = useState<string | null>(null)
  const timeoutRef = useRef<NodeJS.Timeout | null>(null)

  const handleMouseEnter = (label: string) => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current)
    setOpenDropdown(label)
  }

  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => setOpenDropdown(null), 150)
  }

  return (
    <nav className="hidden min-w-0 flex-1 flex-nowrap items-center justify-evenly gap-0 lg:flex">
      {navbarItems.map((item) => {
        const itemActive =
          item.href === activePath ||
          (item.children
            ? item.children.some((child) => child.href === activePath)
            : false)

        return item.children ? (
          <div
            key={item.label}
            className="relative"
            onMouseEnter={() => handleMouseEnter(item.label)}
            onMouseLeave={handleMouseLeave}
          >
            <button
              className={cn(
                "inline-flex flex-shrink-0 items-center gap-0.5 px-1.5 py-1.5 text-[10px] font-medium whitespace-nowrap transition-colors xl:px-2 xl:text-sm",
                itemActive
                  ? "text-[#213E88]"
                  : "text-gray-900 hover:text-[#213E88]"
              )}
            >
              {item.label}
              <span
                className={cn(
                  "inline-block text-[9px] leading-none transition-transform xl:text-[10px]",
                  openDropdown === item.label
                    ? "rotate-180 text-[#213E88]"
                    : "text-gray-500"
                )}
                aria-hidden="true"
              >
                ▾
              </span>
            </button>

            {openDropdown === item.label && (
              <div
                className="absolute top-full left-0 z-50 mt-2 rounded-lg border border-gray-200 bg-white py-2 shadow-lg"
                style={{ minWidth: "max-content" }}
                onMouseEnter={() => handleMouseEnter(item.label)}
                onMouseLeave={handleMouseLeave}
              >
                {item.children.map((child) => (
                  <a
                    key={child.href}
                    href={child.href}
                    className={cn(
                      "block px-4 py-2 text-sm whitespace-nowrap transition-colors",
                      child.href === activePath
                        ? "text-[#213E88]"
                        : "text-gray-700 hover:bg-blue-50 hover:text-blue-600"
                    )}
                  >
                    {child.label}
                  </a>
                ))}
              </div>
            )}
          </div>
        ) : (
          <a
            key={item.href}
            href={item.href}
            className={cn(
              "inline-flex flex-shrink-0 items-center px-1.5 py-1.5 text-[10px] font-medium whitespace-nowrap transition-colors xl:px-2.5 xl:text-sm",
              itemActive
                ? "text-[#213E88]"
                : "text-gray-900 hover:text-blue-600"
            )}
          >
            {item.label}
          </a>
        )
      })}
    </nav>
  )
}

function MobileMenu({ activePath }: { activePath: string }) {
  const [openMenu, setOpenMenu] = useState(false)
  const [openDropdown, setOpenDropdown] = useState<string | null>(null)

  useEffect(() => {
    document.body.style.overflow = openMenu ? "hidden" : ""
    return () => {
      document.body.style.overflow = ""
    }
  }, [openMenu])

  const close = () => {
    setOpenMenu(false)
    setOpenDropdown(null)
  }

  return (
    <>
      <button
        onClick={() => setOpenMenu((v) => !v)}
        className="inline-flex items-center justify-center rounded-md p-2 text-gray-900 transition-colors hover:bg-gray-100 lg:hidden"
        aria-label="Toggle menu"
        aria-expanded={openMenu}
      >
        {openMenu ? (
          <svg
            className="h-6 w-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        ) : (
          <svg
            className="h-6 w-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
        )}
      </button>

      {openMenu && (
        <div className="fixed top-[88px] right-0 left-0 z-50 max-h-[calc(100dvh-88px)] overflow-y-auto bg-white/95 shadow-2xl lg:hidden">
          <div className="container mx-auto divide-y divide-gray-100 px-4 pt-3 pb-6 sm:px-6">
            {navbarItems.map((item) => {
              const itemActive =
                item.href === activePath ||
                (item.children
                  ? item.children.some((child) => child.href === activePath)
                  : false)

              return item.children ? (
                <div key={item.label}>
                  <button
                    onClick={() =>
                      setOpenDropdown(
                        openDropdown === item.label ? null : item.label
                      )
                    }
                    className={cn(
                      "flex w-full items-center justify-between py-4 text-sm font-medium transition-colors",
                      itemActive ? "text-[#213E88]" : "text-gray-900"
                    )}
                  >
                    <span>{item.label}</span>
                    <span
                      className={cn(
                        "text-xs leading-none transition-transform duration-200",
                        openDropdown === item.label
                          ? "rotate-180 text-[#213E88]"
                          : "text-gray-400"
                      )}
                      aria-hidden="true"
                    >
                      ▾
                    </span>
                  </button>
                  <div
                    className={cn(
                      "overflow-hidden transition-all duration-200 ease-in-out",
                      openDropdown === item.label ? "max-h-96 pt-2" : "max-h-0"
                    )}
                  >
                    <div className="space-y-0.5 pb-3">
                      {item.children.map((child) => (
                        <a
                          key={child.href}
                          href={child.href}
                          className={cn(
                            "flex items-center gap-2.5 rounded-lg px-3 py-2.5 text-sm transition-colors",
                            child.href === activePath
                              ? "bg-blue-50 font-medium text-[#213E88]"
                              : "text-gray-600 hover:bg-blue-50 hover:text-[#213E88]"
                          )}
                          onClick={close}
                        >
                          <span className="h-1.5 w-1.5 flex-shrink-0 rounded-full bg-current opacity-40" />
                          {child.label}
                        </a>
                      ))}
                    </div>
                  </div>
                </div>
              ) : (
                <a
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "flex items-center py-4 text-sm font-medium transition-colors",
                    item.href === activePath
                      ? "text-[#213E88]"
                      : "text-gray-900 hover:text-[#213E88]"
                  )}
                  onClick={close}
                >
                  {item.label}
                </a>
              )
            })}
            <div className="py-5">
              <a
                href={SHOPPING_URL}
                target="_blank"
                rel="noreferrer noopener"
                className="flex w-full items-center justify-center rounded-full px-4 py-4 text-center text-sm font-semibold text-white transition-all duration-200 hover:shadow-lg"
                style={{
                  background: "linear-gradient(90deg, #0E2661, #648CF2)",
                }}
                onClick={close}
              >
                BELANJA
                <br />
                SEKARANG
              </a>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export function Navbar({ className }: NavbarProps) {
  const [activePath, setActivePath] = useState("")

  useEffect(() => {
    if (typeof window !== "undefined") setActivePath(window.location.pathname)
  }, [])

  return (
    <header
      data-slot="navbar"
      className={cn(
        "sticky top-0 z-40 w-full rounded-b-[50px] bg-gradient-to-r from-[#213E88] to-[#081022] py-3 shadow-lg",
        className
      )}
      style={{ fontFamily: "Inter, sans-serif" }}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-2 xl:px-8">
        {/* White pill — diperpanjang dengan w-full */}
        <div className="flex items-center justify-between gap-2 rounded-[100px] bg-white px-4 py-2 shadow-lg lg:px-5 xl:gap-4 xl:px-12 xl:py-2.5">
          {/* Logo */}
          <a href="/" className="flex flex-shrink-0 items-center gap-2">
            <img
              src="/logo apotek.png"
              alt="Apotek Asasi"
              className="h-10 w-auto object-cover xl:h-14"
            />
          </a>

          <DesktopMenu activePath={activePath} />

          {/* CTA + Hamburger */}
          <div className="flex flex-shrink-0 items-center gap-2">
            <a
              href={SHOPPING_URL}
              target="_blank"
              rel="noreferrer noopener"
              className="hidden items-center justify-center rounded-full px-3 py-2 text-center text-[10px] leading-tight font-semibold whitespace-nowrap text-white transition-all duration-200 hover:shadow-lg lg:inline-flex xl:px-5 xl:py-3 xl:text-sm"
              style={{ background: "linear-gradient(90deg, #0E2661, #648CF2)" }}
            >
              BELANJA
              <br />
              SEKARANG
            </a>
            <MobileMenu activePath={activePath} />
          </div>
        </div>
      </div>
    </header>
  )
}

function MobileMenu({ links }: { links: NavbarLink[] }) {
  return (
    <Menu.Root>
      <Menu.Trigger>
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
        <Menu.Positioner sideOffset={8}>
          <Menu.Popup className="z-50 min-w-[12rem] overflow-hidden rounded-md border border-border bg-popover p-2 text-popover-foreground shadow-md">
            <nav className="flex flex-col gap-1">
              {links.map((link) => (
                <Menu.Item key={link.href}>
                  <a
                    href={link.href}
                    className="flex w-full items-center rounded-sm px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none"
                  >
                    {link.label}
                  </a>
                </Menu.Item>
              ))}
            </nav>
          </Menu.Popup>
        </Menu.Positioner>
      </Menu.Portal>
    </Menu.Root>
  )
}

export { Navbar }
