import { createFileRoute } from '@tanstack/react-router'
import { Breadcrumb } from '../../../components/breadcrumb'
import { BadgePercent, CrossIcon, Gift } from 'lucide-react'


export const Route = createFileRoute('/informasi/membership/')({
  component: MembershipPage,
})

const membership = [
    {
        id: 1,
        title: "Harga Spesial Member",
        excerpt: "Dapatkan potongan harga khusus untuk berbagai produk kesehatan pilihan.",
        icon: BadgePercent
    },
    {
        id: 2,
        title: "Akses Layanan Kesehatan Eksklusif",
        excerpt: "Dapatkan tips kesehatan, informasi obat, dan layanan konsultasi dari tim farmasi kami.",
        icon: CrossIcon
    },
    {
        id: 3,
        title: "Promo & Benefit Ekslusif",
        excerpt: "Nikmati berbagai promo, voucher, dan benefit khusus hanya untuk member.",
        icon: Gift
    }
]

export default function MembershipPage() {
    return (
        <div>
            <Breadcrumb items={[
                { label: 'Beranda', href: '/' },
                { label: 'Membership' }
            ]} />

            <div className="max-w-4xl mx-auto px-6 pt-10 pb-12">
                <div className="flex items-center gap-12">
                    
                    {/* Logo */}
                    <div className="w-2/5 shrink-0 flex justify-center">
                        <img src="/logo membership.png" alt="Membership" className="w-full max-w-xs" />
                    </div>

                    {/* Content */}
                    <div className="w-3/5 flex flex-col gap-6">
                        <div>
                            <h2 className="text-2xl font-bold mb-2">Apotek Asasi Membership</h2>
                            <p className="text-sm text-justify">
                                Dapatkan berbagai keuntungan dan kemudahan dalam membeli obat.
                            </p>
                        </div>

                        {/* Benefits */}
                        <div className="flex flex-col gap-4">
                            {membership.map((item) => (
                                <div key={item.id} className="relative flex items-center border rounded-2xl pl-16 pr-5 py-2 ml-8">
                                    {/* Icon */}
                                    <div className="absolute -left-8 w-20 h-20 rounded-full bg-[#213E88] shrink-0 flex items-center justify-center">
                                        <item.icon className="w-10 h-10 text-white" />
                                    </div>
                                    {/* Teks */}
                                    <div>
                                        <h3 className="text-sm font-bold mb-1">{item.title}</h3>
                                        <p className="text-xs text-justify">{item.excerpt}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}