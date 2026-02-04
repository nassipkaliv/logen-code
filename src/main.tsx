import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { PrivyProvider } from '@privy-io/react-auth'
import App from './App'
import './styles/index.css'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <PrivyProvider
      appId="cmkuwbzoc00irl80c7ibl05bs"
      config={{
        appearance: {
          accentColor: '#5d69d7',
          theme: '#02030e',
          showWalletLoginFirst: true,
          logo: 'https://image2url.com/r2/default/images/1769442822557-c99683d2-00ab-40bb-89f0-76c46bb30161.png',
          walletChainType: 'ethereum-and-solana',
          walletList: [
            'detected_solana_wallets',
            'detected_ethereum_wallets',
            'phantom',
            'solflare',
            'backpack',
            'metamask',
            'coinbase_wallet',
            'base_account',
            'rainbow',
            'okx_wallet',
            'wallet_connect'
          ]
        },
        fundingMethodConfig: {
          moonpay: {
            useSandbox: true
          }
        },
        embeddedWallets: {
          showWalletUIs: true,
          ethereum: {
            createOnLogin: 'off'
          },
          solana: {
            createOnLogin: 'all-users'
          }
        },
        mfa: {
          noPromptOnMfaRequired: false
        }
      }}
    >
      <BrowserRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
        <App />
      </BrowserRouter>
    </PrivyProvider>
  </StrictMode>,
)

