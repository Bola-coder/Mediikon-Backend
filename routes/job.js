const express = require("express");
const {
  getAllJobs,
  createJobPosting,
  getSingleJobPosting,
  getOwnJob,
} = require("./../controllers/job");
const { protectRoute } = require("./../controllers/auth");

const router = express.Router();

router
  .route("/")
  .get(protectRoute, getAllJobs)
  .post(protectRoute, createJobPosting);

router.route("/self").get(protectRoute, getOwnJob);

router.route("/:id").get(getSingleJobPosting);

module.exports = router;
