export function ConditionInput({
  label,
  value,
  suffix,
  prefix,
  color = 'default',
}: {
  label: string
  value: string
  suffix: string
  prefix?: string
  color?: 'default' | 'green' | 'red'
}) {
  const colorStyles = {
    default: {
      borderLeft: '1px solid #ebedff',
      background: 'rgba(235, 237, 255, 0.1), linear-gradient(270deg, rgba(5, 26, 34, 0.12) 35%, rgba(235, 237, 255, 0.12) 100%)',
      text: '#ebedff',
    },
    green: {
      borderLeft: '1px solid #5fffd7',
      background: 'linear-gradient(270deg, rgba(29, 9, 25, 0.12) 35%, rgba(95, 255, 215, 0.12) 100%)',
      text: '#5fffd7',
    },
    red: {
      borderLeft: '1px solid #ff587a',
      background: 'linear-gradient(270deg, rgba(29, 9, 25, 0.12) 35%, rgba(255, 69, 120, 0.12) 100%)',
      text: '#ff587a',
    },
  }

  const styles = colorStyles[color]

  return (
    <div className={`flex items-center gap-4 ${label ? 'justify-between' : 'justify-end'}`}>
      {label && (
        <span className="font-primary font-normal text-[13px] text-[rgba(235,234,250,0.5)] tracking-[0.02em] leading-[158%]">
          {label}
        </span>
      )}
      <div className="flex items-center gap-2">
        {prefix && (
          <span className="font-primary font-normal text-[13px] text-[rgba(235,234,250,0.5)] tracking-[0.02em] leading-[158%]">
            {prefix}
          </span>
        )}
        <div
          className="flex items-center gap-1 px-2 py-1"
          style={{
            borderLeft: styles.borderLeft,
            background: styles.background,
          }}
        >
          <span
            className="font-primary text-[15px] tracking-[0.02em] leading-[147%] font-medium"
            style={{ color: styles.text }}
          >
            {value}
          </span>
          <span
            className="font-primary text-[15px] tracking-[0.02em] leading-[147%] font-medium"
            style={{ color: styles.text }}
          >
            {suffix}
          </span>
        </div>
      </div>
    </div>
  )
}
