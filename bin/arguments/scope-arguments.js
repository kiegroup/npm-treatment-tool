function getArguments(subParser) {
  const buildParser = subParser.add_parser("scope", {
    help: "replace scope"
  });
  buildParser.add_argument("-s", "-scope", {
    nargs: 1,
    required: true,
    help: "the scope name"
  });
  buildParser.add_argument("-i", "-ignore-pattern", {
    nargs: "*",
    required: false,
    help: "the ignore patterns"
  });
}

module.exports = { getArguments };
