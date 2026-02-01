import { useState } from 'react'
import { Link, NavLink } from 'react-router-dom'

// Corner decoration component for buttons
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

// Header corner decoration (horizontal)
function HeaderCorner({ className }: { className?: string }) {
  return (
    <svg
      width="11"
      height="6"
      viewBox="0 0 11 6"
      fill="none"
      className={`absolute ${className || ''}`}
    >
      <rect x="6" y="6" width="1" height="6" transform="rotate(180 6 6)" fill="white" />
      <mask id="path-2-inside-header" fill="white">
        <path d="M11 6L5.24537e-07 6L4.37114e-07 5L11 5L11 6Z" />
      </mask>
      <path d="M11 6L11 5L4.37114e-07 5L5.24537e-07 6L6.11959e-07 7L11 7L11 6Z" fill="white" mask="url(#path-2-inside-header)" />
    </svg>
  )
}

function HeaderButton({
  children,
  className,
  ...props
}: React.ComponentProps<'button'> & { children: React.ReactNode }) {
  return (
    <button
      className={`relative header-btn ${className}`}
      {...props}
    >
      <Corner className="top-0 left-0" />
      <Corner className="top-0 right-0 rotate-90" />
      <Corner className="bottom-0 right-0 rotate-180" />
      <Corner className="bottom-0 left-0 -rotate-90" />
      {children}
    </button>
  )
}

const navItems = [
  { label: 'Main', to: '/dashboard' },
  { label: 'Wallet', to: '/dashboard/wallet' },
  { label: 'Automation Studio', to: '/dashboard/automation' },
]

export default function DashboardHeader() {
  const [walletAddress] = useState('hpRZ...x7Z6V')

  return (
    <div className="w-full relative z-50 mt-[15px]">
      <header
        className="relative mx-auto max-w-[1310px]"
          style={{
            backdropFilter: 'blur(10px)',
            boxShadow: 'inset 0 1px 1px 0 rgba(132, 141, 232, 0.2), inset 0 0 12px 0 rgba(132, 141, 232, 0.08), inset 0 12px 32px 0 rgba(132, 141, 232, 0.06), inset 0 0 8px 0 rgba(132, 141, 232, 0.06), inset 0 -1px 1px 0 rgba(132, 141, 232, 0.2)',
            background: 'rgba(1, 1, 14, 0.8)',
          }}
        >
          {/* Header corners */}
          <HeaderCorner className="-bottom-[3px] -left-[5px] rotate-180" />
          <HeaderCorner className="-bottom-[3px] -right-[5px] -scale-x-100 rotate-180" />
          <HeaderCorner className="-top-[3px] -left-[5px]" />
          <HeaderCorner className="-top-[3px] -right-[5px] -scale-x-100" />
          <div className="flex items-center justify-between h-11 md:h-14 lg:h-16 px-2 sm:px-3 md:px-6 max-w-[1310px] mx-auto">
            {/* Logo */}
            <Link to="/" className="flex items-center gap-1.5 sm:gap-2 md:gap-[10px] shrink-0">
              <img src="/assets/img/logo.png" alt="logo" className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6" />
              <span className="font-mono text-white font-semibold text-xs sm:text-sm md:text-base lg:text-lg uppercase">LOGEN</span>
            </Link>

            {/* Navigation */}
            <nav className="hidden lg:flex items-center gap-[30px]">
              {navItems.map((item) => (
                <NavLink
                  key={item.label}
                  to={item.to}
                  end={item.to === '/dashboard'}
                  className={({ isActive }) =>
                    `font-primary py-2 text-sm font-normal tracking-[0.01em] transition-colors ${
                      isActive
                        ? 'text-white'
                        : 'text-[#b2b2b4] hover:text-white'
                    }`
                  }
                >
                  {item.label}
                </NavLink>
              ))}
            </nav>

            {/* Right side - Wallet */}
            <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
              <span className="hidden md:block text-[#6c6c6e] text-xs md:text-sm font-primary">
                Wallet connected:
              </span>
              <HeaderButton
                className="flex items-center gap-1.5 sm:gap-2 px-2 sm:px-3 md:px-4 py-1 sm:py-1.5 md:py-2 font-mono text-[9px] sm:text-[10px] md:text-sm font-medium text-[#ebedff]"
              >
                <svg width="14" height="14" className="hidden sm:block sm:w-4 sm:h-4" viewBox="0 0 16 16" fill="none">
                  <rect width="16" height="16" rx="2" fill="#848DE8" fillOpacity="0.2" />
                  <path d="M4 6H12M4 10H12M6 4V12M10 4V12" stroke="#848DE8" strokeWidth="1.5" />
                </svg>
                {walletAddress}
              </HeaderButton>
            </div>
          </div>

          {/* Mobile navigation */}
          <nav className="lg:hidden flex items-center justify-center gap-1 px-2 sm:px-3 pb-2">
            {navItems.map((item) => (
              <NavLink
                key={item.label}
                to={item.to}
                end={item.to === '/dashboard'}
                className={({ isActive }) =>
                  `relative px-2 sm:px-3 py-1 sm:py-1.5 font-primary text-[10px] sm:text-xs font-normal tracking-[0.01em] transition-colors ${
                    isActive
                      ? 'text-white'
                      : 'text-[#6c6c6e] hover:text-white'
                  }`
                }
              >
                {item.label}
              </NavLink>
            ))}
          </nav>
        </header>
      </div>
  )
}
