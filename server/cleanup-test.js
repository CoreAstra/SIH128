// Clean up test user from database
const mongoose = require('mongoose');
const User = require('./models/User');

const cleanupTestUser = async () => {
  try {
    await mongoose.connect('mongodb://localhost:27017/ecoconnect');
    console.log('✅ Connected to MongoDB');
    
    // Remove test user
    const result = await User.deleteOne({ email: 'test@example.com' });
    
    if (result.deletedCount > 0) {
      console.log('🗑️ Test user removed successfully');
    } else {
      console.log('ℹ️ No test user found to remove');
    }
    
    // Show current user count
    const userCount = await User.countDocuments();
    console.log(`👥 Total users remaining: ${userCount}`);
    
    process.exit(0);
  } catch (error) {
    console.error('❌ Error:', error);
    process.exit(1);
  }
};

cleanupTestUser();