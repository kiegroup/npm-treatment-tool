const {
  getNewPackageName,
  treatScopeName
} = require("../../../../src/lib/util/name");

test("getNewScope with scope", async () => {
  // Act
  const newPackageName = getNewPackageName("@scopeY/package1", {
    scope: "@scopeX"
  });

  // Assert
  expect(newPackageName).toEqual("@scopeX/package1");
});

test("getNewScope with scope and without @", async () => {
  // Act
  const newPackageName = getNewPackageName("@scopeY/package1", {
    scope: "scopeX"
  });

  // Assert
  expect(newPackageName).toEqual("@scopeX/package1");
});

test("getNewScope without scope", async () => {
  // Act
  const newPackageName = getNewPackageName("package1", { scope: "@scopeX" });

  // Assert
  expect(newPackageName).toEqual("@scopeX/package1");
});

test("getNewScope with scope weird characters", async () => {
  // Act
  const newPackageName = getNewPackageName("@scope-a_b/package1-a_b", {
    scope: "@scopeX"
  });

  // Assert
  expect(newPackageName).toEqual("@scopeX/package1-a_b");
});

test("treatScopeName with @", async () => {
  // Act
  const newScope = treatScopeName("@scopeX");

  // Assert
  expect(newScope).toEqual("@scopeX");
});

test("treatScopeName without @", async () => {
  // Act
  const newScope = treatScopeName("scopeX");

  // Assert
  expect(newScope).toEqual("@scopeX");
});
