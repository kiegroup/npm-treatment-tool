const path = require("path");
const {
  getFileReplacement
} = require("../../../../src/lib/replacement/selector");

const packageJsonMock = require("../../../../src/lib/replacement/package.json");
jest.mock("../../../../src/lib/replacement/package.json");
const javascriptMock = require("../../../../src/lib/replacement/javascript");
jest.mock("../../../../src/lib/replacement/javascript");
const noneMock = require("../../../../src/lib/replacement/none");
jest.mock("../../../../src/lib/replacement/none");

test("getFileReplacement package.json", () => {
  // Act
  const result = getFileReplacement(
    path.join("/", "home", "folder", "package.json")
  );

  // Assert
  expect(result).toEqual(packageJsonMock);
});

test("getFileReplacement ts", () => {
  // Act
  const result = getFileReplacement(
    path.join("/", "home", "folder", "file.ts")
  );

  // Assert
  expect(result).toEqual(javascriptMock);
});

test("getFileReplacement tsx", () => {
  // Act
  const result = getFileReplacement(
    path.join("/", "home", "folder", "file.tsx")
  );

  // Assert
  expect(result).toEqual(javascriptMock);
});

test("getFileReplacement js", () => {
  // Act
  const result = getFileReplacement(
    path.join("/", "home", "folder", "file.js")
  );

  // Assert
  expect(result).toEqual(javascriptMock);
});

test("getFileReplacement none", () => {
  // Act
  const result = getFileReplacement(
    path.join("/", "home", "folder", "file.xls")
  );

  // Assert
  expect(result).toEqual(noneMock);
});
