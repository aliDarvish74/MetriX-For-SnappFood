const User = require("../dataBase/models/user.model");
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

module.exports = {
  findUserById,
  findUserByUsername,
  findUserByEmail,
  createNewUser,
};
