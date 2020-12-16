const { ArgumentParser } = require("argparse");
const { getArguments: getNameArguments } = require("./name-arguments");
const pkg = require("../../package.json");

function getArguments() {
  const parser = new ArgumentParser({
    prog: pkg.name,
    add_help: true,
    description: `${pkg.description}. Version: ${pkg.version}`
  });
  parser.add_argument("-d", "--debug", {
    action: "store_true",
    help: "Show debugging output"
  });

  const subparsers = parser.add_subparsers({ dest: "action", required: true });
  getNameArguments(subparsers);
  return parser.parse_args();
}

module.exports = { getArguments };
