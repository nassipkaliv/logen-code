import { Keypair } from '@solana/web3.js';
import bs58 from 'bs58';
import bip39 from 'bip39';
import { getMasterKeyFromSeed, derivePath } from 'ed25519-hd-key';
import crypto from 'crypto';

const ALGORITHM = 'aes-256-gcm';

function getEncryptionKey() {
  const key = process.env.ENCRYPTION_KEY;
  if (!key) {
    throw new Error('ENCRYPTION_KEY environment variable is required');
  }
  return Buffer.from(key, 'hex');
}

export function encrypt(text) {
  const key = getEncryptionKey();
  const iv = crypto.randomBytes(16);
  const cipher = crypto.createCipheriv(ALGORITHM, key, iv);
  let encrypted = cipher.update(text, 'utf8', 'hex');
  encrypted += cipher.final('hex');
  const tag = cipher.getAuthTag();
  return `${iv.toString('hex')}:${tag.toString('hex')}:${encrypted}`;
}

export function decrypt(encryptedText) {
  const key = getEncryptionKey();
  const [ivHex, tagHex, encrypted] = encryptedText.split(':');
  const iv = Buffer.from(ivHex, 'hex');
  const tag = Buffer.from(tagHex, 'hex');
  const decipher = crypto.createDecipheriv(ALGORITHM, key, iv);
  decipher.setAuthTag(tag);
  let decrypted = decipher.update(encrypted, 'hex', 'utf8');
  decrypted += decipher.final('utf8');
  return decrypted;
}

export function generateSolanaWallet() {
  const mnemonic = bip39.generateMnemonic(128);
  const seed = bip39.mnemonicToSeedSync(mnemonic);
  const masterKey = getMasterKeyFromSeed(seed);
  const derived = derivePath("m/44'/501'/0'/0'", masterKey.key);

  const keypair = Keypair.fromSeed(derived.key);

  return {
    address: keypair.publicKey.toString(),
    publicKey: keypair.publicKey.toString(),
    encryptedSecretKey: encrypt(bs58.encode(keypair.secretKey)),
    encryptedSeedPhrase: encrypt(mnemonic),
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
    encryptedSecretKey: encrypt(bs58.encode(keypair.secretKey)),
    chain: 'solana',
    type: 'imported'
  };
}

export function getDecryptedPrivateKey(encryptedSecretKey) {
  return decrypt(encryptedSecretKey);
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
