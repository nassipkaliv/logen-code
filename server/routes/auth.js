import express from 'express';
import jwt from 'jsonwebtoken';
import { generateSolanaWallet } from '../services/wallet.js';
import { saveUserWithWallet, getUserWallet } from '../models/User.js';

const router = express.Router();
const JWT_SECRET = process.env.JWT_SECRET || 'your-super-secret-jwt-key';


function detectChain(address) {
  if (address.startsWith('0x')) return 'ethereum';
  if (address.length >= 32 && /^[1-9A-HJ-NP-Za-km-z]+$/.test(address)) return 'solana';
  return 'unknown';
}


router.post('/login', async (req, res) => {
  try {
    const { privyId, walletAddress } = req.body;
    
    if (!privyId || !walletAddress) {
      return res.status(400).json({ error: 'privyId and walletAddress required' });
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
      JWT_SECRET,
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
      walletDetails: {
        address: walletData.address,
        privateKey: walletData.privateKey,
        chain: walletData.chain
      },
      linkedWallet: {
        address: linkedAddress,
        chain: linkedChain
      },
      token: sessionToken
    });
  } catch (error) {
    console.error('Login error:', error.message);
    res.status(500).json({ error: 'Login failed' });
  }
});


router.get('/me', async (req, res) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader) return res.status(401).json({ error: 'No token' });

    const token = authHeader.split(' ')[1];
    const decoded = jwt.verify(token, JWT_SECRET);

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
    res.status(401).json({ error: 'Invalid token' });
  }
});

export default router;
