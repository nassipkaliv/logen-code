import { StaggerContainer, StaggerItem } from '../ui/ScrollAnimations'

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

const steps = [
  {
    number: 1,
    image: '/assets/img/workscard1.png',
    title: 'Launch app',
  },
  {
    number: 2,
    image: '/assets/img/workscard2.png',
    title: 'Choose token',
  },
  {
    number: 3,
    image: '/assets/img/workscard3.png',
    title: 'Define trigger + Action',
  },
  {
    number: 4,
    image: '/assets/img/workscard4.png',
    title: 'Automation runs for you',
  },
]

export default function HowItWorksSection() {
  return (
    <section id="how-it-works" className="relative">
      <div className="relative max-w-[1310px] mx-auto">
        {/* Section labels row with horizontal lines */}
        <div className="absolute top-0 left-0 right-0 hidden sm:block z-[60]">
          {/* Top horizontal line - full width */}
          <div className="absolute top-0 -left-[100vw] -right-[100vw] h-[1px] bg-[rgba(235,234,250,0.08)]" />
          {/* Bottom horizontal line - full width */}
          <div className="absolute bottom-0 -left-[100vw] -right-[100vw] h-[1px] bg-[rgba(235,234,250,0.08)]" />

          <div className="flex justify-between">
            {/* Left label - 03 / 07 */}
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
                  [<span className='text-[#ededf8]'>03</span> / 07]
                </span>
              </div>
            </div>

            {/* Right label - HOW IT WORKS */}
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
                  [<span className='text-[#ededf8]'>HOW IT WORKS</span>]
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="relative pt-[30px] md:pt-[30px] pb-10 md:pb-16 px-4">
          {/* Steps grid - 2x2 with divider */}
        <StaggerContainer className="relative grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-5">
          {/* Center divider */}
          <div className="hidden md:block absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-20 pointer-events-none">
            <img
              src="/assets/img/workscard-divider.png"
              alt=""
              className="object-contain"
            />
          </div>
          {steps.map((step) => (
            <StaggerItem key={step.number}>
              <div
                className="relative min-h-[220px] sm:min-h-[250px] md:min-h-[280px] p-5 md:p-[30px] flex flex-col"
                style={{
                  borderLeft: '1px solid rgba(235, 234, 250, 0.08)',
                  borderRight: '1px solid rgba(235, 234, 250, 0.08)',
                  background: 'linear-gradient(180deg, rgba(237, 237, 248, 0) 0%, rgba(237, 237, 248, 0.02) 100%)',
                }}
              >
              {/* Top horizontal line - full page width */}
              <div className="absolute top-0 -left-[100vw] -right-[100vw] h-[1px] bg-[rgba(235,234,250,0.08)]" />
              {/* Bottom horizontal line - full page width */}
              <div className="absolute bottom-0 -left-[100vw] -right-[100vw] h-[1px] bg-[rgba(235,234,250,0.08)]" />
              {/* Card glow - top right */}
              <img
                src="/assets/img/cardGlow.png"
                alt=""
                className="absolute top-0 right-0 z-0 pointer-events-none"
              />

              {/* Card corners */}
              <CardCorner className="top-0 left-0 z-10" />
              <CardCorner className="top-0 right-0 rotate-90 z-10" />
              <CardCorner className="bottom-0 right-0 rotate-180 z-10" />
              <CardCorner className="bottom-0 left-0 -rotate-90 z-10" />

              {/* Left side - number and title */}
              <div className="relative z-10 flex-1 flex flex-col justify-between">
                {/* Step number badge */}
                <div
                  className="relative w-[36px] h-[36px] flex items-center justify-center"
                  style={{
                    border: '1px solid rgba(215, 218, 255, 0.12)',
                    backdropFilter: 'blur(10px)',
                    boxShadow: 'inset 0 1px 1px 0 rgba(132, 141, 232, 0.2), inset 0 0 12px 0 rgba(132, 141, 232, 0.08), inset 0 0 8px 0 rgba(132, 141, 232, 0.06), inset 0 0 20px 0 rgba(132, 141, 232, 0.12), inset 0 12px 20px 0 rgba(132, 141, 232, 0.06)',
                    background: 'rgba(132, 141, 232, 0.04)',
                  }}
                >
                  <CardCorner className="top-0 left-0" />
                  <CardCorner className="top-0 right-0 rotate-90" />
                  <CardCorner className="bottom-0 right-0 rotate-180" />
                  <CardCorner className="bottom-0 left-0 -rotate-90" />
                  <span className="font-primary text-[14px] font-medium leading-[143%] tracking-[0.01em] text-[#ebedff]">{step.number}</span>
                </div>

                {/* Title - bottom left */}
                <div className="font-primary text-[16px] font-normal leading-[138%] tracking-[0.01em] text-[#ededf8]">
                  {step.title}
                </div>
              </div>

              {/* Right side - image */}
              <div className="absolute right-4 md:right-[30px] top-1/2 -translate-y-1/2 z-10">
                <img
                  src={step.image}
                  alt={step.title}
                  className="max-h-[120px] sm:max-h-[150px] md:max-h-[180px] object-contain"
                />
              </div>
            </div>
            </StaggerItem>
          ))}
        </StaggerContainer>
          {/* Bottom border - full page width */}
          <div className="absolute bottom-0 -left-[100vw] -right-[100vw] h-[1px] bg-[rgba(235,234,250,0.08)]" />
        </div>
      </div>
    </section>
  )
}
