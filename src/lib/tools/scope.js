const { logger } = require("../common");
const fs = require("fs");

function addScope(scopeName, files) {
  const finalScopeName = treatScopeName(scopeName);
  logger.info(
    `Adding scope ${finalScopeName} to ${files} files (${files.length})`
  );
  for (const file of files) {
    const json = getJsonFromFile(file);
    const newName = getNewScope(finalScopeName, json);
    json.name = newName;
    writeFile(file, json);
  }
}

function getJsonFromFile(file) {
  logger.info(`Reading file ${file}`);
  return JSON.parse(fs.readFileSync(file));
}

function getNewScope(scopeName, json) {
  const nameMatch = json.name.match(/(@[\w-_]*\/)?(.*)/)[2];
  const newName = `${scopeName}/${nameMatch}`;
  logger.info(`Name ${json.name} replaced by ${newName}`);
  return newName;
}

function writeFile(file, json) {
  logger.info(`Writting file ${file}`);
  fs.writeFileSync(file, JSON.stringify(json, undefined, 2));
}

function treatScopeName(scopeName) {
  return !scopeName.startsWith("@") ? `@${scopeName}` : scopeName;
}

module.exports = { addScope };
