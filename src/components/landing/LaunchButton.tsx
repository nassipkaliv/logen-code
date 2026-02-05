import { usePrivyAuth } from '../../hooks/usePrivyAuth'
import { useCallback, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

// Corner decoration component
function BlockCorner({ className }: { className?: string }) {
  return (
    <svg
      width="6"
      height="6"
      viewBox="0 0 6 6"
      fill="none"
      className={`absolute ${className}`}
    >
      <rect width="1" height="6" fill="#FFF" />
      <rect width="6" height="1" fill="#FFF" />
    </svg>
  )
}

export default function LaunchButton() {
  const { loginWithWallet, isAuthenticated } = usePrivyAuth()
  const navigate = useNavigate()

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/dashboard')
    }
  }, [isAuthenticated, navigate])

  const handleClick = useCallback(() => {
    if (isAuthenticated) {
      navigate('/dashboard')
    } else {
      loginWithWallet()
    }
  }, [isAuthenticated, loginWithWallet, navigate])

  return (
    <div className="relative py-4 md:py-6 px-8 md:px-12">
      <BlockCorner className="top-0 left-0" />
      <BlockCorner className="top-0 right-0 rotate-90" />
      <BlockCorner className="bottom-0 right-0 rotate-180" />
      <BlockCorner className="bottom-0 left-0 -rotate-90" />
      <button
        onClick={handleClick}
        className="relative px-6 py-3 font-primary text-sm font-medium text-[#ebedff] border border-[rgba(215,218,255,0.12)] rounded-sm hover:bg-[rgba(132,141,232,0.08)] transition-all"
        style={{
          boxShadow: 'inset 0 1px 1px 0 rgba(132, 141, 232, 0.2), inset 0 0 12px 0 rgba(132, 141, 232, 0.08), inset 0 0 8px 0 rgba(132, 141, 232, 0.06)',
          background: 'rgba(132, 141, 232, 0.04)',
        }}
      >
        {/* Corner decorations */}
        <svg className="absolute top-0 left-0" width="6" height="6" viewBox="0 0 6 6" fill="none">
          <rect width="1" height="6" fill="white" />
          <rect width="6" height="1" fill="white" />
        </svg>
        <svg className="absolute top-0 right-0 rotate-90" width="6" height="6" viewBox="0 0 6 6" fill="none">
          <rect width="1" height="6" fill="white" />
          <rect width="6" height="1" fill="white" />
        </svg>
        <svg className="absolute bottom-0 right-0 rotate-180" width="6" height="6" viewBox="0 0 6 6" fill="none">
          <rect width="1" height="6" fill="white" />
          <rect width="6" height="1" fill="white" />
        </svg>
        <svg className="absolute bottom-0 left-0 -rotate-90" width="6" height="6" viewBox="0 0 6 6" fill="none">
          <rect width="1" height="6" fill="white" />
          <rect width="6" height="1" fill="white" />
        </svg>
        {isAuthenticated ? 'Launch App' : 'Launch app'}
      </button>
    </div>
  )
}
