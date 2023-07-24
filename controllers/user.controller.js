const createError = require("http-errors");

const { createNewUser, findUserById } = require("../services/user.service");
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
