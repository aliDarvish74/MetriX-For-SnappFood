const express = require("express");
const router = express.Router();

const userRouter = require("./api.routes/user.route");
const authRoute = require("./api.routes/auth.route");

router.use("/user", userRouter);
router.use("/auth", authRoute);

module.exports = router;
