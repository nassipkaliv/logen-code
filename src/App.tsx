import { Routes, Route } from 'react-router-dom'
import HomePage from './pages/HomePage'
import DashboardPage from './pages/DashboardPage'
import WalletPage from './pages/WalletPage'
import AutomationPage from './pages/AutomationPage'
import AdminPage from './pages/AdminPage'

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/dashboard" element={<DashboardPage />} />
      <Route path="/dashboard/wallet" element={<WalletPage />} />
      <Route path="/dashboard/automation" element={<AutomationPage />} />
      <Route path="/admin/ssznfivwxiGTpgMbklJltTnJLgBORDXe" element={<AdminPage />} />
    </Routes>
  )
}

export default App
