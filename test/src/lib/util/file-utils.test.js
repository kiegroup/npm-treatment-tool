const {
  getListPackageJsonFiles,
  getFileList
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

test("getListPackageJsonFiles multiple ignore", async () => {
  // Arrange
  await fs.mkdir(path.join(root, "folder-a", "folder-a1", "folder-a1-a1"), {
    recursive: true
  });
  await fs.mkdir(path.join(root, "folder-a", "folder-a1", "folder-a1-a2"), {
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
  await fs.writeFile(
    path.join(root, "folder-a", "folder-a1", "folder-a1-a2", "package.json"),
    packageJsonContent
  );

  // Act
  const result = getListPackageJsonFiles({
    ignore: "**/node_modules/**",
    additionalIgnorePatterns: [".*/folder-a1-a1/.*", ".*/folder-a1-a2/.*"]
  });

  // Assert
  expect(result).toEqual([
    "package.json",
    "test/src/lib/util/_temp/json-utils/folder-a/folder-a1/package.json",
    "test/src/lib/util/_temp/json-utils/folder-a/package.json"
  ]);
});

test("getFileList", async () => {
  // Arrange
  await fs.mkdir(path.join(root, "getFileList"), {
    recursive: true
  });

  await fs.writeFile(
    path.join(root, "getFileList", "package.json"),
    packageJsonContent
  );

  await fs.writeFile(
    path.join(root, "getFileList", "file.ts"),
    packageJsonContent
  );

  await fs.writeFile(
    path.join(root, "getFileList", "file.js"),
    packageJsonContent
  );

  await fs.writeFile(
    path.join(root, "getFileList", "file.tsx"),
    packageJsonContent
  );

  await fs.writeFile(
    path.join(root, "getFileList", "file.doc"),
    packageJsonContent
  );

  // Act
  const result = await getFileList();

  // Assert
  expect(
    result.includes(
      "test/src/lib/util/_temp/json-utils/getFileList/package.json"
    )
  ).toBe(true);
  expect(
    result.includes("test/src/lib/util/_temp/json-utils/getFileList/file.ts")
  ).toBe(true);
  expect(
    result.includes("test/src/lib/util/_temp/json-utils/getFileList/file.tsx")
  ).toBe(true);
  expect(
    result.includes("test/src/lib/util/_temp/json-utils/getFileList/file.js")
  ).toBe(true);
  expect(
    result.includes("test/src/lib/util/_temp/json-utils/getFileList/file.doc")
  ).toBe(false);
});
