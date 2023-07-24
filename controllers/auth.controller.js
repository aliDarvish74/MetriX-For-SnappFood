const { ResponseDto } = require("../utils/dtos/response.dto");
const { ReadUserLoginDto } = require("../utils/dtos/user.dto");

const userLogin = async (req, res, next) => {
  const targetUser = res.locals.user;
  req.session.userId = targetUser._id;

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

module.exports = { userLogin };
