const AppError = require("../utils/AppError");
const catchAsync = require("../utils/CatchAsync");
const ApplicationServices = require("./../services/application.service");

const applicationServices = new ApplicationServices();

const applyToJob = catchAsync(async (req, res, next) => {
  const userID = req.user._id;
  console.log(req.body);
  console.log(req);
  const { jobID } = req.body;
  const file = req.file;
  let cvFilePath;
  if (!jobID) {
    return next(
      new AppError("Please provide a job id in the request body!", 400)
    );
  }

  if (!file) {
    return next(new AppError("Please provide your CV", 400));
  }

  // const upload = await applicationServices.uploadCVForApplication.upload(
  //   req,
  //   res,
  //   function (err) {
  //     if (err) {
  //       return next(new AppError(`Failed  to uplaod cv": ${err}`, 404));
  //     } else {
  //       cvFilePath = req.file.path;
  //     }
  //   }
  // );
  cvFilePath = req.file.path;

  const application = await applicationServices.applyToJob(
    userID,
    jobID,
    cvFilePath
  );
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
      applied: application.jobs.length,
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
