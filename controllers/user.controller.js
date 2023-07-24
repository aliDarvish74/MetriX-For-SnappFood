const createError = require("http-errors");

const { createNewUser, findUserById } = require("../services/user.service");

const createUser = async (req, res, next) => {
  try {
    const newUser = await createNewUser(req.body);

    res.status(201).json({
      status: "success",
      data: newUser,
    });
  } catch (error) {
    next(createError(500, "create user > " + error));
  }
};

const getUserById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const targetUser = await findUserById(id).populate("directManager", {
      fullname: 1,
    });
    res.status(200).json({
      status: "success",
      data: targetUser,
    });
  } catch (error) {
    next(createError(500, "get user by id > " + error));
  }
};

module.exports = {
  createUser,
  getUserById,
};
