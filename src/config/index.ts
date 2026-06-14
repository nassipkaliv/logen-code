export const config = {
  api: {
    url: import.meta.env.VITE_API_URL || 'http://localhost:3001/api',
  },
  solana: {
    rpcEndpoint: 'https://solana.publicnode.com',
    commitment: 'confirmed' as const,
    rpcTimeoutMs: 10_000,
  },
} as const;
