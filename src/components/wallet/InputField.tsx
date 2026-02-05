import { useState } from 'react'

export function InputField({
  label,
  value,
  copyValue,
  hiddenValue,
  icon,
  highlight = false,
}: {
  label: string
  value: string
  copyValue?: string
  hiddenValue?: string
  icon: 'copy' | 'eye'
  highlight?: boolean
}) {
  const [isRevealed, setIsRevealed] = useState(false)
  const [copied, setCopied] = useState(false)

  const handleCopy = async () => {
    await navigator.clipboard.writeText(copyValue || value)
    setCopied(true)
    setTimeout(() => setCopied(false), 1500)
  }

  const handleToggleReveal = () => {
    setIsRevealed(!isRevealed)
  }

  const displayValue = icon === 'eye' && !isRevealed ? (hiddenValue || '••••••••••••••') : value

  return (
    <div className="flex-1 min-w-0">
      <label className="font-primary text-xs sm:text-[13px] text-[rgba(235,237,255,0.5)] leading-[158%] mb-1 sm:mb-[5px] block">
        {label}
      </label>
      <div
        className={`relative flex items-center gap-2 p-3 sm:p-[15px] font-primary text-xs sm:text-[13px] text-[#ebedff] leading-[158%] tracking-[0.02em] transition-all duration-300 ${highlight ? 'ring-2 ring-[#5fffd7] ring-opacity-70' : ''}`}
        style={{
          backdropFilter: 'blur(10px)',
          boxShadow: highlight
            ? 'inset 0 1px 1px 0 rgba(95, 255, 215, 0.3), inset 0 0 12px 0 rgba(95, 255, 215, 0.15), inset 0 -1px 1px 0 rgba(95, 255, 215, 0.3), 0 0 20px rgba(95, 255, 215, 0.2)'
            : 'inset 0 1px 1px 0 rgba(132, 141, 232, 0.2), inset 0 0 8px 0 rgba(132, 141, 232, 0.06), inset 0 -1px 1px 0 rgba(132, 141, 232, 0.2)',
          background: highlight ? 'rgba(95, 255, 215, 0.05)' : 'rgba(132, 141, 232, 0.02)',
        }}
      >
        <span className={`truncate transition-all duration-200 ${icon === 'eye' && isRevealed ? 'select-all' : ''}`}>
          {displayValue}
        </span>
        <button
          onClick={icon === 'copy' ? handleCopy : handleToggleReveal}
          className="ml-auto shrink-0 transition-all hover:opacity-70 active:scale-95"
        >
          {icon === 'copy' ? (
            copied ? (
              <svg className="w-5 h-5 sm:w-[22px] sm:h-[22px] text-[#5fffd7]" viewBox="0 0 22 22" fill="none">
                <path d="M5 11L9 15L17 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            ) : (
              <svg className="w-5 h-5 sm:w-[22px] sm:h-[22px]" viewBox="0 0 22 22" fill="none">
                <path d="M12.8332 6.41666C12.8332 5.56243 12.8332 5.13532 12.6936 4.7984C12.5075 4.34919 12.1506 3.99228 11.7014 3.80621C11.3645 3.66666 10.9374 3.66666 10.0832 3.66666H7.33317C5.60469 3.66666 4.74045 3.66666 4.20347 4.20363C3.6665 4.7406 3.6665 5.60484 3.6665 7.33332V10.0833C3.6665 10.9375 3.6665 11.3647 3.80606 11.7016C3.99213 12.1508 4.34903 12.5077 4.79825 12.6938C5.13516 12.8333 5.56228 12.8333 6.4165 12.8333" stroke="#848DE8" strokeWidth="1.83333" />
                <rect x="9.1665" y="9.16666" width="9.16667" height="9.16667" rx="1.83333" stroke="#848DE8" strokeWidth="1.83333" />
              </svg>
            )
          ) : isRevealed ? (
            <svg className="w-5 h-5 sm:w-[22px] sm:h-[22px]" viewBox="0 0 22 22" fill="none">
              <path d="M3 3L19 19M9.5 9.5C8.67 10.33 8.67 11.67 9.5 12.5C10.33 13.33 11.67 13.33 12.5 12.5" stroke="#848DE8" strokeWidth="1.83333" strokeLinecap="round" />
              <path d="M6.5 6.5C4.5 8 3 11 3 11C3 11 5.5 17 11 17C12.5 17 13.8 16.6 15 16M17.5 13.5C18.5 12 19 11 19 11C19 11 16.5 5 11 5C10 5 9.1 5.2 8.3 5.5" stroke="#848DE8" strokeWidth="1.83333" strokeLinecap="round" />
            </svg>
          ) : (
            <svg className="w-5 h-5 sm:w-[22px] sm:h-[22px]" viewBox="0 0 22 22" fill="none">
              <circle cx="11.2502" cy="12.3334" r="3.66667" fill="#848DE8" />
              <path d="M19.5 12.3333C19.5 12.3333 18.5833 5.00001 11.25 5.00001C3.91667 5.00001 3 12.3333 3 12.3333" stroke="#848DE8" strokeWidth="1.83333" />
            </svg>
          )}
        </button>
      </div>
    </div>
  )
}
