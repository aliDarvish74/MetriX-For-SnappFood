const { Schema, model } = require("mongoose");
const { hash, genSalt, compare } = require("bcryptjs");
const createError = require("http-errors");

const UserSchema = new Schema({
  fullname: {
    type: String,
    required: [true, "DB: Fullname is required"],
    minlength: [3, "DB: Fullname must be equal or more than 3 characters"],
    maxlength: [40, "DB: Fullname must be equal or less than 40 characters"],
    trim: true,
  },
  username: {
    type: String,
    unique: [true, "DB: Username must be unique"],
    required: [true, "DB: Username is required"],
    minlength: [3, "DB: Username must be equal or more than 3 characters"],
    maxlength: [40, "DB: Username must be equal or less than 40 characters"],
    trim: true,
  },
  password: {
    type: String,
    required: [true, "DB: Password is required"],
    validate: {
      validator: (value) => {
        if (!value.match(/^(?=.*[A-Za-z])(?=.*\d).*$/)) {
          return false;
        }
        return true;
      },
      message: `DB: Please Enter a more than 8 character and at least one digit and one character`,
    },
  },
  email: {
    type: String,
    required: [true, "DB: Email address is required"],
    unique: [true, "DB: Email address must be unique"],
    validate: {
      validator: (value) => {
        if (!value.match(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,})+$/)) {
          return false;
        }
        return true;
      },
      message: `DB: Please Enter a valid email address.`,
    },
  },
  hireDate: {
    type: Date,
    required: [true, "DB: Hire date is required"],
  },
  voip: {
    type: Number,
    unique: [true, "DB: Voip number must be unique"],
    required: [true, "DB: Voip number is required"],
  },
  task: {
    type: String,
    enum: ["Voice Mail", "Jira", "Project", "Finance", "not-set"],
    default: "not-set",
  },
  birthDate: {
    type: Date,
    default: new Date("2005-01-01"),
  },
  shift: {
    start: {
      type: String,
      required: [true, "DB: Shift start is required"],
    },
    end: {
      type: String,
      required: [true, "DB: Shift end is required"],
    },
  },
  offGroup: {
    type: String,
    enum: ["A", "B", "C", "D", "E", "not-set"],
    default: "not-set",
  },
  directManager: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  nationalCode: {
    type: String,
    unique: [true, "DB: National code must be unique"],
    required: [true, "DB: National code is required"],
    length: [10, "DB: National code's length must be equal to 10 characters"],
    trim: true,
  },
  phoneNumber: {
    type: String,
    unique: [true, "DB: Phone number must be unique"],
    required: [true, "DB: Phone number is required"],
  },
  restTime: {
    type: String,
    default: "not-set",
  },
  role: {
    type: String,
    enum: ["Agent", "Coordinator", "Team Lead", "Supervisor", "Manager"],
    default: "Agent",
  },
  avatar: {
    type: String,
    default: "user-default-avatar.png",
  },
});

UserSchema.pre("save", async function (next) {
  try {
    if (!this.isNew && !this.isModified("password")) return next();
    const salt = await genSalt(10);
    this.password = await hash(this.password, salt);
    this.phoneNumber = this.phoneNumber.startsWith("0")
      ? "+98" + this.phoneNumber.slice(1)
      : this.phoneNumber;
    return next();
  } catch (error) {
    next(new createError(500, `user pre save >` + error?.message));
  }
});

UserSchema.methods.validatePassword = async function validatePassword(
  enteredPassword
) {
  return compare(enteredPassword, this.password);
};

module.exports = model("User", UserSchema);
