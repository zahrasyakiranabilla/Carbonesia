import { Card, CardContent } from "@repo/ui/components/card"

const milestones = [
  {
    year: "2014",
    title: "Pendirian Apotek Asasi",
    description: "Apotek Asasi pertama kali dibuka di Bandung dengan misi melayani kebutuhan kesehatan masyarakat.",
  },
  {
    year: "2017",
    title: "Ekspansi Cabang",
    description: "Membuka cabang kedua untuk menjangkau lebih banyak masyarakat yang membutuhkan.",
  },
  {
    year: "2019",
    title: "Layanan Digital",
    description: "Meluncurkan layanan konsultasi online dan pengiriman obat untuk kemudahan pelanggan.",
  },
  {
    year: "2021",
    title: "Sertifikasi ISO",
    description: "Mendapatkan sertifikasi ISO 9001:2015 untuk sistem manajemen mutu pelayanan farmasi.",
  },
  {
    year: "2024",
    title: "10 Tahun Pengabdian",
    description: "Merayakan satu dekade pengabdian dalam melayani kesehatan masyarakat Indonesia.",
  },
]

export function SejarahSection() {
  return (
    <section className="bg-muted py-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="font-heading text-3xl font-bold sm:text-4xl">Sejarah Kami</h2>
          <p className="mt-4 text-muted-foreground">
            Perjalanan Apotek Asasi dari tahun ke tahun
          </p>
        </div>
        <div className="mt-12">
          <div className="relative">
            {/* Timeline line */}
            <div className="absolute left-1/2 hidden h-full w-0.5 -translate-x-1/2 bg-border lg:block" />
            
            {/* Timeline items */}
            <div className="space-y-8">
              {milestones.map((item, index) => (
                <div
                  key={item.year}
                  className={`flex items-center gap-4 lg:gap-8 ${
                    index % 2 === 0 ? "lg:flex-row" : "lg:flex-row-reverse"
                  }`}
                >
                  <div className="flex-1">
                    <Card className={index % 2 === 0 ? "lg:mr-auto" : "lg:ml-auto"}>
                      <CardContent className="p-6">
                        <div className="mb-2 inline-block rounded-full bg-primary px-3 py-1 text-xs font-semibold text-primary-foreground">
                          {item.year}
                        </div>
                        <h3 className="font-heading text-lg font-semibold">{item.title}</h3>
                        <p className="mt-2 text-sm text-muted-foreground text-pretty">
                          {item.description}
                        </p>
                      </CardContent>
                    </Card>
                  </div>
                  
                  {/* Timeline dot */}
                  <div className="relative z-10 flex size-4 shrink-0 items-center justify-center">
                    <div className="size-3 rounded-full bg-primary" />
                  </div>
                  
                  <div className="flex-1 hidden lg:block" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
