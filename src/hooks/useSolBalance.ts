import { useState, useEffect, useCallback } from 'react';
import { Connection, PublicKey, LAMPORTS_PER_SOL } from '@solana/web3.js';
import { config } from '../config';

interface UseSolBalanceResult {
  balance: number | null;
  loading: boolean;
  error: string | null;
  refetch: () => void;
}

export function useSolBalance(address: string | undefined): UseSolBalanceResult {
  const [balance, setBalance] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchBalance = useCallback(async () => {
    if (!address) {
      setBalance(null);
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const connection = new Connection(config.solana.rpcEndpoint, config.solana.commitment);
      const publicKey = new PublicKey(address);

      const lamports = await Promise.race([
        connection.getBalance(publicKey),
        new Promise<never>((_, reject) =>
          setTimeout(() => reject(new Error('RPC request timed out')), config.solana.rpcTimeoutMs)
        ),
      ]);

      setBalance(lamports / LAMPORTS_PER_SOL);
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to fetch balance';
      setError(message);
      setBalance(null);
    } finally {
      setLoading(false);
    }
  }, [address]);

  useEffect(() => {
    fetchBalance();
  }, [fetchBalance]);

  return { balance, loading, error, refetch: fetchBalance };
}
