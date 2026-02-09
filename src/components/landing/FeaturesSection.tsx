import { StaggerContainer, StaggerItem } from '../ui/ScrollAnimations'

// White corner component for cards
function CardCorner({ className }: { className?: string }) {
  return (
    <svg
      width="6"
      height="6"
      viewBox="0 0 6 6"
      fill="none"
      className={`absolute ${className}`}
    >
      <rect width="1" height="6" fill="white" />
      <rect width="6" height="1" fill="white" />
    </svg>
  )
}

const features = [
  {
    bg: '/assets/img/feat1bg.png',
    title: 'No-code',
    subtitle: 'strategy setup',
  },
  {
    bg: '/assets/img/feat2bg.png',
    title: 'Rule-based',
    subtitle: 'execution',
  },
  {
    bg: '/assets/img/feat3bg.png',
    title: 'Built for Solana',
    subtitle: 'meme markets',
  },
  {
    bg: '/assets/img/feat4bg.png',
    title: 'Up to 5',
    subtitle: 'automations free',
  },
]

export default function FeaturesSection() {
  return (
    <section id="features" className="relative">
      <div className="relative max-w-[1310px] mx-auto">
        {/* Section labels row with horizontal lines */}
        <div className="absolute top-0 left-0 right-0 hidden sm:block z-[60]">
          {/* Top horizontal line - full width */}
          <div className="absolute top-0 -left-[100vw] -right-[100vw] h-[1px] bg-[rgba(235,234,250,0.08)]" />
          {/* Bottom horizontal line - full width */}
          <div className="absolute bottom-0 -left-[100vw] -right-[100vw] h-[1px] bg-[rgba(235,234,250,0.08)]" />

          <div className="flex justify-between">
            {/* Left label - 02 / 07 */}
            <div className="relative">
              {/* Right border */}
              <div className="absolute right-0 top-0 bottom-0 w-[1px] bg-[rgba(235,234,250,0.08)]" />
              {/* Bottom-left corner */}
              <svg className="absolute bottom-0 left-0" width="11" height="6" viewBox="0 0 11 6" fill="none">
                <rect x="6" y="6" width="1" height="6" transform="rotate(180 6 6)" fill="#FFF" />
                <path d="M11 6L0 6L0 5L11 5L11 6Z" fill="#FFF" />
              </svg>
              {/* Top-right corner */}
              <svg className="absolute top-0 right-0 rotate-180" width="11" height="6" viewBox="0 0 11 6" fill="none">
                <rect x="6" y="6" width="1" height="6" transform="rotate(180 6 6)" fill="#FFF" />
                <path d="M11 6L0 6L0 5L11 5L11 6Z" fill="#FFF" />
              </svg>
              <div className="px-[8px] py-[4px]">
                <span className="font-mono text-[10px] font-medium leading-[160%] uppercase text-[rgba(237,237,248,0.16)]">
                  [<span className='text-[#ededf8]'>02</span> / 07]
                </span>
              </div>
            </div>

            {/* Right label - FEATURES */}
            <div className="relative">
              {/* Left border */}
              <div className="absolute left-0 top-0 bottom-0 w-[1px] bg-[rgba(235,234,250,0.08)]" />
              {/* Bottom-left corner */}
              <svg className="absolute bottom-0 left-0" width="11" height="6" viewBox="0 0 11 6" fill="none">
                <rect x="6" y="6" width="1" height="6" transform="rotate(180 6 6)" fill="#FFF" />
                <path d="M11 6L0 6L0 5L11 5L11 6Z" fill="#FFF" />
              </svg>
              {/* Top-right corner */}
              <svg className="absolute top-0 right-0 rotate-180" width="11" height="6" viewBox="0 0 11 6" fill="none">
                <rect x="6" y="6" width="1" height="6" transform="rotate(180 6 6)" fill="#FFF" />
                <path d="M11 6L0 6L0 5L11 5L11 6Z" fill="#FFF" />
              </svg>
              <div className="px-[8px] py-[4px]">
                <span className="font-mono text-[10px] font-medium leading-[160%] uppercase text-[rgba(237,237,248,0.16)]">
                  [<span className='text-[#ededf8]'>FEATURES</span>]
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="relative pt-[30px] md:pt-[30px] pb-10 md:pb-16 px-4">
          {/* Features grid */}
        <StaggerContainer className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-5">
          {features.map((feature, index) => (
            <StaggerItem key={index}>
              <div
                className="relative p-4 md:p-6 overflow-hidden min-h-[450px] sm:min-h-[320px] md:min-h-[350px]"
                style={{
                  borderLeft: '1px solid rgba(235, 234, 250, 0.08)',
                  borderRight: '1px solid rgba(235, 234, 250, 0.08)',
                  background: 'linear-gradient(180deg, rgba(237, 237, 248, 0) 0%, rgba(237, 237, 248, 0.02) 100%)',
                }}
              >
                {/* Background image */}
                <div
                  className="absolute inset-0 w-full h-full"
                  style={{
                    backgroundImage: `url(${feature.bg})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                  }}
                />
                {/* Card corners */}
                <CardCorner className="top-0 left-0 z-10" />
                <CardCorner className="top-0 right-0 rotate-90 z-10" />
                <CardCorner className="bottom-0 right-0 rotate-180 z-10" />
                <CardCorner className="bottom-0 left-0 -rotate-90 z-10" />

                {/* Text */}
                <div
                  className="absolute bottom-[20px] md:bottom-[30px] left-0 right-0 z-10 font-primary text-[14px] md:text-[16px] font-normal leading-[138%] tracking-[0.01em] text-center text-[#ededf8]"
                >
                  {feature.title}<br />{feature.subtitle}
                </div>
              </div>
            </StaggerItem>
          ))}
        </StaggerContainer>
          <div className="absolute bottom-[4rem] -left-[100vw] -right-[100vw] h-[1px] bg-[rgba(235,234,250,0.08)]" />

        </div>
      </div>
    </section>
  )
}
