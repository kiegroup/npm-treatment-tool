const path = require("path");
const packageJson = require("./package.json");
const javascript = require("./javascript");
const none = require("./none");

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
