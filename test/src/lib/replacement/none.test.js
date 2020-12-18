const { replace } = require("../../../../src/lib/replacement/none");
const packageJsonContent = JSON.stringify(
  require("../../../resources/package-test.json"),
  undefined,
  2
);

test("getFileReplacement package.json", () => {
  // Arrange
  const replacementMap = {};
  // Act
  const result = replace(packageJsonContent, replacementMap);

  // Assert
  expect(result).toEqual(packageJsonContent);
});
