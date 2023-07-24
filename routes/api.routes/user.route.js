const express = require("express");
const router = express.Router();

const {
  createUser,
  getUserById,
} = require("../../controllers/user.controller");
const { isLoggedIn } = require("../../middlewares/auth/authCheck.middleware");
const {
  hasPermission,
} = require("../../middlewares/accessControll.middleware");
const {
  createUserValidator,
} = require("../../middlewares/user/user.validation");
const {
  checkDuplicateCreateUser,
} = require("../../middlewares/user/duplicateCheck.middleware");

router.post(
  "/",
  isLoggedIn,
  hasPermission("Team Lead", "Supervisor", "Manager"),
  createUserValidator,
  checkDuplicateCreateUser,
  createUser
);
router.get("/:id", getUserById);

module.exports = router;
