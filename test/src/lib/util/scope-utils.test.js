const { getNewPackageName } = require("../../../../src/lib/util/scope");

test("getNewScope with scope", async () => {
  // Act
  const newPackageName = getNewPackageName("@scopeY/package1", "@scopeX");

  // Assert
  expect(newPackageName).toEqual("@scopeX/package1");
});

test("getNewScope with scope and without @", async () => {
  // Act
  const newPackageName = getNewPackageName("@scopeY/package1", "scopeX");

  // Assert
  expect(newPackageName).toEqual("@scopeX/package1");
});

test("getNewScope without scope", async () => {
  // Act
  const newPackageName = getNewPackageName("package1", "@scopeX");

  // Assert
  expect(newPackageName).toEqual("@scopeX/package1");
});

test("getNewScope with scope weird characters", async () => {
  // Act
  const newPackageName = getNewPackageName(
    "@scope-a_b/package1-a_b",
    "@scopeX"
  );

  // Assert
  expect(newPackageName).toEqual("@scopeX/package1-a_b");
});
