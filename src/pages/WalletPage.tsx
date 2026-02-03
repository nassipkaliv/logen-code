import { useState } from 'react'
import { DashboardLayout } from '../components/dashboard'
import { Corner, PlusCorner } from '../components/ui'
import { InputField, ActionButton, BalanceField, UsageRow, WithdrawModal } from '../components/wallet'

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
