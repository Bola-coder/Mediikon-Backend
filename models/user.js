const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const userSchema = mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please provide a name"],
    trim: true,
  },
  email: {
    type: String,
    required: [true, "Please provide an email address"],
    unique: [true, "Please provide a unique email address"],
    trim: true,
  },
  password: {
    type: String,
    required: true,
    minLength: [8, "Password should have a minimum of 8 characters"],
    select: false,
  },
  image: {
    type: String,
  },
  role: {
    type: String,
    enum: ["user", "hospital", "school", "admin"],
    default: "user",
  },
  active: {
    type: Boolean,
    default: true,
    select: false,
  },
  passwordChangedAt: {
    type: Date,
  },
});

// Pre save hook to hash password
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  const salt = bcrypt.genSalt(12);
  this.password = await bcrypt.hash(this.password, 12);
  next();
});

// Pre save hook to update the passwordChangedAt filed if password has been modified
userSchema.pre("save", function (next) {
  if (!this.isModified("password") || this.isNew) return next();
  this.passwordChangedAt = Date.now() - 2000;
});

// Instance method to check user supplied password to see if it matches with the hashed one in the database
userSchema.methods.comparePassword = async function (
  enteredPassword,
  dbPassword
) {
  return await bcrypt.compare(enteredPassword, dbPassword);
};

// Instance method to check if password has been changed after the last time token was generated
userSchema.methods.passwordChangedAfter = async function (jwtTimestamp) {
  if (this.passwordChangedAt) {
    const changedTimestamp = parseInt(
      this.passwordChangedAt.getTime() / 100,
      10
    );
    return jwtTimestamp < changedTimestamp;
  }
  return false;
};

const User = mongoose.model("User", userSchema);

module.exports = User;
