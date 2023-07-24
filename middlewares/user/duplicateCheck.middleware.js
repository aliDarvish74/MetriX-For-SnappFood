const createError = require("http-errors");

const { CreateUserDto } = require("../../utils/dtos/user.dto");
const {
  findUserByUsername,
  findUserByPhoneNumber,
  findUserByEmail,
  findUserByVoip,
  findUserByNationalCode,
} = require("../../services/user.service");

const checkDuplicateCreateUser = async (req, res, next) => {
  try {
    const newUserInfo = new CreateUserDto(req.body);

    const duplicateUsername = await findUserByUsername(newUserInfo.username);
    if (!!duplicateUsername) {
      return next(
        createError(409, `${duplicateUsername.username} already taken before.`)
      );
    }

    const duplicatephoneNumber = await findUserByPhoneNumber(
      newUserInfo.phoneNumber
    );
    if (!!duplicatephoneNumber) {
      return next(
        createError(
          409,
          `${duplicatephoneNumber.phoneNumber} already taken before.`
        )
      );
    }

    const duplicateEmail = await findUserByEmail(newUserInfo.email);
    if (!!duplicateEmail) {
      return next(
        createError(409, `${duplicateEmail.email} already taken before.`)
      );
    }

    const duplicateNationalCode = await findUserByNationalCode(
      newUserInfo.nationalCode
    );
    if (!!duplicateNationalCode) {
      return next(
        createError(
          409,
          `${duplicateNationalCode.nationalCode} already taken before.`
        )
      );
    }
    const duplicatevoip = await findUserByVoip(Number(newUserInfo.voip));
    if (!!duplicatevoip) {
      return next(
        createError(409, `${duplicatevoip.voip} already taken before.`)
      );
    }
    next();
  } catch (error) {}
};
module.exports = { checkDuplicateCreateUser };
