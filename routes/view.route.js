const express = require("express");
const { getAuthPage } = require("../controllers/view.controller");
const router = express.Router();

router.get("/auth", getAuthPage);
router.get("/dashboard");

module.exports = router;
