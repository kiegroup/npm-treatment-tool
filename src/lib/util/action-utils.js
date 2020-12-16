const core = require("@actions/core");

function getAction() {
  return core.getInput("action");
}

function getScope() {
  return core.getInput("scope");
}

function getRecursive() {
  return core.getInput("recursive");
}

module.exports = {
  getAction,
  getScope,
  getRecursive
};
