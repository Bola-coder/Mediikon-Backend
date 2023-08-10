const Jobs = require("./../models/job");

class JobServices {
  getAllJobs = async () => {
    const jobs = await Jobs.find();
    if (!jobs) {
      return null;
    }
    return jobs;
  };

  createNewJob = async (
    hospitalReference,
    title,
    description,
    EducationalRequirements,
    ExperienceRequirements,
    location,
    applicationDeadline,
    salary
  ) => {
    const job = await Jobs.create({
      hospitalReference,
      title,
      description,
      EducationalRequirements,
      ExperienceRequirements,
      location,
      applicationDeadline,
      salary,
    });
    if (!job) {
      return null;
    }
    return job;
  };

  getSingleJob = async (id) => {
    const job = await Jobs.findById(id);
    if (!job) {
      return null;
    }
    return job;
  };

  getOwnJobs = async (id) => {
    const jobs = await Jobs.find({ hospitalReference: id });
    console.log(jobs);
    if (!jobs) {
      return null;
    }
    return jobs;
  };

  updateJobPosting = async (id, body) => {
    const job = await Jobs.findByIdAndUpdate(id, body, {
      new: true,
      runValidators: true,
    });
    if (!job) {
      return null;
    }
    return job;
  };

  deleteJobPosting = async (id) => {
    const job = await Jobs.findByIdAndDelete(id);
    if (!job) {
      return null;
    }
    return job;
  };
}

module.exports = JobServices;
