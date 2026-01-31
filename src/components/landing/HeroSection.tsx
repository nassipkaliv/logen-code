import { Link } from 'react-router-dom'

// Decorative dot pattern for borders
function BorderDots({ position }: { position: 'left' | 'right' }) {
  return (
    <div className={`absolute top-0 ${position === 'left' ? '-left-[6px]' : '-right-[6px]'} h-full pointer-events-none`}>
      <svg width="11" height="100%" className="h-full" preserveAspectRatio="none">
        <defs>
          <pattern id={`dotPattern-${position}`} x="0" y="0" width="11" height="40" patternUnits="userSpaceOnUse">
            <circle cx="5.5" cy="5" r="1" fill="#848DE8" fillOpacity="0.3" />
            <circle cx="5.5" cy="20" r="1" fill="#848DE8" fillOpacity="0.15" />
            <circle cx="5.5" cy="35" r="1" fill="#848DE8" fillOpacity="0.08" />
          </pattern>
        </defs>
        <rect width="11" height="100%" fill={`url(#dotPattern-${position})`} />
      </svg>
    </div>
  )
}

// Corner decoration component
function SectionCorner({ position }: { position: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right' }) {
  const positionClasses = {
    'top-left': '-top-[1px] -left-[6px]',
    'top-right': '-top-[1px] -right-[6px]',
    'bottom-left': '-bottom-[1px] -left-[6px]',
    'bottom-right': '-bottom-[1px] -right-[6px]',
  }

  const rotationClasses = {
    'top-left': '',
    'top-right': 'rotate-90',
    'bottom-left': '-rotate-90',
    'bottom-right': 'rotate-180',
  }

  return (
    <svg
      className={`absolute ${positionClasses[position]} ${rotationClasses[position]}`}
      width="11"
      height="11"
      viewBox="0 0 11 11"
      fill="none"
    >
      <rect x="0" y="0" width="1" height="11" fill="#FFF" />
      <rect x="0" y="0" width="11" height="1" fill="#FFF" />
    </svg>
  )
}

// Inner block corner decoration (smaller, white)
function BlockCorner({ className }: { className?: string }) {
  return (
    <svg
      width="6"
      height="6"
      viewBox="0 0 6 6"
      fill="none"
      className={`absolute ${className}`}
    >
      <rect width="1" height="6" fill="#FFF" />
      <rect width="6" height="1" fill="#FFF" />
    </svg>
  )
}

export default function HeroSection() {
  return (
    <section id="hero" className="relative min-h-[785px] pt-[160px] overflow-hidden">
      <div className="absolute inset-0 bg-[linear-gradient(rgba(235,234,250,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(235,234,250,0.03)_1px,transparent_1px)] bg-[size:60px_60px]" />

      <div className="absolute top-1/3 left-1/4 w-[500px] h-[500px] bg-[#848de8]/5 rounded-full blur-[150px]" />
      <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-[#848de8]/5 rounded-full blur-[120px]" />

      <div
        className="relative max-w-[1310px] min-h-[785px] mx-auto"
        style={{
          borderLeft: '1px solid rgba(235, 234, 250, 0.08)',
          borderRight: '1px solid rgba(235, 234, 250, 0.08)',
        }}
      >
        {/* Border decorations */}
        <BorderDots position="left" />
        <BorderDots position="right" />
        <SectionCorner position="top-left" />
        <SectionCorner position="top-right" />
        <SectionCorner position="bottom-left" />
        <SectionCorner position="bottom-right" />
        {/* Section labels */}
        {/* Left label - 01 / 07 */}
        <div className="absolute -top-4 -left-4">
          <div className="relative px-3 py-2">
            {/* Bottom-left corner */}
            <svg className="absolute -bottom-1 -left-1" width="11" height="6" viewBox="0 0 11 6" fill="none">
              <rect x="6" y="6" width="1" height="6" transform="rotate(180 6 6)" fill="#FFF" />
              <path d="M11 6L0 6L0 5L11 5L11 6Z" fill="#FFF" />
            </svg>
            {/* Top-right corner */}
            <svg className="absolute -top-1 -right-1 rotate-180" width="11" height="6" viewBox="0 0 11 6" fill="none">
              <rect x="6" y="6" width="1" height="6" transform="rotate(180 6 6)" fill="#FFF" />
              <path d="M11 6L0 6L0 5L11 5L11 6Z" fill="#FFF" />
            </svg>
            <span className="font-mono text-[10px] font-medium leading-[160%] uppercase text-[rgba(237,237,248,0.16)]">
              [<span className='text-[#ededf8]'>01</span> / 07]
            </span>
          </div>
        </div>

        {/* Right label - HERO */}
        <div className="absolute -top-4 -right-4">
          <div className="relative px-2 py-2">
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
            <span className="font-mono text-[10px] font-medium leading-[160%] uppercase text-[rgba(237,237,248,0.16)]">
              [<span className='text-[#ededf8]'>HERO</span>]
            </span>
          </div>
        </div>

        {/* Content */}
        <div className="flex flex-col items-center pt-8 px-4">
          {/* Dashboard Preview with corners */}
          <div className="relative w-full max-w-[900px] p-[1px]">
            <BlockCorner className="top-0 left-0" />
            <BlockCorner className="top-0 right-0 rotate-90" />
            <BlockCorner className="bottom-0 right-0 rotate-180" />
            <BlockCorner className="bottom-0 left-0 -rotate-90" />
            <img
              src="/assets/img/Dashboard.png"
              alt="Logen Dashboard"
              className="w-full h-auto rounded-xl"
            />
            {/* Optional overlay glow */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#02030e] via-transparent to-transparent pointer-events-none rounded-xl" />
          </div>

          {/* Main heading with corners */}
          <div className="relative p-4">
            <BlockCorner className="top-0 left-0" />
            <BlockCorner className="top-0 right-0 rotate-90" />
            <BlockCorner className="bottom-0 right-0 rotate-180" />
            <BlockCorner className="bottom-0 left-0 -rotate-90" />
            <h1
              className="font-primary text-[40px] sm:text-[50px] md:text-[60px] font-medium text-center leading-[113%]"
              style={{
                background: 'linear-gradient(180deg, #ebeafa 0%, rgba(237, 237, 249, 0.6) 100%)',
                backgroundClip: 'text',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}
            >
              No-Code Automation for
              <br />
              Fast Crypto Markets
            </h1>
          </div>

          {/* Subtitle with corners */}
          <div className="relative p-4">
            <BlockCorner className="top-0 left-0" />
            <BlockCorner className="top-0 right-0 rotate-90" />
            <BlockCorner className="bottom-0 right-0 rotate-180" />
            <BlockCorner className="bottom-0 left-0 -rotate-90" />
            <p className="font-primary text-[15px] font-normal tracking-[0.02em] text-center">
              <span className="text-[#ededf8]">Set your rules once</span>
              <span className="text-[rgba(235,234,250,0.6)]"> — Logen executes them when it matters.</span>
            </p>
          </div>

          {/* CTA Button container with corners */}
          <div className="relative py-6 px-12">
            <BlockCorner className="top-0 left-0" />
            <BlockCorner className="top-0 right-0 rotate-90" />
            <BlockCorner className="bottom-0 right-0 rotate-180" />
            <BlockCorner className="bottom-0 left-0 -rotate-90" />
            <Link
              to="/dashboard"
              className="relative px-6 py-3 font-primary text-sm font-medium text-[#ebedff] border border-[rgba(215,218,255,0.12)] rounded-sm hover:bg-[rgba(132,141,232,0.08)] transition-all"
            style={{
              boxShadow: 'inset 0 1px 1px 0 rgba(132, 141, 232, 0.2), inset 0 0 12px 0 rgba(132, 141, 232, 0.08), inset 0 0 8px 0 rgba(132, 141, 232, 0.06)',
              background: 'rgba(132, 141, 232, 0.04)',
            }}
          >
            {/* Corner decorations */}
            <svg className="absolute top-0 left-0" width="6" height="6" viewBox="0 0 6 6" fill="none">
              <rect width="1" height="6" fill="white" />
              <rect width="6" height="1" fill="white" />
            </svg>
            <svg className="absolute top-0 right-0 rotate-90" width="6" height="6" viewBox="0 0 6 6" fill="none">
              <rect width="1" height="6" fill="white" />
              <rect width="6" height="1" fill="white" />
            </svg>
            <svg className="absolute bottom-0 right-0 rotate-180" width="6" height="6" viewBox="0 0 6 6" fill="none">
              <rect width="1" height="6" fill="white" />
              <rect width="6" height="1" fill="white" />
            </svg>
            <svg className="absolute bottom-0 left-0 -rotate-90" width="6" height="6" viewBox="0 0 6 6" fill="none">
              <rect width="1" height="6" fill="white" />
              <rect width="6" height="1" fill="white" />
            </svg>
            Launch App
          </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
