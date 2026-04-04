import { Button } from "@repo/ui/components/button"

export function HeroSection() {
  return (
    <section className="bg-gradient-to-b from-muted to-background py-20 sm:py-32">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <h1 className="font-heading text-4xl font-bold tracking-tight text-balance sm:text-5xl lg:text-6xl">
            Apotek Terpercaya untuk Kesehatan Anda
          </h1>
          <p className="mt-6 text-lg text-pretty text-muted-foreground">
            Menyediakan obat-obatan berkualitas dan layanan kesehatan
            profesional dengan harga terjangkau. Kami siap melayani kebutuhan
            kesehatan Anda dan keluarga.
          </p>
          <div className="mt-10 flex items-center justify-center gap-4">
            <Button size="lg">Hubungi Kami</Button>
            <Button variant="outline" size="lg">
              Lihat Layanan
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
