// const Jobs = require("./../models/job");
const JobService = require("./../services/job.service");
const catchAsync = require("./../utils/CatchAsync");
const AppError = require("./../utils/AppError");

const jobService = new JobService();

// Get All Jobs
const getAllJobs = catchAsync(async (req, res, next) => {
  const jobs = await jobService.getAllJobs();
  if (!jobs) {
    return next(new AppError("Failed to get jobs listings", 404));
  }
  res.status(200).json({
    status: "success",
    results: jobs.length,
    jobs,
  });
});

// Create a new Job posting
const createJobPosting = catchAsync(async (req, res, next) => {
  const { title, description, requirements, applicationDeadline, salary } =
    req.body;
  const reference = req.user.id;

  const job = await jobService.createNewJob(
    reference,
    title,
    description,
    requirements,
    applicationDeadline,
    salary
  );
  if (!job) {
    return next(new AppError("Failed to create new job posting!", 404));
  }
  res.status(200).json({
    status: "success",
    job,
  });
});

// Get a single Job Posting
const getSingleJobPosting = catchAsync(async (req, res, next) => {
  const { id } = req.params;

  const job = await jobService.getSingleJob(id);

  if (!job) return next(new AppError("Jobw with specified id doesn't exist!"));

  res.status(200).json({
    status: "success",
    job,
  });
});

// Get Job posted by currently logged in Hospital
const getOwnJob = catchAsync(async (req, res, next) => {
  const jobs = await jobService.getOwnJobs(req.params.id);
  if (!jobs) {
    return next(new AppError("Failed to get jobs listings", 404));
  }
  res.status(200).json({
    status: "success",
    results: jobs.length,
    jobs,
  });
});

// Update A Job Posting
const updateJobPosting = catchAsync(async (req, res, next) => {
  if (!Object.keys(req.body).length) {
    return next(
      new AppError("Please provide a request body for fields to update", 400)
    );
  }
  const job = await jobService.updateJobPosting(req.params.id, req.body);

  if (!job) {
    return next(new AppError("Failed to uodate job posting!", 404));
  }

  res.status(200).json({
    status: "success",
    job,
  });
});

// Delete Job Posting
const deleteJobPosting = catchAsync(async (req, res, next) => {
  const job = await jobService.deleteJobPosting(req.params.id);

  if (!job) {
    return next(
      new AppError("Failed to delete product with the specified id", 404)
    );
  }

  res.status(200).json({
    status: "success",
    message: "Job psoting deleted successfully!",
  });
});

module.exports = {
  getAllJobs,
  createJobPosting,
  getSingleJobPosting,
  getOwnJob,
  updateJobPosting,
  deleteJobPosting,
};
