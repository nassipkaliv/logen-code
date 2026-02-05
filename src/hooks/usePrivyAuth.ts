import { usePrivy, useWallets } from '@privy-io/react-auth';
import { useCallback, useEffect } from 'react';
import { useAuth, loginWithPrivy } from './useAuth';
import { useNavigate } from 'react-router-dom';

export function usePrivyAuth() {
  const { login, logout: privyLogout, user, authenticated } = usePrivy();
  const { wallets } = useWallets();
  const { setAuth, logout, ...authState } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (authenticated && user && !authState.isAuthenticated) {
      const privyId = user.id;
      const walletAddress = user.wallet?.address ||
                           wallets[0]?.address ||
                           null;
      
      if (walletAddress) {
        loginWithPrivy(privyId, walletAddress).then((data) => {
          setAuth(data.user, data.walletDetails, data.token);
          navigate('/dashboard');
        }).catch((err) => {
          console.error('Backend error:', err);
        });
      }
    }
  }, [authenticated, user, wallets, authState.isAuthenticated, navigate]);

  const loginWithWallet = useCallback(async () => {
    try {
      await login();
    } catch (error) {
      console.error('Login error:', error);
      throw error;
    }
  }, [login]);

  const logoutAll = useCallback(async () => {
    if (authenticated) {
      await privyLogout();
    }
    logout();
    navigate('/');
  }, [privyLogout, logout, authenticated, navigate]);

  return {
    loginWithWallet,
    logout: logoutAll,
    user,
    isAuthenticated: authenticated,
  };
}
