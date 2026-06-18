import mongoose from 'mongoose';

export async function connectDB(uri) {
  if (!uri) {
    throw new Error(
      'MONGO_URI is not set. Copy server/.env.example to server/.env and add your MongoDB Atlas connection string.'
    );
  }
  mongoose.set('strictQuery', true);
  const conn = await mongoose.connect(uri);
  console.log(`✓ MongoDB connected: ${conn.connection.host}/${conn.connection.name}`);
  return conn;
}
