const mongoose = require("mongoose");

const appliCantSchema = mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  applicants: [
    {
      applicant: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
      applied: {
        type: Date,
        default: Date.now,
      },
    },
  ],
});
