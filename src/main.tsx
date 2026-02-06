import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { PrivyProvider } from '@privy-io/react-auth'
import { toSolanaWalletConnectors } from '@privy-io/react-auth/solana'
import App from './App'
import './styles/index.css'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <PrivyProvider
      appId="cml8bwk6j00fxkw0bazrr0enp"
      config={{
        appearance: {
          accentColor: '#5d69d7',
          theme: '#02030e',
          showWalletLoginFirst: false,
          logo: 'https://image2url.com/r2/default/images/1770408036138-896d9876-4857-4987-9051-4c703225ca08.png',
          walletChainType: 'solana-only' as const,
          walletList: [
            'phantom',
            'solflare',
            'backpack',
            'okx_wallet'
          ]
        },
        loginMethods: [
          'wallet'
        ],
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
            createOnLogin: 'users-without-wallets'
          }
        },
        mfa: {
          noPromptOnMfaRequired: false
        },
        externalWallets: {
          solana: {
            connectors: toSolanaWalletConnectors()
          }
        }
      }}
    >
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </PrivyProvider>
  </StrictMode>,
)
