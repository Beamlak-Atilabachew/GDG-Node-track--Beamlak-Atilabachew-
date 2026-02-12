import dotenv from 'dotenv';
import mongoose from 'mongoose';

dotenv.config({ path: './Task-4/.env' });

console.log('Testing MongoDB connection...');
console.log('URI:', process.env.MONGODB_URI ? 'Found' : 'Not found');

mongoose.connect(process.env.MONGODB_URI)
  .then(() => {
    console.log('✅ MongoDB connected successfully');
    
    // Test a simple query
    return mongoose.connection.db.admin().ping();
  })
  .then(() => {
    console.log('✅ Database ping successful');
    process.exit(0);
  })
  .catch((error) => {
    console.error('❌ Connection failed:', error.message);
    process.exit(1);
  });
