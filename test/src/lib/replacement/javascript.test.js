const { replace } = require("../../../../src/lib/replacement/javascript");
const path = require("path");
const fs = require("fs");
const eol = require("eol");

test("getFileReplacement js", () => {
  // Arrange
  const replacementMap = {
    "kogito-tooling": "@scope/kogito-tooling",
    "@kogito-tooling/patternfly-base": "@scope/patternfly-base",
    "@kogito-tooling/external-assets-base": "@scope/external-assets-base",
    "kogito-tooling": "@scope/kogito-tooling",
    "@kogito-tooling/dmn-editor-unpacked": "@scope/dmn-editor-unpacked",
    "@kogito-tooling/kie-editors-standalone": "@scope/kie-editors-standalone"
  };

  const javascriptContent = fs.readFileSync(
    path.join(".", "test", "resources", "testfile.js"),
    "utf8"
  );
  // Act
  const result = replace(javascriptContent, replacementMap);

  // Assert
  const expectedContent = fs.readFileSync(
    path.join(".", "test", "resources", "expected", "testfile.js"),
    "utf8"
  );
  expect(result).toEqual(expectedContent);
});

test("getFileReplacement js2", () => {
  // Arrange
  const replacementMap = {
    "kogito-tooling": "@scope/kogito-tooling",
    "@kogito-tooling/kie-bc-editors": "@scope/kie-bc-editors",
    "@kogito-tooling/patternfly-base": "@scope/patternfly-base",
    "@kogito-tooling/external-assets-base": "@scope/external-assets-base"
  };

  const javascriptContent = fs.readFileSync(
    path.join(".", "test", "resources", "testfile2.js"),
    "utf8"
  );
  // Act
  const result = replace(javascriptContent, replacementMap);

  // Assert
  const expectedContent = fs.readFileSync(
    path.join(".", "test", "resources", "expected", "testfile2.js"),
    "utf8"
  );
  expect(result).toEqual(expectedContent);
});

test("getFileReplacement ts", () => {
  // Arrange
  const replacementMap = {
    "kogito-tooling": "@scope/kogito-tooling",
    "@kogito-tooling/i18n": "@scope/i18n",
    "@kogito-tooling/workspace": "@scope/workspace"
  };

  const javascriptContent = fs.readFileSync(
    path.join(".", "test", "resources", "testfile.ts"),
    "utf8"
  );
  // Act
  const result = replace(javascriptContent, replacementMap);

  // Assert
  const expectedContent = fs.readFileSync(
    path.join(".", "test", "resources", "expected", "testfile.ts"),
    "utf8"
  );
  expect(result).toEqual(expectedContent);
});
