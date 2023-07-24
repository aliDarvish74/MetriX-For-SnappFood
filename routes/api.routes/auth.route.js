const express = require("express");
const router = express.Router();

const {
  notLoggedIn,
  isLoggedIn,
} = require("../../middlewares/auth/authCheck.middleware");
const { userLogin, userLogout } = require("../../controllers/auth.controller");
const { loginValidator } = require("../../middlewares/auth/auth.validation");

router.post("/", notLoggedIn, loginValidator, userLogin);
router.get("/", isLoggedIn, userLogout);

module.exports = router;
