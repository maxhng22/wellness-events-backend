import mongoose from 'mongoose';
import config from './env';

const connectDB = async (): Promise<void> => {
  try {
    console.log('🔗 Connecting to MongoDB...', config.mongoUri);
    const conn = await mongoose.connect(config.mongoUri);
    console.log(`✅ MongoDB connected: ${conn.connection.host}`);
  } catch (error) {
    console.error('❌ MongoDB connection failed:', error);
    process.exit(1);
  }
};

export default connectDB;
