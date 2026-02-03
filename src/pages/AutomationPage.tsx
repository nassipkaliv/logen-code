import { useState } from 'react'
import { DashboardLayout } from '../components/dashboard'

function Corner({ className, color = 'white' }: { className?: string; color?: string }) {
  return (
    <svg
      width="6"
      height="6"
      viewBox="0 0 6 6"
      fill="none"
      className={`absolute ${className}`}
    >
      <rect width="1" height="6" fill={color} />
      <rect width="6" height="1" fill={color} />
    </svg>
  )
}

function PlusCorner({ className }: { className?: string }) {
  return (
    <svg className={`absolute ${className}`} width="11" height="11" viewBox="0 0 11 11" fill="none">
      <rect x="5" width="1" height="11" fill="#EDEDFA" />
      <rect y="5" width="11" height="1" fill="#EDEDFA" />
    </svg>
  )
}

function SelectField({
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
  return (
    <div className="flex-1 min-w-0">
      <label className="font-primary text-xs sm:text-[13px] text-[rgba(235,237,255,0.5)] leading-[158%] mb-1 sm:mb-[5px] block">
        {label}
      </label>
      <div
        className="relative"
        style={{
          backdropFilter: 'blur(10px)',
          boxShadow: 'inset 0 1px 1px 0 rgba(132, 141, 232, 0.2), inset 0 0 8px 0 rgba(132, 141, 232, 0.06), inset 0 -1px 1px 0 rgba(132, 141, 232, 0.2)',
          background: 'rgba(132, 141, 232, 0.02)',
        }}
      >
        <select
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="w-full bg-transparent px-3 py-2.5 sm:py-3 font-primary text-xs sm:text-[13px] text-[#ebedff] leading-[158%] tracking-[0.02em] outline-none appearance-none cursor-pointer"
        >
          {options.map((option) => (
            <option key={option} value={option} className="bg-[#070818] text-[#ebedff]">
              {option}
            </option>
          ))}
        </select>
        <svg
          className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none"
          width="10"
          height="6"
          viewBox="0 0 10 6"
          fill="none"
        >
          <path d="M1 1L5 5L9 1" stroke="#848DE8" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </div>
    </div>
  )
}

function ConditionInput({
  label,
  value,
  suffix,
  onChange,
  color = 'default',
}: {
  label: string
  value: string
  suffix: string
  onChange: (value: string) => void
  color?: 'default' | 'green' | 'red'
}) {
  const colorStyles = {
    default: {
      border: '1px solid rgba(132, 141, 232, 0.2)',
      background: 'rgba(132, 141, 232, 0.02)',
      text: '#ebedff',
    },
    green: {
      border: '1px solid rgba(95, 255, 215, 0.3)',
      background: 'rgba(95, 255, 215, 0.05)',
      text: '#5fffd7',
    },
    red: {
      border: '1px solid rgba(199, 52, 52, 0.3)',
      background: 'rgba(199, 52, 52, 0.05)',
      text: '#c73434',
    },
  }

  const styles = colorStyles[color]

  return (
    <div className="flex items-center justify-between gap-4">
      <span className="font-primary text-xs sm:text-sm text-[rgba(235,237,255,0.5)] tracking-[0.02em]">
        {label}
      </span>
      <div
        className="flex items-center gap-2 px-3 py-1.5"
        style={{
          border: styles.border,
          background: styles.background,
        }}
      >
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="w-12 bg-transparent font-primary text-xs sm:text-sm text-right outline-none"
          style={{ color: styles.text }}
        />
        <span
          className="font-primary text-xs sm:text-sm"
          style={{ color: styles.text }}
        >
          {suffix}
        </span>
      </div>
    </div>
  )
}

function AutomationItem({
  name,
  status,
}: {
  name: string
  status: 'Active' | 'Paused'
}) {
  const isActive = status === 'Active'

  return (
    <div className="flex items-center justify-between py-2">
      <span className="font-primary text-xs sm:text-sm text-[#ededfa] tracking-[0.02em]">
        {name}
      </span>
      <span
        className="px-2 py-0.5 font-primary text-[10px] sm:text-xs font-medium tracking-[0.02em]"
        style={{
          color: isActive ? '#5fffd7' : '#ff587a',
          background: isActive ? 'rgba(95, 255, 215, 0.1)' : 'rgba(255, 88, 122, 0.1)',
          border: isActive ? '1px solid rgba(95, 255, 215, 0.2)' : '1px solid rgba(255, 88, 122, 0.2)',
        }}
      >
        {status}
      </span>
    </div>
  )
}

function CapacityBox({ value, active = false }: { value: string; active?: boolean }) {
  return (
    <div
      className="w-16 h-16 sm:w-20 sm:h-20 flex items-center justify-center font-primary text-2xl sm:text-3xl font-medium"
      style={{
        border: active ? '1px solid rgba(132, 141, 232, 0.4)' : '1px solid rgba(235, 234, 250, 0.08)',
        background: active ? 'rgba(132, 141, 232, 0.08)' : 'transparent',
        color: active ? '#848de8' : '#ededfa',
      }}
    >
      {value}
    </div>
  )
}

export default function AutomationPage() {
  const [source, setSource] = useState('Exchange')
  const [asset, setAsset] = useState('Token')
  const [strategy, setStrategy] = useState('Stop-Loss Guard')
  const [priceDropPercent, setPriceDropPercent] = useState('X')
  const [sellPercent, setSellPercent] = useState('Z')
  const [cooldown, setCooldown] = useState('Y')

  const automations = [
    { name: 'Stop-Loss Guard', status: 'Active' as const },
    { name: 'Take-Profit Lock', status: 'Paused' as const },
    { name: 'DCA Routine', status: 'Active' as const },
    { name: 'Buy the Dip', status: 'Paused' as const },
    { name: 'Sell the Spike', status: 'Paused' as const },
  ]

  return (
    <DashboardLayout>
      <div className="mx-4 sm:mx-6 md:mx-[40px] pt-6 sm:pt-8 md:pt-10 pb-0">
        {/* Top section - Context Bar and Conditions */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-0">
          {/* Context Bar */}
          <div className="relative">
            {/* Vertical divider line */}
            <div className="hidden lg:block absolute right-0 top-0 bottom-0 w-[1px] bg-[rgba(235,234,250,0.08)]" />
            <div className="absolute top-0 left-0 right-0 h-[1px] bg-[rgba(235,234,250,0.08)]" />

            <PlusCorner className="hidden sm:block top-[-5px] right-[-5px]" />

            <div
              className="relative p-4 sm:p-5"
              style={{
                borderTop: '1px solid rgba(235, 234, 250, 0.08)',
                background: 'linear-gradient(180deg, rgba(132, 141, 232, 0) 0%, rgba(132, 141, 232, 0.04) 100%)',
              }}
            >
              <PlusCorner className="hidden sm:block top-[-5px] right-[-5px]" />
              <PlusCorner className="hidden sm:block bottom-[-5px] right-[-5px]" />
              <PlusCorner className="hidden sm:block bottom-[-5px] left-[-5px]" />

              <h2 className="font-primary text-base sm:text-lg font-medium text-[#ededff] mb-4 sm:mb-5 tracking-[0.01em]">
                Context Bar
              </h2>

              <div className="flex flex-col sm:flex-row gap-3 sm:gap-[15px] mb-4">
                <SelectField
                  label="Source:"
                  value={source}
                  options={['Exchange', 'DEX', 'Wallet']}
                  onChange={setSource}
                />
                <SelectField
                  label="Asset:"
                  value={asset}
                  options={['Token', 'SOL', 'USDC', 'BONK']}
                  onChange={setAsset}
                />
              </div>

              <div className="mb-4">
                <label className="font-primary text-xs sm:text-[13px] text-[rgba(235,237,255,0.5)] leading-[158%] mb-1 sm:mb-[5px] block">
                  Select strategy:
                </label>
                <div
                  className="relative"
                  style={{
                    backdropFilter: 'blur(10px)',
                    boxShadow: 'inset 0 1px 1px 0 rgba(132, 141, 232, 0.2), inset 0 0 8px 0 rgba(132, 141, 232, 0.06), inset 0 -1px 1px 0 rgba(132, 141, 232, 0.2)',
                    background: 'rgba(132, 141, 232, 0.02)',
                  }}
                >
                  <select
                    value={strategy}
                    onChange={(e) => setStrategy(e.target.value)}
                    className="w-full bg-transparent px-3 py-2.5 sm:py-3 font-primary text-xs sm:text-[13px] text-[#ebedff] leading-[158%] tracking-[0.02em] outline-none appearance-none cursor-pointer"
                  >
                    <option value="Stop-Loss Guard" className="bg-[#070818]">Stop-Loss Guard</option>
                    <option value="Take-Profit Lock" className="bg-[#070818]">Take-Profit Lock</option>
                    <option value="DCA Routine" className="bg-[#070818]">DCA Routine</option>
                    <option value="Buy the Dip" className="bg-[#070818]">Buy the Dip</option>
                    <option value="Sell the Spike" className="bg-[#070818]">Sell the Spike</option>
                  </select>
                  <svg
                    className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none"
                    width="10"
                    height="6"
                    viewBox="0 0 10 6"
                    fill="none"
                  >
                    <path d="M1 1L5 5L9 1" stroke="#848DE8" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
              </div>

              <p className="font-primary text-xs sm:text-sm text-[rgba(235,237,255,0.5)] tracking-[0.02em] leading-[156%]">
                Automatically sells when price drops to limit losses.
              </p>
            </div>
          </div>

          {/* Conditions & Parameters */}
          <div
            className="relative p-4 sm:p-5"
            style={{
              borderTop: '1px solid rgba(235, 234, 250, 0.08)',
              borderLeft: '1px solid rgba(235, 234, 250, 0.08)',
              borderRight: '1px solid rgba(235, 234, 250, 0.08)',
              background: 'linear-gradient(180deg, rgba(132, 141, 232, 0) 0%, rgba(132, 141, 232, 0.04) 100%)',
            }}
          >
            <PlusCorner className="hidden sm:block top-[-5px] left-[-5px]" />
            <PlusCorner className="hidden sm:block top-[-5px] right-[-5px]" />
            <PlusCorner className="hidden sm:block bottom-[-5px] left-[-5px]" />
            <PlusCorner className="hidden sm:block bottom-[-5px] right-[-5px]" />

            <h2 className="font-primary text-base sm:text-lg font-medium text-[#ededff] mb-4 sm:mb-5 tracking-[0.01em]">
              Conditions & Parameters
            </h2>

            <div
              className="relative p-3 sm:p-4 mb-4"
              style={{
                border: '1px solid rgba(235, 234, 250, 0.08)',
                background: 'rgba(132, 141, 232, 0.02)',
              }}
            >
              <Corner className="top-0 left-0" />
              <Corner className="top-0 right-0 rotate-90" />
              <Corner className="bottom-0 right-0 rotate-180" />
              <Corner className="bottom-0 left-0 -rotate-90" />

              <h3 className="font-primary text-sm font-medium text-[#ededfa] mb-4 tracking-[0.01em]">
                Conditions
              </h3>

              <div className="space-y-3">
                <ConditionInput
                  label="If price drops"
                  value={priceDropPercent}
                  suffix="%"
                  onChange={setPriceDropPercent}
                  color="red"
                />
                <ConditionInput
                  label="Action:"
                  value={sellPercent}
                  suffix="%"
                  onChange={setSellPercent}
                  color="green"
                />
                <ConditionInput
                  label="Cooldown:"
                  value={cooldown}
                  suffix="min"
                  onChange={setCooldown}
                />
              </div>
            </div>

            <div className="flex justify-end">
              <button
                className="relative px-4 py-2 font-primary text-xs sm:text-sm font-medium text-[#848de8] tracking-[0.02em] transition-all hover:brightness-110 active:scale-[0.98]"
                style={{
                  border: '1px solid rgba(132, 141, 232, 0.2)',
                  background: 'rgba(132, 141, 232, 0.04)',
                }}
              >
                <Corner className="top-0 left-0" color="#848DE8" />
                <Corner className="top-0 right-0 rotate-90" color="#848DE8" />
                <Corner className="bottom-0 right-0 rotate-180" color="#848DE8" />
                <Corner className="bottom-0 left-0 -rotate-90" color="#848DE8" />
                Add Strategy
              </button>
            </div>
          </div>
        </div>

        {/* Bottom section - Active Automations and Capacity */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-0 mt-6 sm:mt-[40px]">
          {/* Active Automations List */}
          <div className="relative">
            <div className="hidden lg:block absolute right-0 top-0 bottom-0 w-[1px] bg-[rgba(235,234,250,0.08)]" />

            <div
              className="relative p-4 sm:p-5"
              style={{
                borderLeft: '1px solid rgba(235, 234, 250, 0.08)',
                borderRight: '1px solid rgba(235, 234, 250, 0.08)',
                borderTop: '1px solid rgba(235, 234, 250, 0.08)',
                background: 'linear-gradient(180deg, rgba(132, 141, 232, 0) 0%, rgba(132, 141, 232, 0.04) 100%)',
              }}
            >
              <PlusCorner className="hidden sm:block top-[-5px] left-[-5px]" />
              <PlusCorner className="hidden sm:block top-[-5px] right-[-5px]" />
              <PlusCorner className="hidden sm:block bottom-[-5px] right-[-5px]" />

              <h2 className="font-primary text-base sm:text-lg font-medium text-[#ededff] mb-4 sm:mb-5 tracking-[0.01em]">
                Active Automations List
              </h2>

              <div
                className="relative p-3 sm:p-4"
                style={{
                  border: '1px solid rgba(235, 234, 250, 0.08)',
                  background: 'rgba(132, 141, 232, 0.02)',
                }}
              >
                <Corner className="top-0 left-0" />
                <Corner className="top-0 right-0 rotate-90" />
                <Corner className="bottom-0 right-0 rotate-180" />
                <Corner className="bottom-0 left-0 -rotate-90" />

                <h3 className="font-primary text-sm font-medium text-[#ededfa] mb-3 tracking-[0.01em]">
                  Active Automations
                </h3>

                <div className="divide-y divide-[rgba(235,234,250,0.08)]">
                  {automations.map((automation) => (
                    <AutomationItem
                      key={automation.name}
                      name={automation.name}
                      status={automation.status}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Capacity Indicator */}
          <div
            className="relative p-4 sm:p-5"
            style={{
              borderLeft: '1px solid rgba(235, 234, 250, 0.08)',
              borderRight: '1px solid rgba(235, 234, 250, 0.08)',
              borderTop: '1px solid rgba(235, 234, 250, 0.08)',
              background: 'linear-gradient(180deg, rgba(132, 141, 232, 0) 0%, rgba(132, 141, 232, 0.04) 100%)',
            }}
          >
            <PlusCorner className="hidden sm:block top-[-5px] left-[-5px]" />
            <PlusCorner className="hidden sm:block top-[-5px] right-[-5px]" />
            <PlusCorner className="hidden sm:block bottom-[-5px] left-[-5px]" />
            <PlusCorner className="hidden sm:block bottom-[-5px] right-[-5px]" />

            <h2 className="font-primary text-base sm:text-lg font-medium text-[#ededff] mb-6 sm:mb-8 tracking-[0.01em]">
              Capacity Indicator
            </h2>

            <div className="flex flex-col items-center">
              <div className="flex items-center gap-3 sm:gap-4 mb-6">
                <CapacityBox value="5" active />
                <span className="font-primary text-2xl sm:text-3xl text-[rgba(235,234,250,0.3)]">/</span>
                <CapacityBox value="5" />
              </div>

              <p className="font-primary text-sm sm:text-base text-[#ededfa] mb-2 tracking-[0.02em]">
                Active automations:
              </p>
              <p className="font-primary text-xs sm:text-sm text-[rgba(235,237,255,0.5)] tracking-[0.02em]">
                Automation limit reached.
              </p>
            </div>
          </div>
        </div>

        {/* Token Context section */}
        <div className="relative mt-6 sm:mt-10">
          <div className="absolute top-0 left-0 right-0 h-[1px] bg-[rgba(235,234,250,0.08)]" />

          <PlusCorner className="hidden sm:block top-[-5px] left-[-5px]" />
          <PlusCorner className="hidden sm:block top-[-5px] right-[-5px]" />

          <div className="flex flex-col items-center py-8 sm:py-12">
            {/* Token Context badge */}
            <div
              className="relative inline-block px-3 sm:px-4 py-1.5 sm:py-2 mb-4 font-primary text-xs sm:text-sm font-medium text-[#ff587a] tracking-[0.01em]"
              style={{
                border: '1px solid rgba(255, 88, 122, 0.2)',
                background: 'rgba(255, 88, 122, 0.05)',
              }}
            >
              <Corner className="top-0 left-0" color="#ff587a" />
              <Corner className="top-0 right-0 rotate-90" color="#ff587a" />
              <Corner className="bottom-0 right-0 rotate-180" color="#ff587a" />
              <Corner className="bottom-0 left-0 -rotate-90" color="#ff587a" />
              <span className="text-[rgba(235,237,255,0.3)]">|</span>
              <span className="mx-2">Token Context</span>
              <span className="text-[rgba(235,237,255,0.3)]">|</span>
            </div>

            <p className="font-primary text-sm sm:text-base text-center text-[#ededfa] tracking-[0.02em] px-4">
              Logen token removes limits on
              <br />
              parallel automations and <span className="text-[#f7931a]">⚡</span> reduces execution fees.
            </p>
          </div>
        </div>

        {/* Bottom image section */}
        <div className="relative mt-6 sm:mt-10">
          <div className="absolute top-0 left-0 right-0 h-[1px] bg-[rgba(235,234,250,0.08)]" />
          <img
            src="/assets/img/dashboardbottombg.png"
            alt="Dashboard bottom"
            className="w-full"
          />
        </div>
      </div>
    </DashboardLayout>
  )
}
