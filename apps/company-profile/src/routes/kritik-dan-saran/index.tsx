import { createFileRoute } from '@tanstack/react-router'
import { Breadcrumb } from '../../components/breadcrumb'
import { Underline } from '../../components/underline'

export const Route = createFileRoute('/kritik-dan-saran/')({
  component: KritikDanSaranPage,
})

function KritikDanSaranPage() {
  return (
    <div>
      <Breadcrumb
        items={[
          { label: 'Beranda', href: '/' },
          { label: 'Kritik dan Saran' },
        ]}
      />

      <div className="max-w-5xl mx-auto px-6 py-10">
        {/* Judul */}
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold mb-2"> 
            <Underline>Formulir Kritik & Saran</Underline>
          </h1>
          <p className="text-gray-400 text-sm">
            Berikan saran dan kritik Anda untuk membantu kami meningkatkan pelayanan
          </p>
        </div>

        {/* Form */}
        <form className="flex flex-col gap-5">
          {/* Nama Depan & Nama Belakang */}
          <div className="grid grid-cols-2 gap-4">
            <div className="flex flex-col gap-1">
              <label className="text-sm font-medium">
                Nama Depan<span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                placeholder="Nama depan"
                className="border rounded-md px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div className="flex flex-col gap-1">
              <label className="text-sm font-medium">
                Nama Belakang<span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                placeholder="Nama belakang"
                className="border rounded-md px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          {/* Email */}
          <div className="flex flex-col gap-1">
            <label className="text-sm font-medium">
              Email<span className="text-red-500">*</span>
            </label>
            <input
              type="email"
              placeholder="Email"
              className="border rounded-md px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Nomor HP */}
          <div className="flex flex-col gap-1">
            <label className="text-sm font-medium">
              Nomor HP<span className="text-red-500">*</span>
            </label>
            <input
              type="tel"
              placeholder="Nomor HP"
              className="border rounded-md px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Kritik dan Saran */}
          <div className="flex flex-col gap-1">
            <label className="text-sm font-medium">
              Kritik dan Saran<span className="text-red-500">*</span>
            </label>
            <textarea
              placeholder="Kritik dan saran"
              rows={5}
              className="border rounded-md px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-blue-500 resize-none"
            />
          </div>

          {/* Tombol Kirim */}
          <div className="flex justify-center">
            <button
              type="submit"
              className="bg-[#213E88] text-white px-8 py-2 rounded-xl text-sm font-medium hover:bg-blue-800 transition"
            >
              Kirim
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}