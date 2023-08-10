const express = require("express");
const ApplicationServices = require("./../services/application.service");
const { protectRoute, restrictTo } = require("./../controllers/auth");
const {
  applyToJob,
  getAllJobsApplicationForCurrentUser,
  getSingleJobApplication,
} = require("./../controllers/application");

const applicationServices = new ApplicationServices();

const router = express.Router();

router
  .route("/")
  .post(
    protectRoute,
    restrictTo("user"),
    applicationServices.uploadCVForApplication,
    applyToJob
  )
  .get(protectRoute, restrictTo("user"), getAllJobsApplicationForCurrentUser);

router
  .route("/:jobID")
  .get(protectRoute, restrictTo("user"), getSingleJobApplication);

module.exports = router;
