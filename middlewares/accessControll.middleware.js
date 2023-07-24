const createError = require("http-errors");

const hasPermission = (...roles) => {
  return async (req, res, next) => {
    if (!roles.includes(req.session.user.role)) {
      return next(
        createError(403, "Access Denied! You have not permission to do this.")
      );
    }
    next();
  };
};

module.exports = { hasPermission };
