const path = require("path");
const { ClientError } = require("../common");

const packageJson = require("./package.json.js");
const javascript = require("./javascript.js");
const none = require("./none.js");

function getFileReplacement(filePath) {
  const fileName = path.basename(filePath);
  const extension = path.extname(filePath);

  if (fileName === "package.json") {
    return packageJson;
  }
  if ([".js", ".tsx", ".ts"].includes(extension)) {
    return javascript;
  }

  return none;
}

module.exports = { getFileReplacement };
