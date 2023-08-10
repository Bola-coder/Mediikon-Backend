const mongoose = require("mongoose");

const applicationSchema = mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  jobs: [
    {
      hospitalID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
      job: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Jobs",
      },
      cv: {
        type: String,
        required: [true, "Please upload a cv for the job application"],
      },
      DateApplied: {
        type: Date,
        default: Date.now,
      },
      status: {
        type: String,
        enum: ["applied", "viewedByEmployee", "rejected", "invitedToInterview"],
        default: "applied",
      },
    },
  ],
});

const Applications = mongoose.model("Applications", applicationSchema);

module.exports = Applications;
