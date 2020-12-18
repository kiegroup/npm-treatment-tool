function replace(fileContent, replacementMap) {
  const jsonObject = JSON.parse(fileContent);
  jsonObject.name = replacementMap[jsonObject.name];
  treatDependencies(jsonObject.dependencies, replacementMap);
  treatDependencies(jsonObject.devDependencies, replacementMap);
  treatScripts(jsonObject.scripts, replacementMap);
  return JSON.stringify(jsonObject, undefined, 2);
}

function treatDependencies(dependencies, replacementMap) {
  if (dependencies && replacementMap) {
    Object.keys(dependencies).forEach(function (dependency) {
      if (replacementMap[dependency]) {
        dependencies[replacementMap[dependency]] = dependencies[dependency];
        delete dependencies[dependency];
      }
    });
  }
}

function treatScripts(scripts, replacementMap) {
  if (scripts && replacementMap) {
    Object.entries(scripts).forEach(([scriptKey, scriptValue]) =>
      Object.entries(replacementMap).forEach(([key, value]) => {
        let script = scriptValue.replace(new RegExp(` ${key}`, "gi"), value);
        script = script.replace(new RegExp(`=${key}`, "gi"), `=${value}`);
        scripts[scriptKey] = script;
        scriptValue = script;
      })
    );
  }
}

module.exports = { replace };
