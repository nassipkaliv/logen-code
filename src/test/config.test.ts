import { describe, it, expect } from 'vitest';
import { config } from '../config';

describe('Config', () => {
  it('should have api config with url', () => {
    expect(config.api.url).toBeDefined();
    expect(typeof config.api.url).toBe('string');
  });

  it('should have solana config with rpcEndpoint', () => {
    expect(config.solana.rpcEndpoint).toBeDefined();
    expect(config.solana.rpcEndpoint).toContain('http');
  });

  it('should have commitment level set', () => {
    expect(config.solana.commitment).toBe('confirmed');
  });

  it('should have timeout configured', () => {
    expect(config.solana.rpcTimeoutMs).toBeGreaterThan(0);
  });
});
