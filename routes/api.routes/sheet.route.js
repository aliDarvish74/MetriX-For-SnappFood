const express = require("express");
const router = express.Router();

const { getMyPerformance } = require("../../controllers/sheet.controller");
const { isLoggedIn } = require("../../middlewares/auth/authCheck.middleware");

router.get("/me", isLoggedIn, getMyPerformance);

module.exports = router;
