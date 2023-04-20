const getAllJobs = (req, res, next) => {
  res.status(200).json({
    status: "success",
    message: "Testing protected route",
  });
};

module.exports = { getAllJobs };
