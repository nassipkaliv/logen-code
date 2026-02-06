import { usePrivy, useWallets } from '@privy-io/react-auth'
import { useCallback, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

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

interface LaunchButtonProps {
  className?: string
}

export default function LaunchButton({ className = '' }: LaunchButtonProps) {
  const { login, authenticated } = usePrivy()
  const { wallets } = useWallets()
  const navigate = useNavigate()

  const hasWallet = wallets.length > 0

  useEffect(() => {
    if (authenticated && hasWallet) {
      navigate('/dashboard')
    }
  }, [authenticated, hasWallet, navigate])

  const handleClick = useCallback(() => {
    if (authenticated && hasWallet) {
      navigate('/dashboard')
    } else {
      login()
    }
  }, [authenticated, hasWallet, login, navigate])

  return (
    <button
      onClick={handleClick}
      className={`relative header-btn px-2 sm:px-3 md:px-4 py-1 sm:py-1.5 md:py-2 font-primary text-[9px] sm:text-[10px] md:text-sm font-medium leading-[143%] tracking-[0.01em] text-center text-[#ebedff] ${className}`}
      style={{
        background: 'rgba(132, 141, 232, 0.04)',
        border: '1px solid rgba(215, 218, 255, 0.12)',
        borderRadius: '4px',
      }}
    >
      <Corner className="top-0 left-0" />
      <Corner className="top-0 right-0 rotate-90" />
      <Corner className="bottom-0 right-0 rotate-180" />
      <Corner className="bottom-0 left-0 -rotate-90" />
      {hasWallet ? 'Launch App' : 'Launch app'}
    </button>
  )
}
