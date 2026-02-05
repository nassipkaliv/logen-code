import { config } from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Load .env from server directory (parent of services/)
config({ path: join(__dirname, '..', '.env') });

import { PrivyClient } from '@privy-io/node';

const PRIVY_APP_ID = process.env.PRIVY_APP_ID;
const PRIVY_APP_SECRET = process.env.PRIVY_APP_SECRET;

if (!PRIVY_APP_ID || !PRIVY_APP_SECRET) {
  console.error('PRIVY_APP_ID or PRIVY_APP_SECRET not set');
}

const privyClient = new PrivyClient({
  appId: PRIVY_APP_ID,
  apiKey: PRIVY_APP_SECRET,
});

// Верифицировать privyToken и получить пользователя
export async function verifyPrivyToken(token) {
  try {
    const verifiedClaims = await privyClient.verifyToken(token);
    return verifiedClaims.user;
  } catch (error) {
    console.error('Privy token verification failed:', error.message);
    return null;
  }
}

// Получить пользователя по ID
export async function getUserById(userId) {
  try {
    const user = await privyClient.getUser(userId);
    return user;
  } catch (error) {
    console.error('Failed to get user:', error.message);
    return null;
  }
}
