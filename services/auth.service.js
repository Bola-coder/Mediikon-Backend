const jwt = require("jsonwebtoken");
const User = require("../models/user");
const AppError = require("../utils/AppError");

class AuthServices {
  // Create JSONWEBTOKEN
  signJWT = (id, role) => {
    const jwtSecret = process.env.JWT_SECRET;
    const jwtExpires = process.env.JWT_EXPIRES;
    return jwt.sign({ id, role }, jwtSecret, {
      expiresIn: jwtExpires,
    });
  };

  //   Signup user
  signup = async (name, email, password, role) => {
    const user = await User.create({ name, email, password, role });
    return user;
  };

  //   Login user
  login = async (email, password) => {
    const user = await User.findOne({ email: email }).select("+password");
    if (!user || !(await user.comparePassword(password, user.password))) {
      return null;
    }
    return user;
  };

  // Logout user
  logout = async () => {
    // Logout functionality
  };
}

module.exports = AuthServices;
