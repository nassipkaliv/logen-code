import { Connection, PublicKey, LAMPORTS_PER_SOL } from '@solana/web3.js';

const SOLANA_RPC_URL = process.env.SOLANA_RPC_URL || 'https://api.mainnet-beta.solana.com';

const connection = new Connection(SOLANA_RPC_URL, 'confirmed');

const balanceCache = new Map();
const CACHE_TTL = 30 * 1000;

function getCachedBalance(address) {
  const cached = balanceCache.get(address);
  if (cached && Date.now() - cached.time < CACHE_TTL) {
    return cached.data;
  }
  return null;
}

function setCachedBalance(address, data) {
  balanceCache.set(address, { data, time: Date.now() });
}

export async function getSolBalance(address) {
  const cached = getCachedBalance(address);
  if (cached?.sol !== undefined) return cached.sol;

  try {
    const publicKey = new PublicKey(address);
    const balance = await connection.getBalance(publicKey);
    const sol = balance / LAMPORTS_PER_SOL;
    
    const current = balanceCache.get(address)?.data || {};
    setCachedBalance(address, { ...current, sol });
    
    return sol;
  } catch (error) {
    console.error('Error getting SOL balance:', error.message);
    return 0;
  }
}

export async function getAllTokenBalances(address) {
  const cached = getCachedBalance(address);
  if (cached?.tokens) return cached.tokens;

  try {
    const publicKey = new PublicKey(address);
    const tokenAccounts = await connection.getParsedTokenAccountsByOwner(
      publicKey,
      { programId: new PublicKey('TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA') }
    );
    
    const tokens = tokenAccounts.value.map(account => {
      const info = account.account.data.parsed.info;
      return {
        mint: info.mint,
        amount: info.tokenAmount.uiAmount,
        decimals: info.tokenAmount.decimals,
        isFrozen: info.tokenAmount.isFrozen
      };
    });
    
    const current = balanceCache.get(address)?.data || {};
    setCachedBalance(address, { ...current, tokens });
    
    return tokens;
  } catch (error) {
    console.error('Error getting token balances:', error.message);
    return [];
  }
}

export async function getAllBalances(address) {
  const cached = getCachedBalance(address);
  if (cached?.sol !== undefined) {
    return cached;
  }

  const [solBalance, tokens] = await Promise.all([
    getSolBalance(address),
    getAllTokenBalances(address)
  ]);
  
  const result = {
    sol: {
      balance: solBalance,
      symbol: 'SOL',
      decimals: 9
    },
    tokens
  };
  
  setCachedBalance(address, result);
  return result;
}
