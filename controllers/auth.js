// Importing neccessary modules
const User = require("./../models/user");
const catchAsync = require("./../utils/CatchAsync");
const AppError = require("./../utils/AppError");

const signup = catchAsync(async (req, res, next) => {
  const { name, email, password } = req.body;
  const user = await User.create({ name, email, password });
  if (!user) {
    return next(new AppError("Failed to create new user", 400));
  }
  res.json({
    status: "success",
    user,
  });
});

module.exports = { signup };
