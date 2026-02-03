export function AutomationItem({
  name,
  status,
}: {
  name: string
  status: 'Active' | 'Paused'
}) {
  const isActive = status === 'Active'

  return (
    <div className="flex items-center justify-between py-2">
      <span className="font-primary text-[13px] text-[rgba(235,234,250,0.5)] tracking-[0.02em] leading-[158%]">
        {name}
      </span>
      <span
        className="px-2 py-0.5 font-primary text-[15px] font-medium tracking-[0.02em] leading-[147%]"
        style={{
          color: isActive ? '#5fffd7' : '#ff587a',
          background: isActive
            ? 'linear-gradient(270deg, rgba(29, 9, 25, 0.12) 35%, rgba(95, 255, 215, 0.12) 100%)'
            : 'linear-gradient(270deg, rgba(29, 9, 25, 0.12) 35%, rgba(255, 69, 120, 0.12) 100%)',
          borderLeft: isActive ? '1px solid #5fffd7' : '1px solid #ff587a',
        }}
      >
        {status}
      </span>
    </div>
  )
}
