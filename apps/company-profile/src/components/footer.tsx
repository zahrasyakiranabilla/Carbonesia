import {
  CallIcon,
  InstagramIcon,
  Mail01Icon,
  TiktokIcon,
} from "@hugeicons/core-free-icons"
import { HugeiconsIcon } from "@hugeicons/react"
import { cn } from "@repo/ui/lib/utils"

interface FooterProps {
  className?: string
}

const MailIcon = () => (
  <HugeiconsIcon icon={Mail01Icon} size={20} color="white" />
)

const PhoneIcon = () => (
  <HugeiconsIcon icon={CallIcon} size={20} color="white" />
)

const InstagramIconComponent = () => (
  <HugeiconsIcon icon={InstagramIcon} size={20} color="white" />
)

const ShopeeIcon = () => (
  <img src="/icons/shopee.svg" className="h-5 w-5" alt="Shopee" />
)

const TokopediaIcon = () => (
  <img src="/icons/tokopedia.svg" className="h-5 w-5" alt="Tokopedia" />
)

const TikTokIcon = () => (
  <HugeiconsIcon icon={TiktokIcon} size={20} color="white" />
)

const contacts = [
  {
    icon: <MailIcon />,
    label: "apotik.asasi@gmail.com",
    href: "mailto:apotik.asasi@gmail.com",
  },
  { icon: <PhoneIcon />, label: "081345872345", href: "wa.me/6281345872345" },
  {
    icon: <InstagramIconComponent />,
    label: "apotek_asasi",
    href: "https://instagram.com/apotek_asasi",
  },
  {
    icon: <ShopeeIcon />,
    label: "asasigroup",
    href: "https://shopee.co.id/asasigroup",
  },
  {
    icon: <TokopediaIcon />,
    label: "Apotek Asasi By GoApotik",
    href: "https://www.tokopedia.com/aptasasicologoa",
  },
  {
    icon: <TikTokIcon />,
    label: "asasisurakarta",
    href: "https://tiktok.com/@asasisurakarta",
  },
]

export function Footer({ className }: FooterProps) {
  return (
    <footer
      data-slot="footer"
      className={cn("w-full bg-[#213E88] text-white", className)}
      style={{ fontFamily: "Inter, sans-serif" }}
    >
      <div className="container mx-auto px-4 py-8 pb-4 sm:px-6 sm:py-12 sm:pb-6 lg:px-8">
        <div className="mb-8 grid grid-cols-1 gap-6 sm:mb-12 sm:gap-8 md:grid-cols-3">
          <div>
            <h3 className="mb-4 text-base font-bold sm:mb-6 sm:text-xl">
              Mitra Kerja Sama
            </h3>
            <div className="rounded-lg bg-white p-3 sm:p-4">
              <div className="flex h-20 items-center justify-center sm:h-32">
                <img
                  src="/logo bpjs.jpg"
                  alt="Logo BPJS"
                  className="h-14 w-auto object-contain sm:h-24"
                />
              </div>
            </div>
          </div>

          <div>
            <h3 className="mb-4 text-base font-bold sm:mb-6 sm:text-xl">
              Kontak
            </h3>
            <div className="space-y-2 sm:space-y-3">
              {contacts.map(({ icon, label, href }) => (
                <a
                  key={href}
                  href={href}
                  target={href.startsWith("http") ? "_blank" : undefined}
                  rel={
                    href.startsWith("http") ? "noopener noreferrer" : undefined
                  }
                  className="group flex items-center gap-2 sm:gap-3"
                >
                  <span className="flex-shrink-0 opacity-80 transition-opacity group-hover:opacity-100">
                    {icon}
                  </span>
                  <span className="text-sm text-white/80 transition-colors group-hover:text-white sm:text-lg">
                    {label}
                  </span>
                </a>
              ))}
            </div>
          </div>

          <div>
            <h3 className="mb-4 text-base font-bold sm:mb-6 sm:text-xl">
              Lokasi Kantor
            </h3>
            <div className="mb-3 h-36 overflow-hidden rounded-lg sm:mb-4 sm:h-48">
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
            <p className="text-sm text-blue-100 sm:text-lg">
              Panasan Baru, RT.1/RW.2, Tanjungsari, Ngesrep, Kec. Ngemplak,
              Kabupaten Boyolali, Jawa Tengah 57375
            </p>
          </div>
        </div>

        <div className="border-white-700 border-t pt-4 sm:pt-6">
          <p className="text-xs text-blue-100 sm:text-sm">
            &copy; {new Date().getFullYear()} Apotek Asasi. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}
