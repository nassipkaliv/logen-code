import { motion } from 'framer-motion'
import LaunchButton from './LaunchButton'



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
    <section id="hero" className="relative min-h-[400px] sm:min-h-[500px] md:min-h-[650px] lg:min-h-[785px]">
      {/* Grid background cover */}
      <img
        src="/assets/img/heroSectionGridBg.png"
        alt=""
        className="absolute inset-0 w-full h-full object-cover pointer-events-none z-0"
      />
      {/* Glow bottom */}
      <img
        src="/assets/img/glowbottom.png"
        alt=""
        className="absolute bottom-0 left-1/2 -translate-x-1/2 pointer-events-none z-[1]"
      />
      {/* Ellipse decoration - top left */}
      <img
        src="/assets/img/ellipseHeroBg.png"
        alt=""
        className="absolute top-[100px] left-[85px] pointer-events-none z-[1]"
      />
      <img
        src="/assets/img/ellipseHeroBg.png"
        alt=""
        className="absolute bottom-[85px] left-[18%] pointer-events-none z-[1]"
      />
      <img
        src="/assets/img/ellipseHeroBg.png"
        alt=""
        className="absolute bottom-[12%] right-[10%] pointer-events-none z-[1]"
      />
      <img
        src="/assets/img/ellipse2.png"
        alt=""
        className="absolute bottom-[38%] left-[7%] pointer-events-none z-[1]"
      />

      <div
        className="relative max-w-[1310px] min-h-[400px] sm:min-h-[500px] md:min-h-[650px] lg:min-h-[785px] mx-auto px-2 sm:px-4 md:px-0"
      >

        {/* Section labels row with horizontal lines */}
        <div className="absolute -top-[1px] left-0 right-0 hidden sm:block z-[60]">
          {/* Top horizontal line - full width */}
          <div className="absolute top-0 -left-[100vw] -right-[100vw] h-[1px] bg-[rgba(235,234,250,0.08)]" />
          {/* Bottom horizontal line - full width */}
          <div className="absolute bottom-0 -left-[100vw] -right-[100vw] h-[1px] bg-[rgba(235,234,250,0.08)]" />

          <div className="flex justify-between">
            {/* Left label - 01 / 07 */}
            <div className="relative">
              {/* Right vertical line - extends to bottom of hero */}
              <div className="absolute right-0 top-0 h-[770px] w-[1px] bg-[rgba(235,234,250,0.08)]" />
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
                  [<span className='text-[#ededf8]'>01</span> / 07]
                </span>
              </div>
            </div>

            {/* Right label - HERO */}
            <div className="relative">
              {/* Left vertical line - extends to bottom of hero */}
              <div className="absolute left-0 top-0 h-[770px] w-[1px] bg-[rgba(235,234,250,0.08)]" />
              {/* Right vertical line */}
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
                  [<span className='text-[#ededf8]'>HERO</span>]
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="relative flex flex-col items-center pt-4 md:pt-8 px-2 md:px-4">

            <div className='relative h-[24px] w-full'>
              {/* Bottom horizontal line - full width */}
              <div className="absolute bottom-0 -left-[100vw] -right-[100vw] h-[1px] bg-[rgba(235,234,250,0.08)]" />
            </div>

            {/* Dashboard Preview with background and corners */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
              className="relative w-full max-w-[95%] sm:max-w-[85%] md:max-w-[900px] p-[1px]"
            >
              {/* Left background image */}
              <img
                src="/assets/img/heroBgImage.png"
                alt=""
                className="absolute top-0 right-full mr-[-130px] w-auto h-full pointer-events-none z-0"
              />
              {/* Right background image */}
              <img
                src="/assets/img/heroBgImage.png"
                alt=""
                className="absolute top-0 left-full ml-[-130px] w-auto h-full pointer-events-none z-0"
              />
              <BlockCorner className="top-0 left-0 z-10" />
              <BlockCorner className="top-0 right-0 rotate-90 z-10" />
              <BlockCorner className="bottom-0 right-0 rotate-180 z-10" />
              <BlockCorner className="bottom-0 left-0 -rotate-90 z-10" />
              <img
                src="/assets/img/Dashboard.png"
                alt="Logen Dashboard"
                className="relative w-full h-auto rounded-lg md:rounded-xl z-[1]"
              />
              {/* Overlay gradient fade */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#02030e] via-transparent to-transparent pointer-events-none rounded-lg md:rounded-xl z-[2]" />
              {/* Bottom horizontal line - full width */}
              <div className="absolute bottom-0 -left-[100vw] -right-[100vw] h-[1px] bg-[rgba(235,234,250,0.08)] z-[3]" />
            </motion.div>

            {/* Heading line 1 container */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2, ease: [0.25, 0.46, 0.45, 0.94] }}
              className="relative px-[30px] flex items-center justify-center border-l border-r border-b border-[rgba(235,234,250,0.08)]"
            >
              {/* Vertical lines extending from this container to bottom of hero */}
              <div className="absolute left-0 top-0 w-[1px] h-[405px] bg-[rgba(235,234,250,0.08)] hidden sm:block" />
              <div className="absolute right-0 top-0 w-[1px] h-[405px] bg-[rgba(235,234,250,0.08)] hidden sm:block" />
              <BlockCorner className="top-0 left-0" />
              <BlockCorner className="top-0 right-0 rotate-90" />
              <BlockCorner className="bottom-0 right-0 rotate-180" />
              <BlockCorner className="bottom-0 left-0 -rotate-90" />
              {/* Bottom horizontal line - full width */}
              <div className="absolute bottom-0 -left-[100vw] -right-[100vw] h-[1px] bg-[rgba(235,234,250,0.08)]" />
              <span
                className="font-primary text-[28px] sm:text-[36px] md:text-[50px] lg:text-[60px] font-medium text-center leading-[113%] py-2 md:py-4"
                style={{
                  background: 'linear-gradient(180deg, #ebeafa 0%, rgba(237, 237, 249, 0.6) 100%)',
                  backgroundClip: 'text',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                }}
              >
                No-Code Automation for
              </span>
            </motion.div>

            {/* Heading line 2 container */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
              className="relative px-[30px] flex items-center justify-center border-l border-r border-b border-[rgba(235,234,250,0.08)]"
            >
              <BlockCorner className="top-0 left-0" />
              <BlockCorner className="top-0 right-0 rotate-90" />
              <BlockCorner className="bottom-0 right-0 rotate-180" />
              <BlockCorner className="bottom-0 left-0 -rotate-90" />
              {/* Bottom horizontal line - full width */}
              <div className="absolute bottom-0 -left-[100vw] -right-[100vw] h-[1px] bg-[rgba(235,234,250,0.08)]" />
              <span
                className="font-primary text-[28px] sm:text-[36px] md:text-[50px] lg:text-[60px] font-medium text-center leading-[113%] py-2 md:py-4"
                style={{
                  background: 'linear-gradient(180deg, #ebeafa 0%, rgba(237, 237, 249, 0.6) 100%)',
                  backgroundClip: 'text',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                }}
              >
                Fast Crypto Markets
              </span>
            </motion.div>

            {/* Subtitle container */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
              className="relative px-[35px] flex items-center justify-center border-l border-r border-b border-[rgba(235,234,250,0.08)]"
            >
              <BlockCorner className="top-0 left-0" />
              <BlockCorner className="top-0 right-0 rotate-90" />
              <BlockCorner className="bottom-0 right-0 rotate-180" />
              <BlockCorner className="bottom-0 left-0 -rotate-90" />
              {/* Bottom horizontal line - full width */}
              <div className="absolute bottom-0 -left-[100vw] -right-[100vw] h-[1px] bg-[rgba(235,234,250,0.08)]" />
              <p className="font-primary text-[13px] md:text-[15px] font-normal tracking-[0.02em] text-center py-2 md:py-4">
                <span className="text-[#ededf8]">Set your rules once</span>
                <span className="text-[rgba(235,234,250,0.6)]"> — Logen executes them when it matters.</span>
              </p>
            </motion.div>

            {/* CTA Button container */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
              className="relative px-[50px] flex items-center justify-center border-l border-r border-b border-[rgba(235,234,250,0.08)]"
            >
              <BlockCorner className="top-0 left-0" />
              <BlockCorner className="top-0 right-0 rotate-90" />
              <BlockCorner className="bottom-0 right-0 rotate-180" />
              <BlockCorner className="bottom-0 left-0 -rotate-90" />
              {/* Bottom horizontal line - full width */}
              <div className="absolute bottom-0 -left-[100vw] -right-[100vw] h-[1px] bg-[rgba(235,234,250,0.08)]" />
              <LaunchButton />
            </motion.div>
        </div>
      </div>
    </section>
  )
}
