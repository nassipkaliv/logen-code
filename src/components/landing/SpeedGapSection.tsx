import DecoratedContainer from '../ui/DecoratedContainer'
import { AnimatedSection, fadeInUp } from '../ui/ScrollAnimations'

// Red corner for Problem badge
function RedCorner({ className }: { className?: string }) {
  return (
    <svg
      width="6"
      height="6"
      viewBox="0 0 6 6"
      fill="none"
      className={`absolute ${className}`}
    >
      <rect width="1" height="6" fill="#c73434" />
      <rect width="6" height="1" fill="#c73434" />
    </svg>
  )
}

export default function SpeedGapSection() {
  return (
    <section id="speed-gap" className="relative overflow-hidden">
      <DecoratedContainer id="speed-gap" className="min-h-[200px] md:min-h-[250px] pt-8 md:pt-12 px-4 md:px-8">
        <AnimatedSection variants={fadeInUp} className="flex flex-col items-start max-w-[95%] sm:max-w-[550px] mx-auto">
          {/* Problem badge with red corners */}
          <div
            className="relative mb-4"
            style={{
              border: '1px solid rgba(199, 52, 52, 0.12)',
              background: 'rgba(199, 52, 52, 0.02)',
              padding: '8px 13px',
            }}
          >
            <RedCorner className="top-0 left-0" />
            <RedCorner className="top-0 right-0 rotate-90" />
            <RedCorner className="bottom-0 right-0 rotate-180" />
            <RedCorner className="bottom-0 left-0 -rotate-90" />

            <div className="flex items-center gap-2">
              {/* Line */}
              <div
                className="w-[2px] h-[10px]"
                style={{
                  background: '#c73434',
                  boxShadow: '1px 1px 3px 0 rgba(199, 52, 52, 0.08), 3px 3px 6px 0 rgba(199, 52, 52, 0.12)',
                }}
              />
              {/* Dot */}
              <div
                className="w-[2px] h-[2px] rounded-full"
                style={{ background: 'rgba(199, 52, 52, 0.64)' }}
              />
              {/* Text */}
              <span
                className="font-primary font-medium text-[14px] leading-[143%] tracking-[0.01em] text-center"
                style={{ color: '#c73434' }}
              >
                Problem
              </span>
              {/* Dot */}
              <div
                className="w-[2px] h-[2px] rounded-full"
                style={{ background: 'rgba(199, 52, 52, 0.64)' }}
              />
              {/* Line */}
              <div
                className="w-[2px] h-[10px]"
                style={{
                  background: '#c73434',
                  boxShadow: '1px 1px 3px 0 rgba(199, 52, 52, 0.08), 3px 3px 6px 0 rgba(199, 52, 52, 0.12)',
                }}
              />
            </div>
          </div>

          {/* Main content with corners */}
          <div className="relative pb-10 md:pb-16">
            {/* Bottom-left corner */}
            <svg className="absolute -bottom-[1px] -left-[1px]" width="11" height="6" viewBox="0 0 11 6" fill="none">
              <rect x="6" y="6" width="1" height="6" transform="rotate(180 6 6)" fill="white" />
              <path d="M11 6L0 6L0 5L11 5L11 6Z" fill="white" />
            </svg>
            {/* Bottom-right corner */}
            <svg className="absolute -bottom-[1px] -right-[1px]" width="11" height="6" viewBox="0 0 11 6" fill="none">
              <rect x="6" y="6" width="1" height="6" transform="rotate(180 6 6)" fill="white" />
              <path d="M11 6L0 6L0 5L11 5L11 6Z" fill="white" />
            </svg>

            <div className="space-y-0">
              <p className="font-primary text-[20px] sm:text-[24px] md:text-[30px] font-medium leading-[120%] text-[#ededf8]">
                The Speed Gap
              </p>
              <p className="font-primary text-[20px] sm:text-[24px] md:text-[30px] font-medium leading-[120%]">
                <span className="text-[#ededf8]">Meme markets</span>{' '}
                <img src='/assets/img/speedbtn.png' alt='speedbtn' className="inline-block w-[24px] h-[24px] md:w-[32px] md:h-[32px] mx-1 align-middle" />
                <span className="text-[#ededf8]"> move</span>
                <span className="text-[rgba(237,237,248,0.6)]"> in seconds</span>
                <span className="font-mono text-[rgba(237,237,248,0.6)]">.</span>
              </p>
              <p className="font-primary text-[20px] sm:text-[24px] md:text-[30px] font-medium leading-[120%]">
                <span className="text-[#ededf8]">Manual</span>
                <span className="text-[rgba(237,237,248,0.6)]"> reactions </span>
                <span className="text-[#ededf8]">lag behind</span>
                <span className="font-mono text-[rgba(237,237,248,0.6)]">.</span>
              </p>
            </div>
          </div>
        </AnimatedSection>
      </DecoratedContainer>
    </section>
  )
}
