export function BalanceField({
  label,
  value,
}: {
  label: string
  value: string
}) {
  return (
    <div className="flex-1 min-w-0">
      <label className="font-primary text-xs sm:text-[13px] text-[rgba(235,237,255,0.5)] leading-[158%] mb-1 sm:mb-[5px] block">
        {label}
      </label>
      <div
        className="relative flex items-center justify-between p-3 sm:p-[15px] font-primary text-xs sm:text-[13px] text-[#ebedff] leading-[158%] tracking-[0.02em]"
        style={{
          backdropFilter: 'blur(10px)',
          boxShadow: 'inset 0 1px 1px 0 rgba(132, 141, 232, 0.2), inset 0 0 8px 0 rgba(132, 141, 232, 0.06), inset 0 -1px 1px 0 rgba(132, 141, 232, 0.2)',
          background: 'rgba(132, 141, 232, 0.02)',
        }}
      >
        <span>{value}</span>
        <span className="font-primary leading-[158%] tracking-[0.02em] text-xs sm:text-[13px]" style={{ color: 'rgba(132, 141, 232, 0.87)' }}>SOL</span>
      </div>
    </div>
  )
}
