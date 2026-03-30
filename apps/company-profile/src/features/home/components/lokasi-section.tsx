import { Card, CardContent } from "@repo/ui/components/card"
import { Button } from "@repo/ui/components/button"

export function LokasiSection() {
  return (
    <section className="bg-muted py-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="font-heading text-3xl font-bold sm:text-4xl">Lokasi Kami</h2>
          <p className="mt-4 text-muted-foreground">
            Kunjungi apotek kami di lokasi strategis
          </p>
        </div>
        <div className="mt-12 grid gap-8 lg:grid-cols-2">
          <Card>
            <CardContent className="p-0">
              <div className="aspect-video w-full bg-muted" />
            </CardContent>
          </Card>
          <div className="flex flex-col justify-center">
            <h3 className="font-heading text-xl font-semibold">Apotek Asasi</h3>
            <div className="mt-4 space-y-3 text-sm">
              <div className="flex items-start gap-3">
                <MapPinIcon />
                <div>
                  <p className="font-medium">Alamat</p>
                  <p className="text-muted-foreground">
                    Jl. Contoh No. 123, Kota Bandung, Jawa Barat
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <PhoneIcon />
                <div>
                  <p className="font-medium">Telepon</p>
                  <p className="text-muted-foreground">+62 22 1234 5678</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <ClockIcon />
                <div>
                  <p className="font-medium">Jam Operasional</p>
                  <p className="text-muted-foreground">
                    Senin - Sabtu: 08.00 - 21.00 WIB
                    <br />
                    Minggu: 09.00 - 17.00 WIB
                  </p>
                </div>
              </div>
            </div>
            <div className="mt-6">
              <Button>
                <MapPinIcon className="mr-2 size-4" />
                Lihat di Google Maps
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

function MapPinIcon({ className }: { className?: string }) {
  return (
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
      className={className ?? "mt-0.5 text-muted-foreground"}
    >
      <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
      <circle cx="12" cy="10" r="3" />
    </svg>
  )
}

function PhoneIcon({ className }: { className?: string }) {
  return (
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
      className={className ?? "mt-0.5 text-muted-foreground"}
    >
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
    </svg>
  )
}

function ClockIcon({ className }: { className?: string }) {
  return (
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
      className={className ?? "mt-0.5 text-muted-foreground"}
    >
      <circle cx="12" cy="12" r="10" />
      <path d="M12 6v6l4 2" />
    </svg>
  )
}
