import express from 'express';
import jwt from 'jsonwebtoken';
import { getAllBalances } from '../services/solana.js';
import { getUserWallet } from '../models/User.js';

const router = express.Router();

function getJwtSecret() {
  return process.env.JWT_SECRET;
}

function authMiddleware(req, res, next) {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader) return res.status(401).json({ error: 'No token provided' });

    const token = authHeader.split(' ')[1];
    if (!token) return res.status(401).json({ error: 'Malformed authorization header' });

    const decoded = jwt.verify(token, getJwtSecret());
    req.user = decoded;
    next();
  } catch (error) {
    if (error.name === 'TokenExpiredError') {
      return res.status(401).json({ error: 'Token expired' });
    }
    if (error.name === 'JsonWebTokenError') {
      return res.status(401).json({ error: 'Invalid token' });
    }
    res.status(401).json({ error: 'Authentication failed' });
  }
}

router.get('/balance', authMiddleware, async (req, res) => {
  try {
    const walletData = await getUserWallet(req.user.userId);
    if (!walletData) return res.status(404).json({ error: 'Wallet not found' });

    const balances = await getAllBalances(walletData.address);
    res.json(balances);
  } catch (error) {
    console.error('Balance fetch error:', error.message);
    res.status(500).json({ error: 'Failed to retrieve balance' });
  }
});

router.get('/info', authMiddleware, async (req, res) => {
  try {
    const walletData = await getUserWallet(req.user.userId);
    if (!walletData) return res.status(404).json({ error: 'Wallet not found' });

    res.json({
      wallet: {
        address: walletData.address,
        chain: 'solana',
        type: walletData.type || 'generated'
      }
    });
  } catch (error) {
    console.error('Wallet info error:', error.message);
    res.status(500).json({ error: 'Failed to retrieve wallet info' });
  }
});

export default router;
