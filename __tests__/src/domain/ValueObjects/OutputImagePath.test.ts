import fs from "fs";
import path from "path";
import { OutputImagePath } from "../../../../src/domain/ValueObjects";
import { FileSystemService } from "../../../../src/domain/services/FileSystemService.js";

describe("Testing OutputImagePath ValueObject", () => {
  const fallbackImagePath = FileSystemService.joinPaths("output", "img");
  const validImagePath = FileSystemService.joinPaths("output", "imagenes");

  afterEach(() => {
    if (fs.existsSync(fallbackImagePath))
      fs.rmSync(path.dirname(fallbackImagePath), { recursive: true });

    if (fs.existsSync(validImagePath))
      fs.rmSync(path.dirname(validImagePath), { recursive: true });
  });

  test("shoud return defult value if OutputImagePath not provided or is invalid string", () => {
    const defaultValue = FileSystemService.joinPaths(
      process.cwd(),
      fallbackImagePath
    );
    const invalidImagePath1: any = {};
    const invalidImagePath2: any = 1;
    const invalidImagePath3: any = "";

    const imagePath1 = new OutputImagePath(undefined).value;
    const imagePath2 = new OutputImagePath(invalidImagePath1).value;
    const imagePath3 = new OutputImagePath(invalidImagePath2).value;
    const imagePath4 = new OutputImagePath(invalidImagePath3).value;

    expect(imagePath1).toBe(defaultValue);
    expect(imagePath2).toBe(defaultValue);
    expect(imagePath3).toBe(defaultValue);
    expect(imagePath4).toBe(defaultValue);
    expect(fs.existsSync(defaultValue)).toBe(true);
  });

  test("shoud create OutputImagePath if is provided", () => {
    const outputImagePath = new OutputImagePath(validImagePath).value;

    const absolutePath = FileSystemService.joinPaths(
      process.cwd(),
      validImagePath
    );

    expect(outputImagePath).toBe(absolutePath);
    expect(fs.existsSync(absolutePath)).toBe(true);
  });
});
