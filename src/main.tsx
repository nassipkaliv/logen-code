import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { PrivyProvider } from '@privy-io/react-auth';
import { toSolanaWalletConnectors } from '@privy-io/react-auth/solana';
import { ErrorBoundary } from './components/ErrorBoundary';
import App from './App';
import './styles/index.css';

const SUPPRESSED = [
  'Cannot redefine property: solana',
  'Invalid JSON message received',
  'manifest.json',
  'Download the React DevTools',
  'Feature is disabled',
];

if (import.meta.env.DEV) {
  const origError = console.error;
  const origWarn = console.warn;
  console.error = (...args: unknown[]) => {
    const msg = String(args[0] ?? '');
    if (SUPPRESSED.some((s) => msg.includes(s))) return;
    origError(...args);
  };
  console.warn = (...args: unknown[]) => {
    const msg = String(args[0] ?? '');
    if (SUPPRESSED.some((s) => msg.includes(s))) return;
    origWarn(...args);
  };
}

const PRIVY_APP_ID = import.meta.env.VITE_PRIVY_APP_ID;
if (!PRIVY_APP_ID) {
  throw new Error('VITE_PRIVY_APP_ID environment variable is required');
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ErrorBoundary>
      <PrivyProvider
        appId={PRIVY_APP_ID}
        config={{
          appearance: {
            accentColor: '#5d69d7',
            theme: '#02030e',
            showWalletLoginFirst: true,
            logo: undefined,
            walletChainType: 'solana-only' as const,
            walletList: ['phantom', 'solflare', 'backpack', 'okx_wallet'],
          },
          loginMethods: ['wallet'],
          fundingMethodConfig: {
            moonpay: { useSandbox: true },
          },
          embeddedWallets: {
            showWalletUIs: true,
            ethereum: { createOnLogin: 'off' },
            solana: { createOnLogin: 'users-without-wallets' },
          },
          mfa: { noPromptOnMfaRequired: false },
          externalWallets: {
            solana: { connectors: toSolanaWalletConnectors() },
          },
        }}
      >
        <BrowserRouter
          future={{
            v7_startTransition: true,
            v7_relativeSplatPath: true,
          }}
        >
          <App />
        </BrowserRouter>
      </PrivyProvider>
    </ErrorBoundary>
  </StrictMode>,
);
