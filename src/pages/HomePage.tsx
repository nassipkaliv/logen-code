import Header from '../components/layout/Header'
import TickerBar from '../components/layout/TickerBar'
import { HeroSection, SpeedGapSection, FeaturesSection } from '../components/landing'

export default function HomePage() {
  return (
    <div className="min-h-screen">
      <TickerBar />
      <Header />
      <main>
        <HeroSection />
        <SpeedGapSection />
        <FeaturesSection />
      </main>
    </div>
  )
}
