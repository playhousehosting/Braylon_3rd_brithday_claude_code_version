import { ConstructionGame } from "@/components/construction-game"
import { RsvpForm } from "@/components/rsvp-form"
import { CountdownTimer } from "@/components/countdown-timer"
import { HeroSection } from "@/components/hero-section"
import { WeatherForecast } from "@/components/weather-forecast"
import { PhotoGallery } from "@/components/photo-gallery"
import { PartyDetails } from "@/components/party-details"
import { LuxuryNav } from "@/components/luxury-nav"

export default function Home() {
  return (
    <>
      <LuxuryNav />
      <main className="min-h-screen">
        <section id="home">
          <HeroSection />
        </section>
        <section id="countdown">
          <CountdownTimer targetDate="2025-10-04" />
        </section>
        <section id="details">
          <PartyDetails />
        </section>
        <section id="rsvp">
          <RsvpForm />
        </section>
        <section id="weather">
          <WeatherForecast />
        </section>
        <PhotoGallery />
        <section id="games">
          <ConstructionGame />
        </section>
      </main>
    </>
  )
}
