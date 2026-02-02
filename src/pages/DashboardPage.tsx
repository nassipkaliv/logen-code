import { useRef } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import type { Swiper as SwiperType } from 'swiper'
import { DashboardLayout } from '../components/dashboard'

import 'swiper/css'
import '../styles/swiper-custom.css'

function Corner({ className }: { className?: string }) {
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

function PlusCorner({ className }: { className?: string }) {
  return (
    <svg className={`absolute ${className || ''}`} width="11" height="11" viewBox="0 0 11 11" fill="none">
      <rect x="5" width="1" height="11" fill="#EDEDFA" />
      <rect y="5" width="11" height="1" fill="#EDEDFA" />
    </svg>
  )
}

function SolanaIcon() {
  return (
    <svg width="80" height="80" viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
      <g filter="url(#filter0_i_2_11780)">
      <rect width="80" height="80" fill="white" fill-opacity="0.04"/>
      <rect x="0.740741" y="0.740741" width="78.5185" height="78.5185" stroke="white" stroke-opacity="0.12" stroke-width="1.48148"/>
      <path d="M22.2222 0H57.7777V2.96296H22.2222V0Z" fill="#D9D9D9"/>
      <path d="M80 10.3704L80 68.1481L78.5185 68.1481L78.5185 10.3704L80 10.3704Z" fill="#D9D9D9"/>
      <path d="M1.48145 10.3704L1.48144 68.1481L-3.61426e-05 68.1481L-3.3617e-05 10.3704L1.48145 10.3704Z" fill="#D9D9D9"/>
      <path d="M22.2222 77.037H57.7777V80H22.2222V77.037Z" fill="#D9D9D9"/>
      <g clip-path="url(#clip0_2_11780)">
      <path d="M26.7578 47.8006C26.9844 47.5695 27.2915 47.4397 27.6118 47.4397H57.1605C57.6988 47.4397 57.9683 48.1042 57.5875 48.4927L51.7487 54.4495C51.5222 54.6806 51.215 54.8105 50.8948 54.8105H21.346C20.8077 54.8105 20.5383 54.1459 20.919 53.7574L26.7578 47.8006Z" fill="#EBEDFF"/>
      <path d="M26.7578 25.5461C26.9844 25.315 27.2915 25.1852 27.6118 25.1852H57.1605C57.6988 25.1852 57.9683 25.8498 57.5875 26.2382L51.7487 32.1951C51.5222 32.4262 51.215 32.556 50.8948 32.556H21.346C20.8077 32.556 20.5383 31.8914 20.919 31.5029L26.7578 25.5461Z" fill="#EBEDFF"/>
      <path d="M51.7487 36.6027C51.5222 36.3716 51.215 36.2417 50.8948 36.2417H21.346C20.8077 36.2417 20.5383 36.9063 20.919 37.2948L26.7578 43.2516C26.9844 43.4827 27.2915 43.6125 27.6118 43.6125H57.1605C57.6988 43.6125 57.9683 42.9479 57.5875 42.5594L51.7487 36.6027Z" fill="#EBEDFF"/>
      </g>
      </g>
      <defs>
      <filter id="filter0_i_2_11780" x="0" y="0" width="80" height="82.963" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
      <feFlood flood-opacity="0" result="BackgroundImageFix"/>
      <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape"/>
      <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
      <feOffset dy="2.96296"/>
      <feGaussianBlur stdDeviation="11.1111"/>
      <feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1"/>
      <feColorMatrix type="matrix" values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 0.15 0"/>
      <feBlend mode="normal" in2="shape" result="effect1_innerShadow_2_11780"/>
      </filter>
      <clipPath id="clip0_2_11780">
      <rect width="37.037" height="29.6296" fill="white" transform="translate(20.7407 25.1852)"/>
      </clipPath>
      </defs>
    </svg>

  )
}

function TokenCard() {
  return (
    <div
      className="relative p-5 md:p-5 w-full pt-10 md:pt-10"
      style={{
        borderLeft: '1px solid rgba(235, 234, 250, 0.08)',
        borderRight: '1px solid rgba(235, 234, 250, 0.08)',
        background: 'linear-gradient(180deg, rgba(132, 141, 232, 0) 0%, rgba(132, 141, 232, 0.06) 100%)',
      }}
    >

      <div className="flex justify-center mb-10">
        <SolanaIcon />
      </div>

      <h3 className="font-primary text-base md:text-base font-medium leading-[138%] tracking-[0.01em] text-[#ededf8] mb-[15px]">
        SOLANA (SOL)
      </h3>

      <div className="space-y-[10px]">
        <div className="flex justify-between items-center">
          <span className="font-primary text-sm text-[rgba(235,234,250,0.5)]  tracking-[0.02em] leading-[156%]">UPTIME:</span>
          <span className="font-primary text-sm text-[#ededf8] tracking-[0.02em] leading-[153%]">24:17:42</span>
        </div>
        <div className="flex justify-between items-center">
          <span className="font-primary text-sm text-[rgba(235,234,250,0.5)]  tracking-[0.02em] leading-[156%]">24h Change:</span>
          <span
            className="font-mono text-xs px-1.5 py-0.5 text-[#ff587a]"
            style={{
              background: 'rgba(255, 69, 120, 0.1), linear-gradient(270deg, rgba(29, 9, 25, 0.12) 35%, rgba(255, 69, 120, 0.12) 100%)',
              borderLeft: '1px solid #ff587a',
            }}
          >
            -X.XXX%
          </span>
        </div>
        <div className="flex justify-between items-center">
          <span className="font-primary text-sm text-[rgba(235,234,250,0.5)]  tracking-[0.02em] leading-[156%]">Volume:</span>
          <span className="font-primary text-sm text-[#ededf8] tracking-[0.02em] leading-[153%]">XXXXX</span>
        </div>
      </div>
    </div>
  )
}

function NavArrowButton({
  onClick,
  direction
}: {
  onClick: () => void
  direction: 'prev' | 'next'
}) {
  return (
    <button
      onClick={onClick}
      className="relative w-9 h-9 flex items-center justify-center transition-all hover:opacity-80"
      style={{
        border: '1px solid rgba(215, 218, 255, 0.12)',
        backdropFilter: 'blur(100px)',
        boxShadow: 'inset 0 1px 1px 0 rgba(132, 141, 232, 0.2), inset 0 0 12px 0 rgba(132, 141, 232, 0.08), inset 0 0 8px 0 rgba(132, 141, 232, 0.06), inset 0 0 20px 0 rgba(132, 141, 232, 0.12), inset 0 12px 20px 0 rgba(132, 141, 232, 0.06)',
        background: 'rgba(132, 141, 232, 0.04)',
      }}
    >
      <Corner className="top-0 left-0" />
      <Corner className="top-0 right-0 rotate-90" />
      <Corner className="bottom-0 right-0 rotate-180" />
      <Corner className="bottom-0 left-0 -rotate-90" />
      <svg
        width="8"
        height="14"
        viewBox="0 0 8 14"
        fill="none"
        className={direction === 'prev' ? 'rotate-180' : ''}
      >
        <path d="M8 7L0 0V14L8 7Z" fill="#EBEAFA" />
      </svg>
    </button>
  )
}

function NavigationArrows({
  onPrev,
  onNext
}: {
  onPrev: () => void
  onNext: () => void
}) {
  return (
    <div className="flex items-center justify-center gap-5">
      <NavArrowButton onClick={onPrev} direction="prev" />
      <NavArrowButton onClick={onNext} direction="next" />
    </div>
  )
}

const tokens = [
  { id: 1, name: 'SOLANA (SOL)' },
  { id: 2, name: 'SOLANA (SOL)' },
  { id: 3, name: 'SOLANA (SOL)' },
  { id: 4, name: 'SOLANA (SOL)' },
  { id: 5, name: 'SOLANA (SOL)' },
]

export default function DashboardPage() {
  const swiperRef = useRef<SwiperType | null>(null)

  const handlePrev = () => {
    swiperRef.current?.slidePrev()
  }

  const handleNext = () => {
    swiperRef.current?.slideNext()
  }

  return (
    <DashboardLayout>
      <div
        className="relative"
        style={{
          background: 'linear-gradient(180deg, rgba(132, 141, 232, 0) 0%, rgba(132, 141, 232, 0.02) 100%)',
        }}
      >
        <div className="overflow-hidden mx-[40px] token-carousel">
          <Swiper
            onSwiper={(swiper) => {
              swiperRef.current = swiper
            }}
            slidesPerView={3}
            centeredSlides={true}
            spaceBetween={15}
            initialSlide={2}
            speed={400}
            grabCursor={true}
            breakpoints={{
              320: {
                slidesPerView: 1.5,
                spaceBetween: 10,
              },
              640: {
                slidesPerView: 2.5,
                spaceBetween: 15,
              },
              1024: {
                slidesPerView: 3.5,
                spaceBetween: 15,
              },
            }}
          >
            {tokens.map((token) => (
              <SwiperSlide key={token.id}>
                <TokenCard />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>

        <div className="relative py-[15px]">
          <div
            className="absolute top-0 left-[40px] right-[40px] h-[1px] bg-[rgba(235,234,250,0.08)]"
          />
          <NavigationArrows onPrev={handlePrev} onNext={handleNext} />
        </div>
      </div>

      {/* Wallet preview section */}
      <div className="relative mx-[40px] py-[60px]">
        <div className="absolute top-0 left-0 right-0 h-[1px] bg-[rgba(235,234,250,0.08)]" />

        <PlusCorner className="top-0 left-[-4px]" />
        <PlusCorner className="top-0 right-[-4px]" />

        <div className="relative flex items-center justify-center">
          <img
            src="/assets/img/dashboardMain.png"
            alt="Dashboard preview"
            className="w-full"
          />
          <div className="absolute inset-0 flex flex-col items-center justify-center pt-[300px]">
            <h2
              className="font-primary text-[32px] md:text-[40px] font-medium leading-[100%] text-center mb-6"
              style={{
                background: 'linear-gradient(180deg, #ebeafa 0%, rgba(237, 237, 249, 0.7) 100%)',
                backgroundClip: 'text',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}
            >
              See how this looks<br />on your wallet
            </h2>

            <button
              className="relative px-6 py-3 font-primary text-sm font-medium text-white leading-[143%] tracking-[0.01em]"
              style={{
                border: '1px solid rgba(215, 218, 255, 0.12)',
                backdropFilter: 'blur(100px)',
                boxShadow: 'inset 0 1px 1px 0 rgba(132, 141, 232, 0.2), inset 0 0 12px 0 rgba(132, 141, 232, 0.08), inset 0 0 8px 0 rgba(132, 141, 232, 0.06), inset 0 0 20px 0 rgba(132, 141, 232, 0.12), inset 0 12px 20px 0 rgba(132, 141, 232, 0.06)',
                background: 'rgba(132, 141, 232, 0.04)',
              }}
            >
              <Corner className="top-0 left-0" />
              <Corner className="top-0 right-0 rotate-90" />
              <Corner className="bottom-0 right-0 rotate-180" />
              <Corner className="bottom-0 left-0 -rotate-90" />
              View Wallet
            </button>
          </div>
        </div>
      </div>
    </DashboardLayout>
  )
}
