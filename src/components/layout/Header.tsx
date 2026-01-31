import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

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

function HeaderButtonLink({
  children,
  to,
  className,
}: {
  children: React.ReactNode
  to: string
  className?: string
}) {
  return (
    <Link to={to} className={`relative header-btn ${className}`}>
      <Corner className="top-0 left-0" />
      <Corner className="top-0 right-0 rotate-90" />
      <Corner className="bottom-0 right-0 rotate-180" />
      <Corner className="bottom-0 left-0 -rotate-90" />
      {children}
    </Link>
  )
}

const navItems = [
  { label: 'Hero', href: '#hero' },
  { label: 'Features', href: '#features' },
  { label: 'How It Works', href: '#how-it-works' },
  { label: 'Visual Use Cases', href: '#use-cases' },
  { label: 'Speed Gap', href: '#speed-gap' },
  { label: 'Roadmap', href: '#roadmap' },
  { label: 'FAQ', href: '#faq' },
]

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <div
      className={`fixed top-[84px] left-0 right-0 z-50 transition-all duration-300 ease-out ${
        isScrolled ? 'px-4 sm:px-6 lg:px-8' : 'px-0'
      }`}
    >
      <div
        className={`absolute left-1/2 top-full w-[600px] h-[300px] pointer-events-none transition-opacity duration-300 ${
          isScrolled ? 'opacity-100' : 'opacity-0'
        }`}
        style={{
          background: 'radial-gradient(50% 50% at 50% 50%, rgba(132, 141, 232, 0.06) 0%, rgba(132, 141, 232, 0) 85%)',
          transform: 'translateX(-50%) rotate(180deg)',
        }}
      />
      <header
        className={`mx-auto transition-all duration-300 ease-out ${
          isScrolled
            ? 'max-w-[1310px] rounded-2xl header-scrolled'
            : 'max-w-full rounded-none header-static'
        }`}
      >
        <div className="flex items-center justify-between h-16 px-6 max-w-[1310px] mx-auto">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-[10px]">
            <div>
              <img src="/assets/img/logo.png" alt="logo" />
            </div>
            <span className="font-mono text-white font-semibold text-lg uppercase">LOGEN</span>
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
          <div className="flex items-center gap-3">
            <HeaderButton
              href="https://x.com"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center w-10 h-10"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M13.5222 8.77491L19.4785 2H18.0671L12.8952 7.88256L8.76437 2H4L10.2466 10.8955L4 18H5.41155L10.8732 11.7878L15.2356 18H20L13.5218 8.77491H13.5222ZM11.5889 10.9738L10.956 10.0881L5.92015 3.03974H8.0882L12.1522 8.72795L12.7851 9.61374L18.0677 17.0075H15.8997L11.5889 10.9742V10.9738Z" fill="#848DE8" />
              </svg>
            </HeaderButton>

            <HeaderButtonLink
              to="/dashboard"
              className="px-4 py-2 font-primary text-sm font-medium leading-[143%] tracking-[0.01em] text-center text-[#ebedff]"
            >
              Launch App
            </HeaderButtonLink>
          </div>
        </div>
      </header>
    </div>
  )
}
