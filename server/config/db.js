import mongoose from 'mongoose';

export function getDatabase() {
  if (mongoose.connection.readyState !== 1) {
    throw new Error('Database not connected. Call connectToDatabase() first.');
  }
  return mongoose.connection.db;
}

export async function connectToDatabase() {
  if (mongoose.connection.readyState === 1) {
    return;
  }

  const mongoUri = process.env.MONGODB_URI;
  if (!mongoUri) {
    throw new Error('MONGODB_URI environment variable is required');
  }

  try {
    await mongoose.connect(mongoUri);
    console.log('Connected to MongoDB');
  } catch (error) {
    console.error('MongoDB connection error:', error.message);
    throw error;
  }
}
