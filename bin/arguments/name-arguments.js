function getArguments(subParser) {
  const buildParser = subParser.add_parser("name", {
    help: "replace scope"
  });
  buildParser.add_argument("-s", "-scope", {
    nargs: 1,
    required: false,
    help: "the scope name"
  });
  buildParser.add_argument("-np", "-name-prefix", {
    nargs: 1,
    required: false,
    help: "the name prefix"
  });
  buildParser.add_argument("-ns", "-name-suffix", {
    nargs: 1,
    required: false,
    help: "the name suffix"
  });
  buildParser.add_argument("-i", "-ignore-pattern", {
    nargs: "*",
    required: false,
    help: "the ignore patterns"
  });
}

module.exports = { getArguments };
