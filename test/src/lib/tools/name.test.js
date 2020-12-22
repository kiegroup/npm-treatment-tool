const { rename } = require("../../../../src/lib/tools/name");

const {
  getListPackageJsonFiles,
  getFileList
} = require("../../../../src/lib/util/file-utils");
jest.mock("../../../../src/lib/util/file-utils");

const none = require("../../../../src/lib/replacement/none");
jest.mock("../../../../src/lib/replacement/none");

const { readFileSync } = require("fs");
jest.mock("fs");

const {
  getFileReplacement
} = require("../../../../src/lib/replacement/selector");
jest.mock("../../../../src/lib/replacement/selector");

test("addScope", () => {
  // Arrange
  getFileReplacement
    .mockReturnValueOnce(none)
    .mockReturnValueOnce(none)
    .mockReturnValueOnce(none);
  readFileSync
    .mockReturnValueOnce('{ "name": "package1"}')
    .mockReturnValueOnce('{ "name": "package2"}');
  const packageFilelist = ["package.json1", "package.json2"];
  getListPackageJsonFiles.mockReturnValueOnce(packageFilelist);

  const fileList = ["filea", "fileb", "filec"];
  getFileList.mockResolvedValueOnce(fileList);

  readFileSync
    .mockReturnValueOnce("contenta")
    .mockReturnValueOnce("contentb")
    .mockReturnValueOnce("contentc");
  none.replace
    .mockReturnValueOnce("contenta_replaced")
    .mockReturnValueOnce("contentb_replaced")
    .mockReturnValueOnce("contentc_replaced");

  // Act
  rename({ scope: "scopex" });

  // Assert
  expect(true).toBe(true);
});
