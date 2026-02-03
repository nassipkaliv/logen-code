import { Corner } from '../ui'

export function ActionButton({
  children,
  variant,
  onClick,
}: {
  children: React.ReactNode
  variant: 'deposit' | 'withdraw'
  onClick?: () => void
}) {
  const isDeposit = variant === 'deposit'
  const textColor = isDeposit ? '#5fffd7' : '#c73434'
  const cornerColor = isDeposit ? '#5FFFD7' : '#C73434'

  return (
    <button
      onClick={onClick}
      className="relative px-3 py-2 font-primary text-xs sm:text-sm font-medium leading-[143%] tracking-[0.01em] transition-transform active:scale-95"
      style={{
        color: textColor,
        border: '1px solid rgba(215, 218, 255, 0.12)',
        backdropFilter: 'blur(100px)',
        boxShadow: isDeposit
          ? 'inset 0 1px 1px 0 rgba(95, 255, 215, 0.2), inset 0 0 12px 0 rgba(95, 255, 215, 0.08), inset 0 0 8px 0 rgba(95, 255, 215, 0.06), inset 0 0 20px 0 rgba(95, 255, 215, 0.12), inset 0 12px 20px 0 rgba(95, 255, 215, 0.06)'
          : 'inset 0 1px 1px 0 rgba(199, 52, 52, 0.2), inset 0 0 12px 0 rgba(199, 52, 52, 0.08), inset 0 0 8px 0 rgba(199, 52, 52, 0.06), inset 0 0 20px 0 rgba(199, 52, 52, 0.12), inset 0 12px 20px 0 rgba(199, 52, 52, 0.06)',
        background: isDeposit ? 'rgba(95, 255, 215, 0.04)' : 'rgba(199, 52, 52, 0.04)',
      }}
    >
      <Corner className="top-0 left-0" color={cornerColor} />
      <Corner className="top-0 right-0 rotate-90" color={cornerColor} />
      <Corner className="bottom-0 right-0 rotate-180" color={cornerColor} />
      <Corner className="bottom-0 left-0 -rotate-90" color={cornerColor} />
      {children}
    </button>
  )
}
