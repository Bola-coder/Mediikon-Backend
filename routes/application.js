const express = require("express");
const { protectRoute, restrictTo } = require("./../controllers/auth");
const { applyToJob } = require("./../controllers/application");

const router = express.Router();

router.route("/").post(protectRoute, restrictTo("user"), applyToJob);

module.exports = router;
