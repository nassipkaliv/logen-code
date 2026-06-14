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

export async function verifyPrivyToken(token) {
  try {
    const verifiedClaims = await privyClient.verifyToken(token);
    return verifiedClaims.user;
  } catch (error) {
    console.error('Privy token verification failed:', error.message);
    return null;
  }
}

export async function getUserById(userId) {
  try {
    const user = await privyClient.getUser(userId);
    return user;
  } catch (error) {
    console.error('Failed to get user:', error.message);
    return null;
  }
}
