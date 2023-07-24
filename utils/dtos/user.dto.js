class ReadUserLoginDto {
  constructor({ _id, fullname, username, role }) {
    this._id = _id;
    this.fullname = fullname;
    this.username = username;
    this.role = role;
  }
}

module.exports = { ReadUserLoginDto };
