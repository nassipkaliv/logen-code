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
  const [walletAddress] = useState('7qRZ...c7Zr8V')

  return (
    <div className="w-full relative z-50 mt-2 sm:mt-3 md:mt-[15px] px-2 sm:px-4 md:px-0">
      <header
        className="relative mx-auto max-w-[1310px]"
        style={{
          backdropFilter: 'blur(10px)',
          boxShadow: 'inset 0 1px 1px 0 rgba(132, 141, 232, 0.2), inset 0 0 12px 0 rgba(132, 141, 232, 0.08), inset 0 12px 32px 0 rgba(132, 141, 232, 0.06), inset 0 0 8px 0 rgba(132, 141, 232, 0.06), inset 0 -1px 1px 0 rgba(132, 141, 232, 0.2)',
          background: 'rgba(1, 1, 14, 0.8)',
        }}
      >
        {/* Header corners - hidden on mobile */}
        <HeaderCorner className="hidden sm:block -bottom-[3px] -left-[5px] rotate-180" />
        <HeaderCorner className="hidden sm:block -bottom-[3px] -right-[5px] -scale-x-100 rotate-180" />
        <HeaderCorner className="hidden sm:block -top-[3px] -left-[5px]" />
        <HeaderCorner className="hidden sm:block -top-[3px] -right-[5px] -scale-x-100" />

        <div className="flex items-center justify-between h-12 sm:h-14 md:h-16 px-3 sm:px-4 md:px-6">
          <Link to="/" className="flex items-center gap-1.5 sm:gap-2 md:gap-[10px] shrink-0">
            <img src="/assets/img/logo.png" alt="logo" className="w-5 h-5 sm:w-5 sm:h-5 md:w-6 md:h-6" />
            <span className="font-mono text-white font-semibold text-sm sm:text-sm md:text-base lg:text-lg uppercase">LOGEN</span>
          </Link>

          {/* Desktop navigation */}
          <nav className="hidden lg:flex items-center gap-5 xl:gap-[30px]">
            {navItems.map((item) => (
              <NavLink
                key={item.label}
                to={item.to}
                end={item.to === '/dashboard'}
                className={({ isActive }) =>
                  `font-primary py-2 text-sm font-normal tracking-[0.01em] transition-colors whitespace-nowrap ${
                    isActive
                      ? 'text-[#848de8]'
                      : 'text-[#b2b2b4] hover:text-[#848de8]'
                  }`
                }
              >
                {item.label}
              </NavLink>
            ))}
          </nav>

          {/* Wallet section */}
          <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
            <span className="hidden lg:block text-[#b2b2b4] text-sm font-primary tracking-[0.01em]">
              Wallet connected:
            </span>
            <HeaderButton
              className="flex items-center gap-1 sm:gap-1.5 px-2 sm:px-3 py-1.5 sm:py-2 font-primary text-[10px] sm:text-xs md:text-sm font-medium text-[#ebedff] leading-[143%] tracking-[0.01em]"
            >
              <svg className="w-3 h-2.5 sm:w-[15px] sm:h-3" viewBox="0 0 15 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                <g clipPath="url(#clip0_2_12197)">
                  <path d="M2.43692 9.15925C2.52867 9.06565 2.65307 9.01308 2.78277 9.01308H14.75C14.968 9.01308 15.0772 9.28221 14.9229 9.43956L12.5582 11.8521C12.4665 11.9457 12.3421 11.9983 12.2124 11.9983H0.24514C0.0271337 11.9983 -0.0819995 11.7291 0.0722154 11.5717L2.43692 9.15925Z" fill="#EBEDFF" />
                  <path d="M2.43692 0.146185C2.52867 0.0525802 2.65307 0 2.78277 0L14.75 0C14.968 0 15.0772 0.269162 14.9229 0.426493L12.5582 2.839C12.4665 2.9326 12.3421 2.98518 12.2124 2.98518L0.24514 2.98518C0.0271337 2.98518 -0.0819995 2.71602 0.0722154 2.55869L2.43692 0.146185Z" fill="#EBEDFF" />
                  <path d="M12.5582 4.62409C12.4665 4.5305 12.3421 4.47789 12.2124 4.47789H0.24514C0.0271337 4.47789 -0.0819995 4.74705 0.0722155 4.9044L2.43692 7.3169C2.52867 7.4105 2.65307 7.46307 2.78277 7.46307H14.75C14.968 7.46307 15.0772 7.19391 14.9229 7.03659L12.5582 4.62409Z" fill="#EBEDFF" />
                </g>
                <defs>
                  <clipPath id="clip0_2_12197">
                    <rect width="15" height="12" fill="white" />
                  </clipPath>
                </defs>
              </svg>
              <span className="hidden xs:inline sm:inline">{walletAddress}</span>
              <span className="inline xs:hidden sm:hidden">Wallet</span>
            </HeaderButton>
          </div>
        </div>

        {/* Mobile/Tablet navigation */}
        <nav className="lg:hidden flex items-center justify-center gap-1 sm:gap-2 px-2 sm:px-3 pb-2 sm:pb-3 border-t border-[rgba(235,234,250,0.08)]">
          {navItems.map((item) => (
            <NavLink
              key={item.label}
              to={item.to}
              end={item.to === '/dashboard'}
              className={({ isActive }) =>
                `relative px-2 sm:px-3 md:px-4 py-1.5 sm:py-2 font-primary text-[10px] sm:text-xs md:text-sm font-normal tracking-[0.01em] transition-colors whitespace-nowrap ${
                  isActive
                    ? 'text-[#848de8]'
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
