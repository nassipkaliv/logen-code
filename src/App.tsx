import { Routes, Route } from 'react-router-dom'
import HomePage from './pages/HomePage'
import DashboardPage from './pages/DashboardPage'
import WalletPage from './pages/WalletPage'
import AutomationPage from './pages/AutomationPage'

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/dashboard" element={<DashboardPage />} />
      <Route path="/dashboard/wallet" element={<WalletPage />} />
      <Route path="/dashboard/automation" element={<AutomationPage />} />
    </Routes>
  )
}

export default App
