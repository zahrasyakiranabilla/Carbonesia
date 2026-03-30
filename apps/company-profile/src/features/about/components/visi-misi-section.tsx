import { Card, CardContent, CardHeader, CardTitle } from "@repo/ui/components/card"

export function VisiMisiSection() {
  return (
    <section className="py-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid gap-8 lg:grid-cols-2">
          <Card>
            <CardHeader>
              <div className="mb-2 flex size-12 items-center justify-center rounded-full bg-primary/10">
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
                  <path d="M15 3h6v6" />
                  <path d="M10 14 21 3" />
                  <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                </svg>
              </div>
              <CardTitle className="text-xl">Visi</CardTitle>
            </CardHeader>
            <CardContent className="text-muted-foreground text-pretty">
              Menjadi apotek terpercaya yang memberikan kontribusi nyata bagi kesehatan
              masyarakat dengan menyediakan produk farmasi berkualitas dan pelayanan profesional.
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <div className="mb-2 flex size-12 items-center justify-center rounded-full bg-primary/10">
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
                  <circle cx="12" cy="12" r="10" />
                  <path d="M12 6v6l4 2" />
                </svg>
              </div>
              <CardTitle className="text-xl">Misi</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="list-inside list-disc space-y-2 text-muted-foreground">
                <li>Menyediakan obat-obatan dan produk kesehatan berkualitas</li>
                <li>Memberikan pelayanan farmasi yang profesional dan ramah</li>
                <li>Memberikan edukasi kesehatan kepada masyarakat</li>
                <li>Menjaga keterjangkauan harga untuk semua kalangan</li>
                <li>Mengembangkan kompetensi sumber daya manusia secara berkelanjutan</li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  )
}
