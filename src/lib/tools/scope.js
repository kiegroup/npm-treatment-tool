const { logger } = require("../common");
const { getListPackageJsonFiles, getFileList } = require("../util/file-utils");
const { getFileReplacement } = require("../replacement/selector");

const fs = require("fs");
const path = require("path");

function addScope(scopeName) {
  const finalScopeName = treatScopeName(scopeName);
  const replacementMap = getAllProjectNames().reduce((acc, curr) => {
    acc[curr] = getNewScope(curr, finalScopeName);
    return acc;
  }, {});

  const filesToReplace = getFileList();
  logger.info(`Replacing ${replacementMap} in ${filesToReplace.length} files`);

  for (const filePath of filesToReplace) {
    const fileReplacement = getFileReplacement(filePath);
    const newFileContent = fileReplacement.replace(
      fs.readFileSync(filePath),
      replacementMap
    );
    fs.writeFileSync(filePath, newFileContent);
    logger.info(`File ${path.basename(filePath)} replaced.`);
  }
}

function getNewScope(packageName, newScopeName) {
  return `${newScopeName}/${packageName.match(/(@[\w-_]*\/)?(.*)/)[2]}`;
}

function treatScopeName(scopeName) {
  return !scopeName.startsWith("@") ? `@${scopeName}` : scopeName;
}

function getAllProjectNames() {
  getListPackageJsonFiles()
    .map(file => JSON.parse(fs.readFileSync(file)))
    .map(jsonObject => jsonObject.name);
}

module.exports = { addScope };
