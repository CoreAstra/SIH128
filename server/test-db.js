// Test MongoDB connection and show collections
const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    await mongoose.connect('mongodb://localhost:27017/ecoconnect');
    console.log('✅ Connected to MongoDB successfully');
    
    // List all collections
    const collections = await mongoose.connection.db.listCollections().toArray();
    console.log('📋 Available collections:');
    collections.forEach(collection => {
      console.log(`  - ${collection.name}`);
    });
    
    // Check if users collection exists and show user count
    const User = require('./models/User');
    const userCount = await User.countDocuments();
    console.log(`👥 Total users in database: ${userCount}`);
    
    if (userCount > 0) {
      const users = await User.find().select('name email createdAt');
      console.log('👤 Users:');
      users.forEach(user => {
        console.log(`  - ${user.name} (${user.email}) - Created: ${user.createdAt}`);
      });
    }
    
    process.exit(0);
  } catch (error) {
    console.error('❌ MongoDB connection error:', error);
    process.exit(1);
  }
};

connectDB();