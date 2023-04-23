const AppError = require("../utils/AppError");
const catchAsync = require("../utils/CatchAsync");
const ApplicationServices = require("./../services/application.service");

const applicationServices = new ApplicationServices();

const applyToJob = catchAsync(async (req, res, next) => {
  const userID = req.user._id;
  const { jobID } = req.body;
  if (!jobID) {
    return next(new AppError("Please provide a job id in the request body!"));
  }

  const application = await applicationServices.applyToJob(userID, jobID);
  if (!application) {
    return next(new AppError("Failed to create new application"));
  }
  res.status(200).json({
    status: "success",
    application,
  });
});

const getAllJobsApplicationForCurrentUser = catchAsync(
  async (req, res, next) => {
    const userID = req.user._id;
    const application = await applicationServices.getAllJobsFromApplication(
      userID
    );
    res.status(200).json({
      status: "success",
      application,
    });
  }
);

const getSingleJobApplication = catchAsync(async (req, res, next) => {
  const userID = req.user._id;
  const { jobID } = req.params;

  const application = await applicationServices.getSingleJobApplication(
    userID,
    jobID
  );

  res.status(200).json({
    status: "success",
    application,
  });
});

module.exports = {
  applyToJob,
  getAllJobsApplicationForCurrentUser,
  getSingleJobApplication,
};
