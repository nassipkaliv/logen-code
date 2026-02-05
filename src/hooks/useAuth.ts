import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface WalletDetails {
  address: string;
  privateKey: string;
  chain: string;
}

interface User {
  id: string;
  wallet: {
    address: string;
    chain: string;
    type: string;
  };
}

interface AuthState {
  user: User | null;
  walletDetails: WalletDetails | null;
  token: string | null;
  isAuthenticated: boolean;
  setAuth: (user: User, walletDetails: WalletDetails, token: string) => void;
  logout: () => void;
}

export const useAuth = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      walletDetails: null,
      token: null,
      isAuthenticated: false,
      setAuth: (user, walletDetails, token) => {
        set({ user, walletDetails, token, isAuthenticated: true });
      },
      logout: () => {
        set({ user: null, walletDetails: null, token: null, isAuthenticated: false });
      },
    }),
    { name: 'auth-storage' }
  )
);

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001/api';

export async function loginWithPrivy(privyId: string, walletAddress: string) {
  const response = await fetch(`${API_URL}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ privyId, walletAddress }),
  });

  if (!response.ok) {
    throw new Error('Login failed');
  }

  return response.json();
}

export async function getWalletInfo(token: string) {
  const response = await fetch(`${API_URL}/wallet/info`, {
    headers: { Authorization: `Bearer ${token}` },
  });

  if (!response.ok) {
    throw new Error('Failed to get wallet info');
  }

  return response.json();
}

export async function getBalance(token: string) {
  const response = await fetch(`${API_URL}/wallet/balance`, {
    headers: { Authorization: `Bearer ${token}` },
  });

  if (!response.ok) {
    throw new Error('Failed to get balance');
  }

  return response.json();
}
