class ReadUserLoginDto {
  constructor({ _id, fullname, username, role }) {
    this._id = _id;
    this.fullname = fullname;
    this.username = username;
    this.role = role;
  }
}

class ReadUserInfoDto {
  constructor({
    _id,
    fullname,
    username,
    email,
    hireDate,
    voip,
    task = "not-set",
    birthDate = new Date("2005-01-01"),
    shift,
    offGroup = "not-set",
    nationalCode,
    phoneNumber,
    restTime = "not-set",
    role = "Agent",
  }) {
    this._id = _id;
    this.fullname = fullname;
    this.username = username;
    this.email = email;
    this.hireDate = hireDate;
    this.voip = voip;
    this.task = task;
    this.birthDate = birthDate;
    this.shift = shift;
    this.offGroup = offGroup;
    this.nationalCode = nationalCode;
    this.phoneNumber = phoneNumber;
    this.restTime = restTime;
    this.role = role;
  }
}

class CreateUserDto {
  constructor({
    fullname,
    username,
    password,
    email,
    hireDate,
    voip,
    task = "not-set",
    birthDate = new Date("2005-01-01"),
    shift,
    offGroup = "not-set",
    nationalCode,
    phoneNumber,
    restTime = "not-set",
    role = "Agent",
  }) {
    this.fullname = fullname;
    this.username = username;
    this.password = password;
    this.email = email;
    this.hireDate = hireDate;
    this.voip = voip;
    this.task = task;
    this.birthDate = birthDate;
    this.shift = shift;
    this.offGroup = offGroup;
    this.nationalCode = nationalCode;
    this.phoneNumber = phoneNumber;
    this.restTime = restTime;
    this.role = role;
  }
}
module.exports = { ReadUserLoginDto, ReadUserInfoDto, CreateUserDto };
