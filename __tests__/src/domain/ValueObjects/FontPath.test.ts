import { FontPath } from "../../../../src/domain/ValueObjects";
import { FileSystemService } from "../../../../src/domain/services/FileSystemService.js";

describe("Testing FontPath ValueObject", () => {
  test("shoud return defult value if not valid value provided", () => {
    /* Valid values: valid path to ttf font */
    const fallbackFontPath = FileSystemService.joinPaths(
      process.cwd(),
      "node_modules",
      "diplomas-generator",
      "dist",
      "src",
      "assets",
      "fonts",
      "itcedscr.ttf"
    );

    const fontPath1 = new FontPath(undefined).value;
    const fontPath2 = new FontPath("src/f/itcedscr.ttf").value;

    expect(fontPath1).toBe(fallbackFontPath);
    expect(fontPath2).toBe(fallbackFontPath);
  });

  test("shoud return valid value if valid value provided", () => {
    /* Valid values: valid path to ttf font */
    const validFontPath = FileSystemService.joinPaths(
      "__tests__",
      "src",
      "assets",
      "fonts",
      "itcedscr.ttf"
    );

    const validFontPathInstance = new FontPath(validFontPath).value;
    const absolutePath = FileSystemService.joinPaths(
      process.cwd(),
      validFontPath
    );

    expect(validFontPathInstance).toBe(absolutePath);
  });
});
