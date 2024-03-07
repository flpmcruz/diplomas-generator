import { InputImagePath } from "../../../../src/domain/ValueObjects/index.js";
import { FileSystemService } from "../../../../src/domain/services/FileSystemService.js";

describe("Testing InputImagePath ValueObject", () => {
  test("shoud return defult path if path is invalid", () => {
    const path = new InputImagePath("").value;
    const expectedPath = FileSystemService.joinPaths(
      process.cwd(),
      "node_modules",
      "diplomas-generator",
      "dist",
      "src",
      "assets",
      "image",
      "title.jpg"
    );
    expect(path).toBe(expectedPath);
  });

  test("shoud return path if path is valid", () => {
    const path = new InputImagePath("__tests__/src/assets/image/title.jpg")
      .value;
    const expectedPath = FileSystemService.joinPaths(
      process.cwd(),
      "__tests__/src/assets/image/title.jpg"
    );
    expect(path).toBe(expectedPath);
  });
});
