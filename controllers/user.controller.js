const createError = require("http-errors");

const { createNewUser } = require("../services/user.service");
const { ReadUserInfoDto, CreateUserDto } = require("../utils/dtos/user.dto");
const { ResponseDto } = require("../utils/dtos/response.dto");

const createUser = async (req, res, next) => {
  try {
    const newUser = await createNewUser(new CreateUserDto(req.body));
    req.session.user = {
      userId: targetUser._id,
      role: targetUser.role,
    };
    res
      .status(201)
      .json(
        new ResponseDto(
          "Success",
          "New user created successfully",
          new ReadUserInfoDto(newUser)
        )
      );
  } catch (error) {
    next(createError(500, "create user > " + error));
  }
};

const getUserById = async (req, res, next) => {
  try {
    res
      .status(200)
      .json(
        new ResponseDto(
          "Success",
          "User found successfully",
          new ReadUserInfoDto(res.locals.user)
        )
      );
  } catch (error) {
    next(createError(500, "get user by id > " + error));
  }
};

module.exports = {
  createUser,
  getUserById,
};
