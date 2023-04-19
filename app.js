const express = require("express");
const morgan = require("morgan");

const AppError = require("./utils/AppError");
const ErrorMiddleware = require("./middlewares/Error");
const authRouter = require("./routes/auth");

const app = express();

if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

app.use(express.json());

// Routes
app.use("/auth", authRouter);

// Error Handling
app.all("*", (req, res, next) => {
  const error = new AppError(
    `Cant find ${req.originalUrl} on this server!`,
    404
  );
  next(error);
});
app.use(ErrorMiddleware);

module.exports = app;
