const { replace } = require("../../../../src/lib/replacement/package.json");
const packageJsonContent = JSON.stringify(
  require("../../../resources/package-test.json"),
  undefined,
  2
);
const packageJsonExpectedContent = JSON.stringify(
  require("../../../resources/expected/package-test.json"),
  undefined,
  2
);
const packageJsonContent3 = JSON.stringify(
  require("../../../resources/package-test3.json"),
  undefined,
  2
);
const packageJsonExpectedContent3 = JSON.stringify(
  require("../../../resources/expected/package-test3.json"),
  undefined,
  2
);

test("getFileReplacement package.json", () => {
  // Arrange
  const replacementMap = {
    "kogito-tooling": "@scope/kogito-tooling",
    "@kogito-tooling/kie-editors-standalone": "@scope/kie-editors-standalone"
  };
  // Act
  const result = replace(packageJsonContent, replacementMap);

  // Assert
  expect(result).toEqual(packageJsonExpectedContent);
});

test("getFileReplacement package-test3.json", () => {
  // Arrange
  const replacementMap = {
    "@kogito-tooling/": "@redhat/kogito-tooling-",
    "kogito-tooling": "@redhat/kogito-tooling-kogito-tooling",
    "@kogito-tooling/backend": "@redhat/kogito-tooling-backend",
    "@kogito-tooling/channel-common-api":
      "@redhat/kogito-tooling-channel-common-api",
    "chrome-extension-pack-kogito-kie-editors":
      "@redhat/kogito-tooling-chrome-extension-pack-kogito-kie-editors",
    "@kogito-tooling/chrome-extension":
      "@redhat/kogito-tooling-chrome-extension",
    "@kogito-tooling/desktop": "@redhat/kogito-tooling-desktop",
    "@kogito-tooling/editor": "@redhat/kogito-tooling-editor",
    "@kogito-tooling/envelope-bus": "@redhat/kogito-tooling-envelope-bus",
    "@kogito-tooling/envelope": "@redhat/kogito-tooling-envelope",
    "@kogito-tooling/external-assets-base":
      "@redhat/kogito-tooling-external-assets-base",
    "@kogito-tooling/guided-tour": "@redhat/kogito-tooling-guided-tour",
    "@kogito-tooling/hub": "@redhat/kogito-tooling-hub",
    "@kogito-tooling/i18n-common-dictionary":
      "@redhat/kogito-tooling-i18n-common-dictionary",
    "@kogito-tooling/i18n": "@redhat/kogito-tooling-i18n",
    "@kogito-tooling/keyboard-shortcuts":
      "@redhat/kogito-tooling-keyboard-shortcuts",
    "@kogito-tooling/kie-bc-editors": "@redhat/kogito-tooling-kie-bc-editors",
    "@kogito-tooling/kie-editors-standalone":
      "@redhat/kogito-tooling-kie-editors-standalone",
    "@kogito-tooling/online-editor": "@redhat/kogito-tooling-online-editor",
    "@kogito-tooling/patternfly-base": "@redhat/kogito-tooling-patternfly-base",
    "@kogito-tooling/pmml-editor-marshaller":
      "@redhat/kogito-tooling-pmml-editor-marshaller",
    "@kogito-tooling/pmml-editor": "@redhat/kogito-tooling-pmml-editor",
    "vscode-extension-backend":
      "@redhat/kogito-tooling-vscode-extension-backend",
    "vscode-extension-pack-kogito-kie-editors":
      "@redhat/kogito-tooling-vscode-extension-pack-kogito-kie-editors",
    "@kogito-tooling/vscode-extension":
      "@redhat/kogito-tooling-vscode-extension",
    "@kogito-tooling/workspace": "@redhat/kogito-tooling-workspace"
  };
  // Act
  const result = replace(packageJsonContent3, replacementMap);

  // Assert
  expect(result).toEqual(packageJsonExpectedContent3);
});
