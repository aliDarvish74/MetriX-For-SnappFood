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

const hasAccess = (...roles) => {
  return async (req, res, next) => {
    const { id } = req.params;
    console.log(id, req.session.user.userId);
    console.log(id === req.session.user.userId);
    if (
      !(req.session.user.userId === id) &&
      !roles.includes(req.session.user.role)
    ) {
      return next(
        createError(403, "Access Denied! You have not access to this route.")
      );
    }
    next();
  };
};
module.exports = { hasPermission, hasAccess };
