const Joi = require("joi");
const createError = require("http-errors");

const { LoginDto } = require("../../utils/dtos/auth.dto");
const {
  findUserByUsername,
  findUserByEmail,
} = require("../../services/user.service");

const loginValidationSchema = Joi.object({
  credentials: Joi.string().required().trim().min(3),
  password: Joi.string().required().min(8),
});

const loginValidator = async (req, res, next) => {
  try {
    const loginInfo = new LoginDto(req.body);
    const { error } = loginValidationSchema.validate(loginInfo, {
      abortEarly: false,
    });

    if (!!error) {
      const errorMessages = error.details
        .map((error) => error.message)
        .join("\n");
      return next(createError(400, errorMessages));
    }

    let targetUser = await findUserByUsername(loginInfo.credentials);
    if (!targetUser) {
      targetUser = await findUserByEmail(loginInfo.credentials);
    }
    if (!targetUser) {
      return next(createError(401, `Username or password doesn't match.`));
    }

    const isMatch = await targetUser.validatePassword(loginInfo.password);
    if (!isMatch) {
      return next(createError(401, `Username or password doesn't match.`));
    }
    res.locals.user = targetUser;
    next();
  } catch (error) {
    next(createError(500, "login validator > " + error));
  }
};

module.exports = { loginValidator };
