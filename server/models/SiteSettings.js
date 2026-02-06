import { getDatabase } from '../config/db.js';

const COLLECTION_NAME = 'site_settings';

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

export async function loadSettings() {
  try {
    const db = getDatabase();
    const collection = db.collection(COLLECTION_NAME);
    
    const settings = await collection.findOne({});
    if (settings) {
      // Remove MongoDB _id and return merged settings
      const { _id, ...savedSettings } = settings;
      return { ...defaultSettings, ...savedSettings };
    }
  } catch (error) {
    console.error('Error loading settings from MongoDB:', error.message);
  }
  return defaultSettings;
}

export async function saveSettings(newSettings) {
  try {
    const db = getDatabase();
    const collection = db.collection(COLLECTION_NAME);
    
    await collection.updateOne(
      {},
      { $set: newSettings },
      { upsert: true }
    );
    
    const settings = await collection.findOne({});
    if (settings) {
      const { _id, ...savedSettings } = settings;
      return { ...defaultSettings, ...savedSettings };
    }
  } catch (error) {
    console.error('Error saving settings to MongoDB:', error.message);
    throw error;
  }
  return defaultSettings;
}

export function getDefaultSettings() {
  return defaultSettings;
}
