import { createFileRoute } from '@tanstack/react-router'
import { Breadcrumb } from '../../../components/breadcrumb'


const promos = [
    {
        id: 1,
        title: "Lorem Ipsum is Simply Dummy Text",
        date: "14 Maret 2026 - 20 Maret 2026",
        image: null
    },
    {
        id: 2,
        title: "Lorem Ipsum is Simply Dummy Text",
        date: "14 Maret 2026 - 20 Maret 2026",
        image: null
    },
    {
        id: 3,
        title: "Lorem Ipsum is Simply Dummy Text",
        date: "14 Maret 2026 - 20 Maret 2026",
        image: null
    },
    {
        id: 4,
        title: "Lorem Ipsum is Simply Dummy Text",
        date: "14 Maret 2026 - 20 Maret 2026",
        image: null
    },
]


export const Route = createFileRoute('/informasi/promo/')({
  component: PromoPage,
})

export default function PromoPage() {
    return (
        <div>
            <Breadcrumb items={[
                { label: 'Beranda', href: '/' },
                { label: 'Promo' }
            ]} /> 

            <div className="grid grid-cols-2 gap-10 max-w-5xl mx-auto py-8">
                {promos.map((promo) => (
                    <div key={promo.id} className="border rounded-xl flex flex-col shadow-[0_4px_6px_rgba(0,0,0,0.1)]">
                        <div className="w-full h-50 bg-gray-200 rounded-t-xl" />
                        <div className="px-4 py-3 flex flex-col gap-2">
                            <h3 className="text-sm font-bold">{promo.title}</h3>
                            <p className='text-xs text-gray-400'>{promo.date}</p>
                        </div>
                    </div>
                ))}
            </div>

            <div className='flex justify-center mb-10'>
                <button className='px-6 py-3 bg-[#213E88] text-white rounded-lg text-sm font-bold'>Muat Lebih Banyak</button>
            </div>
        </div>
    )
}