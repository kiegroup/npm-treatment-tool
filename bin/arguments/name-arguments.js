function getArguments(subParser) {
  const buildParser = subParser.add_parser("name", {
    help: "replace name functionallities"
  });
  const buildSubParser = buildParser.add_subparsers({
    dest: "name",
    required: true
  });
  addScope(buildSubParser);
}

function addScope(subParser) {
  const parser = subParser.add_parser("add-scope", {
    help: "add scope to package.json file/s"
  });
  parser.add_argument("--r", "--recursive", {
    action: "store_true",
    required: false,
    default: false,
    help:
      "whether this will replace every package.json from the project. For multipackage case"
  });
  parser.add_argument("-s", "-scope", {
    nargs: 1,
    required: true,
    help: "the scope name"
  });
}

module.exports = { getArguments };
