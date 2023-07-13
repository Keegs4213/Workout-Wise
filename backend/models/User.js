//models/User.js

const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const bcrypt = require("bcrypt");

const userSchema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  fitnessGoal: { type: String },
  fitnessLevel: { type: String },
  workoutPlan: { type: Object },
  nutritionPlan: { type: Object }
});

userSchema.methods.validatePassword = async function(enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password)
}

userSchema.pre('save', async function(next) {
  if(!this.isModified('password')) {
    next();
  } else {
    this.password = await bcrypt.hash(this.password, 10);
    next();
  }
});

module.exports = mongoose.model("User", userSchema);
