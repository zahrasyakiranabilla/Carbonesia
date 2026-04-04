import { AboutHeroSection } from "@/features/about/components/hero-section"
import { SejarahSection } from "@/features/about/components/sejarah-section"
import { TimSection } from "@/features/about/components/tim-section"
import { ValuesSection } from "@/features/about/components/values-section"
import { VisiMisiSection } from "@/features/about/components/visi-misi-section"
import { createFileRoute } from "@tanstack/react-router"

export const Route = createFileRoute("/profil-perusahaan/")({
  component: AboutPage,
})

function AboutPage() {
  return (
    <div className="flex flex-col">
      <AboutHeroSection />
      <VisiMisiSection />
      <SejarahSection />
      <ValuesSection />
      <TimSection />
    </div>
  )
}
