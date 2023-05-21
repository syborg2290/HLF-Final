const path = require("path");
const fs = require("fs");

const isAuthorize = (privatekey) => {
  const data = fs.readFileSync(
    path.join(__dirname, "../../wallet") + `/admin.id`,
    "utf-8"
  );

  const privateKey = JSON.parse(data)["credentials"]["privateKey"];

  const privateKeyRegex =
    /-----BEGIN PRIVATE KEY-----(.*)-----END PRIVATE KEY-----/s;
  const extractedPrivateKey = privateKey
    .match(privateKeyRegex)[1]
    .trim()
    .replace(/[\r\n]/gm, "");
  if (extractedPrivateKey === privatekey) {
    return true;
  } else {
    return false;
  }
};

module.exports = isAuthorize;
