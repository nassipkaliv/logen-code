import { useState, useRef, useEffect } from 'react'
import { Corner } from '../ui'

export function SelectField({
  label,
  value,
  options,
  onChange,
}: {
  label: string
  value: string
  options: string[]
  onChange: (value: string) => void
}) {
  const [isOpen, setIsOpen] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  return (
    <div className="flex-1 min-w-0" ref={containerRef}>
      <label className="font-primary text-[13px] text-[rgba(235,237,255,0.5)] leading-[158%] mb-[5px] block">
        {label}
      </label>
      <div className="relative">
        {/* Selected value display */}
        <div
          className="w-full p-[15px] font-primary text-xs sm:text-[13px] text-[#ebedff] leading-[158%] tracking-[0.02em] cursor-pointer"
          style={{
            backdropFilter: 'blur(9.999870300292969px)',
            boxShadow: 'inset 0 1px 1px 0 rgba(132, 141, 232, 0.2), inset 0 0 8px 0 rgba(132, 141, 232, 0.06), inset 0 -1px 1px 0 rgba(132, 141, 232, 0.2)',
            background: 'rgba(132, 141, 232, 0.02)',
          }}
          onClick={() => setIsOpen(!isOpen)}
        >
          {value}
          <svg
            className={`absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none transition-transform ${isOpen ? 'rotate-180' : ''}`}
            width="12"
            height="6"
            viewBox="0 0 12 6"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M5.65674 5.65685L11.3136 -6.19888e-06H-0.000115871L5.65674 5.65685Z" fill="#848DE8" />
          </svg>
        </div>

        {/* Dropdown options */}
        {isOpen && (
          <div
            className="absolute top-full left-0 right-0 z-50 mt-1 p-3 sm:p-[15px]"
            style={{
              backdropFilter: 'blur(200px)',
              boxShadow: 'inset 0 1px 1px 0 rgba(132, 141, 232, 0.2), inset 0 0 8px 0 rgba(132, 141, 232, 0.06), inset 0 -1px 1px 0 rgba(132, 141, 232, 0.2)',
              background: 'rgba(2, 3, 14, 0.25)',
            }}
          >
            {options.map((option) => {
              const isSelected = option === value
              return (
                <div
                  key={option}
                  className="flex items-center justify-between py-2 cursor-pointer hover:opacity-80"
                  onClick={() => {
                    onChange(option)
                    setIsOpen(false)
                  }}
                >
                  <span className="font-primary text-[13px] text-[#ebedff] leading-[158%] tracking-[0.02em]">
                    {option}
                  </span>
                  {/* Checkbox icon */}
                  <div
                    className="relative w-[18px] h-[18px]"
                    style={
                      isSelected
                        ? {
                            boxShadow:
                              'inset 0 1px 1px 0 rgba(95, 255, 215, 0.2), inset 0 0 12px 0 rgba(95, 255, 215, 0.08), inset 0 0 8px 0 rgba(95, 255, 215, 0.06), inset 0 0 20px 0 rgba(95, 255, 215, 0.12), inset 0 12px 20px 0 rgba(95, 255, 215, 0.06)',
                            background: 'rgba(95, 255, 215, 0.04)',
                            border: '1px solid rgba(95, 255, 215, 0.12)',
                          }
                        : {
                            boxShadow:
                              'inset 0 1px 1px 0 rgba(132, 141, 232, 0.2), inset 0 0 12px 0 rgba(132, 141, 232, 0.08), inset 0 0 8px 0 rgba(132, 141, 232, 0.06), inset 0 0 20px 0 rgba(132, 141, 232, 0.12), inset 0 12px 20px 0 rgba(132, 141, 232, 0.06)',
                            background: 'rgba(132, 141, 232, 0.04)',
                            border: '1px solid rgba(215, 218, 255, 0.12)',
                          }
                    }
                  >
                    <Corner className="top-0 left-0" color={isSelected ? '#5fffd7' : '#ededfa'} />
                    <Corner className="top-0 right-0 rotate-90" color={isSelected ? '#5fffd7' : '#ededfa'} />
                    <Corner className="bottom-0 right-0 rotate-180" color={isSelected ? '#5fffd7' : '#ededfa'} />
                    <Corner className="bottom-0 left-0 -rotate-90" color={isSelected ? '#5fffd7' : '#ededfa'} />
                  </div>
                </div>
              )
            })}
          </div>
        )}
      </div>
    </div>
  )
}
