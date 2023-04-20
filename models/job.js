const mongoose = require("mongoose");

const jobSchema = mongoose.Schema({
  reference: {
    type: mongoose.Schema.Types.ObjectId,
    required: [true, "A job posting should have a user reference"],
    ref: "User",
  },
  title: {
    type: String,
    required: [true, "A job should have a title"],
    trim: true,
    minLength: [10, "A job title should not have less than 10 characters"],
    maxLength: [50, "A job title should not have more than 50 characters"],
  },
  description: {
    type: String,
    required: [true, "A job should have a description"],
    trim: true,
  },
  requirements: {
    type: [String],
    required: [true, "A job should have requirements"],
  },
  applicationEndDate: {
    type: Date,
  },
  salary: {
    type: Number,
    min: 0,
  },
});

const Jobs = mongoose.model("Jobs", jobSchema);

module.exports = Jobs;
