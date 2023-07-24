const createError = require("http-errors");

const notLoggedIn = async (req, res, next) => {
  if (!!req.session.user) {
    return next(
      createError(409, "You Signed In before! Please sign out first.")
    );
  }
  next();
};

const isLoggedIn = async (req, res, next) => {
  if (!req.session.user) {
    return next(createError(401, "Unathorized! Please sign in first."));
  }
  next();
};

module.exports = {
  notLoggedIn,
  isLoggedIn,
};
