const { addScope } = require("../../../../src/lib/tools/scope");
const { promises: fs } = require("fs");
const io = require("@actions/io");
const path = require("path");

const packageJsonContent = JSON.parse('{ "name": "@scopeX/package1"}');

test("addScope", async () => {
  // Arrange
  const file = path.join(__dirname, "package.json");
  await fs.writeFile(file, JSON.stringify(packageJsonContent, null, 2));

  // Act
  addScope("scopeY", [file]);

  // Assert
  expect(JSON.parse(await fs.readFile(file)).name).toEqual("@scopeY/package1");
  await io.rmRF(file);
});

test("addScope multiple files", async () => {
  // Arrange
  const packageJsonContent1 = JSON.parse('{ "name": "@scopeX1/packagea"}');
  const packageJsonContent2 = JSON.parse('{ "name": "@scopeX2/packageb"}');
  const packageJsonContent3 = JSON.parse(
    '{ "name": "@kogito-tooling/i18n-common-dictionary"}'
  );

  const files = [
    path.join(__dirname, "package1.json"),
    path.join(__dirname, "package2.json"),
    path.join(__dirname, "package3.json")
  ];

  await fs.writeFile(files[0], JSON.stringify(packageJsonContent1, null, 2));
  await fs.writeFile(files[1], JSON.stringify(packageJsonContent2, null, 2));
  await fs.writeFile(files[2], JSON.stringify(packageJsonContent3, null, 2));

  // Act
  addScope("scopeY", files);

  // Assert
  expect(JSON.parse(await fs.readFile(files[0])).name).toEqual(
    "@scopeY/packagea"
  );
  expect(JSON.parse(await fs.readFile(files[1])).name).toEqual(
    "@scopeY/packageb"
  );
  expect(JSON.parse(await fs.readFile(files[2])).name).toEqual(
    "@scopeY/i18n-common-dictionary"
  );
  for (const file of files) {
    await io.rmRF(file);
  }
});
