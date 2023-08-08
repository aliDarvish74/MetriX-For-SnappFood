const { google } = require("googleapis");

const getSheetData = async (spreadsheetId, range) => {
  const auth = new google.auth.GoogleAuth({
    keyFile: "./services/credentials.json",
    scopes: "https://www.googleapis.com/auth/spreadsheets",
  });

  const client = await auth.getClient();

  const googleSheets = google.sheets({
    version: "v4",
    auth: client,
  });

  const rows = await googleSheets.spreadsheets.values.get({
    spreadsheetId,
    auth,
    range,
  });
  return rows;
};

module.exports = { getSheetData };
