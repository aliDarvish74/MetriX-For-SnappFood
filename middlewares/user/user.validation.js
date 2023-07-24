const Joi = require("joi");
const createError = require("http-errors");

const { CreateUserDto } = require("../../utils/dtos/user.dto");
const { findUserByUsername } = require("../../services/user.service");

const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d).*$/;
const phoneNumberRegex = /^(0|\+98)9\d{9}$/;
const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,})+$/;

const createUserValidationSchema = Joi.object({
  fullname: Joi.string().required().trim().min(3).max(40),
  username: Joi.string().required().trim().min(3).max(40),
  password: Joi.string().required().min(8).regex(passwordRegex),
  email: Joi.string().required().trim().regex(emailRegex),
  hireDate: Joi.date().required(),
  voip: Joi.number().required(),
  task: Joi.string()
    .valid("Voice Mail", "Jira", "Project", "Finance", "not-set")
    .default("not-set"),
  birthDate: Joi.date().default("2005-01-01"),
  shift: Joi.object({
    start: Joi.string().required().trim(),
    end: Joi.string().required().trim(),
  }),
  offGroup: Joi.string()
    .valid("A", "B", "C", "D", "E", "not-set")
    .default("not-set"),
  directManager: Joi.string().trim().length(24),
  nationalCode: Joi.string().required().trim().length(10),
  phoneNumber: Joi.string().required().trim().regex(phoneNumberRegex),
  restTime: Joi.string().default("not-set"),
  role: Joi.string()
    .valid("Agent", "Coordinator", "Team Lead", "Supervisor", "Manager")
    .default("Agent"),
});

const createUserValidator = async (req, res, next) => {
  try {
    const newUserInfo = new CreateUserDto(req.body);

    const { error } = createUserValidationSchema.validate(newUserInfo, {
      abortEarly: false,
    });
    if (!!error) {
      const errorMessages = error.details
        .map((error) => error.message)
        .join("\n");
      return next(createError(400, errorMessages));
    }
    next();
  } catch (error) {
    next(createError(500, "create user validation > " + error.message));
  }
};

module.exports = { createUserValidator };
