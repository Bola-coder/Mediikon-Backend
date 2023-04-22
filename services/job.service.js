const Jobs = require("./../models/job");

class JobService {
  getAllJobs = async () => {
    const jobs = await Jobs.find();
    if (!jobs) {
      return null;
    }
    return jobs;
  };

  createNewJob = async (
    reference,
    title,
    description,
    requirements,
    applicationDeadline,
    salary
  ) => {
    const job = await Jobs.create({
      reference,
      title,
      description,
      requirements,
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
    const jobs = await Jobs.find({ reference: id });
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

module.exports = JobService;