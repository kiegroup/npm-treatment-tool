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
