import { createFileRoute } from "@tanstack/react-router"

import { AboutHeroSection } from "../../features/about/components/hero-section"
import { VisiMisiSection } from "../../features/about/components/visi-misi-section"
import { SejarahSection } from "../../features/about/components/sejarah-section"
import { ValuesSection } from "../../features/about/components/values-section"
import { TimSection } from "../../features/about/components/tim-section"

export const Route = createFileRoute("/profil-perusahaan/")({ component: AboutPage })

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
