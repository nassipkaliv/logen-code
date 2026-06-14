import express from 'express';
import jwt from 'jsonwebtoken';
import { generateSolanaWallet } from '../services/wallet.js';
import { saveUserWithWallet, getUserWallet } from '../models/User.js';

const router = express.Router();

function getJwtSecret() {
  return process.env.JWT_SECRET;
}

function detectChain(address) {
  if (address.startsWith('0x')) return 'ethereum';
  if (address.length >= 32 && /^[1-9A-HJ-NP-Za-km-z]+$/.test(address)) return 'solana';
  return 'unknown';
}

router.post('/login', async (req, res) => {
  try {
    const { privyId, walletAddress } = req.body;

    if (!privyId || !walletAddress) {
      return res.status(400).json({ error: 'privyId and walletAddress are required' });
    }

    if (typeof privyId !== 'string' || typeof walletAddress !== 'string') {
      return res.status(400).json({ error: 'Invalid parameter types' });
    }

    const linkedAddress = walletAddress;
    const linkedChain = detectChain(linkedAddress);

    let walletData = await getUserWallet(privyId);

    if (!walletData) {
      walletData = generateSolanaWallet();
      await saveUserWithWallet(privyId, walletData, linkedAddress, linkedChain);
    }

    const sessionToken = jwt.sign(
      { userId: privyId, walletAddress: walletData.address, chain: walletData.chain },
      getJwtSecret(),
      { expiresIn: '7d' }
    );

    res.json({
      success: true,
      user: {
        id: privyId,
        wallet: {
          address: walletData.address,
          chain: walletData.chain,
          type: walletData.type || 'generated'
        }
      },
      linkedWallet: {
        address: linkedAddress,
        chain: linkedChain
      },
      token: sessionToken
    });
  } catch (error) {
    console.error('Login error:', error.message);
    res.status(500).json({ error: 'Internal server error' });
  }
});

router.get('/me', async (req, res) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader) return res.status(401).json({ error: 'No token provided' });

    const token = authHeader.split(' ')[1];
    if (!token) return res.status(401).json({ error: 'Malformed authorization header' });

    const decoded = jwt.verify(token, getJwtSecret());

    const walletData = await getUserWallet(decoded.userId);
    if (!walletData) return res.status(404).json({ error: 'User not found' });

    res.json({
      user: {
        id: decoded.userId,
        wallet: {
          address: walletData.address,
          chain: walletData.chain,
          type: walletData.type || 'generated'
        }
      }
    });
  } catch (error) {
    if (error.name === 'TokenExpiredError') {
      return res.status(401).json({ error: 'Token expired' });
    }
    if (error.name === 'JsonWebTokenError') {
      return res.status(401).json({ error: 'Invalid token' });
    }
    res.status(500).json({ error: 'Internal server error' });
  }
});

export default router;
