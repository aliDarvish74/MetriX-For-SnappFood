const { ResponseDto } = require("../utils/dtos/response.dto");
const { ReadUserLoginDto } = require("../utils/dtos/user.dto");

const userLogin = async (req, res, next) => {
  const targetUser = res.locals.user;
  req.session.user = {
    userId: targetUser._id,
    role: targetUser.role,
  };

  res
    .status(200)
    .json(
      new ResponseDto(
        "success",
        "logged in successfully",
        new ReadUserLoginDto(res.locals.user)
      )
    );
};

const userLogout = async (req, res, next) => {
  req.session.destroy();
  res.status(204).json(new ResponseDto("success", "Signed out successfully."));
};

module.exports = { userLogin, userLogout };
