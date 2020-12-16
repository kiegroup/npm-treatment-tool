#!/usr/bin/env node

const { ClientError, logger } = require("../src/lib/common");
const { addScope } = require("../src/lib/tools/scope");
const { getArguments } = require("./arguments/arguments-constructor");
const {
  getListPackageJsonFiles
} = require("../src/lib/util/package-json-utils");

require("dotenv").config();

async function main() {
  const args = getArguments();
  if (args.trace) {
    logger.level = "trace";
  } else if (args.debug) {
    logger.level = "debug";
  }
  logger.debug("ARGS", args);

  if (args.action === "name") {
    addScope(
      args.s[0],
      args.r ? getListPackageJsonFiles() : ["./package.json"]
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
