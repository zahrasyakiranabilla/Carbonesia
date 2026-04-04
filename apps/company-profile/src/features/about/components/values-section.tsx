import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@repo/ui/components/card"

const values = [
  {
    title: "Integritas",
    description:
      "Kami menjunjung tinggi kejujuran dan transparansi dalam setiap aspek pelayanan.",
    icon: (
      <>
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10" />
        <path d="m9 12 2 2 4-4" />
      </>
    ),
  },
  {
    title: "Kualitas",
    description:
      "Hanya produk obat-obatan dan kesehatan terjamin yang kami sediakan.",
    icon: (
      <>
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10" />
        <circle cx="12" cy="10" r="3" />
      </>
    ),
  },
  {
    title: "Kepedulian",
    description:
      "Kami melayani dengan hati, mengutamakan kesejahteraan pelanggan.",
    icon: (
      <>
        <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
      </>
    ),
  },
  {
    title: "Inovasi",
    description:
      "Terus berkembang mengikuti kemajuan teknologi dan kebutuhan masyarakat.",
    icon: (
      <>
        <path d="M12 2a10 10 0 1 0 10 10H12V2z" />
        <path d="M12 12 2.1 12a10 10 0 0 1 10-10" />
      </>
    ),
  },
]

export function ValuesSection() {
  return (
    <section className="py-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="font-heading text-3xl font-bold sm:text-4xl">
            Nilai-Nilai Kami
          </h2>
          <p className="mt-4 text-muted-foreground">
            Prinsip yang menjadi landasan dalam setiap pelayanan kami
          </p>
        </div>
        <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {values.map((item) => (
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
