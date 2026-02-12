import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Name is required'],
    trim: true,
    minlength: [2, 'Name must be at least 2 characters long']
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    unique: true,
    lowercase: true,
    trim: true,
    match: [/^\S+@\S+\.\S+$/, 'Please provide a valid email address']
  },
  password: {
    type: String,
    required: [true, 'Password is required'],
    minlength: [6, 'Password must be at least 6 characters long']
  },
  level: {
    type: Number,
    default: 1,
    min: 1
  },
  totalXP: {
    type: Number,
    default: 0,
    min: 0
  },
  streak: {
    type: Number,
    default: 0,
    min: 0
  },
  lastActiveDate: {
    type: Date,
    default: Date.now
  }
}, {
  timestamps: true
});

// Method to calculate level from XP
userSchema.methods.calculateLevel = function() {
  this.level = Math.floor(this.totalXP / 100) + 1;
  return this.level;
};

// Method to add XP and recalculate level
userSchema.methods.addXP = function(xp) {
  this.totalXP += xp;
  this.calculateLevel();
  return this.totalXP;
};

// Method to update streak
userSchema.methods.updateStreak = function() {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  
  const lastActive = new Date(this.lastActiveDate);
  lastActive.setHours(0, 0, 0, 0);
  
  const diffTime = today - lastActive;
  const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
  
  if (diffDays === 1) {
    // Yesterday - increment streak
    this.streak += 1;
  } else if (diffDays > 1) {
    // Gap > 1 day - reset streak
    this.streak = 1;
  }
  // If diffDays === 0 (same day), don't change streak
  
  this.lastActiveDate = new Date();
  return this.streak;
};

const User = mongoose.model('User', userSchema);

export default User;
