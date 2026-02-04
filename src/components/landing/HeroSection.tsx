import { motion } from 'framer-motion'
import LaunchButton from './LaunchButton'

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
    <section id="hero" className="relative min-h-[400px] sm:min-h-[500px] md:min-h-[650px] lg:min-h-[785px] overflow-hidden">
      <div className="absolute inset-0 bg-[linear-gradient(rgba(235,234,250,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(235,234,250,0.03)_1px,transparent_1px)] bg-[size:40px_40px] md:bg-[size:60px_60px]" />

      <div className="absolute top-1/3 left-1/4 w-[250px] h-[250px] md:w-[400px] md:h-[400px] lg:w-[500px] lg:h-[500px] bg-[#848de8]/5 rounded-full blur-[100px] md:blur-[150px]" />
      <div className="absolute bottom-1/4 right-1/4 w-[200px] h-[200px] md:w-[300px] md:h-[300px] lg:w-[400px] lg:h-[400px] bg-[#848de8]/5 rounded-full blur-[80px] md:blur-[120px]" />

      <div
        className="relative max-w-[1310px] min-h-[400px] sm:min-h-[500px] md:min-h-[650px] lg:min-h-[785px] mx-auto px-2 sm:px-4 md:px-0"
        style={{
          borderLeft: '1px solid rgba(235, 234, 250, 0.08)',
          borderRight: '1px solid rgba(235, 234, 250, 0.08)',
        }}
      >
        {/* Border decorations - hidden on mobile */}
        <div className="hidden md:block">
          <BorderDots position="left" />
          <BorderDots position="right" />
        </div>
        <SectionCorner position="top-left" />
        <SectionCorner position="top-right" />
        <SectionCorner position="bottom-left" />
        <SectionCorner position="bottom-right" />
        {/* Section labels - hidden on small screens */}
        {/* Left label - 01 / 07 */}
        <div className="absolute -top-4 left-0 md:-left-4 hidden sm:block">
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
        <div className="absolute -top-4 right-0 md:-right-4 hidden sm:block">
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
        <div className="flex flex-col items-center pt-4 md:pt-8 px-2 md:px-4">
          {/* Dashboard Preview with corners */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="relative w-full max-w-[95%] sm:max-w-[85%] md:max-w-[900px] p-[1px]"
          >
            <BlockCorner className="top-0 left-0" />
            <BlockCorner className="top-0 right-0 rotate-90" />
            <BlockCorner className="bottom-0 right-0 rotate-180" />
            <BlockCorner className="bottom-0 left-0 -rotate-90" />
            <img
              src="/assets/img/Dashboard.png"
              alt="Logen Dashboard"
              className="w-full h-auto rounded-lg md:rounded-xl"
            />
            {/* Optional overlay glow */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#02030e] via-transparent to-transparent pointer-events-none rounded-lg md:rounded-xl" />
          </motion.div>

          {/* Main heading with corners */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="relative p-2 md:p-4"
          >
            <BlockCorner className="top-0 left-0" />
            <BlockCorner className="top-0 right-0 rotate-90" />
            <BlockCorner className="bottom-0 right-0 rotate-180" />
            <BlockCorner className="bottom-0 left-0 -rotate-90" />
            <h1
              className="font-primary text-[28px] sm:text-[36px] md:text-[50px] lg:text-[60px] font-medium text-center leading-[113%]"
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
          </motion.div>

          {/* Subtitle with corners */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="relative p-2 md:p-4"
          >
            <BlockCorner className="top-0 left-0" />
            <BlockCorner className="top-0 right-0 rotate-90" />
            <BlockCorner className="bottom-0 right-0 rotate-180" />
            <BlockCorner className="bottom-0 left-0 -rotate-90" />
            <p className="font-primary text-[13px] md:text-[15px] font-normal tracking-[0.02em] text-center">
              <span className="text-[#ededf8]">Set your rules once</span>
              <span className="text-[rgba(235,234,250,0.6)]"> — Logen executes them when it matters.</span>
            </p>
          </motion.div>

          {/* CTA Button with Privy wallet connection */}
          <LaunchButton />
        </div>
      </div>
    </section>
  )
}
