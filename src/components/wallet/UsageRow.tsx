export function UsageRow({
  label,
  value,
}: {
  label: string
  value: string
}) {
  return (
    <div className="flex justify-between items-center">
      <span className="font-primary text-xs sm:text-[13px] tracking-[0.02em] leading-[156%] text-[rgba(235,234,250,0.5)]">
        {label}
      </span>
      <span className="font-primary text-xs sm:text-sm font-medium tracking-[0.02em] leading-[153%] text-[#ededf8]">{value}</span>
    </div>
  )
}
