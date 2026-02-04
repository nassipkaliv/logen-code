import Header from '../components/layout/Header'
import Footer from '../components/layout/Footer'
import TickerBar from '../components/layout/TickerBar'
import { HeroSection, SpeedGapSection, FeaturesSection, HowItWorksSection, VisualUseCasesSection, ReactionSection, RoadmapSection, FAQSection } from '../components/landing'

export default function HomePage() {
  return (
    <div className="min-h-screen overflow-x-hidden">
      <Header />
      <TickerBar />
      <main>
        <HeroSection />
        <SpeedGapSection />
        <FeaturesSection />
        <HowItWorksSection />
        <VisualUseCasesSection />
        <ReactionSection />
        <RoadmapSection />
        <FAQSection />
      </main>
      <Footer />
    </div>
  )
}
