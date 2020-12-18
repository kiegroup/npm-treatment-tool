const core = require("@actions/core");

function getAction() {
  return core.getInput("action");
}

function getScope() {
  return core.getInput("scope");
}

module.exports = {
  getAction,
  getScope
};
