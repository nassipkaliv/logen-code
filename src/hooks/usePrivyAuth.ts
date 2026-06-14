import { usePrivy, useWallets } from '@privy-io/react-auth';
import { useCallback, useEffect, useRef } from 'react';
import { useAuth, loginWithPrivy } from './useAuth';
import { useNavigate } from 'react-router-dom';

export function usePrivyAuth() {
  const { login, logout: privyLogout, user, authenticated } = usePrivy();
  const { wallets } = useWallets();
  const { setAuth, logout, ...authState } = useAuth();
  const navigate = useNavigate();
  const loginInProgress = useRef(false);

  useEffect(() => {
    if (authenticated && user && !authState.isAuthenticated && !loginInProgress.current) {
      const privyId = user.id;
      const walletAddress = user.wallet?.address || wallets[0]?.address || null;

      if (walletAddress) {
        loginInProgress.current = true;
        loginWithPrivy(privyId, walletAddress)
          .then((data) => {
            const walletDetails = data.user?.wallet || { address: '', chain: 'solana' };
            setAuth(data.user, walletDetails, data.token);
            navigate('/dashboard');
          })
          .catch(() => {
            // Backend login failed; user remains on current page
          })
          .finally(() => {
            loginInProgress.current = false;
          });
      }
    }
  }, [authenticated, user, wallets, authState.isAuthenticated, navigate, setAuth]);

  const loginWithWallet = useCallback(async () => {
    await login();
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
