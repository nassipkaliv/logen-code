import { useState, useEffect } from 'react';
import { siteSettings as defaultSettings } from '../config/siteSettings';
import { config } from '../config';

export interface SiteSettings {
  xUrl: string;
  tickerText: string;
  tokenAnnouncement: string;
}

export function useAdminPassword() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');

  const login = (inputPassword: string) => {
    if (!inputPassword) {
      alert('Password is required');
      return;
    }
    setIsAuthenticated(true);
    setPassword(inputPassword);
  };

  const logout = () => {
    setIsAuthenticated(false);
    setPassword('');
  };

  return { isAuthenticated, password, setPassword, login, logout };
}

export function useSiteSettings() {
  const [settings, setSettings] = useState<SiteSettings>(defaultSettings);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const response = await fetch(`${config.api.url}/settings`);
        if (response.ok) {
          const data = await response.json();
          setSettings(data);
        }
      } catch {
        const stored = localStorage.getItem('logen_site_settings');
        if (stored) {
          try {
            setSettings(JSON.parse(stored));
          } catch {
            // Malformed cached data, use defaults
          }
        }
      } finally {
        setLoading(false);
      }
    };

    fetchSettings();
  }, []);

  const updateSettings = async (newSettings: Partial<SiteSettings>, password: string) => {
    try {
      const response = await fetch(`${config.api.url}/settings`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...newSettings, password }),
      });

      if (response.ok) {
        const data = await response.json();
        setSettings(data);
      } else {
        const error = await response.json().catch(() => null);
        throw new Error(error?.error || 'Failed to save settings');
      }
    } catch (err) {
      const updated = { ...settings, ...newSettings };
      setSettings(updated);
      localStorage.setItem('logen_site_settings', JSON.stringify(updated));
      throw err;
    }
  };

  return { settings, updateSettings, loading, defaultSettings };
}
