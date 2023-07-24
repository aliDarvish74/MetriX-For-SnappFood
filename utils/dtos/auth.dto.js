class LoginDto {
  constructor({ credentials, password }) {
    this.credentials = credentials;
    this.password = password;
  }
}

module.exports = { LoginDto };
