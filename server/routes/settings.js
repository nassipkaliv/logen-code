import express from 'express';
import crypto from 'crypto';
import { loadSettings, saveSettings, getDefaultSettings } from '../models/SiteSettings.js';

const router = express.Router();

function verifyPassword(password) {
  const adminHash = process.env.ADMIN_PASSWORD_HASH;
  if (!adminHash || !password) return false;
  const [hash, salt] = adminHash.split(':');
  const computedHash = crypto.pbkdf2Sync(password, salt, 10000, 64, 'sha512').toString('hex');
  return crypto.timingSafeEqual(Buffer.from(hash, 'hex'), Buffer.from(computedHash, 'hex'));
}

router.get('/', async (req, res) => {
  try {
    const settings = await loadSettings();
    res.json(settings);
  } catch (error) {
    console.error('Error fetching settings:', error.message);
    res.status(500).json({ error: 'Failed to retrieve settings' });
  }
});

router.post('/', async (req, res) => {
  try {
    const { password, ...newSettings } = req.body;

    if (!password) {
      return res.status(401).json({ error: 'Password is required' });
    }

    if (!verifyPassword(password)) {
      return res.status(403).json({ error: 'Invalid credentials' });
    }

    const allowedFields = ['xUrl', 'tickerText', 'tokenAnnouncement'];
    const sanitizedSettings = {};
    for (const field of allowedFields) {
      if (field in newSettings && typeof newSettings[field] === 'string') {
        sanitizedSettings[field] = newSettings[field].slice(0, 500);
      }
    }

    const updated = await saveSettings(sanitizedSettings);
    res.json(updated);
  } catch (error) {
    console.error('Error saving settings:', error.message);
    res.status(500).json({ error: 'Failed to save settings' });
  }
});

router.delete('/', async (req, res) => {
  try {
    const { password } = req.body;

    if (!password) {
      return res.status(401).json({ error: 'Password is required' });
    }

    if (!verifyPassword(password)) {
      return res.status(403).json({ error: 'Invalid credentials' });
    }

    const defaults = getDefaultSettings();
    const updated = await saveSettings(defaults);
    res.json(updated);
  } catch (error) {
    console.error('Error resetting settings:', error.message);
    res.status(500).json({ error: 'Failed to reset settings' });
  }
});

export default router;
