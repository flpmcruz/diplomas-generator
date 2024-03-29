import fs from "fs";
import path from "path";
import { generateTitles } from "../src";
import { FileSystemService } from "../src/domain/services/FileSystemService.js";
import { Names } from "../src/domain/ValueObjects";
import { HexColor, TextAlign, imgQuality } from "../src/domain/interfaces";

describe("Testing generateTitles", () => {
  const output = FileSystemService.joinPaths("output", "img");
  const outputPDF = FileSystemService.joinPaths("output", "titles.pdf");

  afterEach(() => {
    if (fs.existsSync(output))
      fs.rmSync(path.dirname(output), { recursive: true });

    if (fs.existsSync(outputPDF))
      fs.rmSync(path.dirname(outputPDF), { recursive: true });
  });

  test("shoud work with full config", async () => {
    const config = {
      inputNames: ["Felipe", "Juan", "Pedro"],
      fontSize: 220,
      color: "#000000" as HexColor,
      positionNameX: 1653,
      positionNameY: 950,
      textAlign: "center" as TextAlign,
      imageQuality: 0.9 as imgQuality,
      fontPath: "__tests__/src/assets/fonts/itcedscr.ttf",
      inputTitlePath: "__tests__/src/assets/image/title.jpg",
      exportImg: true,
      outputImgPath: output,
      outputPdfPath: outputPDF,
      exportPDF: true,
      enableLogging: false,
    };
    await generateTitles(config);
    const titles = FileSystemService.readDirContent(config.outputImgPath);

    expect(titles?.length).toBe(config.inputNames.length);
    expect(FileSystemService.checkFileExists(outputPDF)).toBeTruthy();
  });

  test("shoud not generate pdf with exportPDF = false", async () => {
    const config = {
      exportPDF: false,
      inputNames: ["Felipe", "Juan", "Pedro"],
      enableLogging: false,
      exportImg: true,
    };
    await generateTitles(config);
    expect(() => {
      FileSystemService.checkFileExists(outputPDF);
    }).toThrow();
  });

  test("shoud not generate images with exportImg = false", async () => {
    const config = {
      exportImg: false,
      exportPDF: true,
      inputNames: ["Felipe", "Juan", "Pedro"],
      enableLogging: false,
    };
    await generateTitles(config);
    expect(FileSystemService.existsPath(output)).toBeFalsy();
  });

  test("shoud work with default config without parameters", async () => {
    const config = {
      inputNames: "__tests__/src/assets/data/names.txt",
      enableLogging: false,
      exportImg: true,
      exportPDF: true,
    };
    await generateTitles(config);
    const titles = FileSystemService.readDirContent(output);
    const names = new Names(config.inputNames).value;
    expect(titles?.length).toBe(names.length);

    const pdf = FileSystemService.checkFileExists(outputPDF);
    expect(pdf).toBeTruthy();
  });

  test("should throw error if both exports defined to false", async () => {
    const config = {
      inputNames: ["Felipe", "Juan", "Pedro"],
      enableLogging: false,
      exportImg: false,
      exportPDF: false,
    };

    return expect(generateTitles(config)).rejects.toThrow(
      "At least one export option must be enabled"
    );
  });
});
