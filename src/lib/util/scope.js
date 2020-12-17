function getNewPackageName(packageName, newScope) {
  const nameMatch = packageName.match(/(@.*\/)?(.*)/)[2];
  const finalScopeName = treatScopeName(newScope);
  return `${finalScopeName}/${nameMatch}`;
}

function treatScopeName(scopeName) {
  return !scopeName.startsWith("@") ? `@${scopeName}` : scopeName;
}

module.exports = { getNewPackageName };
