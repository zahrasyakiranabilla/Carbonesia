import { useState } from 'react'
import { createFileRoute } from '@tanstack/react-router'
import { Breadcrumb } from '../../../components/breadcrumb'
import { ChevronDown } from 'lucide-react'

const layanan = [
    {
        id: 1,
        title: "Dokter",
        image: null,
        excerpt: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book."
    },
    {
        id: 2,
        title: "Dokter",
        image: null,
        excerpt: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book." 
    },
    {
        id: 3,
        title: "Dokter",
        image: null,
        excerpt: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book." 
    },  
    {
        id: 4,
        title: "Dokter",
        image: null,
        excerpt: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book."
    },
    {
        id: 5,
        title: "Dokter",
        image: null,
        excerpt: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book."
    },
    {
        id: 6,
        title: "Dokter",
        image: null,
        excerpt: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book."
    }, 
]

export const Route = createFileRoute('/informasi/layanan/')({
  component: LayananPage,
})

export default function LayananPage() {
  const [openId, setOpenId] = useState<number | null>(null)

  return (
    <div>
      <Breadcrumb items={[
        { label: 'Beranda', href: '/' },
        { label: 'Layanan' }
      ]} />
      <div className="max-w-4xl mx-auto px-6 pt-10 pb-12 grid grid-cols-3 gap-6 items-center">
        {layanan.map((service) => {
          const isOpen = openId === service.id
          return (
            <div
              key={service.id}
              className={`border rounded-xl overflow-hidden shadow-[0_4px_6px_rgba(0,0,0,0.1)] transition-colors duration-300 ${isOpen ? 'bg-white' : 'bg-[#213E88]'}`}
            >
              <div className="mx-3 mt-3 h-65 bg-gray-200 rounded-lg" />

              {/* Excerpt — smooth slide down */}
              <div className={`overflow-hidden transition-all duration-300 ${isOpen ? 'max-h-96' : 'max-h-0'}`}>
                <p className="px-4 pt-3 pb-2 text-sm text-gray-600 text-justify">
                  {service.excerpt}
                </p>
              </div>

              {/* Footer */}
              <button
                onClick={() => setOpenId(isOpen ? null : service.id)}
                className={`w-full flex items-center justify-between px-4 py-3 transition-colors duration-300 ${isOpen ? 'text-[#213E88]' : 'text-white'}`}
              >
                {/* Judul — smooth slide out */}
                <div className={`overflow-hidden transition-all duration-300 ${isOpen ? 'max-w-0 opacity-0' : 'max-w-full opacity-100'}`}>
                  <h3 className="text-sm font-bold whitespace-nowrap">{service.title}</h3>
                </div>

                <ChevronDown
                  className={`w-4 h-4 shrink-0 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}
                />
              </button>
            </div>
          )
        })}
      </div>
    </div>
  )
}