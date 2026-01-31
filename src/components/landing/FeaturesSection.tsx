import DecoratedContainer from '../ui/DecoratedContainer'

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
    icon: '/assets/img/features/nocode.png',
    title: 'No-code',
    subtitle: 'strategy setup',
  },
  {
    icon: '/assets/img/features/rulebased.png',
    title: 'Rule-based',
    subtitle: 'execution',
  },
  {
    icon: '/assets/img/features/solana.png',
    title: 'Built for Solana',
    subtitle: 'meme markets',
  },
  {
    icon: '/assets/img/features/free.png',
    title: 'Up to 5',
    subtitle: 'automations free',
  },
]

export default function FeaturesSection() {
  return (
    <section id="features" className="relative py-24 overflow-hidden">
      <DecoratedContainer id="features" className="min-h-[400px] pt-[70px] pb-16 px-4">
        {/* Section labels */}
        <div className="absolute -top-4 -left-4">
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
              03 / 07
            </span>
          </div>
        </div>
        <div className="absolute -top-4 -right-4">
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
              FEATURES
            </span>
          </div>
        </div>

        {/* Features grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {features.map((feature, index) => (
            <div
              key={index}
              className="relative p-6"
              style={{
                background: 'rgba(132, 141, 232, 0.02)',
                border: '1px solid rgba(235, 234, 250, 0.08)',
              }}
            >
              {/* Card corners */}
              <CardCorner className="top-0 left-0" />
              <CardCorner className="top-0 right-0 rotate-90" />
              <CardCorner className="bottom-0 right-0 rotate-180" />
              <CardCorner className="bottom-0 left-0 -rotate-90" />

              {/* Icon */}
              <div className="flex items-center justify-center mb-4">
                <img src={feature.icon} alt={feature.title} className="w-16 h-16 object-contain" />
              </div>

              {/* Text */}
              <h3 className="font-primary text-[#ededf8] font-medium text-base text-center">{feature.title}</h3>
              <p className="font-primary text-[rgba(237,237,248,0.6)] text-sm text-center">{feature.subtitle}</p>
            </div>
          ))}
        </div>
      </DecoratedContainer>
    </section>
  )
}
