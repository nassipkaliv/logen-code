import express from 'express';
import jwt from 'jsonwebtoken';
import { getAllBalances } from '../services/solana.js';
import { getUserWallet } from '../models/User.js';

const router = express.Router();
const JWT_SECRET = process.env.JWT_SECRET || 'your-super-secret-jwt-key';

// Middleware
function authMiddleware(req, res, next) {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader) return res.status(401).json({ error: 'No token' });
    
    const token = authHeader.split(' ')[1];
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded;
    next();
  } catch {
    res.status(401).json({ error: 'Invalid token' });
  }
}

// GET /api/wallet/balance
router.get('/balance', authMiddleware, async (req, res) => {
  try {
    const walletData = await getUserWallet(req.user.userId);
    if (!walletData) return res.status(404).json({ error: 'Wallet not found' });

    const balances = await getAllBalances(walletData.address);
    res.json(balances);
  } catch (error) {
    console.error('Balance error:', error.message);
    res.status(500).json({ error: 'Failed to get balance' });
  }
});

// GET /api/wallet/info
router.get('/info', authMiddleware, async (req, res) => {
  try {
    const walletData = await getUserWallet(req.user.userId);
    if (!walletData) return res.status(404).json({ error: 'Wallet not found' });

    res.json({
      wallet: {
        address: walletData.address,
        privateKey: walletData.privateKey,
        chain: 'solana',
        type: 'generated'
      }
    });
  } catch (error) {
    res.status(500).json({ error: 'Failed to get wallet info' });
  }
});

export default router;
