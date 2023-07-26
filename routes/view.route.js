const express = require("express");
const {
  getAuthPage,
  getUserDashboard,
} = require("../controllers/view.controller");
const router = express.Router();

router.get("/auth", getAuthPage);
router.get("/dashboard", getUserDashboard);

module.exports = router;
