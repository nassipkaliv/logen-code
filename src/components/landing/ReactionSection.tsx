import DecoratedContainer from '../ui/DecoratedContainer'
import { AnimatedSection, scaleIn, fadeInUp } from '../ui/ScrollAnimations'

export default function ReactionSection() {
  return (
    <section id="reaction" className="relative pt-2 overflow-hidden">
      <DecoratedContainer id="reaction" className="min-h-[200px] sm:min-h-[350px] md:min-h-[500px] pt-[10px] sm:pt-[20px] md:pt-[25px] pb-6 sm:pb-10 md:pb-16 px-2 sm:px-4">
        {/* Section labels */}
        <div className="absolute -top-4 left-0 md:-left-4 hidden sm:block">
          <div className="relative px-3 py-2">
            <svg className="absolute -bottom-1 -left-1" width="11" height="6" viewBox="0 0 11 6" fill="none">
              <rect x="6" y="6" width="1" height="6" transform="rotate(180 6 6)" fill="#FFF" />
              <path d="M11 6L0 6L0 5L11 5L11 6Z" fill="#FFF" />
            </svg>
            <svg className="absolute -top-1 -right-1 rotate-180" width="11" height="6" viewBox="0 0 11 6" fill="none">
              <rect x="6" y="6" width="1" height="6" transform="rotate(180 6 6)" fill="#FFF" />
              <path d="M11 6L0 6L0 5L11 5L11 6Z" fill="#FFF" />
            </svg>
            <span className="font-mono text-[10px] font-medium leading-[160%] uppercase text-[rgba(237,237,248,0.16)]">
              [<span className='text-white'>05</span> / 07]
            </span>
          </div>
        </div>
        <div className="absolute -top-4 right-0 md:-right-4 hidden sm:block">
          <div className="relative px-2 py-2">
            <svg className="absolute bottom-0 left-0" width="11" height="6" viewBox="0 0 11 6" fill="none">
              <rect x="6" y="6" width="1" height="6" transform="rotate(180 6 6)" fill="#FFF" />
              <path d="M11 6L0 6L0 5L11 5L11 6Z" fill="#FFF" />
            </svg>
            <svg className="absolute top-0 right-0 rotate-180" width="11" height="6" viewBox="0 0 11 6" fill="none">
              <rect x="6" y="6" width="1" height="6" transform="rotate(180 6 6)" fill="#FFF" />
              <path d="M11 6L0 6L0 5L11 5L11 6Z" fill="#FFF" />
            </svg>
            <span className="font-mono text-[10px] font-medium leading-[160%] uppercase text-[rgba(237,237,248,0.16)]">
              [<span className='text-white'>Speed Gap</span>]
            </span>
          </div>
        </div>

        {/* Content */}
        <div className="flex flex-col items-center">
          {/* Image - hidden on small mobile, visible on larger screens */}
          <AnimatedSection variants={scaleIn} className="relative w-full hidden sm:block">
            <img
              src="/assets/img/speedgapbg.png"
              alt="From Reaction to Execution"
              className="w-full h-auto"
            />

            {/* Text overlay at bottom - for larger screens */}
            <div className="absolute bottom-0 left-0 right-0 flex flex-col items-center pb-6 md:pb-8 px-4">
              {/* Title */}
              <h2
                className="font-primary text-[28px] sm:text-[32px] md:text-[40px] font-medium text-center mb-3 md:mb-4"
                style={{
                  background: 'linear-gradient(180deg, #ebeafa 0%, rgba(237, 237, 249, 0.7) 100%)',
                  backgroundClip: 'text',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                }}
              >
                From Reaction to Execution
              </h2>

              {/* Subtitle */}
              <p className="font-primary text-[13px] md:text-[15px] font-normal leading-[160%] md:leading-[167%] tracking-[0.02em] text-center max-w-[500px] md:max-w-[600px] text-[#ededf8]">
                Most losses come from delayed actions, not bad ideas.{' '}
                <span className="text-[rgba(237,237,248,0.6)]">You already know what you want to do</span>
                {' '}— sell at a drop, take profit on a spike, buy on a dip. Logen automates that intent so the outcome depends on rules, not timing.
              </p>
            </div>
          </AnimatedSection>

          {/* Mobile version - text without image overlay */}
          <AnimatedSection variants={fadeInUp} className="sm:hidden flex flex-col items-center px-4 py-8">
            {/* Title */}
            <h2
              className="font-primary text-[22px] font-medium text-center mb-4"
              style={{
                background: 'linear-gradient(180deg, #ebeafa 0%, rgba(237, 237, 249, 0.7) 100%)',
                backgroundClip: 'text',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}
            >
              From Reaction to Execution
            </h2>

            {/* Subtitle */}
            <p className="font-primary text-[12px] font-normal leading-[160%] tracking-[0.02em] text-center text-[#ededf8]">
              Most losses come from delayed actions, not bad ideas.{' '}
              <span className="text-[rgba(237,237,248,0.6)]">You already know what you want to do</span>
              {' '}— sell at a drop, take profit on a spike, buy on a dip. Logen automates that intent so the outcome depends on rules, not timing.
            </p>
          </AnimatedSection>
        </div>
      </DecoratedContainer>
    </section>
  )
}
