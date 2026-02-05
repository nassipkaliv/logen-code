import express from 'express';
import { loadSettings, saveSettings, getDefaultSettings } from '../services/settings.js';

const router = express.Router();
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'o5I>Kf<qfT+OP5K?';

router.get('/', async (req, res) => {
  try {
    const settings = loadSettings();
    res.json(settings);
  } catch (error) {
    console.error('Error getting settings:', error.message);
    res.status(500).json({ error: 'Failed to get settings' });
  }
});

router.post('/', async (req, res) => {
  try {
    const { password, ...newSettings } = req.body;
    
    if (password !== ADMIN_PASSWORD) {
      return res.status(401).json({ error: 'Invalid password' });
    }
    
    const updated = saveSettings(newSettings);
    res.json(updated);
  } catch (error) {
    console.error('Error saving settings:', error.message);
    res.status(500).json({ error: 'Failed to save settings' });
  }
});

router.delete('/', async (req, res) => {
  try {
    const { password } = req.body;
    
    if (password !== ADMIN_PASSWORD) {
      return res.status(401).json({ error: 'Invalid password' });
    }
    
    const defaults = getDefaultSettings();
    const updated = saveSettings(defaults);
    
    res.json(updated);
  } catch (error) {
    console.error('Error resetting settings:', error.message);
    res.status(500).json({ error: 'Failed to reset settings' });
  }
});

export default router;
