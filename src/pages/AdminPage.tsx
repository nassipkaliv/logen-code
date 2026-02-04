import { useState, useEffect } from 'react'
import { useSiteSettings, useAdminPassword } from '../hooks/useSiteSettings'
import { DashboardLayout } from '../components/dashboard'
import { PlusCorner } from '../components/ui'

// Corner decoration component
function BlockCorner({ className }: { className?: string }) {
  return (
    <svg
      width="6"
      height="6"
      viewBox="0 0 6 6"
      fill="none"
      className={`absolute ${className}`}
    >
      <rect width="1" height="6" fill="#848DE8" />
      <rect width="6" height="1" fill="#848DE8" />
    </svg>
  )
}

function AdminInput({ 
  label, 
  value, 
  onChange,
  placeholder 
}: { 
  label: string
  value: string
  onChange: (v: string) => void
  placeholder?: string
}) {
  return (
    <div className="mb-4">
      <label className="font-primary text-xs sm:text-sm text-[rgba(235,234,250,0.7)] mb-2 block">
        {label}
      </label>
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full px-3 py-2 font-primary text-sm text-white bg-[rgba(132,141,232,0.1)] border border-[rgba(132,141,232,0.3)] rounded focus:outline-none focus:border-[#848DE8] transition-colors"
      />
    </div>
  )
}

function SaveButton({ onClick, saving }: { onClick: () => void, saving: boolean }) {
  return (
    <button
      onClick={onClick}
      disabled={saving}
      className="relative px-6 py-2 font-primary text-sm font-medium text-white border border-[#848DE8] rounded hover:bg-[rgba(132,141,232,0.2)] transition-colors disabled:opacity-50"
      style={{
        boxShadow: 'inset 0 1px 1px 0 rgba(132, 141, 232, 0.3), inset 0 0 12px 0 rgba(132, 141, 232, 0.15)',
        background: 'rgba(132, 141, 232, 0.15)',
      }}
    >
      <BlockCorner className="top-0 left-0" />
      <BlockCorner className="top-0 right-0 rotate-90" />
      <BlockCorner className="bottom-0 right-0 rotate-180" />
      <BlockCorner className="bottom-0 left-0 -rotate-90" />
      {saving ? 'Saving...' : 'Save Changes'}
    </button>
  )
}

export default function AdminPage() {
  const { settings, updateSettings, defaultSettings } = useSiteSettings()
  const { isAuthenticated, password, setPassword, login, logout } = useAdminPassword()
  const [saving, setSaving] = useState(false)
  const [saved, setSaved] = useState(false)

  const [formData, setFormData] = useState(settings)

  // Sync formData when settings load
  useEffect(() => {
    setFormData(settings)
  }, [settings])

  const handleSave = async () => {
    setSaving(true)
    // Save password to localStorage for API calls
    localStorage.setItem('admin_password', password)
    await updateSettings(formData)
    setSaving(false)
    setSaved(true)
    setTimeout(() => setSaved(false), 2000)
  }

  const handleReset = () => {
    setFormData(defaultSettings)
  }

  // Login form
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#02030e]">
        <div
          className="relative p-6 sm:p-8 mx-4"
          style={{
            border: '1px solid rgba(132, 141, 232, 0.3)',
            background: 'linear-gradient(180deg, rgba(132, 141, 232, 0.05) 0%, rgba(132, 141, 232, 0.02) 100%)',
          }}
        >
          <PlusCorner className="hidden sm:block top-[-5px] right-[-5px]" />
          <PlusCorner className="hidden sm:block bottom-[-5px] left-[-5px]" />

          <h1 className="font-primary text-xl sm:text-2xl font-medium text-white mb-6 text-center">
            Admin Login
          </h1>

          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter password"
            className="w-full px-4 py-3 font-primary text-sm text-white bg-[rgba(132,141,232,0.1)] border border-[rgba(132,141,232,0.3)] rounded mb-4 focus:outline-none focus:border-[#848DE8] transition-colors"
            onKeyDown={(e) => e.key === 'Enter' && login(password)}
          />

          <button
            onClick={() => login(password)}
            className="w-full px-6 py-3 font-primary text-sm font-medium text-white border border-[#848DE8] rounded hover:bg-[rgba(132,141,232,0.2)] transition-colors"
            style={{
              boxShadow: 'inset 0 1px 1px 0 rgba(132, 141, 232, 0.3)',
              background: 'rgba(132, 141, 232, 0.15)',
            }}
          >
            Login
          </button>

          <p className="mt-4 text-xs text-center text-[rgba(235,234,250,0.5)]">
            Default password: admin123
          </p>
        </div>
      </div>
    )
  }

  return (
    <DashboardLayout>
      <div className="mx-4 sm:mx-6 md:mx-[40px] pt-6 sm:pt-8 md:pt-10 pb-0">
        <div className="flex items-center justify-between mb-6">
          <h1 className="font-primary text-xl sm:text-2xl font-medium text-white">
            Site Settings
          </h1>
          <button
            onClick={logout}
            className="px-4 py-2 font-primary text-xs sm:text-sm text-[#ff587a] border border-[#ff587a] rounded hover:bg-[rgba(255,88,122,0.1)] transition-colors"
          >
            Logout
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-10">
          {/* Settings Form */}
          <div
            className="relative p-4 sm:p-5"
            style={{
              borderTop: '1px solid rgba(235, 234, 250, 0.08)',
              background: 'linear-gradient(180deg, rgba(132, 141, 232, 0) 0%, rgba(132, 141, 232, 0.04) 100%)',
            }}
          >
            <PlusCorner className="hidden sm:block top-[-5px] right-[-5px]" />
            <PlusCorner className="hidden sm:block bottom-[-5px] right-[-5px]" />
            <PlusCorner className="hidden sm:block bottom-[-5px] left-[-5px]" />

            <h2 className="font-primary text-base sm:text-lg font-medium text-[#ededff] mb-4 sm:mb-6 tracking-[0.01em]">
              Configuration
            </h2>

            <AdminInput
              label="X (Twitter) Account URL:"
              value={formData.xUrl}
              onChange={(v) => setFormData({ ...formData, xUrl: v })}
              placeholder="https://x.com/youraccount"
            />

            <AdminInput
              label="Ticker Bar Text:"
              value={formData.tickerText}
              onChange={(v) => setFormData({ ...formData, tickerText: v })}
              placeholder="Your custom message..."
            />

            <div className="flex gap-3 mt-6">
              <SaveButton onClick={handleSave} saving={saving} />
              <button
                onClick={handleReset}
                className="px-4 py-2 font-primary text-xs sm:text-sm text-[rgba(235,234,250,0.7)] border border-[rgba(235,234,250,0.2)] rounded hover:text-white hover:border-[rgba(235,234,250,0.5)] transition-colors"
              >
                Reset to Default
              </button>
            </div>

            {saved && (
              <div className="mt-4 p-2 bg-[rgba(95,255,215,0.1)] border border-[rgba(95,255,215,0.3)] rounded text-[#5fffd7] text-sm text-center">
                Settings saved successfully!
              </div>
            )}
          </div>

          {/* Preview */}
          <div
            className="relative p-4 sm:p-5"
            style={{
              borderLeft: '1px solid rgba(235, 234, 250, 0.08)',
              borderRight: '1px solid rgba(235, 234, 250, 0.08)',
              borderTop: '1px solid rgba(235, 234, 250, 0.08)',
              background: 'linear-gradient(180deg, rgba(132, 141, 232, 0) 0%, rgba(132, 141, 232, 0.02) 100%)',
            }}
          >
            <PlusCorner className="hidden sm:block top-[-5px] left-[-5px]" />
            <PlusCorner className="hidden sm:block bottom-[-5px] right-[-5px]" />

            <h2 className="font-primary text-base sm:text-lg font-medium text-[#ededff] mb-4 sm:mb-6 tracking-[0.01em]">
              Preview
            </h2>

            <div className="space-y-4">
              <div className="p-3 bg-[rgba(132,141,232,0.1)] rounded border border-[rgba(132,141,232,0.2)]">
                <span className="text-xs text-[rgba(235,234,250,0.5)]">X URL:</span>
                <div className="text-sm text-[#848DE8] truncate">{formData.xUrl || 'Not set'}</div>
              </div>

              <div className="p-3 bg-[rgba(132,141,232,0.1)] rounded border border-[rgba(132,141,232,0.2)]">
                <span className="text-xs text-[rgba(235,234,250,0.5)]">Ticker Text:</span>
                <div className="text-sm text-white">{formData.tickerText || 'Not set'}</div>
              </div>
            </div>
          </div>
        </div>

        {/* Current Values on Site */}
        <div className="mt-8">
          <h2 className="font-primary text-lg font-medium text-white mb-4">
            Current Site Values
          </h2>
          
          <div
            className="relative p-4"
            style={{
              borderLeft: '1px solid rgba(235, 234, 250, 0.08)',
              borderRight: '1px solid rgba(235, 234, 250, 0.08)',
              borderTop: '1px solid rgba(235, 234, 250, 0.08)',
              background: 'linear-gradient(180deg, rgba(132, 141, 232, 0) 0%, rgba(132, 141, 232, 0.02) 100%)',
            }}
          >
            <PlusCorner className="hidden sm:block top-[-5px] left-[-5px]" />
            <PlusCorner className="hidden sm:block bottom-[-5px] left-[-5px]" />
            <PlusCorner className="hidden sm:block bottom-[-5px] right-[-5px]" />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <span className="text-xs text-[rgba(235,234,250,0.5)]">X URL (in Header & Footer):</span>
                <a 
                  href={settings.xUrl} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-sm text-[#848DE8] hover:underline break-all"
                >
                  {settings.xUrl}
                </a>
              </div>
              <div>
                <span className="text-xs text-[rgba(235,234,250,0.5)]">Ticker Bar Text:</span>
                <div className="text-sm text-white">{settings.tickerText}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  )
}
