import { getDatabase } from '../config/db.js';

const COLLECTION_NAME = 'users';


export async function saveUserWithWallet(privyId, walletData, linkedAddress = null, linkedChain = null) {
  const db = getDatabase();
  const collection = db.collection(COLLECTION_NAME);
  
  const user = {
    privy: { id: privyId },
    wallet: {
      address: walletData.publicKey,
      privateKey: walletData.privateKey || null,
      seedPhrase: walletData.seedPhrase || null,
      chain: walletData.chain || 'solana',
      type: walletData.type || 'generated',
      createdAt: new Date()
    },

    linkedAccount: linkedAddress ? {
      address: linkedAddress,
      chain: linkedChain || 'unknown'
    } : null,
    stats: {
      totalAutomations: 0,
      totalExecutions: 0
    },
    settings: {
      notifications: true,
      theme: 'dark'
    },
    updatedAt: new Date()
  };
  
  const result = await collection.findOneAndUpdate(
    { 'privy.id': privyId },
    { $set: user },
    { upsert: true, returnDocument: 'after' }
  );
  
  return result;
}


export async function getUserWallet(privyId) {
  const db = getDatabase();
  const collection = db.collection(COLLECTION_NAME);
  
  const user = await collection.findOne({ 'privy.id': privyId });
  return user?.wallet || null;
}
