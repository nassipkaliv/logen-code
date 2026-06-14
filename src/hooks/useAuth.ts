import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { config } from '../config';

interface WalletDetails {
  address: string;
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

async function apiRequest<T>(path: string, options: RequestInit = {}): Promise<T> {
  const response = await fetch(`${config.api.url}${path}`, options);

  if (!response.ok) {
    const body = await response.json().catch(() => null);
    throw new Error(body?.error || `Request failed with status ${response.status}`);
  }

  return response.json();
}

export async function loginWithPrivy(privyId: string, walletAddress: string) {
  return apiRequest<{ user: User; walletDetails: WalletDetails; token: string }>('/auth/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ privyId, walletAddress }),
  });
}

export async function getWalletInfo(token: string) {
  return apiRequest<{ wallet: WalletDetails }>('/wallet/info', {
    headers: { Authorization: `Bearer ${token}` },
  });
}

export async function getBalance(token: string) {
  return apiRequest('/wallet/balance', {
    headers: { Authorization: `Bearer ${token}` },
  });
}
