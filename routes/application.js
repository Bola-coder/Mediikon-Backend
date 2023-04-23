const express = require("express");
const { protectRoute, restrictTo } = require("./../controllers/auth");
const {
  applyToJob,
  getAllJobsApplicationForCurrentUser,
  getSingleJobApplication,
} = require("./../controllers/application");

const router = express.Router();

router
  .route("/")
  .post(protectRoute, restrictTo("user"), applyToJob)
  .get(protectRoute, restrictTo("user"), getAllJobsApplicationForCurrentUser);

router
  .route("/:jobID")
  .get(protectRoute, restrictTo("user"), getSingleJobApplication);

module.exports = router;
