import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@repo/ui/components/card"

const keunggulanData = [
  {
    title: "Terpercaya",
    description:
      "Berpengalaman lebih dari 10 tahun melayani masyarakat dengan integritas tinggi.",
    icon: (
      <>
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10" />
        <path d="m9 12 2 2 4-4" />
      </>
    ),
  },
  {
    title: "Ramah & Profesional",
    description:
      "Apoteker dan staf kami siap memberikan konsultasi dengan sikap ramah dan profesional.",
    icon: (
      <>
        <circle cx="12" cy="12" r="10" />
        <path d="M16 16s-3-2-2-5" />
        <path d="M8 16s3-2 2-5" />
        <path d="M12 8v4" />
        <path d="M12 12h.01" />
      </>
    ),
  },
  {
    title: "Harga Terjangkau",
    description:
      "Menawarkan harga yang kompetitif tanpa mengorbankan kualitas produk dan layanan.",
    icon: (
      <>
        <rect width="18" height="18" x="3" y="3" rx="2" />
        <path d="M8 12h8" />
        <path d="M12 8v8" />
      </>
    ),
  },
  {
    title: "Lokasi Strategis",
    description:
      "Mudah diakses dengan area parkir yang luas dan transportasi umum yang dekat.",
    icon: (
      <>
        <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0Z" />
        <circle cx="12" cy="10" r="3" />
      </>
    ),
  },
]

export function KeunggulanSection() {
  return (
    <section className="py-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="font-heading text-3xl font-bold sm:text-4xl">
            Keunggulan Kami
          </h2>
          <p className="mt-4 text-muted-foreground">
            Mengapa memilih Apotek Asasi untuk kebutuhan kesehatan Anda
          </p>
        </div>
        <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {keunggulanData.map((item) => (
            <Card key={item.title} className="text-center">
              <CardHeader>
                <div className="mx-auto mb-2 flex size-12 items-center justify-center rounded-full bg-primary/10">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
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
                <CardTitle className="text-base">{item.title}</CardTitle>
              </CardHeader>
              <CardContent className="text-sm text-pretty text-muted-foreground">
                {item.description}
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
