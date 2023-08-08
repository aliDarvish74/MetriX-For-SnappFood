const express = require("express");
const router = express.Router();

const userRouter = require("./api.routes/user.route");
const authRoute = require("./api.routes/auth.route");
const sheetRoute = require("./api.routes/sheet.route");

router.use("/user", userRouter);
router.use("/auth", authRoute);
router.use("/sheet", sheetRoute);

module.exports = router;
