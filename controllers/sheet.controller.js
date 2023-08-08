const createError = require("http-errors");

const { ResponseDto } = require("../utils/dtos/response.dto");
const { getSheetData } = require("../services/sheet.service");
const { findUserById } = require("../services/user.service");
const getMyPerformance = async (req, res, next) => {
  const user = await findUserById(req.session.user.userId);
  console.log(user);
  const incomingCallsRows = await getSheetData(
    "15-sspZO_sfSYsDEk8S8fQNVM4izbrUIf07NaBKRbhHM",
    "Daily-Incoming-Ring"
  );
  res.json(
    incomingCallsRows.data.values.find((userdata) => {
      return Number(userdata[2]) === user.voip;
    })
  );
};

module.exports = { getMyPerformance };
