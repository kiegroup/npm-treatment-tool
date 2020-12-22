#!/usr/bin/env node

const { ClientError, logger } = require("./src/lib/common");
const { getAction, getScope } = require("./src/lib/util/action-utils");
const { rename } = require("./src/lib/tools/name");
const { PackageRename } = require("./src/model/package-rename");

require("dotenv").config();

async function main() {
  if (getAction() === "name") {
    const packageRename = new PackageRename({
      scope: getScope()
    });
    await rename(packageRename);
  } else {
    throw new Error(
      `flow type input value '${getAction()}' is not supported. Please check documentation.`
    );
  }
}

if (require.main === module) {
  main().catch(e => {
    if (e instanceof ClientError) {
      process.exitCode = 2;
      logger.error(e);
    } else {
      process.exitCode = 1;
      logger.error(e);
    }
  });
}

module.exports = { main };
