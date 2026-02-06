import { useState, useRef, useEffect } from 'react'
import { Connection, PublicKey, LAMPORTS_PER_SOL } from '@solana/web3.js'
import { DashboardLayout } from '../components/dashboard'
import { Corner, PlusCorner } from '../components/ui'
import { SelectField, ConditionInput, AutomationItem, CapacityBox } from '../components/automation'
import { useAuth } from '../hooks'

// Solana RPC endpoint (Mainnet - publicnode)
const RPC_ENDPOINT = 'https://solana.publicnode.com'

const exchanges = {
  Raydium: ['BONK', 'WIF', 'POPCAT', 'BOME', 'SLERF', 'MYRO', 'SAMO', 'PENG', 'GUAC', 'TREMP'],
  Orca: ['BONK', 'WIF', 'MYRO', 'SAMO', 'BOME', 'SLERF', 'PENG', 'GUAC', 'TREMP', 'POPCAT'],
  Jupiter: ['BONK', 'WIF', 'POPCAT', 'BOME', 'MYRO', 'SLERF', 'SAMO', 'PENG', 'TREMP', 'GUAC'],
}

const strategies = [
  { name: 'Stop-Loss Guard', description: 'Automatically exits a position when price declines beyond a defined threshold.', params: { x: 10, y: 10, z: 100 } },
  { name: 'Take-Profit Lock', description: 'Triggers a partial or full exit once a predefined profit level is reached.', params: { x: 25, y: 10, z: 50 } },
  { name: 'Trailing Exit', description: 'Monitors price movement after an upward trend and exits when a reversal begins.', params: { x: 30, y: 8, z: 100 } },
  { name: 'Buy the Dip', description: 'Initiates a buy when price drops sharply within a short time frame.', params: { x: 15, y: 10, z: 20 } },
  { name: 'Sell the Spike', description: 'Executes a sell action when price spikes rapidly over a short period.', params: { x: 20, y: 10, z: 40 } },
  { name: 'Price Floor Buy', description: 'Places a buy when price falls below a specified level.', params: { x: 12, y: 10, z: 15 } },
  { name: 'Price Ceiling Sell', description: 'Triggers a sell when price exceeds a predefined upper level.', params: { x: 30, y: 10, z: 35 } },
  { name: 'DCA Routine', description: 'Executes recurring purchases at fixed time intervals regardless of price.', params: { x: 5, y: 360, z: 10 } },
  { name: 'Cooldown Protector', description: 'Prevents strategies from executing too frequently within a short period.', params: { x: 5, y: 30, z: 50 } },
  { name: 'Portfolio Trim', description: 'Reduces position size when an asset exceeds a defined portfolio allocation.', params: { x: 35, y: 10, z: 20 } },
  { name: 'Risk Cap', description: 'Limits the maximum amount of capital a strategy can use.', params: { x: 20, y: 10, z: 30 } },
  { name: 'Volatility Mode', description: 'Adjusts execution size when market volatility increases.', params: { x: 25, y: 20, z: 50 } },
]

const MAX_STRATEGIES = 5

// Helper functions for localStorage
const getStoredStrategies = (): string[] => {
  try {
    const stored = localStorage.getItem('logen_selectedStrategies')
    return stored ? JSON.parse(stored) : []
  } catch {
    return []
  }
}

const getStoredPausedStrategies = (): string[] => {
  try {
    const stored = localStorage.getItem('logen_pausedStrategies')
    return stored ? JSON.parse(stored) : []
  } catch {
    return []
  }
}

const getStoredSource = (): string => {
  return localStorage.getItem('logen_source') || 'Raydium'
}

const getStoredAsset = (source: string): string => {
  const stored = localStorage.getItem('logen_asset')
  if (stored) {
    const assets = exchanges[source as keyof typeof exchanges] || []
    // Try to parse as JSON first, if fails use as plain string
    let parsed: string
    try {
      parsed = JSON.parse(stored)
    } catch {
      parsed = stored
    }
    if (assets.includes(parsed)) {
      return parsed
    }
  }
  return exchanges['Raydium'][0]
}

export default function AutomationPage() {
  const { isAuthenticated, walletDetails } = useAuth()
  const [source, setSource] = useState(getStoredSource)
  const [asset, setAsset] = useState(() => getStoredAsset(getStoredSource()))
  const [selectedStrategies, setSelectedStrategies] = useState<string[]>(getStoredStrategies)
  const [pausedStrategies, setPausedStrategies] = useState<Set<string>>(new Set(getStoredPausedStrategies()))
  const [isStrategyOpen, setIsStrategyOpen] = useState(false)
  const [solBalance, setSolBalance] = useState<number>(0)
  const [isLoadingBalance, setIsLoadingBalance] = useState(false)
  const strategyRef = useRef<HTMLDivElement>(null)

const MIN_BALANCE = 0.0001

  const isBalanceZero = solBalance < MIN_BALANCE && !isLoadingBalance && !!walletDetails?.address
  console.log('[DEBUG] isBalanceZero:', isBalanceZero, 'solBalance:', solBalance, 'walletAddress:', walletDetails?.address)
  const availableAssets = exchanges[source as keyof typeof exchanges] || []

  // Fetch SOL balance directly from Solana RPC
  useEffect(() => {
    const fetchBalance = async () => {
      if (walletDetails?.address) {
        setIsLoadingBalance(true)
        try {
          console.log('[DEBUG] Fetching balance from Solana RPC for:', walletDetails.address)
          const connection = new Connection(RPC_ENDPOINT, 'confirmed')
          const publicKey = new PublicKey(walletDetails.address)
          
          // Add timeout wrapper
          const lamports = await Promise.race([
            connection.getBalance(publicKey),
            new Promise<number>((_, reject) => 
              setTimeout(() => reject(new Error('RPC timeout')), 10000)
            )
          ])
          
          const balance = lamports / LAMPORTS_PER_SOL
          console.log('[DEBUG] Balance from RPC:', balance)
          setSolBalance(balance)
        } catch (error: any) {
          console.error('Failed to fetch balance from RPC:', error)
          setSolBalance(0)
        } finally {
          setIsLoadingBalance(false)
        }
      }
    }

    fetchBalance()
  }, [walletDetails?.address, isAuthenticated])

  const toggleStrategy = (strategy: string) => {
    if (isBalanceZero) return
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

  const togglePauseStrategy = (strategy: string) => {
    if (isBalanceZero) return
    setPausedStrategies((prev) => {
      const newSet = new Set(prev)
      if (newSet.has(strategy)) {
        newSet.delete(strategy)
      } else {
        newSet.add(strategy)
      }
      return newSet
    })
  }

  const activeAutomationsCount = selectedStrategies.length - pausedStrategies.size

  // Save to localStorage when state changes
  useEffect(() => {
    localStorage.setItem('logen_source', source)
    localStorage.setItem('logen_asset', asset)
    localStorage.setItem('logen_selectedStrategies', JSON.stringify(selectedStrategies))
    localStorage.setItem('logen_pausedStrategies', JSON.stringify(Array.from(pausedStrategies)))
  }, [source, asset, selectedStrategies, pausedStrategies])

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
    status: pausedStrategies.has(name) ? ('Paused' as const) : ('Active' as const),
  }))

  const activeAutomations = automations.filter(a => a.status === 'Active')

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
                      options={Object.keys(exchanges)}
                      onChange={(value) => {
                        if (!isBalanceZero) {
                          setSource(value)
                          setAsset(exchanges[value as keyof typeof exchanges][0])
                        }
                      }}
                    />
                  </div>
                  <div className="hidden sm:block w-[1px] bg-[rgba(235,234,250,0.08)]" />
                  <div className="flex-1 sm:pt-[64px] relative">
                    <PlusCorner className="hidden sm:block bottom-[45px] right-[-5px] z-10" />
                    <SelectField
                      label="Asset:"
                      value={asset}
                      options={availableAssets}
                      onChange={(value) => {
                        if (!isBalanceZero) {
                          setAsset(value)
                        }
                      }}
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
                      className={`w-full px-3 py-2.5 sm:py-3 font-primary text-xs sm:text-[13px] text-[#ebedff] leading-[158%] tracking-[0.02em] ${isBalanceZero ? 'cursor-not-allowed opacity-50' : 'cursor-pointer'}`}
                      style={{
                        backdropFilter: 'blur(10px)',
                        boxShadow: 'inset 0 1px 1px 0 rgba(132, 141, 232, 0.2), inset 0 0 8px 0 rgba(132, 141, 232, 0.06), inset 0 -1px 1px 0 rgba(132, 141, 232, 0.2)',
                        background: 'rgba(132, 141, 232, 0.02)',
                      }}
                      onClick={() => setIsStrategyOpen(!isStrategyOpen)}
                    >
                       {activeAutomations.length > 0 ? strategies.find(s => s.name === activeAutomations[0].name)?.name || 'Select strategy' : 'Select strategy'}
                       {activeAutomations.length > 1 && (
                         <span className="text-[rgba(235,237,255,0.5)]"> +{activeAutomations.length - 1}</span>
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
                          const isSelected = selectedStrategies.includes(option.name)
                          const isBlocked = !isSelected && (activeAutomationsCount >= MAX_STRATEGIES || isBalanceZero)
                          return (
                            <div
                              key={option.name}
                              className={`flex items-center justify-between py-2 ${isBlocked ? 'cursor-not-allowed opacity-50' : 'cursor-pointer hover:opacity-80'}`}
                              onClick={() => {
                                if (!isBlocked) {
                                  toggleStrategy(option.name)
                                }
                              }}
                            >
                              <span className="font-primary text-[13px] text-[#ebedff] leading-[158%] tracking-[0.02em]">
                                {option.name}
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
                {activeAutomations.length > 0 ? strategies.find(s => s.name === activeAutomations[0].name)?.description : 'Select a strategy to see its description.'}
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
                {activeAutomations.length > 0 ? (
                  (() => {
                    const strategy = strategies.find(s => s.name === activeAutomations[0].name)
                    if (!strategy) return null
                    return (
                      <>
                        <ConditionInput
                          label="If price"
                          value={strategy.params.x > 100 ? 'Threshold' : `drops ${strategy.params.x}%`}
                          suffix={strategy.params.y > 60 ? 'hours' : 'min'}
                          color="green"
                        />
                        <ConditionInput
                          label="Action:"
                          prefix="Execute"
                          value={`${strategy.params.z}%`}
                          suffix=""
                          color="red"
                        />
                        <ConditionInput
                          label="Cooldown:"
                          value={strategy.params.y > 60 ? `${strategy.params.y / 60} hours` : `${strategy.params.y} min`}
                          suffix=""
                        />
                      </>
                    )
                  })()
                ) : (
                  <>
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
                  </>
                )}
              </div>
            </div>

            <div className="flex justify-end mt-auto pt-3">
              <button
                className="font-primary font-medium text-[13px] leading-[158%] tracking-[0.02em] text-[rgba(132,141,232,0.6)] underline hover:brightness-110 cursor-pointer transition-opacity"
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
                        onToggle={() => togglePauseStrategy(automation.name)}
                        disabled={isBalanceZero}
                      />
                    ))
                  )}
                  {isBalanceZero && (
                    <p className="font-primary text-[12px] text-[#ff587a] tracking-[0.02em] leading-[158%] text-center mt-3">
                      Automations will remain inactive until your wallet is funded.
                    </p>
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


                  <CapacityBox value={String(activeAutomationsCount)} />
                  <span className="font-primary font-medium text-[24px] sm:text-[31px] leading-[143%] tracking-[0.01em] text-[#848de8]">/</span>
                  <CapacityBox value={String(MAX_STRATEGIES)} />
                </div>
              </div>

              <div className="text-center">
                <p className="font-primary font-medium text-[18px] sm:text-[22px] leading-[136%] tracking-[0.01em] text-white">
                  Active automations: {activeAutomationsCount} / {MAX_STRATEGIES}
                </p>
                <p className="font-primary font-normal text-[12px] sm:text-[13px] leading-[158%] tracking-[0.02em] text-[rgba(235,234,250,0.5)]">
                  {activeAutomationsCount >= MAX_STRATEGIES ? 'Automation limit reached' : `${MAX_STRATEGIES - activeAutomationsCount} slots available.`}
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
