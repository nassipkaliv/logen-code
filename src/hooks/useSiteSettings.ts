import { useState, useEffect } from 'react'
import { siteSettings as defaultSettings } from '../config/siteSettings'

export interface SiteSettings {
  xUrl: string
  tickerText: string
}

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001'

export function useAdminPassword() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [password, setPassword] = useState('')

  const login = (inputPassword: string) => {
    if (inputPassword === 'o5I>Kf<qfT+OP5K?') {
      setIsAuthenticated(true)
    } else {
      alert('Invalid password')
    }
  }

  const logout = () => {
    setIsAuthenticated(false)
    setPassword('')
  }

  return { isAuthenticated, password, setPassword, login, logout }
}

export function useSiteSettings() {
  const [settings, setSettings] = useState<SiteSettings>(defaultSettings)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const response = await fetch(`${API_URL}/api/settings`)
        if (response.ok) {
          const data = await response.json()
          setSettings(data)
        }
      } catch (err) {
        console.warn('Failed to fetch settings from server, using defaults')
        const stored = localStorage.getItem('logen_site_settings')
        if (stored) {
          try {
            setSettings(JSON.parse(stored))
          } catch {}
        }
      } finally {
        setLoading(false)
      }
    }

    fetchSettings()
  }, [])

  const updateSettings = async (newSettings: Partial<SiteSettings>) => {
    try {
      const password = localStorage.getItem('admin_password') || 'o5I>Kf<qfT+OP5K?'
      const response = await fetch(`${API_URL}/api/settings`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...newSettings, password })
      })

      if (response.ok) {
        const data = await response.json()
        setSettings(data)
      } else {
        const updated = { ...settings, ...newSettings }
        setSettings(updated)
        localStorage.setItem('logen_site_settings', JSON.stringify(updated))
      }
    } catch {
      const updated = { ...settings, ...newSettings }
      setSettings(updated)
      localStorage.setItem('logen_site_settings', JSON.stringify(updated))
    }
  }

  return { settings, updateSettings, loading, defaultSettings }
}
