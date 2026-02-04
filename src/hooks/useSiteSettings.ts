import { useState, useEffect } from 'react'
import { siteSettings as defaultSettings } from '../config/siteSettings'

export interface SiteSettings {
  xUrl: string
  tickerText: string
}

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001'

// Hook for admin password management (client-side only)
export function useAdminPassword() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [password, setPassword] = useState('')

  const login = (inputPassword: string) => {
    if (inputPassword === 'admin123') {
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

  // Загружаем настройки с сервера
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
        // Если сервер недоступен, используем defaults из localStorage или config
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
      // Сначала пробуем обновить на сервере
      const password = localStorage.getItem('admin_password') || 'admin123'
      const response = await fetch(`${API_URL}/api/settings`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...newSettings, password })
      })

      if (response.ok) {
        const data = await response.json()
        setSettings(data)
      } else {
        // Если сервер недоступен, используем localStorage
        const updated = { ...settings, ...newSettings }
        setSettings(updated)
        localStorage.setItem('logen_site_settings', JSON.stringify(updated))
      }
    } catch {
      // Сервер недоступен - используем localStorage
      const updated = { ...settings, ...newSettings }
      setSettings(updated)
      localStorage.setItem('logen_site_settings', JSON.stringify(updated))
    }
  }

  return { settings, updateSettings, loading, defaultSettings }
}
