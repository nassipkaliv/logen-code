import { useState } from 'react'
import { AnimatedSection, fadeInUp } from '../ui/ScrollAnimations'

const faqItems = [
  {
    question: 'What is Logen?',
    answer: 'Logen is a no-code automation platform for fast crypto markets. Set your rules once, and Logen executes them when it matters.',
  },
  {
    question: 'Do I need LOGN?',
    answer: 'No — up to 5 strategies are available without LOGN.',
  },
  {
    question: 'What does LOGN unlock?',
    answer: 'Unlimited strategies, lower fees, advanced templates.',
  },
  {
    question: 'Does Logen custody funds?',
    answer: 'No — your wallet stays in control.',
  },
]

// Plus sign corner for grid intersections
function PlusCorner({ className, style }: { className?: string; style?: React.CSSProperties }) {
  return (
    <svg
      width="11"
      height="11"
      viewBox="0 0 11 11"
      fill="none"
      className={`absolute ${className || ''}`}
      style={style}
    >
      <rect x="5" width="1" height="11" fill="#EDEDFA" />
      <rect y="5" width="11" height="1" fill="#EDEDFA" />
    </svg>
  )
}

// L-shaped corner for outer edges
function LCorner({ className, style }: { className?: string; style?: React.CSSProperties }) {
  return (
    <svg
      width="11"
      height="6"
      viewBox="0 0 11 6"
      fill="none"
      className={`absolute ${className || ''}`}
      style={style}
    >
      <rect x="5" width="1" height="6" fill="white" />
      <rect width="11" height="1" fill="white" />
    </svg>
  )
}

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0)

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index)
  }

  return (
    <section id="faq" className="relative">
      {/* Section labels row with horizontal lines */}
      <div className="relative max-w-[1310px] mx-auto">
        <div className="absolute top-0 left-0 right-0 hidden sm:block z-[60]">
          {/* Top horizontal line - full width */}
          <div className="absolute top-0 -left-[100vw] -right-[100vw] h-[1px] bg-[rgba(235,234,250,0.08)]" />
          {/* Bottom horizontal line - full width */}
          <div className="absolute bottom-0 -left-[100vw] -right-[100vw] h-[1px] bg-[rgba(235,234,250,0.08)]" />

          <div className="flex justify-between">
            {/* Left label - 07 / 07 */}
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
                  [<span className='text-[#ededf8]'>07</span> / 07]
                </span>
              </div>
            </div>

            {/* Right label - FAQ */}
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
                  [<span className='text-[#ededf8]'>FAQ</span>]
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Grid container */}
      <div className="relative w-full overflow-hidden">
        {/* Top horizontal line - full width */}
        <div className="absolute top-0 left-0 right-0 h-[1px] bg-[rgba(235,234,250,0.08)]" />
        {/* Bottom horizontal line - full width */}
        <div className="absolute bottom-0 left-0 right-0 h-[1px] bg-[rgba(235,234,250,0.08)]" />

        {/* 1310px container for corners */}
        <div className="max-w-[1310px] mx-auto px-4 relative">

          {/* Content wrapper for height */}
          <div className="relative flex justify-center px-4 sm:px-0">
            {/* FAQ Container - 580px with L-corners and borders */}
            <AnimatedSection
              variants={fadeInUp}
              className="relative w-full max-w-[580px] z-10 transition-all duration-300 ease-out"
            >
              <div
                className="relative"
                style={{
                  borderLeft: '1px solid rgba(235, 234, 250, 0.08)',
                  borderRight: '1px solid rgba(235, 234, 250, 0.08)',
                  background: 'linear-gradient(180deg, rgba(237, 237, 248, 0) 0%, rgba(237, 237, 248, 0.02) 100%)',
                }}
              >
              {/* L-corners at 4 corners of FAQ container */}
              <LCorner className="-top-[1px] -left-[5px]" />
              <LCorner className="-top-[1px] -right-[5px]" />
              <LCorner className="-bottom-[1px] -right-[5px] rotate-180" />
              <LCorner className="-bottom-[1px] -left-[5px] -rotate-180" />

              {/* Header row - empty */}
              <div className="h-[60px] md:h-[100px]" />

              {/* FAQ Items */}
              {faqItems.map((item, index) => (
                <div
                  key={index}
                  className="relative border-t border-[rgba(235,234,250,0.08)]"
                >

                  {/* Plus corners at row intersection - hidden on small mobile */}
                  <PlusCorner className="hidden min-[400px]:block -top-[5px] -left-[22px] min-[614px]:-left-[calc(50vw-284px)] min-[1310px]:-left-[371px]" />
                  <PlusCorner className="hidden min-[400px]:block -top-[5px] -right-[22px] min-[614px]:-right-[calc(50vw-284px)] min-[1310px]:-right-[371px]" />

                  {/* Question */}
                  <button
                    onClick={() => toggleFAQ(index)}
                    className="w-full flex items-center justify-between p-4 md:p-[20px] text-left min-h-[60px] md:min-h-[80px] pb-[12px] md:pb-[15px]"
                  >
                    <span className={`font-primary text-[14px] md:text-[16px] font-medium leading-[138%] transition-colors duration-300 ${
                      openIndex === index ? 'text-[rgba(237,237,248,0.6)]' : 'text-[#ededf8]'
                    }`}>
                      {item.question}
                    </span>
                    {/* Arrow icon */}
                    {openIndex === index ? (
                      <svg width="14" height="14" viewBox="0 0 14 14" fill="none" className="flex-shrink-0 ml-4">
                        <path d="M14 -1.56563e-06L-6.11959e-07 -9.53674e-07L14 14L14 -1.56563e-06Z" fill="#EBEAFA" fillOpacity="0.08" />
                      </svg>
                    ) : (
                      <svg width="14" height="14" viewBox="0 0 14 14" fill="none" className="flex-shrink-0 ml-4">
                        <path d="M14 14V0L0 14H14Z" fill="#848DE8" />
                      </svg>
                    )}
                  </button>

                  {/* Answer - expands/collapses with animation */}
                  <div
                    className={`overflow-hidden transition-all duration-300 ease-out ${
                      openIndex === index ? 'max-h-[200px] opacity-100' : 'max-h-0 opacity-0'
                    }`}
                  >
                    <div className="px-4 md:px-[20px] pb-4 md:pb-[20px]">
                      <p className="font-primary text-[13px] md:text-[15px] font-normal text-white]">
                        {item.answer}
                      </p>
                    </div>
                  </div>
                </div>
              ))}

              {/* Footer row - empty */}
              <div className="relative h-[60px] md:h-[100px] border-t border-[rgba(235,234,250,0.08)]">
                {/* Plus corners at footer row intersection - hidden on mobile */}
                <PlusCorner className="hidden sm:block -top-[5px] -left-[22px] min-[614px]:-left-[calc(50vw-284px)] min-[1310px]:-left-[371px]" />
                <PlusCorner className="hidden sm:block -top-[5px] -right-[22px] min-[614px]:-right-[calc(50vw-284px)] min-[1310px]:-right-[371px]" />
              </div>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </div>
    </section>
  )
}
