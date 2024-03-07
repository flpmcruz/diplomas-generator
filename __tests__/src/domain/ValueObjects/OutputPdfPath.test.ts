import fs from "fs";
import path from "path";
import { OutputPdfPath } from "../../../../src/domain/ValueObjects";
import { FileSystemService } from "../../../../src/domain/services/FileSystemService.js";

describe("Testing OutputPdfPath ValueObject", () => {
  const fallbackPdfPath = FileSystemService.joinPaths("output", "titles.pdf");

  afterEach(() => {
    if (fs.existsSync(fallbackPdfPath))
      fs.rmSync(path.dirname(fallbackPdfPath), { recursive: true });
  });

  test("shoud return defult value if OutputPdfPath not provided or is invalid string", () => {
    const defaultValue = FileSystemService.joinPaths(
      process.cwd(),
      fallbackPdfPath
    );
    const invalidImagePath1: any = {};
    const invalidImagePath2: any = 1;
    const invalidImagePath3: any = "";

    const imagePath1 = new OutputPdfPath(undefined).value;
    const imagePath2 = new OutputPdfPath(invalidImagePath1).value;
    const imagePath3 = new OutputPdfPath(invalidImagePath2).value;
    const imagePath4 = new OutputPdfPath(invalidImagePath3).value;

    expect(imagePath1).toBe(defaultValue);
    expect(imagePath2).toBe(defaultValue);
    expect(imagePath3).toBe(defaultValue);
    expect(imagePath4).toBe(defaultValue);
    expect(fs.existsSync(path.dirname(defaultValue))).toBe(true);
  });
});
