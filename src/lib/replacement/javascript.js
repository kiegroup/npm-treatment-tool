const eol = require("eol");

function replace(fileContent, replacementMap) {
  return eol
    .split(fileContent)
    .map(line => treatRequire(line, replacementMap))
    .map(line => treatRequireActual(line, replacementMap))
    .map(line => treatImport(line, replacementMap))
    .map(line => treatNodeModules(line, replacementMap))
    .map(line => treatJest(line, replacementMap))
    .join(eol.auto);
}

function treatRequire(line, replacementMap) {
  return treatRegEx(
    line,
    replacementMap,
    `(require\\(["|'])($KEY)(.*["|']\\).*)(;)?`
  );
}

function treatRequireActual(line, replacementMap) {
  return treatRegEx(
    line,
    replacementMap,
    `(require\\.requireActual\\(["|'])($KEY)(.*["|']\\))(;)?`
  );
}

function treatImport(line, replacementMap) {
  return treatRegEx(
    line,
    replacementMap,
    `((})? from ["|'])($KEY)(.*["|'])(;)?`
  );
}

function treatNodeModules(line, replacementMap) {
  return treatRegEx(line, replacementMap, `(node_modules/)($KEY)(.*)(;)?`);
}

function treatJest(line, replacementMap) {
  return treatRegEx(
    line,
    replacementMap,
    `(jest.mock\\(["|'])($KEY)(.*["|'])(;)?`
  );
}

function treatRegEx(line, replacementMap, regEx) {
  if (line && replacementMap) {
    const key = Object.keys(replacementMap).find(key =>
      line.match(new RegExp(regEx.replace("$KEY", escapeForRegExp(key)), "gi"))
    );
    return key ? line.replace(key, replacementMap[key]) : line;
  }
  return line;
}

function escapeForRegExp(str) {
  return str.replace(/[\\^$.*+?()[\]{}|]/g, "\\$&"); // (A)
}

module.exports = { replace };
