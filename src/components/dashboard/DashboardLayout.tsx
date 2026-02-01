import { ReactNode } from 'react'
import DashboardHeader from './DashboardHeader'
import CurrencyTicker from './CurrencyTicker'
import { TickerBar } from '../layout'

// Plus corner for grid intersections
function GridCorner({ className }: { className?: string }) {
  return (
    <svg
      width="6"
      height="11"
      viewBox="0 0 6 11"
      fill="none"
      className={`absolute ${className || ''}`}
    >
      <rect x="6" y="5" width="1" height="6" transform="rotate(90 6 5)" fill="white" />
      <mask id="path-2-inside-1_2_12231" fill="white">
        <path d="M6 2.62268e-07L6 11L5 11L5 2.18557e-07L6 2.62268e-07Z" />
      </mask>
      <path d="M6 2.62268e-07L5 2.18557e-07L5 11L6 11L7 11L7 3.0598e-07L6 2.62268e-07Z" fill="white" mask="url(#path-2-inside-1_2_12231)" />
    </svg>
  )
}

interface DashboardLayoutProps {
  children: ReactNode
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  return (
    <div className="min-h-screen bg-[#02030e] overflow-x-hidden">
      <TickerBar />
      {/* Header */}
      <DashboardHeader />

      {/* Currency Ticker */}
      <CurrencyTicker />

    </div>
  )
}
