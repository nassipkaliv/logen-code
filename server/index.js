import express from 'express';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3001;
const SETTINGS_FILE = path.join(__dirname, 'settings.json');
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'o5I>Kf<qfT+OP5K?';

app.use(express.json());

// CORS middleware
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  next();
});

app.use(express.static(path.join(__dirname, '../dist')));

// GET /api/settings - получить настройки
app.get('/api/settings', (req, res) => {
  try {
    const settings = JSON.parse(fs.readFileSync(SETTINGS_FILE, 'utf8'));
    res.json(settings);
  } catch (error) {
    res.status(500).json({ error: 'Failed to read settings' });
  }
});

// POST /api/settings - обновить настройки (требует пароль)
app.post('/api/settings', (req, res) => {
  const { password, ...newSettings } = req.body;

  if (password !== ADMIN_PASSWORD) {
    return res.status(401).json({ error: 'Invalid password' });
  }

  try {
    const currentSettings = JSON.parse(fs.readFileSync(SETTINGS_FILE, 'utf8'));
    const updatedSettings = { ...currentSettings, ...newSettings };
    fs.writeFileSync(SETTINGS_FILE, JSON.stringify(updatedSettings, null, 2));
    res.json(updatedSettings);
  } catch (error) {
    res.status(500).json({ error: 'Failed to save settings' });
  }
});

// Serve React app for all other routes
app.get(/(.*)/, (req, res) => {
  res.sendFile(path.join(__dirname, '../dist/index.html'));
});

app.listen(PORT, () => {
  console.log(`Settings server running on http://localhost:${PORT}`);
});
