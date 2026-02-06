import Header from '../components/layout/Header'
import Footer from '../components/layout/Footer'
// import TickerBar from '../components/layout/TickerBar'
import HeaderTicker from '../components/layout/HeaderTicker'
import { HeroSection, SpeedGapSection, FeaturesSection, HowItWorksSection, VisualUseCasesSection, ReactionSection, RoadmapSection, FAQSection } from '../components/landing'

export default function HomePage() {
  return (
    <div className="min-h-screen overflow-x-hidden relative">
      {/* Glow header background */}
      <img
        src="/assets/img/glowheaderbg.png"
        alt=""
        className="absolute top-0 left-1/2 -translate-x-[25%] w-full max-w-[1920px] pointer-events-none z-0"
      />

      {/* Vertical border lines - full page height */}
      <div className="absolute inset-0 pointer-events-none hidden sm:block">
        <div className="max-w-[1310px] h-full mx-auto relative">
          <div className="absolute left-0 top-0 bottom-0 w-[1px] bg-[rgba(235,234,250,0.08)]" />
          <div className="absolute right-0 top-0 bottom-0 w-[1px] bg-[rgba(235,234,250,0.08)]" />
        </div>
      </div>

      <HeaderTicker />
      {/* <TickerBar /> */}
      <Header />
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
