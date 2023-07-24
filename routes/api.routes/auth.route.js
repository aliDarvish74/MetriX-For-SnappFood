const express = require("express");
const router = express.Router();

const { notSignedIn } = require("../../middlewares/auth/authCheck.middleware");
const { userLogin } = require("../../controllers/auth.controller");
const { loginValidator } = require("../../middlewares/auth/auth.validation");

router.post("/", notSignedIn, loginValidator, userLogin);

module.exports = router;
