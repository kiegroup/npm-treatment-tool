const { logger } = require("../common");
const { getListPackageJsonFiles, getFileList } = require("../util/file-utils");
const { getNewPackageName } = require("../util/name");
const { getFileReplacement } = require("../replacement/selector");

const fs = require("fs");
const path = require("path");
const cliProgress = require("cli-progress");

async function rename(packageRename, options = { ignorePatterns: [] }) {
  const replacementMap = getAllProjectNames(options.ignorePatterns).reduce(
    (acc, curr) => {
      acc[curr] = getNewPackageName(curr, packageRename);
      return acc;
    },
    {}
  );

  logger.debug(
    "Replacement Map",
    Object.keys(replacementMap).map(key => `${key}:${replacementMap[key]}\n`)
  );

  logger.info(`Getting files...`);
  const filesToReplace = await getFileList();

  logger.info(`Replacing files...`);
  const progressBar = new cliProgress.SingleBar(
    {
      stopOnComplete: true,
      format:
        "progress [{bar}] {percentage}% | Duration: {duration}s | ETA: {eta}ms | {value}/{total} | {filename}"
    },
    cliProgress.Presets.shades_classic
  );
  progressBar.start(filesToReplace.length, 0);
  for (const filePath of filesToReplace) {
    progressBar.increment({ filename: path.basename(filePath) });
    const fileReplacement = getFileReplacement(filePath);
    const fileContent = fs.readFileSync(filePath, "utf8");
    const newFileContent = fileReplacement.replace(fileContent, replacementMap);
    fs.writeFileSync(filePath, newFileContent);
  }
}

function getAllProjectNames(additionalIgnorePatterns) {
  return getListPackageJsonFiles({
    ignore: "**/node_modules/**",
    additionalIgnorePatterns
  })
    .map(file => JSON.parse(fs.readFileSync(file)))
    .map(jsonObject => jsonObject.name);
}

module.exports = { rename };
