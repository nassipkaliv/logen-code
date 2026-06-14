# Logen

AI-Powered DeFi Automation Platform on Solana.

## Requirements

- Node.js 18+
- MongoDB running on `localhost:27017`

## Setup

```bash
# Install dependencies
npm install
cd server && npm install && cd ..

# Generate secrets and create server/.env
JWT_SECRET=$(openssl rand -hex 32)
ENCRYPTION_KEY=$(openssl rand -hex 32)
ADMIN_HASH=$(node -e "const crypto=require('crypto');const salt=crypto.randomBytes(16).toString('hex');const hash=crypto.pbkdf2Sync('admin',salt,10000,64,'sha512').toString('hex');console.log(hash+':'+salt)")

cat > server/.env << EOF
PRIVY_APP_ID=cmqe22sr000gx0bjmy006hnqr
PRIVY_APP_SECRET=privy_app_secret_2fsYcJfojLfHsoHcbbiy6qKRBGUrDiMbNnMcYzuhaf4d28Aznju4NAmhwT97uRs2kBX4W4aSUzYrhgSq6XPf25T1
JWT_SECRET=$JWT_SECRET
ENCRYPTION_KEY=$ENCRYPTION_KEY
ADMIN_PASSWORD_HASH=$ADMIN_HASH
MONGODB_URI=mongodb://localhost:27017/logen
SOLANA_RPC_URL=https://api.mainnet-beta.solana.com
PORT=3001
DOMAIN=localhost
EOF

# Create frontend .env
echo "VITE_PRIVY_APP_ID=cmqe22sr000gx0bjmy006hnqr" > .env
```

## Run

```bash
# Start backend
node server/index.js &

# Start frontend
npm run dev
```

- Frontend: http://localhost:5173
- Backend: http://localhost:3001

## Tech Stack

- React 18, TypeScript, Vite, Tailwind CSS
- Express 5, MongoDB/Mongoose
- Privy (auth), Solana web3.js
