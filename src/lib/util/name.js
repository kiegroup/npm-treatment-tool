function treatScopeName(scopeName) {
  return !scopeName.startsWith("@") ? `@${scopeName}` : scopeName;
}

function getNewPackageName(currentName, packageRename) {
  return `${
    packageRename.scope ? treatScopeName(packageRename.scope) + "/" : ""
  }${packageRename.prefix ? packageRename.prefix : ""}${
    currentName.match(/(@[\w-_]*\/)?(.*)/)[2]
  }${packageRename.suffix ? packageRename.suffix : ""}`;
}

module.exports = { treatScopeName, getNewPackageName };
