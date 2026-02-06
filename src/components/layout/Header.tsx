import { Link } from 'react-router-dom'
import HeaderLaunchButton from './HeaderLaunchButton'
import { useSiteSettings } from '../../hooks/useSiteSettings'

// Corner decoration component
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

// Button with corner decorations
function HeaderButton({
  children,
  className,
  ...props
}: React.ComponentProps<'a'> & { children: React.ReactNode }) {
  return (
    <a
      className={`relative header-btn ${className}`}
      {...props}
    >
      <Corner className="top-0 left-0" />
      <Corner className="top-0 right-0 rotate-90" />
      <Corner className="bottom-0 right-0 rotate-180" />
      <Corner className="bottom-0 left-0 -rotate-90" />
      {children}
    </a>
  )
}

const navItems = [
  { label: 'Hero', href: '#hero' },
  { label: 'Features', href: '#features' },
  { label: 'How It Works', href: '#how-it-works' },
  { label: 'Visual Use Cases', href: '#use-cases' },
  { label: 'Speed Gap', href: '#reaction' },
  { label: 'Roadmap', href: '#roadmap' },
  { label: 'FAQ', href: '#faq' },
]

export default function Header() {
  const { settings } = useSiteSettings()

  return (
    <div className="relative z-50 pt-[24px]">
      {/* Top horizontal line - full width */}
      <div className="absolute top-[24px] left-0 right-0 h-[1px] bg-[rgba(235,234,250,0.08)]" />
      {/* Bottom horizontal line - full width */}
      <div className="absolute bottom-0 left-0 right-0 h-[1px] bg-[rgba(235,234,250,0.08)]" />

      {/* Glow effect under header */}
      <div
        className="absolute left-1/2 top-full w-[300px] md:w-[600px] h-[150px] md:h-[300px] pointer-events-none"
        style={{
          background: 'radial-gradient(50% 50% at 50% 50%, rgba(132, 141, 232, 0.06) 0%, rgba(132, 141, 232, 0) 85%)',
          transform: 'translateX(-50%) rotate(180deg)',
        }}
      />
      <header className="mx-auto max-w-[1310px] px-2 sm:px-3 md:px-6 lg:px-8 header-scrolled">
        <div className="flex items-center justify-between h-11 md:h-14 lg:h-16 px-2 sm:px-3 md:px-6">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-1.5 sm:gap-2 md:gap-[10px] shrink-0">
            <img src="/assets/img/logo.png" alt="logo"  />
            <span className="font-mono text-white font-semibold text-xs sm:text-sm md:text-base lg:text-lg uppercase">LOGEN</span>
          </Link>

          {/* Navigation */}
          <nav className="hidden lg:flex items-center gap-[30px]">
            {navItems.map((item) => (
              <a
                key={item.label}
                href={item.href}
                className="font-primary py-2 text-sm font-normal tracking-[0.01em] text-[#b2b2b4] hover:text-white transition-colors"
              >
                {item.label}
              </a>
            ))}
          </nav>

          {/* Right side */}
          <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
            <HeaderButton
              href={settings.xUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center w-7 h-7 sm:w-8 sm:h-8 md:w-10 md:h-10"
            >
              <svg width="14" height="14" className="sm:w-4 sm:h-4 md:w-5 md:h-5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M13.5222 8.77491L19.4785 2H18.0671L12.8952 7.88256L8.76437 2H4L10.2466 10.8955L4 18H5.41155L10.8732 11.7878L15.2356 18H20L13.5218 8.77491H13.5222ZM11.5889 10.9738L10.956 10.0881L5.92015 3.03974H8.0882L12.1522 8.72795L12.7851 9.61374L18.0677 17.0075H15.8997L11.5889 10.9742V10.9738Z" fill="#848DE8" />
              </svg>
            </HeaderButton>

            <HeaderLaunchButton />
          </div>
        </div>
      </header>
    </div>
  )
}
