const createError = require("http-errors");

const User = require("../dataBase/models/user.model");
const { CreateUserDto } = require("../utils/dtos/user.dto");

const createNewUser = async (userData) => {
  const newUser = new User(userData);
  return newUser.save();
};

const findUserById = (userId) => {
  return User.findById(userId);
};
const findUserByUsername = (username) => {
  return User.findOne({ username });
};
const findUserByEmail = (email) => {
  return User.findOne({ email });
};
const findUserByPhoneNumber = (phoneNumber) => {
  phoneNumber = phoneNumber.startsWith("0")
    ? "+98" + phoneNumber.slice(1)
    : phoneNumber;
  return User.findOne({ phoneNumber });
};
const findUserByVoip = (voip) => {
  return User.findOne({ voip });
};
const findUserByNationalCode = (nationalCode) => {
  return User.findOne({ nationalCode });
};

const adminGenerator = async () => {
  try {
    const adminInfo = new CreateUserDto({
      fullname: process.env.ADMIN_FULLNAME,
      username: process.env.ADMIN_USERNAME,
      password: process.env.ADMIN_PASSWORD,
      email: process.env.ADMIN_EMAIL,
      hireDate: process.env.ADMIN_HIREDATE,
      voip: process.env.ADMIN_VOIP,
      birthDate: process.env.ADMIN_BIRTHDATE,
      shift: {
        start: process.env.ADMIN_SHIFTSTART,
        end: process.env.ADMIN_SHIFTEND,
      },
      nationalCode: process.env.ADMIN_NATIONALCODE,
      phoneNumber: process.env.ADMIN_PHONENUMBER,
      role: process.env.ADMIN_ROLE,
    });
    const duplicateAdmin = await findUserByUsername(adminInfo.username);
    if (!duplicateAdmin) {
      const newAdmin = await createNewUser(adminInfo);
    }
  } catch (error) {
    console.log(createError(500, "admin generator > " + error));
  }
};

module.exports = {
  findUserById,
  findUserByUsername,
  findUserByEmail,
  findUserByPhoneNumber,
  findUserByVoip,
  findUserByNationalCode,
  createNewUser,
  adminGenerator,
};
