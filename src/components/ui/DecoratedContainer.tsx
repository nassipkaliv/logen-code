// Decorative dot pattern for borders
function BorderDots({ position, id }: { position: 'left' | 'right'; id: string }) {
  return (
    <div
      className={`absolute top-0 ${position === 'left' ? '-left-[6px]' : '-right-[6px]'} h-full pointer-events-none`}
    >
      <svg width="11" height="100%" className="h-full" preserveAspectRatio="none">
        <defs>
          <pattern id={`dotPattern-${id}-${position}`} x="0" y="0" width="11" height="40" patternUnits="userSpaceOnUse">
            <circle cx="5.5" cy="5" r="1" fill="#848DE8" fillOpacity="0.3" />
            <circle cx="5.5" cy="20" r="1" fill="#848DE8" fillOpacity="0.15" />
            <circle cx="5.5" cy="35" r="1" fill="#848DE8" fillOpacity="0.08" />
          </pattern>
        </defs>
        <rect width="11" height="100%" fill={`url(#dotPattern-${id}-${position})`} />
      </svg>
    </div>
  )
}

// Corner decoration component
function SectionCorner({ position }: { position: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right' }) {
  const positionClasses = {
    'top-left': '-top-[1px] -left-[6px]',
    'top-right': '-top-[1px] -right-[6px]',
    'bottom-left': '-bottom-[1px] -left-[6px]',
    'bottom-right': '-bottom-[1px] -right-[6px]',
  }

  const rotationClasses = {
    'top-left': '',
    'top-right': 'rotate-90',
    'bottom-left': '-rotate-90',
    'bottom-right': 'rotate-180',
  }

  return (
    <svg
      className={`absolute ${positionClasses[position]} ${rotationClasses[position]}`}
      width="11"
      height="11"
      viewBox="0 0 11 11"
      fill="none"
    >
      <rect x="0" y="0" width="1" height="11" fill="#FFF" />
      <rect x="0" y="0" width="11" height="1" fill="#FFF" />
    </svg>
  )
}

interface DecoratedContainerProps {
  children: React.ReactNode
  className?: string
  id?: string
  showDots?: boolean
  showCorners?: boolean
}

export default function DecoratedContainer({
  children,
  className = '',
  id = 'section',
  showDots = true,
  showCorners = true,
}: DecoratedContainerProps) {
  return (
    <div
      className={`relative max-w-[1310px] mx-auto ${className}`}
      style={{
        borderLeft: '1px solid rgba(235, 234, 250, 0.08)',
        borderRight: '1px solid rgba(235, 234, 250, 0.08)',
      }}
    >
      {showDots && (
        <>
          <BorderDots position="left" id={id} />
          <BorderDots position="right" id={id} />
        </>
      )}
      {showCorners && (
        <>
          <SectionCorner position="top-left" />
          <SectionCorner position="top-right" />
          <SectionCorner position="bottom-left" />
          <SectionCorner position="bottom-right" />
        </>
      )}
      {children}
    </div>
  )
}

export { BorderDots, SectionCorner }
