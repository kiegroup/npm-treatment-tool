const {
  getScope,
  getAction,
  getRecursive
} = require("../../../../src/lib/util/action-utils");

const { getInput } = require("@actions/core");
jest.mock("@actions/core");

afterEach(() => {
  jest.clearAllMocks();
});

test("getScope", () => {
  // Arrange
  const expectedResult = "./whateverfile";
  getInput.mockImplementationOnce(param =>
    param === "scope" ? expectedResult : undefined
  );
  // Act
  const result = getScope();

  // Assert
  expect(result).toEqual(expectedResult);
});

test("getAction", () => {
  // Arrange
  const expectedResult = "./whateverfile";
  getInput.mockImplementationOnce(param =>
    param === "action" ? expectedResult : undefined
  );
  // Act
  const result = getAction();

  // Assert
  expect(result).toEqual(expectedResult);
});

test("getRecursive", () => {
  // Arrange
  const expectedResult = "./whateverfile";
  getInput.mockImplementationOnce(param =>
    param === "recursive" ? expectedResult : undefined
  );
  // Act
  const result = getRecursive();

  // Assert
  expect(result).toEqual(expectedResult);
});
