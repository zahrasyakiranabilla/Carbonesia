import { Card, CardContent, CardHeader, CardTitle } from "@repo/ui/components/card"

const layananData = [
  {
    title: "Resep Dokter",
    description: "Melayani penebusan resep dokter dengan cepat dan akurat.",
    icon: (
      <>
        <path d="m8 2 4 4-4 4" />
        <path d="M12 6H4a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-8" />
      </>
    ),
  },
  {
    title: "Obat Bebas",
    description: "Berbagai obat bebas dan suplemen untuk kebutuhan sehari-hari.",
    icon: (
      <>
        <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
      </>
    ),
  },
  {
    title: "Konsultasi Kesehatan",
    description: "Konsultasi gratis dengan apoteker untuk penggunaan obat yang tepat.",
    icon: (
      <>
        <rect width="18" height="18" x="3" y="4" rx="2" ry="2" />
        <line x1="16" x2="16" y1="2" y2="6" />
        <line x1="8" x2="8" y1="2" y2="6" />
        <line x1="3" x2="21" y1="10" y2="10" />
      </>
    ),
  },
  {
    title: "Alat Kesehatan",
    description: "Menyediakan berbagai alat kesehatan untuk kebutuhan medis di rumah.",
    icon: (
      <>
        <path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6" />
        <path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18" />
        <path d="M4 22h16" />
        <path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22" />
        <path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22" />
        <path d="M18 2H6v7a6 6 0 0 0 12 0V2Z" />
      </>
    ),
  },
  {
    title: "Pengiriman Obat",
    description: "Layanan antar obat untuk wilayah sekitar dengan ongkos terjangkau.",
    icon: (
      <>
        <circle cx="12" cy="12" r="10" />
        <path d="M12 6v6l4 2" />
      </>
    ),
  },
  {
    title: "Asuransi Kesehatan",
    description: "Menerima berbagai pembayaran asuransi dan BPJS Kesehatan.",
    icon: (
      <>
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10" />
      </>
    ),
  },
]

export function LayananSection() {
  return (
    <section className="bg-muted py-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="font-heading text-3xl font-bold sm:text-4xl">Layanan Kami</h2>
          <p className="mt-4 text-muted-foreground">
            Berbagai layanan kesehatan untuk memenuhi kebutuhan Anda
          </p>
        </div>
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {layananData.map((item) => (
            <Card key={item.title}>
              <CardHeader>
                <div className="mb-2 flex size-10 items-center justify-center rounded-md bg-primary/10">
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
                    className="text-primary"
                  >
                    {item.icon}
                  </svg>
                </div>
                <CardTitle>{item.title}</CardTitle>
              </CardHeader>
              <CardContent className="text-sm text-muted-foreground text-pretty">
                {item.description}
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
