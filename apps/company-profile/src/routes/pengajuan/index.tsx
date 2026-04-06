import { useState } from 'react'
import { createFileRoute } from '@tanstack/react-router'
import { Breadcrumb } from '../../components/breadcrumb'
import { Underline } from '../../components/underline'

export const Route = createFileRoute('/pengajuan/')({
  component: PengajuanPage,
})

const pengajuan = [
    {
        id: 1,
        title: "Pembelian Skala Besar/Kecil",
        icon: null,
        formTitle: "Form Pengajuan Pembelian Skala Besar/Kecil",
        description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.",
        fields: [
            { name: "namaInstansi", label: "Nama Perusahaan/Instansi", placeholder: "Nama perusahaan/instansi", type: "text", required: true },
            { name: "jenisDanJumlahProduk", label: "Jenis dan Jumlah Produk", placeholder: "Jenis Produk", type: "text-with-number", required: true },
            { name: "alamatPengiriman", label: "Alamat Pengiriman", placeholder: "Alamat", type: "text", required: true },
            { name: "kontakPIC", label: "Kontak PIC", placeholder: "contoh: 08123456789", type: "tel", required: true },
            { name: "keteranganKebutuhan", label: "Keterangan Kebutuhan", placeholder: "Keterangan", type: "textarea", required: true }
        ]
    },
    {
        id: 2,
        title: "Kerjasama Perusahaan",
        icon: null,
        formTitle: "Form Pengajuan Kerjasama Perusahaan",
        description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.",
        fields: [
            { name: "namaPerusahaan", label: "Nama Perusahaan", placeholder: "Nama perusahaan", type: "text", required: true },
            { name: "jenisKerjasama", label: "Jenis Kerjasama yang Diajukan", placeholder: "Jenis kerjasama", type: "text", required: true },
            { name: "namaPIC", label: "Nama PIC", placeholder: "Nama PIC", type: "text", required: true },
            { name: "jabatanPIC", label: "Jabatan PIC", placeholder: "Jabatan PIC", type: "text", required: true },
            { name: "nomorHP", label: "Nomor HP", placeholder: "Nomor HP", type: "tel", required: true },
            { name: "email", label: "Email", placeholder: "Email", type: "email", required: true },
            { name: "detailProposal", label: "Detail Proposal Kerjasama", placeholder: "Detail proposal", type: "textarea", required: true }
        ]
    },
    {
        id: 3,
        title: "Pengiriman Resep Dokter",
        icon: null,
        formTitle: "Form Pengajuan Pengiriman Resep Dokter",
        description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.",
        fields: [
            { name: "namaPasien", label: "Nama Pasien", placeholder: "Nama pasien", type: "text", required: true },
            { name: "nomorHP", label: "Nomor HP", placeholder: "Nomor HP", type: "tel", required: true },
            { name: "fotoResep", label: "Unggah Foto Resep", placeholder: "Unggah foto", type: "file", required: true },
            { name: "alamatPengiriman", label: "Alamat Pengiriman", placeholder: "Alamat", type: "text", required: true },
            { name: "catatanTambahan", label: "Catatan Tambahan", placeholder: "Catatan tambahan", type: "textarea", required: false }
        ]
    },
    {
        id: 4,
        title: "Pendaftaran Magang/Kerja",
        icon: null,
        formTitle: "Form Pengajuan Pendaftaran Magang/Kerja",
        description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.",
        fields: [
            { name: "namaLengkap", label: "Nama Lengkap", placeholder: "Nama lengkap", type: "text", required: true },
            { name: "asalInstitusi", label: "Asal Institusi/Universitas", placeholder: "Asal institusi/universitas", type: "text", required: true },
            { name: "jurusan", label: "Jurusan", placeholder: "Jurusan", type: "text", required: true },
            { name: "tanggalMulai", label: "Periode Magang", placeholder: "", type: "daterange-start", required: true },
            { name: "tanggalSelesai", label: "", placeholder: "", type: "daterange-end", required: true },
            { name: "nomorHP", label: "Nomor HP", placeholder: "Nomor HP", type: "tel", required: true },
            { name: "email", label: "Email", placeholder: "Email", type: "email", required: true },
            { name: "cv", label: "Unggah CV/Surat Pengantar", placeholder: "Unggah CV/Surat Pengantar", type: "file", required: true },
        ]
    },
    {
        id: 5,
        title: "Event",
        icon: null,
        formTitle: "Form Pengajuan Event",
        description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.",
        fields: [
            { name: "namaPenyelenggara", label: "Nama Penyelenggara", placeholder: "Nama penyelenggara", type: "text", required: true },
            { name: "jenisEvent", label: "Jenis Event", placeholder: "Jenis event", type: "text", required: true },
            { name: "tanggalEvent", label: "Tanggal Event", placeholder: "Tanggal event", type: "date", required: true },
            { name: "lokasiEvent", label: "Lokasi Event", placeholder: "Lokasi event", type: "text", required: true },
            { name: "deskripsiEvent", label: "Deskripsi Event", placeholder: "Deskripsi event", type: "textarea", required: true },
            { name: "estimasiPeserta", label: "Estimasi Peserta", placeholder: "Estimasi peserta yang hadir", type: "number", required: true },
            { name: "kontakPIC", label: "Kontak PIC", placeholder: "Nomor HP PIC", type: "tel", required: true },
        ]
    },
    {
        id: 6,
        title: "Endorsement",
        icon: null,
        formTitle: "Form Pengajuan Endorsement",
        description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.",
        fields: [
            { name: "nama", label: "Nama", placeholder: "Nama", type: "text", required: true },
            { name: "platform", label: "Platform Media Sosial", placeholder: "Platform media sosial", type: "text", required: true },
            { name: "jumlahPengikut", label: "Jumlah Pengikut", placeholder: "Jumlah pengikut", type: "number", required: true },
            { name: "jenisKonten", label: "Jenis Konten", placeholder: "Jenis konten yang ditawarkan", type: "text", required: true },
            { name: "linkPortofolio", label: "Link Portofolio/Akun", placeholder: "Link portofolio/akun", type: "url", required: true },
        ]
    },
]

function ImagePlaceholder({ className }: { className?: string }) {
    return <div className={`bg-gray-200 ${className}`} />
}

type Field = {
    name: string
    label: string
    placeholder: string
    type: string
    required: boolean
}

function FormField({ field }: { field: Field }) {
    const baseClass = "w-full border border-gray-300 rounded-md text-xs outline-none p-2 placeholder:text-gray-400 bg-transparent"

    if (field.type === 'text-with-number') {
    const inputClass = "border border-gray-300 rounded-md text-xs outline-none p-2 placeholder:text-gray-400 bg-transparent"
    return (
        <div className="flex flex-col gap-1">
            <label className="text-sm font-bold">
                {field.label}<span className="text-red-500">*</span>
            </label>
            <div className="flex gap-2">
                <input
                    type="text"
                    placeholder="Jenis produk"
                    className={`${inputClass} flex-1`}
                />
                <input
                    type="number"
                    placeholder="00"
                    className={`${inputClass} w-32`}
                />
            </div>
        </div>
    )
}

    if (field.type === 'daterange-start') {
        return (
            <div className="flex flex-col gap-1">
                <label className="text-sm font-bold">
                    Periode Magang<span className="text-red-500">*</span>
                </label>
                <div className="flex items-center gap-2">
                    <div className="flex flex-col gap-1 flex-1">
                        <span className="text-xs text-gray-400">Dari</span>
                        <input type="date" className={baseClass} />
                    </div>
                    <span className="text-gray-400 mt-4">—</span>
                    <div className="flex flex-col gap-1 flex-1">
                        <span className="text-xs text-gray-400">Sampai</span>
                        <input type="date" className={baseClass} />
                    </div>
                </div>
            </div>
        )
    }

    if (field.type === 'daterange-end') return null

    if (field.type === 'textarea') {
        return (
            <div className="flex flex-col gap-1">
                <label className="text-sm font-bold">
                    {field.label}{field.required && <span className="text-red-500">*</span>}
                </label>
                <textarea
                    placeholder={field.placeholder}
                    rows={4}
                    className={`${baseClass} resize-none`}
                />
            </div>
        )
    }

    if (field.type === 'file') {
        return (
            <div className="flex flex-col gap-1">
                <label className="text-sm font-bold">
                    {field.label}{field.required && <span className="text-red-500">*</span>}
                </label>
                <input type="file" className="text-sm text-gray-500" />
            </div>
        )
    }

    return (
        <div className="flex flex-col gap-1">
            <label className="text-sm font-bold">
                {field.label}{field.required && <span className="text-red-500">*</span>}
            </label>
            <input
                type={field.type}
                placeholder={field.placeholder}
                className={baseClass}
            />
        </div>
    )
}

export default function PengajuanPage() {
    const [activeId, setActiveId] = useState(1)
    const active = pengajuan.find(p => p.id === activeId)!

    return (
        <div>
            <Breadcrumb items={[
                { label: 'Beranda', href: '/' },
                { label: 'Pengajuan' }
            ]} />

            <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8 flex flex-col gap-10">

                {/* Banner */}
                <ImagePlaceholder className="w-full h-48 sm:h-65 rounded-xl" />

                {/* Menu Grid */}
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pb-4">
                    {pengajuan.map((item) => {
                        const isActive = activeId === item.id
                        return (
                            <button
                                key={item.id}
                                onClick={() => setActiveId(item.id)}
                                className={`flex items-center gap-3 p-3 sm:p-4 text-left transition-colors border rounded-xl ${isActive ? 'bg-[#213E88] border-[#213E88] text-white font-bold' : 'text-gray-700 font-semibold'}`}
                            >
                                {/* Icon — border putih saat aktif biar keliatan */}
                                <div className={`w-9 h-9 sm:w-10 sm:h-10 rounded-full shrink-0 transition-colors border-2 ${isActive ? 'bg-white/20 border-white/40' : 'bg-gray-200 border-transparent'}`} />
                                <span className="text-xs sm:text-sm leading-tight">{item.title}</span>
                            </button>
                        )
                    })}
                </div>

                {/* Deskripsi + Form */}
                <div className="flex flex-col lg:flex-row gap-8 lg:gap-10 items-start">

                    {/* Judul + Deskripsi */}
                    <div className="w-full lg:w-2/5 flex flex-col gap-4">
                        <div>
                            <h2 className="text-xl font-bold mb-2">{active.title}</h2>
                            <div className="h-[1.5px] bg-gradient-to-r from-transparent to-[#213E88] mb-4" />
                        </div>
                        <p className="text-sm text-gray-600 text-justify leading-relaxed">
                            {active.description}
                        </p>
                    </div>

                    {/* Form */}
                    <div className="w-full lg:w-3/5 border rounded-xl px-5 sm:px-8 py-6 flex flex-col gap-5">
                        <div className="text-center mb-2">
                            <h3 className="text-base sm:text-lg font-bold mb-1 p-2">
                                <Underline>{active.formTitle}</Underline>
                            </h3>
                            <p className="text-xs text-gray-400">Silakan isi data berikut dengan lengkap dan benar</p>
                        </div>

                        {active.fields.map((field) => (
                            <FormField key={field.name} field={field} />
                        ))}

                        <div className="flex justify-center mt-2">
                            <button className="bg-[#213E88] text-white px-10 py-2 rounded-xl text-sm font-medium hover:bg-blue-900 transition">
                                Kirim
                            </button>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    )
}