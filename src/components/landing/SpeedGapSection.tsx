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
    <section id="speed-gap" className="relative mt-[70px] mb-[70px]">
      {/* Top border - full page width */}
      <div className="absolute top-0 -left-[100vw] -right-[100vw] h-[1px] bg-[rgba(235,234,250,0.08)]" />
      {/* Bottom border - full page width */}
      <div className="absolute bottom-0 -left-[100vw] -right-[100vw] h-[1px] bg-[rgba(235,234,250,0.08)]" />

      {/* Corner decorations at container edges */}
      <div className="absolute inset-0 max-w-[1310px] mx-auto pointer-events-none hidden sm:block">
        {/* Top-left corner */}
        <svg className="absolute -top-[3px] -left-[5px]" width="11" height="6" viewBox="0 0 11 6" fill="none">
          <rect x="5" width="1" height="6" fill="white" />
          <rect width="11" height="1" fill="white" />
        </svg>
        {/* Top-left +100px */}
        <svg className="absolute -top-[3px] left-[290px]" width="11" height="6" viewBox="0 0 11 6" fill="none">
          <rect x="5" width="1" height="6" fill="white" />
          <rect width="11" height="1" fill="white" />
        </svg>
        {/* Top-right corner */}
        <svg className="absolute -top-[3px] -right-[5px]" width="11" height="6" viewBox="0 0 11 6" fill="none">
          <rect x="5" width="1" height="6" fill="white" />
          <rect width="11" height="1" fill="white" />
        </svg>
        {/* Top-right -100px */}
        <svg className="absolute -top-[3px] right-[290px]" width="11" height="6" viewBox="0 0 11 6" fill="none">
          <rect x="5" width="1" height="6" fill="white" />
          <rect width="11" height="1" fill="white" />
        </svg>
        {/* Bottom-left corner */}
        <svg className="absolute -bottom-[3px] -left-[5px] rotate-180" width="11" height="6" viewBox="0 0 11 6" fill="none">
          <rect x="5" width="1" height="6" fill="white" />
          <rect width="11" height="1" fill="white" />
        </svg>
        {/* Bottom-right corner */}
        <svg className="absolute -bottom-[3px] -right-[5px] rotate-180" width="11" height="6" viewBox="0 0 11 6" fill="none">
          <rect x="5" width="1" height="6" fill="white" />
          <rect width="11" height="1" fill="white" />
        </svg>
      </div>


      <DecoratedContainer id="speed-gap" className="min-h-[200px] md:min-h-[250px] py-[90px]">
        {/* Horizontal lines - full container width */}
        <div className="absolute top-[90px] left-0 w-full h-[1px] bg-[rgba(235,234,250,0.08)]" />
        <div className="absolute bottom-[90px] left-0 w-full h-[1px] bg-[rgba(235,234,250,0.08)]" />

        {/* Vertical lines container - matches AnimatedSection width */}
        <div className="absolute inset-0 max-w-[95%] sm:max-w-[550px] mx-auto pointer-events-none">
          <div className="absolute left-0 top-0 h-full w-[1px] bg-[rgba(235,234,250,0.08)]" />
          <div className="absolute right-0 top-0 h-full w-[1px] bg-[rgba(235,234,250,0.08)]" />
          {/* Bottom-left corner */}
          <svg className="absolute -bottom-[5px] -left-[5px]" width="11" height="11" viewBox="0 0 11 11" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect x="5" width="1" height="11" fill="#EDEDFA" />
            <rect y="5" width="11" height="1" fill="#EDEDFA" />
          </svg>
          {/* Bottom-right corner */}
          <svg className="absolute -bottom-[5px] -right-[5px]" width="11" height="11" viewBox="0 0 11 11" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect x="5" width="1" height="11" fill="#EDEDFA" />
            <rect y="5" width="11" height="1" fill="#EDEDFA" />
          </svg>
        </div>
          

        <AnimatedSection variants={fadeInUp} className="relative flex flex-col items-start max-w-[95%] sm:max-w-[550px] mx-auto">
          {/* Vertical lines - left and right of 550px container */}
          <div className="relative">            
            {/* Problem badge with red corners */}
        
          <div
            className="relative mb-4 w-fit"
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
          <div className="relative">

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
          </div>
        </AnimatedSection>
      </DecoratedContainer>
    </section>
  )
}
