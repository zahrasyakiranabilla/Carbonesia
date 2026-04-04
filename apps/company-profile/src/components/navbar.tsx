'use client'

import { useState, useRef, useEffect } from 'react'
import { cn } from '@/lib/utils'

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

const SHOPPING_URL = 'https://linktr.ee/ApotekAsasiOnline'

const navbarItems: NavbarItem[] = [
  { label: 'BERANDA', href: '/' },
  {
    label: 'TENTANG KAMI',
    children: [
      { label: 'PROFIL', href: '/tentang/profil' },
      { label: 'VISI MISI', href: '/tentang/visi-misi' },
      { label: 'SEJARAH', href: '/tentang/sejarah' },
      { label: 'STRUKTUR PERUSAHAAN', href: '/tentang/struktur' },
      { label: 'PROFIL KEPENGURUSAN', href: '/tentang/kepengurusan' },
    ],
  },
  {
    label: 'INFORMASI',
    children: [
      { label: 'ARTIKEL', href: '/informasi/artikel' },
      { label: 'EVENT', href: '/informasi/event' },
      { label: 'MEMBERSHIP', href: '/informasi/membership' },
      { label: 'PROMO', href: '/informasi/promo' },
      { label: 'LAYANAN', href: '/informasi/layanan' },
    ],
  },
  { label: 'KARIR', href: '/karir' },
  { label: 'PENGAJUAN', href: '/pengajuan' },
  { label: 'APOTEK KAMI', href: '/apotek-kami' },
  { label: 'KRITIK DAN SARAN', href: '/kritik-dan-saran' },
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
    <nav className="hidden lg:flex items-center justify-evenly gap-0 flex-1 min-w-0 flex-nowrap">
      {navbarItems.map((item) => {
        const itemActive =
          item.href === activePath ||
          (item.children ? item.children.some((child) => child.href === activePath) : false)

        return item.children ? (
          <div
            key={item.label}
            className="relative"
            onMouseEnter={() => handleMouseEnter(item.label)}
            onMouseLeave={handleMouseLeave}
          >
            <button
              className={cn(
                'inline-flex items-center flex-shrink-0 gap-0.5 px-1.5 xl:px-2 py-1.5 text-[10px] xl:text-sm font-medium transition-colors whitespace-nowrap',
                itemActive ? 'text-[#213E88]' : 'text-gray-900 hover:text-[#213E88]'
              )}
            >
              {item.label}
              <span
                className={cn(
                  'inline-block text-[9px] xl:text-[10px] leading-none transition-transform',
                  openDropdown === item.label ? 'rotate-180 text-[#213E88]' : 'text-gray-500'
                )}
                aria-hidden="true"
              >
                ▾
              </span>
            </button>

            {openDropdown === item.label && (
              <div
                className="absolute top-full left-0 mt-2 bg-white border border-gray-200 rounded-lg shadow-lg py-2 z-50"
                style={{ minWidth: 'max-content' }}
                onMouseEnter={() => handleMouseEnter(item.label)}
                onMouseLeave={handleMouseLeave}
              >
                {item.children.map((child) => (
                  <a
                    key={child.href}
                    href={child.href}
                    className={cn(
                      'block px-4 py-2 text-sm transition-colors whitespace-nowrap',
                      child.href === activePath
                        ? 'text-[#213E88]'
                        : 'text-gray-700 hover:bg-blue-50 hover:text-blue-600'
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
              'inline-flex items-center flex-shrink-0 px-1.5 xl:px-2.5 py-1.5 text-[10px] xl:text-sm font-medium transition-colors whitespace-nowrap',
              itemActive ? 'text-[#213E88]' : 'text-gray-900 hover:text-blue-600'
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
    document.body.style.overflow = openMenu ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [openMenu])

  const close = () => { setOpenMenu(false); setOpenDropdown(null) }

  return (
    <>
      <button
        onClick={() => setOpenMenu((v) => !v)}
        className="lg:hidden inline-flex items-center justify-center p-2 rounded-md text-gray-900 hover:bg-gray-100 transition-colors"
        aria-label="Toggle menu"
        aria-expanded={openMenu}
      >
        {openMenu ? (
          <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        ) : (
          <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        )}
      </button>

      {openMenu && (
        <div className="lg:hidden fixed left-0 right-0 top-[88px] z-50 bg-white/95 shadow-2xl overflow-y-auto max-h-[calc(100dvh-88px)]">
          <div className="container mx-auto px-4 sm:px-6 pt-3 pb-6 divide-y divide-gray-100">
            {navbarItems.map((item) => {
              const itemActive =
                item.href === activePath ||
                (item.children ? item.children.some((child) => child.href === activePath) : false)

              return item.children ? (
                <div key={item.label}>
                  <button
                    onClick={() => setOpenDropdown(openDropdown === item.label ? null : item.label)}
                    className={cn(
                      'w-full flex items-center justify-between py-4 text-sm font-medium transition-colors',
                      itemActive ? 'text-[#213E88]' : 'text-gray-900'
                    )}
                  >
                    <span>{item.label}</span>
                    <span
                      className={cn(
                        'text-xs leading-none transition-transform duration-200',
                        openDropdown === item.label ? 'rotate-180 text-[#213E88]' : 'text-gray-400'
                      )}
                      aria-hidden="true"
                    >
                      ▾
                    </span>
                  </button>
                  <div
                    className={cn(
                      'overflow-hidden transition-all duration-200 ease-in-out',
                      openDropdown === item.label ? 'max-h-96 pt-2' : 'max-h-0'
                    )}
                  >
                    <div className="pb-3 space-y-0.5">
                      {item.children.map((child) => (
                        <a
                          key={child.href}
                          href={child.href}
                          className={cn(
                            'flex items-center gap-2.5 px-3 py-2.5 text-sm rounded-lg transition-colors',
                            child.href === activePath
                              ? 'text-[#213E88] font-medium bg-blue-50'
                              : 'text-gray-600 hover:text-[#213E88] hover:bg-blue-50'
                          )}
                          onClick={close}
                        >
                          <span className="w-1.5 h-1.5 rounded-full bg-current opacity-40 flex-shrink-0" />
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
                    'flex items-center py-4 text-sm font-medium transition-colors',
                    item.href === activePath ? 'text-[#213E88]' : 'text-gray-900 hover:text-[#213E88]'
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
                className="flex items-center justify-center w-full px-4 py-4 text-sm font-semibold text-white rounded-full text-center transition-all duration-200 hover:shadow-lg"
                style={{ background: 'linear-gradient(90deg, #0E2661, #648CF2)' }}
                onClick={close}
              >
                BELANJA<br />SEKARANG
              </a>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export function Navbar({ className }: NavbarProps) {
  const [activePath, setActivePath] = useState('')

  useEffect(() => {
    if (typeof window !== 'undefined') setActivePath(window.location.pathname)
  }, [])

  return (
    <header
      data-slot="navbar"
      className={cn(
        'sticky top-0 z-40 w-full rounded-b-[50px] bg-gradient-to-r from-[#213E88] to-[#081022] py-3 shadow-lg',
        className
      )}
      style={{ fontFamily: 'Inter, sans-serif' }}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-2 xl:px-8">
        {/* White pill — diperpanjang dengan w-full */}
        <div className="bg-white rounded-[100px] px-4 lg:px-5 xl:px-12 py-2 xl:py-2.5 shadow-lg flex items-center justify-between gap-2 xl:gap-4">
          {/* Logo */}
          <a href="/" className="flex items-center gap-2 flex-shrink-0">
            <img
              src="/logo apotek.png"
              alt="Apotek Asasi"
              className="h-10 xl:h-14 w-auto object-cover"
            />
          </a>

          <DesktopMenu activePath={activePath} />

          {/* CTA + Hamburger */}
          <div className="flex items-center gap-2 flex-shrink-0">
            <a
              href={SHOPPING_URL}
              target="_blank"
              rel="noreferrer noopener"
              className="hidden lg:inline-flex items-center justify-center text-[10px] xl:text-sm font-semibold text-white rounded-full px-3 py-2 xl:px-5 xl:py-3 whitespace-nowrap text-center transition-all duration-200 hover:shadow-lg leading-tight"
              style={{ background: 'linear-gradient(90deg, #0E2661, #648CF2)' }}
            >
              BELANJA<br />SEKARANG
            </a>
            <MobileMenu activePath={activePath} />
          </div>
        </div>
      </div>
    </header>
  )
}