#!/usr/bin/env node

const { ClientError, logger } = require("../src/lib/common");
const { rename } = require("../src/lib/tools/name");
const { getArguments } = require("./arguments/arguments-constructor");
const PackageRename = require("../src/model/package-rename");

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
    const packageRename = new PackageRename({
      scope: args.s ? args.s[0] : undefined,
      prefix: args.np ? args.np[0] : undefined,
      suffix: args.ns ? args.ns[0] : undefined
    });
    await rename(packageRename, { ignorePatterns: args.i ? args.i : [] });
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
