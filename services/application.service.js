const multer = require("multer");
const AppError = require("../utils/AppError");
const Applications = require("./../models/application");
const Jobs = require("./../models/job");

class ApplicationServices {
  /* This Service is to handle the logic for handling users applying to jobs and getting information about the jobs they have applied to */
  // users Apply to a job
  applyToJob = async (userID, jobID, cv) => {
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
      (appJob) => appJob.job == jobID //type unequal here hence the ""==""
    );
    console.log(jobIndex);
    if (jobIndex === -1) {
      // This means that the user hasn't applied to the job he is trying to apply to now
      application.jobs.push({ job: jobID, cv: cv }); //TODO: add hospitalID and cv
    } else {
      throw new AppError("You have already applied to this job opening", 404);
    }
    await application.save();
    return application;
  };

  //  Get a all jobs from application
  getAllJobsFromApplication = async (userID) => {
    const application = await Applications.findOne({ user: userID }).populate(
      "jobs.job",
      "reference title description location"
    );

    if (!application) {
      throw new AppError(
        `Failed to get job application for the specified userID.`,
        404
      );
    }
    return application;
  };

  //   GetSingleJobApplication
  getSingleJobApplication = async (userID, jobID) => {
    const application = await Applications.findOne({ user: userID }).populate(
      "jobs.job",
      "title description location"
    );
    console.log(application);
    const job = application.jobs.find((job) => job.job._id == jobID);

    if (!job) {
      throw new AppError(
        `No application for the user with the specified userID or invalid Job ID`,
        404
      );
    }
    return job;
  };

  // Upload CV to application
  uploadCVForApplication = async () => {
    const cvStorage = multer.diskStorage({
      destination: (req, file, cb) => {
        cb(null, "/uploads/cv");
      },
      filename: (req, file, cb) => {
        cb(
          null,
          file.originalname + Date.now() + path.extname(file.originalname)
        );
      },
    });

    // Creating a filter to only accept pdf files
    const checkFileType = (req, file, cb) => {
      const fileTypes = /pdf/;

      // Checking for file extension
      const extname = fileTypes.test(
        path.extname(file.originalname).toLowerCase()
      );

      // Check mime type
      const mimetype = filetypes.test(file.mimetype);
      if (extname && mimetype) {
        return cb(null, true);
      } else {
        return cb("Error: PDF files only");
      }
    };

    // Creating a function to upload the file
    let upload = multer({
      storage: cvStorage,
      fileFilter: checkFileType,
    });

    // upload = upload.single("cv");
    // console.log(upload);
    // Return the upload function for use in controlelr / route
    return { upload: upload.single("cv") };
  };
}

module.exports = ApplicationServices;
