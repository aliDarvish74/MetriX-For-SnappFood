const createError = require("http-errors");

const notSignedIn = async (req, res, next) => {
  if (!!req.session.userId) {
    return next(
      createError(409, "You Signed In before! Please sign out first.")
    );
  }
  next();
};

module.exports = {
  notSignedIn,
};
