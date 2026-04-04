import { Button } from "@repo/ui/components/button"
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@repo/ui/components/card"

const artikelData = [
  {
    title: "Tips Menjaga Daya Tahan Tubuh",
    description:
      "Cara alami meningkatkan sistem imun dengan pola hidup sehat...",
  },
  {
    title: "Pentingnya Minum Obat Tepat Waktu",
    description:
      "Mengapa jadwal minum obat berpengaruh pada efektivitas pengobatan...",
  },
  {
    title: "Pilihan Suplemen untuk Keluarga",
    description:
      "Panduan memilih suplemen yang sesuai untuk setiap anggota keluarga...",
  },
]

export function ArtikelSection() {
  return (
    <section className="py-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="font-heading text-3xl font-bold sm:text-4xl">
            Artikel Kesehatan
          </h2>
          <p className="mt-4 text-muted-foreground">
            Tips dan informasi kesehatan untuk Anda dan keluarga
          </p>
        </div>
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {artikelData.map((artikel) => (
            <Card key={artikel.title}>
              <div className="aspect-video w-full bg-muted" />
              <CardHeader>
                <CardTitle>{artikel.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-pretty text-muted-foreground">
                  {artikel.description}
                </p>
                <Button variant="link" className="mt-2 px-0">
                  Baca selengkapnya
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
