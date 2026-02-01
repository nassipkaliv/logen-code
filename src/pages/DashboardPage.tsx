import { DashboardLayout } from '../components/dashboard'

// Corner decoration
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

// Token card component
function TokenCard({ isCenter = false }: { isCenter?: boolean }) {
  return (
    <div
      className={`relative p-4 md:p-6 ${isCenter ? 'bg-[rgba(132,141,232,0.02)]' : ''}`}
      style={{
        border: '1px solid rgba(235, 234, 250, 0.08)',
      }}
    >
      <Corner className="top-0 left-0" />
      <Corner className="top-0 right-0 rotate-90" />
      <Corner className="bottom-0 right-0 rotate-180" />
      <Corner className="bottom-0 left-0 -rotate-90" />

      {/* Token icon */}
      <div className="flex justify-center mb-4">
        <div
          className="w-12 h-12 md:w-14 md:h-14 flex items-center justify-center"
          style={{
            border: '1px solid rgba(235, 234, 250, 0.08)',
            background: 'linear-gradient(180deg, rgba(237, 237, 248, 0) 0%, rgba(237, 237, 248, 0.02) 100%)',
          }}
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <rect width="24" height="24" rx="4" fill="#848DE8" fillOpacity="0.2" />
            <path d="M7 9H17M7 15H17M9 6V18M15 6V18" stroke="#848DE8" strokeWidth="1.5" />
          </svg>
        </div>
      </div>

      {/* Token name */}
      <h3 className="font-primary text-sm md:text-base font-medium text-center text-[#ededf8] mb-4">
        SOLANA (SOL)
      </h3>

      {/* Stats */}
      <div className="space-y-2 text-center">
        <div className="flex justify-between items-center">
          <span className="font-primary text-xs text-[#6c6c6e]">UPTIME:</span>
          <span className="font-mono text-xs text-[#ededf8]">24:17:42</span>
        </div>
        <div className="flex justify-between items-center">
          <span className="font-primary text-xs text-[#6c6c6e]">24h Change:</span>
          <span className="font-mono text-xs px-1.5 py-0.5 bg-[rgba(34,197,94,0.2)] text-[#22c55e]">
            +X.XXX
          </span>
        </div>
        <div className="flex justify-between items-center">
          <span className="font-primary text-xs text-[#6c6c6e]">Volume:</span>
          <span className="font-mono text-xs text-[#ededf8]">XXXXX</span>
        </div>
      </div>
    </div>
  )
}

// Navigation arrows
function NavigationArrows() {
  return (
    <div className="flex items-center justify-center gap-2 mt-4">
      <button
        className="w-8 h-8 flex items-center justify-center border border-[rgba(235,234,250,0.08)] hover:border-[rgba(235,234,250,0.2)] transition-colors"
      >
        <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
          <path d="M8 2L4 6L8 10" stroke="#6c6c6e" strokeWidth="1.5" />
        </svg>
      </button>
      <button
        className="w-8 h-8 flex items-center justify-center border border-[rgba(235,234,250,0.08)] hover:border-[rgba(235,234,250,0.2)] transition-colors"
      >
        <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
          <path d="M4 2L8 6L4 10" stroke="#6c6c6e" strokeWidth="1.5" />
        </svg>
      </button>
    </div>
  )
}

// Wallet preview card
function WalletPreviewCard() {
  return (
    <div
      className="relative p-6 md:p-8 text-center max-w-[400px] mx-auto"
      style={{
        border: '1px solid rgba(235, 234, 250, 0.08)',
        background: 'linear-gradient(180deg, rgba(237, 237, 248, 0) 0%, rgba(237, 237, 248, 0.02) 100%)',
      }}
    >
      <Corner className="top-0 left-0" />
      <Corner className="top-0 right-0 rotate-90" />
      <Corner className="bottom-0 right-0 rotate-180" />
      <Corner className="bottom-0 left-0 -rotate-90" />

      {/* Icon */}
      <div className="flex justify-center mb-4">
        <div
          className="w-16 h-16 flex items-center justify-center"
          style={{
            border: '1px solid rgba(132, 141, 232, 0.2)',
            background: 'rgba(132, 141, 232, 0.04)',
          }}
        >
          <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
            <rect x="4" y="8" width="24" height="16" rx="2" stroke="#848DE8" strokeWidth="2" />
            <rect x="20" y="14" width="4" height="4" rx="1" fill="#848DE8" />
          </svg>
        </div>
      </div>

      {/* Text */}
      <h3 className="font-primary text-lg md:text-xl font-medium text-[#ededf8] mb-2">
        See how this looks
      </h3>
      <p className="font-primary text-lg md:text-xl font-medium text-[#ededf8] mb-6">
        on your wallet
      </p>

      {/* Button */}
      <button
        className="relative px-6 py-2.5 font-primary text-sm font-medium text-[#ebedff] border border-[rgba(215,218,255,0.12)] hover:bg-[rgba(132,141,232,0.08)] transition-all"
        style={{
          boxShadow: 'inset 0 1px 1px 0 rgba(132, 141, 232, 0.2), inset 0 0 12px 0 rgba(132, 141, 232, 0.08)',
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
  )
}

export default function DashboardPage() {
  return (
    <DashboardLayout>
      {/* Token cards row */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-5 mb-6">
        <TokenCard />
        <TokenCard isCenter />
        <TokenCard />
      </div>

      {/* Navigation */}
      <NavigationArrows />

      {/* Wallet preview */}
      <div className="mt-8 md:mt-12">
        <WalletPreviewCard />
      </div>
    </DashboardLayout>
  )
}
