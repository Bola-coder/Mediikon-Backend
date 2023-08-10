const express = require("express");
const {
  getAllJobs,
  createJobPosting,
  getSingleJobPosting,
  getOwnJob,
  updateJobPosting,
  deleteJobPosting,
} = require("./../controllers/job");
const { protectRoute, restrictTo } = require("./../controllers/auth");

const router = express.Router();

router
  .route("/")
  .get(protectRoute, getAllJobs)
  .post(protectRoute, restrictTo("hospital"), createJobPosting);

router
  .route("/:id")
  .get(getSingleJobPosting)
  .patch(protectRoute, restrictTo("hospital"), updateJobPosting)
  .delete(protectRoute, restrictTo("hospital"), deleteJobPosting);

router.route("/self/:id").get(protectRoute, restrictTo("hospital"), getOwnJob);

module.exports = router;
