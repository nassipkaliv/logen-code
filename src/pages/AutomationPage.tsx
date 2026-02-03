import { useState, useRef, useEffect } from 'react'
import { DashboardLayout } from '../components/dashboard'
import { Corner, PlusCorner } from '../components/ui'
import { SelectField, ConditionInput, AutomationItem, CapacityBox } from '../components/automation'

const strategies = [
  'Stop-Loss Guard',
  'Take-Profit Lock',
  'Trailing Exit',
  'Buy the Dip',
  'Price Floor Buy',
  'Price Ceiling Sell',
  'DCA Routine',
  'Cooldown Protector',
  'Portfolio Trim',
  'Risk Cap',
  'Volatility Mode',
]

const MAX_STRATEGIES = 5

export default function AutomationPage() {
  const [source, setSource] = useState('Exchange')
  const [asset, setAsset] = useState('Token')
  const [selectedStrategies, setSelectedStrategies] = useState<string[]>([])
  const [isStrategyOpen, setIsStrategyOpen] = useState(false)
  const strategyRef = useRef<HTMLDivElement>(null)

  const toggleStrategy = (strategy: string) => {
    setSelectedStrategies((prev) => {
      if (prev.includes(strategy)) {
        return prev.filter((s) => s !== strategy)
      }
      if (prev.length >= MAX_STRATEGIES) {
        return prev
      }
      return [...prev, strategy]
    })
  }

  const isLimitReached = selectedStrategies.length >= MAX_STRATEGIES

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (strategyRef.current && !strategyRef.current.contains(event.target as Node)) {
        setIsStrategyOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const automations = selectedStrategies.map((name) => ({
    name,
    status: 'Active' as const,
  }))

  return (
    <DashboardLayout>
      <div className="mx-5 sm:mx-6 md:mx-[40px] pb-0">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-0 items-stretch">
          <div className="relative flex flex-col">
            {/* Vertical divider line */}
            <div className="hidden lg:block absolute right-0 top-0 bottom-0 w-[1px] bg-[rgba(235,234,250,0.08)]" />
            <div className="absolute top-0 left-0 right-0 h-[1px] bg-[rgba(235,234,250,0.08)]" />


            <div
              className="relative p-5 pt-0 flex-1 flex flex-col"
              style={{
                borderTop: '1px solid rgba(235, 234, 250, 0.08)',
                background: 'linear-gradient(180deg, rgba(132, 141, 232, 0) 0%, rgba(132, 141, 232, 0.04) 100%)',
              }}
            >

              <div className='flex-1 flex flex-col'
                style= {{
                  borderLeft: '1px solid rgba(235, 234, 250, 0.08)',
                  borderRight: '1px solid rgba(235, 234, 250, 0.08)'
                }}
              >
                

                <div className="flex flex-col sm:flex-row gap-4 sm:gap-[15px] mb-4 w-full">
                  <div className='flex-1 pb-4 sm:pb-0' style={{ borderBottom: '1px solid rgba(235, 234, 250, 0.08)', borderRight: 'none' }}>
                    <h2 className="mt-4 sm:mt-5 font-primary text-sm sm:text-base font-medium text-[#ededff] mb-4 sm:mb-5 tracking-[0.01em]">
                      Context Bar
                    </h2>
                    <SelectField
                      label="Source:"
                      value={source}
                      options={['Exchange', 'DEX', 'Wallet']}
                      onChange={setSource}
                    />
                  </div>
                  <div className="hidden sm:block w-[1px] bg-[rgba(235,234,250,0.08)]" />
                  <div className="flex-1 sm:pt-[64px] relative">
                    <PlusCorner className="hidden sm:block bottom-[45px] right-[-5px] z-10" />
                    <SelectField
                      label="Asset:"
                      value={asset}
                      options={['Token', 'SOL', 'USDC', 'BONK']}
                      onChange={setAsset}
                    />
                  </div>
                </div>

                <div className="mt-auto" ref={strategyRef}>
                  <label className="font-primary text-xs sm:text-[13px] text-[rgba(235,237,255,0.5)] leading-[158%] mb-1 sm:mb-[5px] block">
                    Select strategy:
                  </label>
                  <div className="relative">
                    {/* Selected value display */}
                    <div
                      className="w-full px-3 py-2.5 sm:py-3 font-primary text-xs sm:text-[13px] text-[#ebedff] leading-[158%] tracking-[0.02em] cursor-pointer"
                      style={{
                        backdropFilter: 'blur(10px)',
                        boxShadow: 'inset 0 1px 1px 0 rgba(132, 141, 232, 0.2), inset 0 0 8px 0 rgba(132, 141, 232, 0.06), inset 0 -1px 1px 0 rgba(132, 141, 232, 0.2)',
                        background: 'rgba(132, 141, 232, 0.02)',
                      }}
                      onClick={() => setIsStrategyOpen(!isStrategyOpen)}
                    >
                      {selectedStrategies.length > 0 ? selectedStrategies[0] : 'Select strategy'}
                      {selectedStrategies.length > 1 && (
                        <span className="text-[rgba(235,237,255,0.5)]"> +{selectedStrategies.length - 1}</span>
                      )}
                      <svg
                        className={`absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none transition-transform ${isStrategyOpen ? 'rotate-180' : ''}`}
                        width="12"
                        height="6"
                        viewBox="0 0 12 6"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path d="M5.65674 5.65685L11.3136 -6.19888e-06H-0.000115871L5.65674 5.65685Z" fill="#848DE8" />
                      </svg>
                    </div>

                    <PlusCorner className="bottom-[-5px] right-[-5px]" />

                    {/* Dropdown options */}
                    {isStrategyOpen && (
                      <div
                        className="absolute top-full left-0 right-0 z-50 mt-1 p-3 sm:p-[15px] max-h-[300px] overflow-y-auto"
                        style={{
                          backdropFilter: 'blur(200px)',
                          boxShadow: 'inset 0 1px 1px 0 rgba(132, 141, 232, 0.2), inset 0 0 8px 0 rgba(132, 141, 232, 0.06), inset 0 -1px 1px 0 rgba(132, 141, 232, 0.2)',
                          background: 'rgba(2, 3, 14, 0.25)',
                        }}
                      >
                        {strategies.map((option) => {
                          const isSelected = selectedStrategies.includes(option)
                          const isBlocked = !isSelected && isLimitReached
                          return (
                            <div
                              key={option}
                              className={`flex items-center justify-between py-2 ${isBlocked ? 'cursor-not-allowed opacity-50' : 'cursor-pointer hover:opacity-80'}`}
                              onClick={() => {
                                if (!isBlocked) {
                                  toggleStrategy(option)
                                }
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
                                {!isBlocked && (
                                  <>
                                    <Corner className="top-0 left-0" color={isSelected ? '#5fffd7' : '#ededfa'} />
                                    <Corner className="top-0 right-0 rotate-90" color={isSelected ? '#5fffd7' : '#ededfa'} />
                                    <Corner className="bottom-0 right-0 rotate-180" color={isSelected ? '#5fffd7' : '#ededfa'} />
                                    <Corner className="bottom-0 left-0 -rotate-90" color={isSelected ? '#5fffd7' : '#ededfa'} />
                                  </>
                                )}
                              </div>
                            </div>
                          )
                        })}
                      </div>
                    )}
                  </div>
                </div>
              </div>

              <p className="font-primary text-[13px] text-[rgba(235,234,250,0.5)] tracking-[0.02em] leading-[158%] mt-auto pt-3">
                Automatically sells when price drops to limit losses.
              </p>
            </div>
          </div>

          {/* Conditions & Parameters */}
          <div
            className="relative p-4 sm:p-5 flex flex-col"
            style={{
              borderTop: '1px solid rgba(235, 234, 250, 0.08)',
              borderRight: '1px solid rgba(235, 234, 250, 0.08)',
              background: 'linear-gradient(180deg, rgba(132, 141, 232, 0) 0%, rgba(132, 141, 232, 0.04) 100%)',
            }}
          >
            <PlusCorner className="hidden sm:block top-[-5px] left-[-5px]" />
            <PlusCorner className="hidden sm:block top-[-5px] right-[-5px]" />
            <PlusCorner className="hidden sm:block bottom-[-5px] left-[-5px]" />
            <PlusCorner className="hidden sm:block bottom-[-5px] right-[-5px]" />

            <h2 className="font-primary text-base font-medium text-[#ededff] mb-4 sm:mb-5 tracking-[0.01em]">
              Conditions & Parameters
            </h2>

            <div
              className="relative p-3 sm:p-5 flex-1"
              style={{
                backdropFilter: 'blur(9.999870300292969px)',
                boxShadow: 'inset 0 1px 1px 0 rgba(132, 141, 232, 0.2), inset 0 0 8px 0 rgba(132, 141, 232, 0.06), inset 0 -1px 1px 0 rgba(132, 141, 232, 0.2)',
                background: 'rgba(132, 141, 232, 0.02)',
              }}
            >
              <Corner className="top-0 left-0" />
              <Corner className="bottom-0 right-0 rotate-180" />

              <h3 className="font-primary text-sm sm:text-base font-medium text-[#edeafa] mb-3 sm:mb-5 tracking-[0.02em] leading-[138%]">
                Conditions
              </h3>

              <div className="space-y-[10px]">
                <ConditionInput
                  label="If price drops"
                  value="X"
                  suffix="%"
                  color="green"
                />
                <ConditionInput
                  label="Action:"
                  prefix="Sell"
                  value="Z"
                  suffix="%"
                  color="red"
                />
                <ConditionInput
                  label="Cooldown:"
                  value="Y"
                  suffix="min"
                />
              </div>
            </div>

            <div className="flex justify-end mt-auto pt-3">
              <button
                className="font-primary font-medium text-[13px] leading-[158%] tracking-[0.02em] text-[#848de8] underline hover:brightness-110"
              >
                Add Strategy
              </button>
            </div>
          </div>
        </div>

        {/* Bottom section - Active Automations and Capacity */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-[20px] mt-6 sm:mt-[40px] items-stretch">
          {/* Active Automations List */}
          <div className="relative flex flex-col">
            <div className="hidden lg:block absolute right-0 top-0 bottom-0 w-[1px] bg-[rgba(235,234,250,0.08)]" />

            <div
              className="relative p-4 sm:p-5 flex-1 flex flex-col"
              style={{
                backdropFilter: 'blur(9.999870300292969px)',
                boxShadow: 'inset 0 1px 1px 0 rgba(132, 141, 232, 0.2), inset 0 0 8px 0 rgba(132, 141, 232, 0.06), inset 0 -1px 1px 0 rgba(132, 141, 232, 0.2)',
                background: 'rgba(132, 141, 232, 0.02)',
              }}
            >
              <PlusCorner className="hidden sm:block top-[-5px] left-[-5px]" />
              <PlusCorner className="hidden sm:block top-[-5px] right-[-5px]" />
              <PlusCorner className="hidden sm:block bottom-[-5px] right-[-5px]" />

              <h2 className="font-primary text-base font-medium text-[#ededff] mb-4 tracking-[0.01em]">
                Active Automations List
              </h2>

              <div
                className="relative p-3 sm:p-5 flex-1 flex flex-col"
                style={{
                  border: '1px solid rgba(235, 234, 250, 0.08)',
                  background: 'rgba(132, 141, 232, 0.02)',
                }}
              >
                <Corner className="top-0 left-0" />
                <Corner className="bottom-0 right-0 rotate-180" />

                <h3 className="font-primary text-xs sm:text-sm font-medium text-[#ededfa] mb-2 sm:mb-3 tracking-[0.01em]">
                  Active Automations
                </h3>

                <div className="flex-1 flex flex-col justify-center">
                  {automations.length === 0 ? (
                    <p className="font-primary text-[13px] text-[rgba(235,234,250,0.3)] tracking-[0.02em] leading-[158%] text-center py-4">
                      No active automations
                    </p>
                  ) : (
                    automations.map((automation) => (
                      <AutomationItem
                        key={automation.name}
                        name={automation.name}
                        status={automation.status}
                      />
                    ))
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Capacity Indicator */}
          <div
            className="relative p-4 sm:p-5 flex flex-col"
            style={{
              borderLeft: '1px solid rgba(235, 234, 250, 0.08)',
              borderRight: '1px solid rgba(235, 234, 250, 0.08)',
              borderTop: '1px solid rgba(235, 234, 250, 0.08)',
            }}
          >
            {/* Background image */}
            <div
              className="absolute inset-0 z-0"
              style={{
                backgroundImage: 'url(/assets/img/capacityBg.png)',
                backgroundSize: 'cover',
                backgroundPosition: 'center',
              }}
            />

              <PlusCorner className="hidden sm:block top-[-5px] left-[-5px] z-10" />
              <PlusCorner className="hidden sm:block top-[-5px] right-[-5px] z-10" />
              <PlusCorner className="hidden sm:block bottom-[-5px] left-[-5px] z-10" />

            <h2 className="relative z-10 font-primary text-base font-medium text-[#ededff] tracking-[0.01em]">
              Capacity Indicator
            </h2>

            <div className="relative z-10 flex flex-col items-center justify-between flex-1 py-3 sm:py-4">
              <div className="flex-1 flex items-center">
                <div className="relative flex items-center justify-center gap-[20px] sm:gap-[38px]">
                  {/* Horizontal lines - hidden on mobile */}
                  <div className="hidden sm:block absolute right-1/2 top-0 h-[1px] bg-[rgba(132,141,232,0.12)]" style={{ width: '13vw', transform: 'translateX(-100px)' }} />
                  <div className="hidden sm:block absolute left-1/2 top-0 h-[1px] bg-[rgba(132,141,232,0.12)]" style={{ width: '13vw', transform: 'translateX(100px)' }} />

                  <div className="hidden sm:block absolute right-1/2 bottom-0 h-[1px] bg-[rgba(132,141,232,0.12)]" style={{ width: '13vw', transform: 'translateX(-100px)' }} />
                  <div className="hidden sm:block absolute left-1/2 bottom-0 h-[1px] bg-[rgba(132,141,232,0.12)]" style={{ width: '13vw', transform: 'translateX(100px)' }} />

                  {/* Vertical lines - hidden on mobile */}
                  <div className="hidden sm:block absolute w-[1px] h-[50px] bg-[rgba(132,141,232,0.12)]" style={{ left: '0', bottom: '100%' }} />
                  <div className="hidden sm:block absolute w-[1px] h-[50px] bg-[rgba(132,141,232,0.12)]" style={{ right: '0', bottom: '100%' }} />

                  <div className="hidden sm:block absolute w-[1px] h-[50px] bg-[rgba(132,141,232,0.12)]" style={{ left: '80px', bottom: '100%' }} />
                  <div className="hidden sm:block absolute w-[1px] h-[50px] bg-[rgba(132,141,232,0.12)]" style={{ right: '80px', bottom: '100%' }} />

                  <div className="hidden sm:block absolute w-[1px] h-[50px] bg-[rgba(132,141,232,0.12)]" style={{ left: '0', top: '100%' }} />
                  <div className="hidden sm:block absolute w-[1px] h-[50px] bg-[rgba(132,141,232,0.12)]" style={{ right: '0', top: '100%' }} />

                  <div className="hidden sm:block absolute w-[1px] h-[50px] bg-[rgba(132,141,232,0.12)]" style={{ left: '80px', top: '100%' }} />
                  <div className="hidden sm:block absolute w-[1px] h-[50px] bg-[rgba(132,141,232,0.12)]" style={{ right: '80px', top: '100%' }} />


                  <CapacityBox value={String(selectedStrategies.length)} />
                  <span className="font-primary font-medium text-[24px] sm:text-[31px] leading-[143%] tracking-[0.01em] text-[#848de8]">/</span>
                  <CapacityBox value={String(MAX_STRATEGIES)} />
                </div>
              </div>

              <div className="text-center">
                <p className="font-primary font-medium text-[18px] sm:text-[22px] leading-[136%] tracking-[0.01em] text-white">
                  Active automations:
                </p>
                <p className="font-primary font-normal text-[12px] sm:text-[13px] leading-[158%] tracking-[0.02em] text-[rgba(235,234,250,0.5)]">
                  {isLimitReached ? 'Automation limit reached.' : `${MAX_STRATEGIES - selectedStrategies.length} slots available.`}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Token Context section */}
        <div
          className="relative mt-6 sm:mt-10"
          style={{
            background: 'linear-gradient(180deg, rgba(132, 141, 232, 0) 0%, rgba(132, 141, 232, 0.02) 100%)',
          }}
        >
          {/* Background image */}
          <div
            className="absolute inset-0 z-0"
            style={{
              backgroundImage: 'url(/assets/img/tokenContext.png)',
              backgroundSize: 'cover',
              backgroundPosition: 'center',
            }}
          />

          <div className="absolute top-0 left-0 right-0 h-[1px] bg-[rgba(235,234,250,0.08)]" />

          <PlusCorner className="hidden sm:block top-[-5px] left-[-5px] z-10" />
          <PlusCorner className="hidden sm:block top-[-5px] right-[-5px] z-10" />

          <div className="relative z-10 flex flex-col items-center py-8 sm:py-12">
            {/* Token Context badge */}
            <div
              className="relative inline-block px-3 sm:px-4 py-1.5 sm:py-2 mb-4 font-primary text-xs sm:text-sm font-medium text-[#5fffd7] tracking-[0.01em]"
              style={{
                border: '1px solid rgba(95, 255, 215, 0.2)',
                background: 'rgba(95, 255, 215, 0.05)',
              }}
            >
              <Corner className="top-0 left-0" color="#5fffd7" />
              <Corner className="top-0 right-0 rotate-90" color="#5fffd7" />
              <Corner className="bottom-0 right-0 rotate-180" color="#5fffd7" />
              <Corner className="bottom-0 left-0 -rotate-90" color="#5fffd7" />
              <span className="text-[rgba(235,237,255,0.3)]">|</span>
              <span className="mx-2">Token Context</span>
              <span className="text-[rgba(235,237,255,0.3)]">|</span>
            </div>

            <p
              className="font-primary font-medium text-[16px] sm:text-[20px] leading-[120%] sm:leading-[110%] text-center px-3 sm:px-4"
              style={{
                background: 'linear-gradient(180deg, #ebeafa 0%, rgba(237, 237, 249, 0.7) 100%)',
                backgroundClip: 'text',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}
            >
              Logen token removes limits on
              <br />
              parallel automations and{' '}
              <button
                className="relative inline-flex items-center justify-center w-[18px] h-[18px] sm:w-[20px] sm:h-[20px] align-middle"
                style={{
                  boxShadow: 'inset 0 1px 1px 0 rgba(95, 255, 215, 0.2), inset 0 0 7px 0 rgba(95, 255, 215, 0.08), inset 0 0 4px 0 rgba(95, 255, 215, 0.06), inset 0 0 11px 0 rgba(95, 255, 215, 0.12), inset 0 7px 11px 0 rgba(95, 255, 215, 0.06)',
                  background: 'rgba(95, 255, 215, 0.04)',
                  border: '0.56px solid rgba(95, 255, 215, 0.12)',
                }}
              >
                <Corner className="top-0 left-0" color="#5fffd7" />
                <Corner className="top-0 right-0 rotate-90" color="#5fffd7" />
                <Corner className="bottom-0 right-0 rotate-180" color="#5fffd7" />
                <Corner className="bottom-0 left-0 -rotate-90" color="#5fffd7" />
                <svg className="w-[8px] h-[8px] sm:w-[10px] sm:h-[10px]" viewBox="0 0 10 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path fillRule="evenodd" clipRule="evenodd" d="M3.03571 0.714286V3.21429C3.03571 3.60877 3.35551 3.92857 3.75 3.92857H4.46429V4.82143H2.14286C1.4525 4.82143 0.892857 5.38107 0.892857 6.07143V7.14286H0.714286C0.319796 7.14286 0 7.46264 0 7.85714V9.28571C0 9.68021 0.319796 10 0.714286 10H2.14286C2.53734 10 2.85714 9.68021 2.85714 9.28571V7.85714C2.85714 7.46264 2.53734 7.14286 2.14286 7.14286H1.96429V6.07143C1.96429 5.97281 2.04424 5.89286 2.14286 5.89286H4.46429V7.14286H4.28571C3.89123 7.14286 3.57143 7.46264 3.57143 7.85714V9.28571C3.57143 9.68021 3.89123 10 4.28571 10H5.71429C6.10877 10 6.42857 9.68021 6.42857 9.28571V7.85714C6.42857 7.46264 6.10877 7.14286 5.71429 7.14286H5.53571V5.89286H7.85714C7.95579 5.89286 8.03571 5.97281 8.03571 6.07143V7.14286H7.85714C7.46264 7.14286 7.14286 7.46264 7.14286 7.85714V9.28571C7.14286 9.68021 7.46264 10 7.85714 10H9.28571C9.68021 10 10 9.68021 10 9.28571V7.85714C10 7.46264 9.68021 7.14286 9.28571 7.14286H9.10714V6.07143C9.10714 5.38107 8.5475 4.82143 7.85714 4.82143H5.53571V3.92857H6.25C6.64449 3.92857 6.96429 3.60877 6.96429 3.21429V0.714286C6.96429 0.319796 6.64449 0 6.25 0H3.75C3.35551 0 3.03571 0.319796 3.03571 0.714286Z" fill="#5FFFD7" />
                </svg>
              </button>{' '}
              reduces execution fees.
            </p>
          </div>
        </div>
      </div>
    </DashboardLayout>
  )
}
