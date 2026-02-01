import DecoratedContainer from '../ui/DecoratedContainer'
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

const useCases = [
  {
    image: '/assets/img/usecase1.png',
    title: 'Stop-Loss in volatility',
  },
  {
    image: '/assets/img/usecase2.png',
    title: 'Take-Profit on Spikes',
  },
  {
    image: '/assets/img/usecase3.png',
    title: 'Buy the Dip Rules',
  },
  {
    image: '/assets/img/usecase4.png',
    title: 'Scheduled DCA',
  },
]

export default function VisualUseCasesSection() {
  return (
    <section id="use-cases" className="relative pt-16 md:pt-24 overflow-hidden">
      <DecoratedContainer id="use-cases" className="min-h-[400px] md:min-h-[500px] pt-[20px] md:pt-[25px] pb-10 md:pb-16 px-4">
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
              [<span className='text-white'>04</span> / 07]
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
              [<span className='text-white'>Visual Use Cases</span>]
            </span>
          </div>
        </div>

        {/* Use cases grid - 2x2, no row gap, 20px column gap */}
        <StaggerContainer className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 md:gap-x-5 gap-y-4 md:gap-y-0">
          {useCases.map((useCase, index) => (
            <StaggerItem key={index}>
              <div
                className="relative overflow-hidden"
                style={{
                  borderLeft: '1px solid rgba(235, 234, 250, 0.08)',
                  borderRight: '1px solid rgba(235, 234, 250, 0.08)',
                  background: 'linear-gradient(180deg, rgba(237, 237, 248, 0) 0%, rgba(237, 237, 248, 0.02) 100%)',
                }}
              >
              {/* Card corners */}
              <CardCorner className="top-0 left-0 z-10" />
              <CardCorner className="top-0 right-0 rotate-90 z-10" />
              <CardCorner className="bottom-0 right-0 rotate-180 z-10" />
              <CardCorner className="bottom-0 left-0 -rotate-90 z-10" />

              {/* Image */}
              <div className="w-full">
                <img
                  src={useCase.image}
                  alt={useCase.title}
                  className="w-full h-auto object-cover"
                />
              </div>

              {/* Divider */}
              <div
                className="w-full h-[1px]"
                style={{ background: 'rgba(235, 234, 250, 0.08)' }}
              />

              {/* Title container */}
              <div className="relative p-5 md:p-[30px]">
                {/* Top corners */}
                <svg className="absolute top-0 left-0" width="6" height="6" viewBox="0 0 6 6" fill="none">
                  <rect width="1" height="6" fill="white" />
                  <rect width="6" height="1" fill="white" />
                </svg>
                <svg className="absolute top-0 right-0 rotate-90" width="6" height="6" viewBox="0 0 6 6" fill="none">
                  <rect width="1" height="6" fill="white" />
                  <rect width="6" height="1" fill="white" />
                </svg>
                <p className="font-primary text-[14px] md:text-[16px] font-normal leading-[138%] tracking-[0.01em] text-[#ededf8] text-center">
                  {useCase.title}
                </p>
              </div>
            </div>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </DecoratedContainer>
    </section>
  )
}
