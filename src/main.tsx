import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { PrivyProvider } from '@privy-io/react-auth'
import App from './App'
import './styles/index.css'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <PrivyProvider
      appId="cml7swmq300exl80cp3kuzdhp"
      config={{
        appearance: {
          accentColor: '#5d69d7',
          theme: '#02030e',
          showWalletLoginFirst: true,
          logo: 'https://image2url.com/r2/default/images/1769442822557-c99683d2-00ab-40bb-89f0-76c46bb30161.png',
          walletChainType: 'ethereum-and-solana' as const,
          walletList: [
            'phantom',
            'solflare',
            'metamask',
            'coinbase_wallet',
            'backpack'
          ]
        },
        embeddedWallets: {
          showWalletUIs: false
        }
      }}
    >
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </PrivyProvider>
  </StrictMode>,
)
