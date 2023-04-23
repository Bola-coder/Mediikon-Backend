const AppError = require("../utils/AppError");
const Applications = require("./../models/application");
const Jobs = require("./../models/job");

class ApplicationServices {
  // users Apply to a job
  applyToJob = async (userID, jobID) => {
    const job = await Jobs.findById(jobID);
    if (!job) {
      throw new AppError("Job with the specified ID is not found!", 404);
    }

    // Get the applications for the User with the supplied UserID
    let application = await Applications.findOne({ user: userID });
    if (!application) {
      // If the user doesn't have any existing applications
      // Create a new application for the user witht the specified id
      application = await Applications.create({ user: userID });
    }

    // Check if the user has already applied to the job already
    const jobIndex = application.jobs.findIndex(
      (appJob) => appJob.job == jobID
    );
    console.log(jobIndex);
    if (jobIndex === -1) {
      // This means that the user hasn't applied to the job he is trying to apply to now
      application.jobs.push({ job: jobID });
    } else {
      throw new AppError("You have already applied to this job opening");
    }
    await application.save();
    return application;
  };
}

module.exports = ApplicationServices;