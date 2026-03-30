import { createFileRoute } from "@tanstack/react-router"

import { HeroSection } from "../features/home/components/hero-section"
import { KeunggulanSection } from "../features/home/components/keunggulan-section"
import { LayananSection } from "../features/home/components/layanan-section"
import { ArtikelSection } from "../features/home/components/artikel-section"
import { LokasiSection } from "../features/home/components/lokasi-section"

export const Route = createFileRoute("/")({ component: HomePage })

function HomePage() {
  return (
    <div className="flex flex-col">
      <HeroSection />
      <KeunggulanSection />
      <LayananSection />
      <ArtikelSection />
      <LokasiSection />
    </div>
  )
}
