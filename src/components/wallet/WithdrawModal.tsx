import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Connection, PublicKey, Transaction, SystemProgram, LAMPORTS_PER_SOL } from '@solana/web3.js';
import { PlusCorner, SolanaIcon } from '../ui';
import { useAuth } from '../../hooks/useAuth';
import { config } from '../../config';

export function WithdrawModal({
  isOpen,
  onClose,
  balance,
}: {
  isOpen: boolean;
  onClose: () => void;
  balance: number | null;
}) {
  const { walletDetails } = useAuth();
  const [withdrawAmount, setWithdrawAmount] = useState('');
  const [destinationAddress, setDestinationAddress] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const availableBalance = balance ?? 0;

  const handleMaxClick = () => {
    const maxWithdraw = Math.max(0, availableBalance - 0.001);
    setWithdrawAmount(maxWithdraw.toString());
  };

  const handleWithdraw = async () => {
    if (!walletDetails?.address) {
      setError('Wallet not connected');
      return;
    }

    const amount = parseFloat(withdrawAmount);
    if (!amount || amount <= 0) {
      setError('Invalid amount');
      return;
    }

    if (amount > availableBalance - 0.001) {
      setError('Minimum 0.001 SOL must remain for fees');
      return;
    }

    if (!destinationAddress) {
      setError('Destination address required');
      return;
    }

    try {
      setIsLoading(true);
      setError(null);
      setSuccess(null);

      const connection = new Connection(config.solana.rpcEndpoint, config.solana.commitment);
      const toPublicKey = new PublicKey(destinationAddress);

      const transaction = new Transaction().add(
        SystemProgram.transfer({
          fromPubkey: new PublicKey(walletDetails.address),
          toPubkey: toPublicKey,
          lamports: Math.floor(amount * LAMPORTS_PER_SOL),
        })
      );

      const { blockhash, lastValidBlockHeight } = await connection.getLatestBlockhash('confirmed');
      transaction.recentBlockhash = blockhash;
      transaction.feePayer = new PublicKey(walletDetails.address);

      const serializedTx = transaction.serialize({
        requireAllSignatures: false,
        verifySignatures: false,
      });

      const signature = await connection.sendRawTransaction(serializedTx);

      await connection.confirmTransaction(
        { signature, blockhash, lastValidBlockHeight },
        'confirmed'
      );

      setSuccess(`Withdrawn! TX: ${signature.slice(0, 8)}...`);
      setWithdrawAmount('');
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Transaction failed';
      setError(message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
            onClick={onClose}
          />

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
              <div className="relative" style={{ background: '#03040f', borderRadius: '10px' }}>
                <div
                  className="flex items-center justify-between py-3 px-4"
                  style={{ background: 'rgba(30, 32, 61, 0.7)', borderRadius: '10px 10px 0 0' }}
                >
                  <h2 className="font-primary font-medium text-[18px] leading-[122%] tracking-[0.02em] text-[#ebeafa]">
                    Withdraw
                  </h2>
                  <button onClick={onClose} className="p-1 transition-all hover:opacity-70 active:scale-95">
                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                      <path d="M1 1L13 13M13 1L1 13" stroke="#EDEDFA" strokeWidth="1.5" strokeLinecap="round" />
                    </svg>
                  </button>
                </div>

                <div
                  className="relative p-4 py-[30px]"
                  style={{
                    borderRadius: '0 0 10px 10px',
                    background: '#070818',
                    backgroundImage: 'url(/assets/img/modalcover.png)',
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    margin: '0 12px 12px 12px',
                  }}
                >
                  <div className="relative" style={{ border: '1px solid rgba(235, 234, 250, 0.08)' }}>
                    <div className="relative flex items-stretch gap-4 mb-6">
                      <div className="relative p-[6px] flex items-stretch" style={{ background: 'rgba(30,32,61,0.9)' }}>
                        <div className="flex items-center gap-2 px-3 h-[32px]" style={{ background: 'rgba(7, 8, 24, 0.8)', borderRadius: '5px' }}>
                          <SolanaIcon size={24} />
                          <span className="font-primary text-sm font-bold leading-[183%] tracking-[0.03em] text-[#ebedff]">Solana</span>
                        </div>
                        <PlusCorner className="top-[-5px] left-[-5px]" />
                        <PlusCorner className="bottom-[-5px] left-[-5px]" />
                        <PlusCorner className="top-[-5px] right-[-5px]" />
                      </div>

                      <div className="relative flex gap-2 items-stretch px-[6px] py-[6px] w-full" style={{ background: 'rgba(30, 32, 61, 0.9)' }}>
                        <div className="flex items-center gap-2 px-3 h-[32px]" style={{ background: 'rgba(7, 8, 24, 0.8)', borderRadius: '5px' }}>
                          <span className="font-primary text-[10px] tracking-[0.03em] leading-[220%] text-[#ebeafa]">Balance:</span>
                        </div>
                        <div className="flex-1 text-right flex items-center justify-end px-3 h-[32px]" style={{ background: 'rgba(7,8,24, 0.8)', borderRadius: '5px' }}>
                          <span className="font-primary text-sm font-medium text-[#ebedff]">
                            {balance !== null ? `${balance.toFixed(4)} SOL` : 'Loading...'}
                          </span>
                        </div>
                        <PlusCorner className="bottom-[-5px] right-[-5px]" />
                        <PlusCorner className="bottom-[-5px] left-[-5px]" />
                        <PlusCorner className="top-[-5px] right-[-5px]" />
                      </div>
                    </div>

                    <div
                      className="relative px-3 pb-2 mb-[30px]"
                      style={{
                        borderTop: '1px solid rgba(235, 234, 250, 0.08)',
                        borderBottom: '1px solid rgba(235, 234, 250, 0.08)',
                        background: 'rgba(30, 32, 61, 0.9)',
                      }}
                    >
                      <PlusCorner className="top-[-5px] left-[-5px]" />
                      <PlusCorner className="bottom-[-5px] right-[-5px]" />

                      <div className="flex items-center justify-between">
                        <div>
                          <label className="font-primary text-[10px] text-[#ebeafa] block leading-[220%] tracking-[0.03em]">
                            Withdraw Amount
                          </label>
                          <div className="flex items-center w-full max-w-[190px] h-[22px]" style={{ background: 'rgba(12, 12, 31, 0.8)', borderRadius: '5px' }}>
                            <input
                              type="text"
                              value={withdrawAmount}
                              onChange={(e) => setWithdrawAmount(e.target.value)}
                              placeholder="0.00"
                              className="w-full bg-transparent px-1 font-primary text-sm text-[#ebedff] placeholder-[rgba(235,237,255,0.3)] outline-none"
                            />
                          </div>
                        </div>

                        <div className="flex flex-col items-end">
                          <button
                            type="button"
                            onClick={handleMaxClick}
                            className="font-primary text-[8px] font-black leading-[275%] tracking-[0.04em] text-[#ebeafa] cursor-pointer hover:text-[#848de8] transition-colors"
                          >
                            MAX
                          </button>
                          <div className="flex gap-1 items-center">
                            <SolanaIcon />
                            <span className="font-primary font-medium text-[22px] leading-[100%] tracking-[0.01em] text-[#ebeafa]">SOL</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div
                      className="relative p-[5px] mb-[50px] flex items-center"
                      style={{
                        borderTop: '1px solid rgba(235, 234, 250, 0.08)',
                        borderBottom: '1px solid rgba(235, 234, 250, 0.08)',
                        background: 'rgba(30, 32, 61, 0.9)',
                      }}
                    >
                      <PlusCorner className="top-[-5px] left-[-5px]" />
                      <PlusCorner className="bottom-[-5px] right-[-5px]" />
                      <PlusCorner className="top-[-5px] right-[-5px]" />
                      <PlusCorner className="bottom-[-5px] left-[-5px]" />

                      <div className="flex items-center w-full h-[22px]" style={{ background: 'rgba(16, 16, 36, 0.9)', borderRadius: '5px' }}>
                        <input
                          type="text"
                          value={destinationAddress}
                          onChange={(e) => setDestinationAddress(e.target.value)}
                          placeholder="Address: Address of destination wallet"
                          className="w-full bg-transparent px-1 font-primary text-sm text-[#fff] placeholder-[rgba(235,237,255,0.3)] outline-none"
                        />
                      </div>
                    </div>

                    <div className="relative" style={{ borderTop: '1px solid rgba(235, 234, 250, 0.08)', borderBottom: '1px solid rgba(235, 234, 250, 0.08)' }}>
                      <PlusCorner className="top-[-5px] left-[-5px]" />
                      <PlusCorner className="bottom-[-5px] right-[-5px]" />

                      {error && (
                        <div className="text-center py-2 text-red-400 font-primary text-xs">{error}</div>
                      )}
                      {success && (
                        <div className="text-center py-2 text-green-400 font-primary text-xs">{success}</div>
                      )}

                      <div className="relative flex justify-center p-[5px] w-fit mx-auto" style={{ background: 'rgba(30, 32, 61, 0.9)' }}>
                        <PlusCorner className="top-[-5px] left-[-5px]" />
                        <PlusCorner className="top-[-5px] right-[-5px]" />
                        <PlusCorner className="bottom-[-5px] left-[-5px]" />
                        <PlusCorner className="bottom-[-5px] right-[-5px]" />
                        <button
                          onClick={handleWithdraw}
                          disabled={isLoading}
                          className="relative px-12 p-[5px] font-primary text-[18px] font-semibold text-[#ebeafa] tracking-[0.02em] leading-[122%] transition-all hover:brightness-110 active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed"
                          style={{ background: '#111126', borderRadius: '5px' }}
                        >
                          {isLoading ? 'Processing...' : 'Withdraw'}
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
