import { ReactNode } from 'react'
import DashboardHeader from './DashboardHeader'
import CurrencyTicker from './CurrencyTicker'
import { TickerBar } from '../layout'

// L-shaped corner for grid intersections
function GridCorner({ className }: { className?: string }) {
  return (
    <svg className={`absolute ${className || ''}`} width="6" height="11" viewBox="0 0 6 11" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect y="6" width="1" height="6" transform="rotate(-90 0 6)" fill="white" />
        <mask id="path-2-inside-1_2_12234" fill="white">
          <path d="M0 11L1.31174e-07 0L1 1.19249e-08L1 11L0 11Z" />
        </mask>
        <path d="M0 11L1 11L1 1.19249e-08L1.31174e-07 0L-1 -1.19249e-08L-1 11L0 11Z" fill="white" mask="url(#path-2-inside-1_2_12234)" />
      </svg>
  )
}

function PlusCorner({ className }: { className?: string}) {
  return (
    <svg className={`absolute ${className || ''}`} width="11" height="11" viewBox="0 0 11 11" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="5" width="1" height="11" fill="#EDEDFA" />
      <rect y="5" width="11" height="1" fill="#EDEDFA" />
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
      <DashboardHeader />
      <CurrencyTicker />

      {/* Main content area with continuous vertical lines */}
      <div className="relative">
        {/* Grid container - 1310px with continuous vertical lines */}
        <div className="relative max-w-[1310px] mx-auto">
          {/* Outer vertical lines - continuous from top to bottom */}
          <div className="absolute left-0 top-0 bottom-0 w-[1px] bg-[rgba(235,234,250,0.08)]" />
          <div className="absolute right-0 top-0 bottom-0 w-[1px] bg-[rgba(235,234,250,0.08)]" />

          {/* Inner vertical lines at 40px padding - continuous from top to bottom */}
          <div className="absolute left-[40px] top-0 bottom-0 w-[1px] bg-[rgba(235,234,250,0.08)]" />
          <div className="absolute right-[40px] top-0 bottom-0 w-[1px] bg-[rgba(235,234,250,0.08)]" />

          {/* 40px spacer */}
          <div className="h-[40px]" />

          {/* Content section with horizontal line at top */}
          <div className="relative">
            {/* Top horizontal line - full width */}
            <div className="absolute top-0 left-[-50vw] right-[-50vw] h-[1px] bg-[rgba(235,234,250,0.08)]" />

            {/* L-shaped corners at top intersections (outer) */}
            <GridCorner className="top-0 left-0" />
            <GridCorner className="top-0 right-0 rotate-180" />

            {/* Content */}
            <div className="relative">
              {children}
            </div>

            {/* Bottom horizontal line - full width */}
            <div className="absolute bottom-0 left-[-50vw] right-[-50vw] h-[1px] bg-[rgba(235,234,250,0.08)]" />

            {/* L-shaped corners at bottom intersections (outer) */}
            <GridCorner className="bottom-0 left-0" />
            <GridCorner className="bottom-0 right-0 rotate-180" />

            {/* L-shaped corners at bottom intersections (inner) */}
            <PlusCorner className="bottom-0 left-[36px]" />
            <PlusCorner className="bottom-0 right-[36px]" />
          </div>

          {/* Bottom spacer */}
          <div className="h-[40px]" />
        </div>
      </div>
    </div>
  )
}
