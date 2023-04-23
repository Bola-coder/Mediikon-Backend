// Importing neccessary modules
const jwt = require("jsonwebtoken");
const User = require("./../models/user");
const AuthServices = require("./../services/auth.service");
const catchAsync = require("./../utils/CatchAsync");
const AppError = require("./../utils/AppError");

const authServices = new AuthServices();

// Signup fucntion for users
const signup = catchAsync(async (req, res, next) => {
  const { name, email, password, role } = req.body;
  const user = await authServices.signup(name, email, password, role);
  if (!user) {
    return next(new AppError("Failed to create new user", 400));
  }
  const token = authServices.signJWT(user._id, user.role);
  res
    .cookie("access_token", token, {
      maxAge: 86400 * 1000, // 1 day in seconds. Defualt value is milliSeconds
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
    })
    .status(200)
    .json({
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
  const user = await authServices.login(email, password);
  if (user === null) {
    return next(new AppError("Invalid username or password", 401));
  }

  const token = authServices.signJWT(user.id, user.role);

  res
    .cookie("access_token", token, {
      maxAge: 86400 * 1000, // 1 day in seconds. Defualt value is milliSeconds
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
    })
    .status(200)
    .json({
      status: "success",
      token,
      user,
    });
});

// Protect Route Functionalities
const protectRoute = catchAsync(async (req, res, next) => {
  let token = "";

  // The code block commented below is for when I am sending the token back in the response object to be used on the client. Now I am using cookies
  // if (
  //   req.headers.authorization &&
  //   req.headers.authorization.startsWith(`Bearer`)
  // ) {
  //   token = req.headers.authorization.split(" ")[1];
  // }

  // This is where I am getting the token from the cookie.
  token = req.cookies.access_token;

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

const restrictTo = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return next(
        new AppError("You do not have permission to perform this action!")
      );
    }
    next();
  };
};

module.exports = { signup, login, protectRoute, restrictTo };
