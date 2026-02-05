import { useRef, useEffect, useState } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import type { Swiper as SwiperType } from 'swiper'
import { DashboardLayout } from '../components/dashboard'
import 'swiper/css'
import '../styles/swiper-custom.css'

interface CryptoData {
  id: string;
  symbol: string;
  name: string;
  image: string;
  current_price: number;
  price_change_percentage_24h: number;
  total_volume: number;
  market_cap: number;
}

const CRYPTO_COINS = [
  { id: 'bitcoin', symbol: 'BTC', name: 'Bitcoin' },
  { id: 'ethereum', symbol: 'ETH', name: 'Ethereum' },
  { id: 'binancecoin', symbol: 'BNB', name: 'BNB' },
  { id: 'solana', symbol: 'SOL', name: 'Solana' },
  { id: 'tron', symbol: 'TRX', name: 'TRON' },
  { id: 'dogecoin', symbol: 'DOGE', name: 'Dogecoin' },
  { id: 'cardano', symbol: 'ADA', name: 'Cardano' },
  { id: 'chainlink', symbol: 'LINK', name: 'Chainlink' },
  { id: 'stellar', symbol: 'XLM', name: 'Stellar' },
  { id: 'litecoin', symbol: 'LTC', name: 'Litecoin' },
  { id: 'avalanche-2', symbol: 'AVAX', name: 'Avalanche' },
  { id: 'shiba-inu', symbol: 'SHIB', name: 'Shiba Inu' },
  { id: 'polkadot', symbol: 'DOT', name: 'Polkadot' },
];

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

function CryptoCard({ crypto }: { crypto: CryptoData }) {
  const changeColor = crypto.price_change_percentage_24h >= 0 ? '#5fffd7' : '#ff587a';
  const changeBg = crypto.price_change_percentage_24h >= 0 
    ? 'rgba(95, 255, 215, 0.1)' 
    : 'rgba(255, 69, 120, 0.1)';
  
  const formatPrice = (price: number) => {
    if (price >= 1000) {
      return `$${price.toLocaleString('en-US', { maximumFractionDigits: 2 })}`;
    } else if (price >= 1) {
      return `$${price.toFixed(2)}`;
    } else {
      return `$${price.toFixed(4)}`;
    }
  };

  const formatVolume = (volume: number) => {
    if (volume >= 1e9) {
      return `$${(volume / 1e9).toFixed(1)}B`;
    } else if (volume >= 1e6) {
      return `$${(volume / 1e6).toFixed(1)}M`;
    } else if (volume >= 1e3) {
      return `$${(volume / 1e3).toFixed(1)}K`;
    }
    return `$${volume.toFixed(0)}`;
  };

  return (
    <div
      className="relative p-3 sm:p-4 md:p-5 w-full pt-6 sm:pt-8 md:pt-10"
      style={{
        borderLeft: '1px solid rgba(235, 234, 250, 0.08)',
        borderRight: '1px solid rgba(235, 234, 250, 0.08)',
        background: 'linear-gradient(180deg, rgba(132, 141, 232, 0) 0%, rgba(132, 141, 232, 0.06) 100%)',
      }}
    >
      <div className="flex justify-center mb-6 sm:mb-8 md:mb-10">
        <img 
          src={crypto.image} 
          alt={crypto.name}
          className="w-16 h-16 sm:w-20 sm:h-20"
        />
      </div>

      <h3 className="font-primary text-sm sm:text-base font-medium leading-[138%] tracking-[0.01em] text-[#ededf8] mb-2 sm:mb-[15px] text-center">
        {crypto.name.toUpperCase()} ({crypto.symbol.toUpperCase()})
      </h3>

      <div className="space-y-2 sm:space-y-[10px]">
        <div className="flex justify-between items-center">
          <span className="font-primary text-xs sm:text-sm text-[rgba(235,234,250,0.5)] tracking-[0.02em] leading-[156%]">Price:</span>
          <span className="font-primary text-xs sm:text-sm text-[#ededf8] tracking-[0.02em] leading-[153%]">
            {formatPrice(crypto.current_price)}
          </span>
        </div>
        <div className="flex justify-between items-center">
          <span className="font-primary text-xs sm:text-sm text-[rgba(235,234,250,0.5)] tracking-[0.02em] leading-[156%]">24h Change:</span>
          <span
            className="font-mono text-[10px] sm:text-xs px-1 sm:px-1.5 py-0.5"
            style={{
              background: changeBg,
              color: changeColor,
              borderLeft: `1px solid ${changeColor}`,
            }}
          >
            {crypto.price_change_percentage_24h >= 0 ? '+' : ''}{crypto.price_change_percentage_24h.toFixed(2)}%
          </span>
        </div>
        <div className="flex justify-between items-center">
          <span className="font-primary text-xs sm:text-sm text-[rgba(235,234,250,0.5)] tracking-[0.02em] leading-[156%]">Volume:</span>
          <span className="font-primary text-xs sm:text-sm text-[#ededf8] tracking-[0.02em] leading-[153%]">
            {formatVolume(crypto.total_volume)}
          </span>
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
      className="relative w-8 h-8 sm:w-9 sm:h-9 flex items-center justify-center transition-all hover:opacity-80"
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
        width="6"
        height="10"
        viewBox="0 0 8 14"
        fill="none"
        className={`sm:w-2 sm:h-[14px] ${direction === 'prev' ? 'rotate-180' : ''}`}
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
    <div className="flex items-center justify-center gap-3 sm:gap-5">
      <NavArrowButton onClick={onPrev} direction="prev" />
      <NavArrowButton onClick={onNext} direction="next" />
    </div>
  )
}

export default function DashboardPage() {
  const swiperRef = useRef<SwiperType | null>(null)
  const [cryptos, setCryptos] = useState<CryptoData[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const CACHE_KEY = 'crypto_dashboard_cache'
    const CACHE_DURATION = 24 * 60 * 60 * 1000 // 24 hours

    const fetchCryptoData = async () => {
      try {
        const cached = localStorage.getItem(CACHE_KEY)
        if (cached) {
          const { data, timestamp } = JSON.parse(cached)
          if (Date.now() - timestamp < CACHE_DURATION) {
            setCryptos(data)
            setLoading(false)
            return
          }
        }

        const ids = CRYPTO_COINS.map(c => c.id).join(',')
        const response = await fetch(
          `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=${ids}&order=market_cap_desc&per_page=100&page=1&sparkline=false&price_change_percentage=24h`
        )
        
        if (!response.ok) {
          throw new Error('Failed to fetch')
        }

        const data = await response.json()
        

        localStorage.setItem(CACHE_KEY, JSON.stringify({
          data,
          timestamp: Date.now()
        }))
        
        setCryptos(data)
        setLoading(false)
      } catch (error) {
        console.error('Error fetching crypto data:', error)
        const cached = localStorage.getItem(CACHE_KEY)
        if (cached) {
          const { data } = JSON.parse(cached)
          setCryptos(data)
        }
        setLoading(false)
      }
    }

    fetchCryptoData()
  }, [])

  const handlePrev = () => {
    swiperRef.current?.slidePrev()
  }

  const handleNext = () => {
    swiperRef.current?.slideNext()
  }

  if (loading) {
    return (
      <DashboardLayout>
        <div className="flex items-center justify-center py-20">
          <span className="text-[#848de8]">Loading crypto data...</span>
        </div>
      </DashboardLayout>
    )
  }

  return (
    <DashboardLayout>
      <div
        className="relative"
        style={{
          background: 'linear-gradient(180deg, rgba(132, 141, 232, 0) 0%, rgba(132, 141, 232, 0.02) 100%)',
        }}
      >
        <div className="overflow-hidden mx-4 sm:mx-6 md:mx-[40px] token-carousel">
          <Swiper
            onSwiper={(swiper) => {
              swiperRef.current = swiper
            }}
            slidesPerView={3}
            centeredSlides={true}
            spaceBetween={15}
            initialSlide={6}
            speed={400}
            grabCursor={true}
            loop={true}
            loopAdditionalSlides={5}
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
            {cryptos.map((crypto) => (
              <SwiperSlide key={crypto.id}>
                <CryptoCard crypto={crypto} />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>

        <div className="relative py-3 sm:py-[15px] z-10">
          <div
            className="absolute top-0 left-4 right-4 sm:left-6 sm:right-6 md:left-[40px] md:right-[40px] h-[1px] bg-[rgba(235,234,250,0.08)]"
          />
          <NavigationArrows onPrev={handlePrev} onNext={handleNext} />
        </div>
      </div>

      {/* Wallet preview section */}
      <div className="relative mx-4 sm:mx-6 md:mx-[40px] py-8 sm:py-12 md:py-[60px]">
        <div className="absolute top-0 left-0 right-0 h-[1px] bg-[rgba(235,234,250,0.08)]" />

        <PlusCorner className="hidden sm:block top-0 left-[-4px]" />
        <PlusCorner className="hidden sm:block top-0 right-[-4px]" />

        <div className="relative flex items-center justify-center">
          <img
            src="/assets/img/dashboardMain.png"
            alt="Dashboard preview"
            className="w-full"
          />
          <div className="absolute inset-0 flex flex-col items-center justify-center pt-[100px] sm:pt-[150px] md:pt-[200px] lg:pt-[300px]">
            <h2
              className="font-primary text-xl sm:text-2xl md:text-[32px] lg:text-[40px] font-medium leading-[100%] text-center mb-4 sm:mb-6 px-4"
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
              className="relative px-4 py-2 sm:px-6 sm:py-3 font-primary text-xs sm:text-sm font-medium text-white leading-[143%] tracking-[0.01em]"
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
