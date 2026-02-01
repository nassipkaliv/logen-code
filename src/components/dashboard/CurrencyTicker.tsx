const currencies = [
  { symbol: 'SOL', change: '+2.31%', isPositive: true },
  { symbol: 'BONK', change: '-4.88%', isPositive: false },
  { symbol: 'SOL', change: '+2.31%', isPositive: true },
  { symbol: 'POPCAT', change: '-4.88%', isPositive: false },
  { symbol: 'SOL', change: '+2.31%', isPositive: true },
  { symbol: 'POPCAT', change: '-4.88%', isPositive: false },
  { symbol: 'POPCAT', change: '-4.88%', isPositive: false },
  { symbol: 'SOL', change: '+2.31%', isPositive: true },
  { symbol: 'POPCAT', change: '-4.88%', isPositive: false },
  { symbol: 'SOL', change: '+2.31%', isPositive: true },
  { symbol: 'POPCAT', change: '-4.88%', isPositive: false },
  { symbol: 'SOL', change: '+2.31%', isPositive: true },
]

function CurrencyItem({ symbol, change, isPositive }: { symbol: string; change: string; isPositive: boolean }) {
  return (
    <div className="flex items-center gap-[6px] px-[15px] shrink-0">
      <span className="font-primary text-[15px] leading-[147%] tracking-[0.02em] text-white">{symbol}</span>
      <div
        className={`font-mono text-[10px] px-1.5 py-0.5 ${
          isPositive ? 'text-[#5fffd7]' : 'text-[#ff587a]'
        }`}
        style={{
          background: isPositive
            ? 'rgba(95, 255, 215, 0.1), linear-gradient(270deg, rgba(29, 9, 25, 0.12) 35%, rgba(95, 255, 215, 0.12) 100%)'
            : 'rgba(255, 69, 120, 0.1), linear-gradient(270deg, rgba(29, 9, 25, 0.12) 35%, rgba(255, 69, 120, 0.12) 100%)',
          borderLeft: isPositive ? '1px solid #5fffd7' : '1px solid #ff587a',
        }}
      >
        {change}
      </div>
    </div>
  )
}

export default function CurrencyTicker() {
  return (
    <div className="relative w-full overflow-hidden py-[15px] border-y border-[rgba(235,234,250,0.08)] bg-[rgba(1,1,14,0.5)] mt-[10px]">
      <div className="flex animate-ticker">
        <div className="flex shrink-0">
          {currencies.map((currency, index) => (
            <CurrencyItem key={`first-${index}`} {...currency} />
          ))}
        </div>
        <div className="flex shrink-0">
          {currencies.map((currency, index) => (
            <CurrencyItem key={`second-${index}`} {...currency} />
          ))}
        </div>
      </div>
    </div>
  )
}
