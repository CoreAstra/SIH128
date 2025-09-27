const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Name is required'],
    trim: true,
    minlength: [2, 'Name must be at least 2 characters long'],
    maxlength: [50, 'Name cannot exceed 50 characters']
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    unique: true,
    lowercase: true,
    trim: true,
    match: [/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/, 'Please enter a valid email']
  },
  password: {
    type: String,
    required: [true, 'Password is required'],
    minlength: [6, 'Password must be at least 6 characters long']
  },
  phone: {
    type: String,
    trim: true,
    match: [/^[6-9]\d{9}$/, 'Please enter a valid Indian phone number']
  },
  city: {
    type: String,
    trim: true,
    maxlength: [30, 'City name cannot exceed 30 characters']
  },
  greenPoints: {
    type: Number,
    default: 0,
    min: [0, 'Green points cannot be negative']
  },
  level: {
    type: String,
    default: 'Eco Beginner',
    enum: ['Eco Beginner', 'Green Warrior', 'Eco Champion', 'Sustainability Master']
  },
  badges: [{
    type: String,
    trim: true
  }],
  itemsRecycled: {
    type: Number,
    default: 0,
    min: [0, 'Items recycled cannot be negative']
  },
  co2Saved: {
    type: Number,
    default: 0,
    min: [0, 'CO2 saved cannot be negative']
  },
  wasteDiverted: {
    type: Number,
    default: 0,
    min: [0, 'Waste diverted cannot be negative']
  },
  isActive: {
    type: Boolean,
    default: true
  },
  role: {
    type: String,
    default: 'citizen',
    enum: ['citizen', 'collector', 'admin', 'municipality']
  },
  profilePicture: {
    type: String,
    default: null
  },
  address: {
    street: String,
    area: String,
    pincode: {
      type: String,
      match: [/^\d{6}$/, 'Please enter a valid 6-digit pincode']
    }
  },
  preferences: {
    notifications: {
      email: { type: Boolean, default: true },
      sms: { type: Boolean, default: false },
      push: { type: Boolean, default: true }
    },
    language: {
      type: String,
      default: 'english',
      enum: ['english', 'hindi', 'tamil', 'telugu', 'bengali', 'marathi']
    }
  },
  lastLogin: {
    type: Date,
    default: null
  },
  joinedDate: {
    type: Date,
    default: Date.now
  }
}, {
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

// Virtual for user's rank (calculated field)
userSchema.virtual('rank').get(function() {
  // This would be calculated based on green points compared to other users
  return 42; // Placeholder value
});

// Index for better performance
userSchema.index({ email: 1 });
userSchema.index({ greenPoints: -1 });
userSchema.index({ city: 1 });

// Pre-save middleware to hash password
userSchema.pre('save', async function(next) {
  // Only hash the password if it has been modified (or is new)
  if (!this.isModified('password')) return next();
  
  try {
    // Hash password with cost of 12
    const hashedPassword = await bcrypt.hash(this.password, 12);
    this.password = hashedPassword;
    next();
  } catch (error) {
    next(error);
  }
});

// Method to check password
userSchema.methods.comparePassword = async function(candidatePassword) {
  return await bcrypt.compare(candidatePassword, this.password);
};

// Method to update green points and level
userSchema.methods.addGreenPoints = function(points) {
  this.greenPoints += points;
  
  // Update level based on points
  if (this.greenPoints >= 5000) {
    this.level = 'Sustainability Master';
  } else if (this.greenPoints >= 2000) {
    this.level = 'Eco Champion';
  } else if (this.greenPoints >= 500) {
    this.level = 'Green Warrior';
  } else {
    this.level = 'Eco Beginner';
  }
  
  return this.save();
};

// Method to add badge
userSchema.methods.addBadge = function(badgeName) {
  if (!this.badges.includes(badgeName)) {
    this.badges.push(badgeName);
    return this.save();
  }
  return Promise.resolve(this);
};

// Static method to find users by city
userSchema.statics.findByCity = function(city) {
  return this.find({ city: new RegExp(city, 'i'), isActive: true });
};

// Static method to get leaderboard
userSchema.statics.getLeaderboard = function(limit = 10) {
  return this.find({ isActive: true })
    .sort({ greenPoints: -1 })
    .limit(limit)
    .select('fullName greenPoints level city badges');
};

const User = mongoose.model('User', userSchema);

module.exports = User;