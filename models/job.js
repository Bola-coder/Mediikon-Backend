const mongoose = require("mongoose");

const jobSchema = mongoose.Schema({
  reference: {
    type: mongoose.Schema.Types.ObjectId,
    required: [true, "Job posting should have a user reference"],
    ref: "User",
  },
  title: {
    type: String,
    required: [true, "Job should have a title"],
    trim: true,
    minLength: [10, "Job title should not have less than 10 characters"],
    maxLength: [50, "Job title should not have more than 50 characters"],
  },
  description: {
    type: String,
    required: [true, "Job should have a description"],
    trim: true,
  },
  EducationalRequirements: {
    type: [String],
    required: [true, "Job should have educational requirements"],
  },
  ExperienceRequirements: {
    type: [String],
    required: [true, "Job should have experience requirements"],
  },
  location: {
    type: String,
    required: [true, "Please provide the location for the job"],
  },
  creationDate: {
    type: Date,
    default: Date.now,
  },
  applicationDeadline: {
    type: Date,
  },
  salary: {
    type: Number,
    min: 0,
  },
});

const Jobs = mongoose.model("Jobs", jobSchema);

module.exports = Jobs;
