const createError = require("http-errors");

const getAuthPage = (req, res, next) => {
  res.render("auth.page.ejs");
};

const getUserDashboard = (req, res, next) => {
  res.render("dashboard.page.ejs");
};
module.exports = { getAuthPage, getUserDashboard };
