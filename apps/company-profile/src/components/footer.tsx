'use client'

import { cn } from '@/lib/utils'
import { SiShopee } from 'react-icons/si'

interface FooterProps {
  className?: string
}

const MailIcon = () => (
  <svg viewBox="0 0 24 24" className="h-5 w-5 fill-white">
    <path d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>
  </svg>
)

const PhoneIcon = () => (
  <svg viewBox="0 0 24 24" className="h-5 w-5 fill-white">
    <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z"/>
  </svg>
)

const InstagramIcon = () => (
  <svg viewBox="0 0 24 24" className="h-5 w-5 fill-white">
    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
  </svg>
)

// Shopee icon 
const ShopeeIcon = () => (
  <SiShopee size={20} color="white" />
)

// Tokopedia icon 
const TokopediaIcon = () => (
  <img
    src="/tokopedia.svg"
    className="h-5 w-5 invert brightness-0"
  />
)

const TikTokIcon = () => (
  <svg viewBox="0 0 24 24" className="h-5 w-5 fill-white">
    <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 0 0-.79-.05 6.34 6.34 0 0 0-6.34 6.34 6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.33-6.34V8.67a8.17 8.17 0 0 0 4.78 1.52V6.74a4.85 4.85 0 0 1-1.01-.05z"/>
  </svg>
)

const contacts = [
  { icon: <MailIcon />, label: 'apotik.asasi@gmail.com', href: 'mailto:apotik.asasi@gmail.com' },
  { icon: <PhoneIcon />, label: '081345872345', href: 'wa.me/6281345872345' },
  { icon: <InstagramIcon />, label: 'apotek_asasi', href: 'https://instagram.com/apotek_asasi' },
  { icon: <ShopeeIcon />, label: 'asasigroup', href: 'https://shopee.co.id/asasigroup' },
  { icon: <TokopediaIcon />, label: 'Apotek Asasi By GoApotik', href: 'https://www.tokopedia.com/aptasasicologoa' },
  { icon: <TikTokIcon />, label: 'asasisurakarta', href: 'https://tiktok.com/@asasisurakarta' },
]

export function Footer({ className }: FooterProps) {
  return (
    <footer
      data-slot="footer"
      className={cn('w-full bg-[#213E88] text-white', className)}
      style={{ fontFamily: 'Inter, sans-serif' }}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 pb-4 sm:pb-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 mb-8 sm:mb-12">

          {/* Mitra Kerja Sama */}
          <div>
            <h3 className="text-base sm:text-xl font-bold mb-4 sm:mb-6">Mitra Kerja Sama</h3>
            <div className="bg-white rounded-lg p-3 sm:p-4">
              <div className="h-20 sm:h-32 flex items-center justify-center">
                <img src="/logo bpjs.jpg" alt="Logo BPJS" className="h-14 sm:h-24 w-auto object-contain" />
              </div>
            </div>
          </div>

          {/* Kontak */}
          <div>
            <h3 className="text-base sm:text-xl font-bold mb-4 sm:mb-6">Kontak</h3>
            <div className="space-y-2 sm:space-y-3">
              {contacts.map(({ icon, label, href }) => (
                <a
                  key={href}
                  href={href}
                  target={href.startsWith('http') ? '_blank' : undefined}
                  rel={href.startsWith('http') ? 'noopener noreferrer' : undefined}
                  className="flex items-center gap-2 sm:gap-3 group"
                >
                  <span className="opacity-80 group-hover:opacity-100 transition-opacity flex-shrink-0">
                    {icon}
                  </span>
                  <span className="text-sm sm:text-lg text-white/80 group-hover:text-white transition-colors">
                    {label}
                  </span>
                </a>
              ))}
            </div>
          </div>

          {/* Lokasi Kantor */}
          <div>
            <h3 className="text-base sm:text-xl font-bold mb-4 sm:mb-6">Lokasi Kantor</h3>
            <div className="rounded-lg h-36 sm:h-48 mb-3 sm:mb-4 overflow-hidden">
              <iframe
                title="Google Maps - Apotek Asasi"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3953.668366395708!2d110.743378!3d-7.512395!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e7a1327c743e313%3A0x39fa8f991e9b07b4!2sApotek%20Asasi%201%20Mangu%20Ngemplak%20Boyolali!5e0!3m2!1sid!2sid!4v1710000000000"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
            <p className="text-sm sm:text-lg text-blue-100">
              Panasan Baru, RT.1/RW.2, Tanjungsari, Ngesrep, Kec. Ngemplak, Kabupaten Boyolali, Jawa Tengah 57375
            </p>
          </div>
        </div>

        <div className="border-t border-white-700 pt-4 sm:pt-6">
          <p className="text-xs sm:text-sm text-blue-100">
            &copy; {new Date().getFullYear()} Apotek Asasi. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}