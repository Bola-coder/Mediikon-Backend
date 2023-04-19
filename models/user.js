const mongoose = require("mongoose");

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
});

const User = mongoose.model("User", userSchema);

module.exports = User;
