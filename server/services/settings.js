import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const SETTINGS_FILE = path.join(__dirname, '..', 'settings.json');

const defaultSettings = {
  siteName: 'Logen',
  tagline: 'AI-Powered DeFi Automation',
  xUrl: 'https://x.com/logen',
  tickerText: '',
  tokenAnnouncement: '$Logen token launch coming soon. Contract address will appear here.',
  features: ['Smart Routing', 'MEV Protection', 'Auto-Compounding'],
  supportedChains: ['solana', 'ethereum'],
  supportedWallets: ['phantom', 'solflare', 'metamask', 'coinbase']
};

export function loadSettings() {
  try {
    if (fs.existsSync(SETTINGS_FILE)) {
      const data = fs.readFileSync(SETTINGS_FILE, 'utf-8');
      // Saved settings take priority over defaults
      return { ...defaultSettings, ...JSON.parse(data) };
    }
  } catch (error) {
    console.error('Error loading settings:', error.message);
  }
  return defaultSettings;
}

export function saveSettings(newSettings) {
  try {
    const current = loadSettings();
    const updated = { ...current, ...newSettings };
    fs.writeFileSync(SETTINGS_FILE, JSON.stringify(updated, null, 2));
    return updated;
  } catch (error) {
    console.error('Error saving settings:', error.message);
    throw error;
  }
}

export function getDefaultSettings() {
  return defaultSettings;
}
