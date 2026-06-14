import { describe, it, expect } from 'vitest';
import crypto from 'crypto';

describe('Encryption Logic', () => {
  const ALGORITHM = 'aes-256-gcm';

  function encrypt(text: string, key: Buffer) {
    const iv = crypto.randomBytes(16);
    const cipher = crypto.createCipheriv(ALGORITHM, key, iv);
    let encrypted = cipher.update(text, 'utf8', 'hex');
    encrypted += cipher.final('hex');
    const tag = cipher.getAuthTag();
    return `${iv.toString('hex')}:${tag.toString('hex')}:${encrypted}`;
  }

  function decrypt(encryptedText: string, key: Buffer) {
    const parts = encryptedText.split(':');
    const ivHex = parts[0]!;
    const tagHex = parts[1]!;
    const encrypted = parts[2]!;
    const iv = Buffer.from(ivHex, 'hex');
    const tag = Buffer.from(tagHex, 'hex');
    const decipher = crypto.createDecipheriv(ALGORITHM, key, iv);
    decipher.setAuthTag(tag);
    let decrypted = decipher.update(encrypted, 'hex', 'utf8');
    decrypted += decipher.final('utf8');
    return decrypted;
  }

  const testKey = crypto.randomBytes(32);

  it('should encrypt and decrypt text correctly', () => {
    const plaintext = 'test-secret-key-12345';
    const encrypted = encrypt(plaintext, testKey);

    expect(encrypted).not.toBe(plaintext);
    expect(encrypted.split(':')).toHaveLength(3);

    const decrypted = decrypt(encrypted, testKey);
    expect(decrypted).toBe(plaintext);
  });

  it('should produce different ciphertext for same plaintext (random IV)', () => {
    const plaintext = 'same-text';
    const encrypted1 = encrypt(plaintext, testKey);
    const encrypted2 = encrypt(plaintext, testKey);

    expect(encrypted1).not.toBe(encrypted2);
    expect(decrypt(encrypted1, testKey)).toBe(plaintext);
    expect(decrypt(encrypted2, testKey)).toBe(plaintext);
  });

  it('should fail to decrypt with wrong key', () => {
    const plaintext = 'secret';
    const encrypted = encrypt(plaintext, testKey);
    const wrongKey = crypto.randomBytes(32);

    expect(() => decrypt(encrypted, wrongKey)).toThrow();
  });

  it('should handle empty strings', () => {
    const encrypted = encrypt('', testKey);
    const decrypted = decrypt(encrypted, testKey);
    expect(decrypted).toBe('');
  });

  it('should handle unicode text', () => {
    const plaintext = 'Hello World! \u041f\u0440\u0438\u0432\u0435\u0442!';
    const encrypted = encrypt(plaintext, testKey);
    const decrypted = decrypt(encrypted, testKey);
    expect(decrypted).toBe(plaintext);
  });
});

describe('Solana Address Validation', () => {
  function isValidSolanaAddress(address: string | null | undefined): boolean {
    try {
      if (!address || address.length < 32 || address.length > 44) return false;
      const base58Pattern = /^[1-9A-HJ-NP-Za-km-z]+$/;
      return base58Pattern.test(address);
    } catch {
      return false;
    }
  }

  it('should accept valid base58 Solana addresses', () => {
    expect(isValidSolanaAddress('DRQFBgTpjkTxmGmHkNpKmxPPJCsCFQPjiYfJABDUoGjP')).toBe(true);
  });

  it('should reject addresses that are too short', () => {
    expect(isValidSolanaAddress('abc')).toBe(false);
  });

  it('should reject empty strings', () => {
    expect(isValidSolanaAddress('')).toBe(false);
  });

  it('should reject null/undefined', () => {
    expect(isValidSolanaAddress(null as unknown as string)).toBe(false);
    expect(isValidSolanaAddress(undefined as unknown as string)).toBe(false);
  });

  it('should reject addresses with invalid characters', () => {
    expect(isValidSolanaAddress('0OIl'.padEnd(44, '1'))).toBe(false);
  });
});
