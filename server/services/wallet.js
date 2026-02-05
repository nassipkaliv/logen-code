import { Keypair } from '@solana/web3.js';
import bs58 from 'bs58';
import bip39 from 'bip39';
import { getMasterKeyFromSeed, derivePath } from 'ed25519-hd-key';

export function generateSolanaWallet() {
  const mnemonic = bip39.generateMnemonic(128);
  const seed = bip39.mnemonicToSeedSync(mnemonic);
  const masterKey = getMasterKeyFromSeed(seed);
  const derived = derivePath("m/44'/501'/0'/0'", masterKey.key);
  
  const keypair = Keypair.fromSeed(derived.key);
  
  return {
    address: keypair.publicKey.toString(),
    publicKey: keypair.publicKey.toString(),
    secretKey: bs58.encode(keypair.secretKey),
    privateKey: bs58.encode(keypair.secretKey),
    seedPhrase: mnemonic,
    chain: 'solana',
    type: 'generated'
  };
}

export function createWalletFromPrivateKey(privateKeyBase58) {
  const secretKey = bs58.decode(privateKeyBase58);
  const keypair = Keypair.fromSecretKey(secretKey);
  
  return {
    address: keypair.publicKey.toString(),
    publicKey: keypair.publicKey.toString(),
    secretKey: bs58.encode(keypair.secretKey),
    privateKey: bs58.encode(keypair.secretKey),
    keypairBytes: Array.from(keypair.secretKey),
    chain: 'solana',
    type: 'imported'
  };
}

export function isValidSolanaAddress(address) {
  try {
    if (!address || address.length < 32 || address.length > 44) return false;
    const base58Pattern = /^[1-9A-HJ-NP-Za-km-z]+$/;
    return base58Pattern.test(address);
  } catch {
    return false;
  }
}
