import { Card, CardContent, CardHeader, CardTitle } from "@repo/ui/components/card"

const team = [
  {
    name: "Dr. Apt. Ahmad Fauzi",
    role: "Founder & Apoteker",
    bio: "Lulusan ITB dengan pengalaman 15+ tahun di industri farmasi.",
  },
  {
    name: "Dr. Apt. Siti Nurhaliza",
    role: "Kepala Apoteker",
    bio: "Spesialis farmasi klinis dari UGM, fokus pada pelayanan pasien.",
  },
  {
    name: "Andi Wijaya, S.Farm",
    role: "Apoteker",
    bio: "Alumni Unpad, berpengalaman di bidang farmasi komunitas.",
  },
  {
    name: "Dr. apt. Maya Kusuma, M.Farm",
    role: "Konsultan Farmasi",
    bio: "Spesialis farmasi industri dengan latar belakang R&D.",
  },
]

export function TimSection() {
  return (
    <section className="bg-muted py-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="font-heading text-3xl font-bold sm:text-4xl">Tim Kami</h2>
          <p className="mt-4 text-muted-foreground">
            Profesional kesehatan yang siap melayani Anda
          </p>
        </div>
        <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {team.map((member) => (
            <Card key={member.name} className="text-center">
              <CardHeader>
                {/* Avatar placeholder */}
                <div className="mx-auto mb-4 flex size-24 items-center justify-center rounded-full bg-muted">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="40"
                    height="40"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="text-muted-foreground"
                  >
                    <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
                    <circle cx="12" cy="7" r="4" />
                  </svg>
                </div>
                <CardTitle className="text-base">{member.name}</CardTitle>
                <p className="text-sm font-medium text-primary">{member.role}</p>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground text-pretty">
                  {member.bio}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
