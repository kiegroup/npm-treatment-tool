const {
  getListPackageJsonFiles
} = require("../../../../src/lib/util/file-utils");
const { promises: fs } = require("fs");
const io = require("@actions/io");
const path = require("path");

const root = path.join(__dirname, "_temp", "json-utils");
const packageJsonContent = JSON.stringify(
  JSON.parse('{ "name": "@scopeX/package1.json"}')
);

beforeAll(async () => {
  await io.rmRF(root);
});

afterAll(async () => {
  await io.rmRF(root);
});

test("getListPackageJsonFiles", () => {
  // Act
  const result = getListPackageJsonFiles();

  // Assert
  expect(result).toEqual(["package.json"]);
});

test("getListPackageJsonFiles multiple", async () => {
  // Arrange
  await fs.mkdir(path.join(root, "folder-a", "folder-a1", "folder-a1-a1"), {
    recursive: true
  });
  await fs.mkdir(path.join(root, "folder-a", "folder-a2"), {
    recursive: true
  });

  await fs.writeFile(
    path.join(root, "folder-a", "package.json"),
    packageJsonContent
  );
  await fs.writeFile(
    path.join(root, "folder-a", "folder-a1", "package.json"),
    packageJsonContent
  );
  await fs.writeFile(
    path.join(root, "folder-a", "folder-a1", "folder-a1-a1", "package.json"),
    packageJsonContent
  );

  // Act
  const result = getListPackageJsonFiles();

  // Assert
  expect(result).toEqual([
    "package.json",
    "test/src/lib/util/_temp/json-utils/folder-a/folder-a1/folder-a1-a1/package.json",
    "test/src/lib/util/_temp/json-utils/folder-a/folder-a1/package.json",
    "test/src/lib/util/_temp/json-utils/folder-a/package.json"
  ]);
});
