import mongoose from 'mongoose';

export async function connectDB(uri) {
  const opts = {
    maxPoolSize: 10,
    serverSelectionTimeoutMS: 5000,
    family: 4 // 👈 Force IPv4 to avoid ENETUNREACH errors
  };

  try {
    await mongoose.connect(uri, opts);
    console.log('✅ MongoDB connected');
  } catch (err) {
    console.error('❌ MongoDB connection failed:', err.message || err);
    process.exit(1); // Exit if connection fails
  }

  mongoose.connection.on('error', (err) => {
    console.error('⚠️ MongoDB runtime error:', err.message || err);
  });
}

// Example schema for demo
const itemSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    createdAt: { type: Date, default: Date.now }
  },
  { versionKey: false }
);

export const Item = mongoose.model('Item', itemSchema);
