// Importing neccessary modules
const jwt = require("jsonwebtoken");
const User = require("./../models/user");
const catchAsync = require("./../utils/CatchAsync");
const AppError = require("./../utils/AppError");

// Signing JWT Token
const signJWT = (id, role) => {
  const jwtSecret = process.env.JWT_SECRET;
  const jwtExpires = process.env.JWT_EXPIRES;
  return jwt.sign({ id, role }, jwtSecret, {
    expiresIn: jwtExpires,
  });
};

// Signup fucntion for users
const signup = catchAsync(async (req, res, next) => {
  const { name, email, password } = req.body;
  const user = await User.create({ name, email, password });
  if (!user) {
    return next(new AppError("Failed to create new user", 400));
  }
  const token = signJWT(user._id, user.role);
  res.json({
    status: "success",
    token,
    user,
  });
});

// Login function for users
const login = catchAsync(async (req, res, next) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return next(new AppError("Please provide emaill and password", 400));
  }
  const user = await User.findOne({ email: email }).select("+password");

  if (!user || !(await user.comparePassword(password, user.password))) {
    return next(new AppError("Invalid emaill address or password", 400));
  }

  const token = signJWT(user.id, user.role);

  res.status(200).json({
    status: "success",
    token,
    user,
  });
});

// Protect Route Functionalities
const protectRoute = catchAsync(async (req, res, next) => {
  let token = "";

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith(`Bearer`)
  ) {
    token = req.headers.authorization.split(" ")[1];
  }
  // Check if token exists
  if (!token) {
    return next(
      new AppError(
        "You are not logged in. Please log in to get access to this route!",
        401
      )
    );
  }

  const decoded = jwt.verify(token, process.env.JWT_SECRET);

  const user = await User.findById(decoded.id);

  // Check if user with the token exists
  if (!user) {
    return next(
      new AppError("The user the token belongs to does no longer exist")
    );
  }

  // Checks if user hasn't changed password after last login
  if (!user.passwordChangedAfter(decoded.iat)) {
    return next(
      new AppError(
        "The user has changed password after the last authorization. Please sign in again with your email and the new password!"
      )
    );
  }

  // Grant user access to the protected route
  req.user = user;
  next();
});

module.exports = { signup, login, protectRoute };
