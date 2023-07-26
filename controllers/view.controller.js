const createError = require("http-errors");

const getAuthPage = (req, res, next) => {
  if (!!req.session.user) {
    res.redirect(`/dashboard?userId=${req.session.user.userId}`);
  }
  res.render("auth.page.ejs");
};

const getUserDashboard = (req, res, next) => {
  if (!req.session.user) {
    res.redirect("/auth");
  }
  res.render("dashboard.page.ejs");
};
module.exports = { getAuthPage, getUserDashboard };
