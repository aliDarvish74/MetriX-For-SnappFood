const createError = require("http-errors");
const { findUserById } = require("../../services/user.service");

const existUser = async (req, res, next) => {
  try {
    const { id } = req.params;
    const targetUser = await findUserById(id).populate("directManager", {
      fullname: 1,
    });
    if (!targetUser) {
      return next(createError(404, `User with id: ${id} not found.`));
    }
    res.locals.user = targetUser;
    return next();
  } catch (error) {
    return next(createError(500, "exist user > " + error));
  }
};

module.exports = { existUser };
