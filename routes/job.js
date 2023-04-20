const express = require("express");
const { getAllJobs } = require("./../controllers/job");
const { protectRoute } = require("./../controllers/auth");

const router = express.Router();

router.route("/").get(protectRoute, getAllJobs);

module.exports = router;
