import { StaggerContainer, StaggerItem } from '../ui/ScrollAnimations'

function CardCorner({ className, color = 'white' }: { className?: string; color?: string }) {
  return (
    <svg
      width="6"
      height="6"
      viewBox="0 0 6 6"
      fill="none"
      className={`absolute ${className}`}
    >
      <rect width="1" height="6" fill={color} />
      <rect width="6" height="1" fill={color} />
    </svg>
  )
}

const roadmapItems = [
  {
    quarter: 'Q1',
    year: '2026',
    items: [
      'Logen token launch',
      'Core automation engine release',
      'Wallet-based dashboard live',
      'Free automation tier available at launch',
    ],
  },
  {
    quarter: 'Q2',
    year: '2026',
    items: [
      'Strategy builder v1',
      'Preset strategies rollout',
      'Basic execution monitoring',
      'Initial UX and performance optimizations',
    ],
  },
  {
    quarter: 'Q3',
    year: '2026',
    items: [
      'Advanced strategy templates',
      'Token utility activation (limits, fees)',
      'Strategy management and editing',
      'Execution reliability improvements',
    ],
  },
  {
    quarter: 'Q4',
    year: '2026',
    items: [
      'Fee reduction logic for token holders',
      'Expanded dashboard analytics',
      'Multi-condition strategy support',
      'Infrastructure scaling',
    ],
  },
  {
    quarter: 'Q1',
    year: '2027',
    items: [
      'Advanced execution controls ',
      'Strategy performance insights',
      'Improved manual data handling',
      'Security and stability upgrades',
    ],
  },
  {
    quarter: 'Q2',
    year: '2027',
    items: [
      'Ecosystem integrations',
      'Strategy library expansion',
      'Platform preparation for high volume',
      'Long-term stability improvements',
    ],
  },
]

export default function RoadmapSection() {
  return (
    <section id="roadmap" className="relative">
      {/* Section labels row with horizontal lines */}
      <div className="relative max-w-[1310px] mx-auto">
        <div className="relative hidden sm:block z-[60]">
          {/* Top horizontal line - full width */}
          <div className="absolute top-0 -left-[100vw] -right-[100vw] h-[1px] bg-[rgba(235,234,250,0.08)]" />
          {/* Bottom horizontal line - full width */}
          <div className="absolute bottom-0 -left-[100vw] -right-[100vw] h-[1px] bg-[rgba(235,234,250,0.08)]" />

          <div className="flex justify-between">
            {/* Left label - 06 / 07 */}
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
                  [<span className='text-[#ededf8]'>06</span> / 07]
                </span>
              </div>
            </div>

            {/* Right label - ROADMAP */}
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
                  [<span className='text-[#ededf8]'>ROADMAP</span>]
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Roadmap cards - wider container with horizontal scroll on mobile */}
      <div className="max-w-[1620px] mx-auto px-4 overflow-x-auto pt-[75px] pb-[75px]">
        <StaggerContainer className="flex min-w-[900px] lg:min-w-0" fast>
        {roadmapItems.map((item, index) => (
          <StaggerItem key={index} className="relative flex-1 min-w-0 flex flex-col">
            <div
              className="relative flex-1 flex flex-col"
              style={{
                borderLeft: '1px solid rgba(235, 234, 250, 0.08)',
                borderRight: index === roadmapItems.length - 1 ? '1px solid rgba(235, 234, 250, 0.08)' : 'none',
              }}
            >
            {/* Top corners on all cards */}
            <CardCorner className="top-0 left-0 z-10" color={index === 0 ? '#848de8' : 'white'} />

            {/* Bottom corner only on first and last */}
            {index === 0 && <CardCorner className="bottom-0 left-0 -rotate-90 z-10" />}
            {index === roadmapItems.length - 1 && <CardCorner className="bottom-0 right-0 rotate-180 z-10" />}

            {/* Header */}
            <div
              className="relative p-[10px]"
              style={{
                border: '1px solid rgba(237, 237, 250, 0.02)',
                background: index === 0
                  ? 'linear-gradient(180deg, rgba(132, 141, 232, 0) 0%, rgba(132, 141, 232, 0.1) 100%)'
                  : 'linear-gradient(180deg, rgba(237, 237, 248, 0) 0%, rgba(237, 237, 248, 0.02) 100%)',
                minHeight: '80px',
              }}
            >

              <CardCorner className="bottom-0 right-0 z-10 rotate-180" color={index === 0 ? '#848de8' : 'white'} />

              {/* Arrow SVG - only on first card, positioned top-right */}
              {index === 0 && (
                <svg className="absolute top-[10px] right-[10px]" width="31" height="10" viewBox="0 0 31 10" fill="none">
                  <path d="M7 5.00005L1.75 9.33018V0.669922L7 5.00005Z" fill="#848DE8" />
                  <path d="M19 5.00005L13.75 9.33018V0.669922L19 5.00005Z" fill="#848DE8" />
                  <path d="M31 5.00005L25.75 9.33018V0.669922L31 5.00005Z" fill="#848DE8" />
                </svg>
              )}

              {/* Dots - positioned bottom-left */}
              <div className="absolute bottom-[10px] left-[10px] flex items-end gap-1">
                <div className={`w-[4px] h-[4px] ${index === 0 ? 'bg-[#848de8]' : 'bg-[#ededfa]'}`} />
                <div className={`w-[4px] h-[4px] ${index === 0 ? 'bg-[#848de8]' : 'bg-[#ededfa]'}`} />
                <div className={`w-[4px] h-[4px] ${index === 0 ? 'bg-[#848de8]' : 'bg-[#ededfa]'}`} />
              </div>

            </div>

            {/* Divider */}
            <div
              className="w-full h-[1px]"
              style={{ background: 'rgba(235, 234, 250, 0.08)' }}
            />

            {/* Content */}
            <div
              className="p-3 md:p-4 flex-1"
              style={{
                background: 'linear-gradient(180deg, rgba(237, 237, 248, 0) 0%, rgba(237, 237, 248, 0.02) 100%)',
              }}
            >
              {/* Quarter badge and year */}
              <div className="flex items-center gap-2 md:gap-3 mb-2 md:mb-3">
                {/* Quarter box */}
                <div
                  className="relative w-[32px] h-[32px] md:w-[36px] md:h-[36px] flex items-center justify-center"
                  style={{
                    border: '1px solid rgba(215, 218, 255, 0.12)',
                    backdropFilter: 'blur(10px)',
                    boxShadow: 'inset 0 1px 1px 0 rgba(132, 141, 232, 0.2), inset 0 0 12px 0 rgba(132, 141, 232, 0.08), inset 0 0 8px 0 rgba(132, 141, 232, 0.06), inset 0 0 20px 0 rgba(132, 141, 232, 0.12), inset 0 12px 20px 0 rgba(132, 141, 232, 0.06)',
                    background: index === 0 ? 'rgba(132, 141, 232, 0.04)' : 'rgba(215, 218, 255, 0.04)',
                  }}
                >
                  <CardCorner className="top-0 left-0" color={index === 0 ? '#848DE8' : '#D7DAFF'} />
                  <CardCorner className="top-0 right-0 rotate-90" color={index === 0 ? '#848DE8' : '#D7DAFF'} />
                  <CardCorner className="bottom-0 right-0 rotate-180" color={index === 0 ? '#848DE8' : '#D7DAFF'} />
                  <CardCorner className="bottom-0 left-0 -rotate-90" color={index === 0 ? '#848DE8' : '#D7DAFF'} />
                  <span
                    className="font-primary text-[12px] md:text-[14px] font-medium leading-[143%] tracking-[0.01em] text-center"
                    style={{ color: index === 0 ? '#848de8' : '#d7daff' }}
                  >
                    {item.quarter}
                  </span>
                </div>
                {/* Year */}
                <span className="font-primary text-[16px] md:text-[20px] font-medium uppercase text-center text-[#ededf8]">
                  {item.year}
                </span>
              </div>

              {/* List items */}
              <ul className="space-y-1 md:space-y-2">
                {item.items.map((listItem, listIndex) => (
                  <li
                    key={listIndex}
                    className="font-primary text-[13px] md:text-[15px] font-normal text-[rgba(237,237,248,0.8)] tracking-[0.02em]"
                  >
                    {listItem}
                  </li>
                ))}
              </ul>
            </div>
            </div>
          </StaggerItem>
        ))}
        </StaggerContainer>
      </div>
    </section>
  )
}
