import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
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

function InputField({
  label,
  value,
  hiddenValue,
  icon,
  highlight = false,
}: {
  label: string
  value: string
  hiddenValue?: string
  icon: 'copy' | 'eye'
  highlight?: boolean
}) {
  const [isRevealed, setIsRevealed] = useState(false)
  const [copied, setCopied] = useState(false)

  const handleCopy = async () => {
    await navigator.clipboard.writeText(value)
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

function ActionButton({
  children,
  variant,
  onClick,
}: {
  children: React.ReactNode
  variant: 'deposit' | 'withdraw'
  onClick?: () => void
}) {
  const isDeposit = variant === 'deposit'
  const textColor = isDeposit ? '#5fffd7' : '#c73434'
  const cornerColor = isDeposit ? '#5FFFD7' : '#C73434'

  return (
    <button
      onClick={onClick}
      className="relative px-3 py-2 font-primary text-xs sm:text-sm font-medium leading-[143%] tracking-[0.01em] transition-transform active:scale-95"
      style={{
        color: textColor,
        border: '1px solid rgba(215, 218, 255, 0.12)',
        backdropFilter: 'blur(100px)',
        boxShadow: isDeposit
          ? 'inset 0 1px 1px 0 rgba(95, 255, 215, 0.2), inset 0 0 12px 0 rgba(95, 255, 215, 0.08), inset 0 0 8px 0 rgba(95, 255, 215, 0.06), inset 0 0 20px 0 rgba(95, 255, 215, 0.12), inset 0 12px 20px 0 rgba(95, 255, 215, 0.06)'
          : 'inset 0 1px 1px 0 rgba(199, 52, 52, 0.2), inset 0 0 12px 0 rgba(199, 52, 52, 0.08), inset 0 0 8px 0 rgba(199, 52, 52, 0.06), inset 0 0 20px 0 rgba(199, 52, 52, 0.12), inset 0 12px 20px 0 rgba(199, 52, 52, 0.06)',
        background: isDeposit ? 'rgba(95, 255, 215, 0.04)' : 'rgba(199, 52, 52, 0.04)',
      }}
    >
      <Corner className="top-0 left-0" color={cornerColor} />
      <Corner className="top-0 right-0 rotate-90" color={cornerColor} />
      <Corner className="bottom-0 right-0 rotate-180" color={cornerColor} />
      <Corner className="bottom-0 left-0 -rotate-90" color={cornerColor} />
      {children}
    </button>
  )
}

function BalanceField({
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

function UsageRow({
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

function SolanaIcon({ size = 24 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <path d="M5.17 14.34a.5.5 0 01.36-.15h12.95a.25.25 0 01.18.43l-2.49 2.52a.5.5 0 01-.36.15H2.86a.25.25 0 01-.18-.43l2.49-2.52z" fill="#EBEDFF"/>
      <path d="M5.17 6.71a.51.51 0 01.36-.15h12.95a.25.25 0 01.18.43l-2.49 2.52a.5.5 0 01-.36.15H2.86a.25.25 0 01-.18-.43l2.49-2.52z" fill="#EBEDFF"/>
      <path d="M18.83 10.49a.5.5 0 00-.36-.15H5.52a.25.25 0 00-.18.43l2.49 2.52a.5.5 0 00.36.15h12.95a.25.25 0 00.18-.43l-2.49-2.52z" fill="#EBEDFF"/>
    </svg>
  )
}

function WithdrawModal({
  isOpen,
  onClose,
}: {
  isOpen: boolean
  onClose: () => void
}) {
  const [withdrawAmount, setWithdrawAmount] = useState('')
  const [destinationAddress, setDestinationAddress] = useState('')
  const availableBalance = '12.5432'

  const handleMaxClick = () => {
    setWithdrawAmount(availableBalance)
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
            onClick={onClose}
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.25, ease: 'easeOut' }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            onClick={onClose}
          >
            <motion.div
              initial={{ y: 20 }}
              animate={{ y: 0 }}
              exit={{ y: 20 }}
              className="w-full max-w-[420px]"
              onClick={(e) => e.stopPropagation()}
            >
            <div
              className="relative"
              style={{
                background: '#03040f',
                borderRadius: '10px',
              }}
            >
              {/* Header */}
              <div
                className="flex items-center justify-between py-3 px-4"
                style={{
                  background: 'rgba(30, 32, 61, 0.7)',
                  borderRadius: '10px 10px 0 0',
                }}
              >
                <h2 className="font-primary font-medium text-[18px] leading-[122%] tracking-[0.02em] text-[#ebeafa]">
                  Withdraw
                </h2>
                <button
                  onClick={onClose}
                  className="p-1 transition-all hover:opacity-70 active:scale-95"
                >
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                    <path d="M1 1L13 13M13 1L1 13" stroke="#EDEDFA" strokeWidth="1.5" strokeLinecap="round" />
                  </svg>
                </button>
              </div>

              {/* Inner container */}
              <div
                className="relative p-4"
                style={{
                  borderRadius: '0 0 10px 10px',
                  background: '#070818',
                  margin: '0 12px 12px 12px',
                }}
              >
                {/* Content area with border lines */}
                <div
                  className="relative"
                  style={{
                    border: '1px solid rgba(235, 234, 250, 0.08)',
                    padding: '16px',
                  }}
                >
                  {/* Plus corners on content border */}
                  <PlusCorner className="top-[-6px] left-[-6px]" />
                  <PlusCorner className="top-[-6px] right-[-6px]" />
                  <PlusCorner className="bottom-[-6px] left-[-6px]" />
                  <PlusCorner className="bottom-[-6px] right-[-6px]" />

                {/* Token selector row */}
                <div className="relative flex items-center gap-2 mb-6">

                  {/* Solana button */}
                  <div
                    className="flex items-center gap-2 px-3 py-2"
                    style={{
                      background: 'rgba(132, 141, 232, 0.08)',
                      border: '1px solid rgba(132, 141, 232, 0.2)',
                      borderRadius: '6px',
                    }}
                  >
                    <SolanaIcon size={20} />
                    <span className="font-primary text-sm font-medium text-[#ebedff]">Solana</span>
                  </div>

                  {/* Balance label */}
                  <span className="font-primary text-sm text-[rgba(235,237,255,0.5)]">Balance:</span>

                  {/* Balance value */}
                  <div
                    className="flex-1 text-right px-3 py-2"
                    style={{
                      background: 'rgba(132, 141, 232, 0.02)',
                      border: '1px solid rgba(132, 141, 232, 0.1)',
                      borderRadius: '6px',
                    }}
                  >
                    <span className="font-primary text-sm font-medium text-[#ebedff]">XX.XX SOL</span>
                  </div>

                  <PlusCorner className="bottom-[-5px] left-[-5px]" />
                  <PlusCorner className="bottom-[-5px] right-[-5px]" />
                </div>

                {/* Withdraw Amount */}
                <div className="relative mb-6">
                  <PlusCorner className="top-[-5px] left-[-5px]" />
                  <PlusCorner className="bottom-[-5px] right-[-5px]" />

                  <label className="font-primary text-sm text-[rgba(235,237,255,0.7)] mb-2 block">
                    Withdraw Amount
                  </label>
                  <div className="flex items-center gap-4">
                    <div
                      className="flex-1"
                      style={{
                        background: 'rgba(132, 141, 232, 0.02)',
                        border: '1px solid rgba(132, 141, 232, 0.1)',
                        borderRadius: '6px',
                      }}
                    >
                      <input
                        type="text"
                        value={withdrawAmount}
                        onChange={(e) => setWithdrawAmount(e.target.value)}
                        placeholder="0.00"
                        className="w-full bg-transparent px-3 py-2.5 font-primary text-sm text-[#ebedff] placeholder-[rgba(235,237,255,0.3)] outline-none"
                      />
                    </div>
                    <div className="flex items-center gap-3">
                      <button
                        onClick={handleMaxClick}
                        className="font-primary text-xs font-medium text-[#848DE8] hover:text-[#a5abf0] transition-colors"
                      >
                        MAX
                      </button>
                      <div className="flex items-center gap-1.5">
                        <SolanaIcon size={20} />
                        <span className="font-primary text-sm font-medium text-[#ebedff]">SOL</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Destination Address */}
                <div className="relative mb-8">
                  <PlusCorner className="top-[-5px] left-[-5px]" />
                  <PlusCorner className="bottom-[-5px] right-[-5px]" />

                  <div
                    style={{
                      background: 'rgba(132, 141, 232, 0.02)',
                      border: '1px solid rgba(132, 141, 232, 0.1)',
                      borderRadius: '6px',
                    }}
                  >
                    <input
                      type="text"
                      value={destinationAddress}
                      onChange={(e) => setDestinationAddress(e.target.value)}
                      placeholder="Address: Address of destination wallet"
                      className="w-full bg-transparent px-3 py-3 font-primary text-sm text-[#ebedff] placeholder-[rgba(235,237,255,0.4)] outline-none"
                    />
                  </div>
                </div>

                {/* Withdraw Button */}
                <div className="relative flex justify-center">
                  <PlusCorner className="top-[-5px] left-[-5px]" />
                  <PlusCorner className="top-[-5px] right-[-5px]" />
                  <PlusCorner className="bottom-[-5px] left-[-5px]" />
                  <PlusCorner className="bottom-[-5px] right-[-5px]" />

                  <button
                    className="relative px-16 py-3 font-primary text-base font-medium text-[#ebedff] tracking-[0.02em] transition-all hover:brightness-110 active:scale-[0.98]"
                    style={{
                      background: 'rgba(132, 141, 232, 0.08)',
                      border: '1px solid rgba(132, 141, 232, 0.2)',
                      borderRadius: '6px',
                    }}
                  >
                    <Corner className="top-0 left-0" />
                    <Corner className="top-0 right-0 rotate-90" />
                    <Corner className="bottom-0 right-0 rotate-180" />
                    <Corner className="bottom-0 left-0 -rotate-90" />
                    Withdraw
                  </button>
                </div>
                </div>
              </div>
            </div>
            </motion.div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}

export default function WalletPage() {
  const [highlightPublicKey, setHighlightPublicKey] = useState(false)
  const [isWithdrawModalOpen, setIsWithdrawModalOpen] = useState(false)

  const handleDeposit = () => {
    setHighlightPublicKey(true)
    setTimeout(() => setHighlightPublicKey(false), 2000)
  }

  const handleWithdraw = () => {
    setIsWithdrawModalOpen(true)
  }

  return (
    <DashboardLayout>
      <WithdrawModal
        isOpen={isWithdrawModalOpen}
        onClose={() => setIsWithdrawModalOpen(false)}
      />
      <div className="mx-4 sm:mx-6 md:mx-[40px] pt-6 sm:pt-8 md:pt-10 pb-0">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-10">
          {/* Left column */}
          <div className="relative">
            {/* Vertical divider line - hidden on mobile */}
            <div className="hidden lg:block absolute right-0 top-[-40px] bottom-0 w-[1px] bg-[rgba(235,234,250,0.08)]" />
            <div className="absolute top-0 left-0 right-0 h-[1px] bg-[rgba(235,234,250,0.08)]" />

            <PlusCorner className="hidden sm:block top-[-5px] right-[-5px]" />

            {/* Internal Solana Wallet */}
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

              <h2 className="font-primary text-base sm:text-lg font-medium text-[#ededff] mb-1 tracking-[0.01em]">
                Internal Solana Wallet
              </h2>
              <p className="font-primary text-xs sm:text-sm text-[rgba(235,234,250,0.5)] mb-4 sm:mb-[26px] tracking-[0.02em]">
                Used for automation and execution
              </p>

              <div className="flex flex-col sm:flex-row gap-3 sm:gap-[15px] mb-3 sm:mb-[15px]">
                <InputField label="Public Key:" value="9AxKm7...Qp2L" icon="copy" highlight={highlightPublicKey} />
                <InputField label="Private Key:" value="5KxP9...mN3v" hiddenValue="••••••••••••••" icon="eye" />
              </div>

              <div className="mb-4 sm:mb-5">
                <span className="font-primary leading-[156%] text-xs sm:text-sm text-[rgba(235,234,250,0.5)]">Network: </span>
                <span className="font-primary leading-[156%] font-medium text-xs sm:text-sm text-[#ededf8]">Solana</span>
              </div>

              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 mb-4 sm:mb-6">
                <BalanceField label="Available Balance:" value="XX.XX" />
                <BalanceField label="Locked in strategies:" value="XX.XX" />
              </div>

              <div className="flex gap-3">
                <ActionButton variant="deposit" onClick={handleDeposit}>Deposit</ActionButton>
                <ActionButton variant="withdraw" onClick={handleWithdraw}>Withdraw</ActionButton>
              </div>
            </div>

            {/* Automation Usage Indicator */}
            <div className="relative mt-6 sm:mt-[40px]">
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
                <PlusCorner className="hidden sm:block bottom-[-5px] right-[-5px]" />

                <h2 className="font-primary text-base sm:text-lg font-medium text-[#ededff] mb-4 sm:mb-5 tracking-[0.01em]">
                  Automation Usage Indicator
                </h2>

                <div
                  className="relative p-3 sm:p-[15px]"
                  style={{
                    backdropFilter: 'blur(10px)',
                    boxShadow: 'inset 0 1px 1px 0 rgba(132, 141, 232, 0.2), inset 0 0 8px 0 rgba(132, 141, 232, 0.06), inset 0 -1px 1px 0 rgba(132, 141, 232, 0.2)',
                    background: 'rgba(132, 141, 232, 0.02)',
                  }}
                >
                  <Corner className="top-0 left-0" />
                  <Corner className="bottom-0 right-0 rotate-180" />

                  <div className="flex flex-col gap-3 sm:gap-[15px]">
                    <UsageRow label="Funds in automation:" value="65%" />
                    <UsageRow label="Free balance:" value="35%" />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right column - Wallet illustration */}
          <div
            className="relative"
            style={{
              borderLeft: '1px solid rgba(235, 234, 250, 0.08)',
              borderRight: '1px solid rgba(235, 234, 250, 0.08)',
              borderTop: '1px solid rgba(235, 234, 250, 0.08)',
              background: 'linear-gradient(180deg, rgba(132, 141, 232, 0) 0%, rgba(132, 141, 232, 0.02) 100%)',
            }}
          >
            <PlusCorner className="hidden sm:block top-[-5px] left-[-5px]" />
            <PlusCorner className="hidden sm:block bottom-[-5px] left-[-5px]" />

            <div className="flex justify-center">
              <img
                src="/assets/img/walletbg.png"
                alt="Wallet illustration"
                className="w-full"
              />
            </div>

            {/* Text section */}
            <div className="relative pb-6 sm:pb-[40px]">
              <div className="absolute top-0 left-0 right-0 h-[1px] bg-[rgba(235,234,250,0.08)]" />
              <div className="hidden sm:block absolute bottom-[40px] left-0 right-0 h-[1px] bg-[rgba(235,234,250,0.08)]" />
              <div className="absolute bottom-0 left-0 right-0 h-[1px] bg-[rgba(235,234,250,0.08)]" />

              <PlusCorner className="hidden sm:block top-[-5px] left-[-7px]" />
              <PlusCorner className="hidden sm:block top-[-5px] right-[-7px]" />
              <PlusCorner className="hidden sm:block bottom-[-5px] right-[-5px]" />

              <div className="relative max-w-[410px] mx-auto px-4 sm:px-0 pt-4 pb-4">
                {/* Info Hint badge */}
                <div className="absolute left-1/2 -translate-x-1/2 -top-8 sm:-top-12 z-10">
                  <div
                    className="relative inline-block px-2 sm:px-3 py-1.5 sm:py-2 font-primary text-xs sm:text-sm font-medium text-[#ebedff] leading-[143%] tracking-[0.01em]"
                    style={{
                      border: '1px solid rgba(215, 218, 255, 0.12)',
                      backdropFilter: 'blur(150px)',
                      boxShadow: 'inset 0 1px 1px 0 rgba(132, 141, 232, 0.2), inset 0 0 12px 0 rgba(132, 141, 232, 0.08)',
                      background: '#030410',
                    }}
                  >
                    <Corner className="top-0 left-0" color="#848DE8" />
                    <Corner className="top-0 right-0 rotate-90" color="#848DE8" />
                    <Corner className="bottom-0 right-0 rotate-180" color="#848DE8" />
                    <Corner className="bottom-0 left-0 -rotate-90" color="#848DE8" />
                    Info Hint
                  </div>
                </div>

                {/* Vertical lines - hidden on mobile */}
                <div className="hidden sm:block absolute left-0 -top-9 -bottom-6 w-[1px] bg-[rgba(235,234,250,0.08)]" />
                <div className="hidden sm:block absolute right-0 -top-9 -bottom-6 w-[1px] bg-[rgba(235,234,250,0.08)]" />
                <div className="hidden sm:block absolute top-0 left-0 right-0 h-[1px] bg-[rgba(235,234,250,0.08)]" />

                <PlusCorner className="hidden sm:block bottom-[-5px] left-[-5px]" />
                <PlusCorner className="hidden sm:block bottom-[-5px] right-[-5px]" />

                <h2
                  className="font-primary text-xl sm:text-2xl md:text-3xl lg:text-[40px] font-medium leading-[110%] text-center"
                  style={{
                    background: 'linear-gradient(180deg, #ebeafa 0%, rgba(237, 237, 249, 0.7) 100%)',
                    backgroundClip: 'text',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                  }}
                >
                  This wallet is used by <br/>
                  Logen to execute <br/>
                  your automated<br/>
                  strategies
                </h2>
              </div>
            </div>
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
