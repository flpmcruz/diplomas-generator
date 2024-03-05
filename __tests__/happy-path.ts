import fs from "fs";
import path from "path";
import { generateTitles } from "../src/index.js";
import { FileSystemService } from "../src/domain/services/FileSystemService.js";
import { OutputImagePath } from "../src/domain/ValueObjects/index.js";
import { PdfPath } from "../src/domain/ValueObjects/PdfPath.js";

describe("Testing generateTitles", () => {
  const output = new OutputImagePath("output").value;
  const outputPDF = new PdfPath("output").value;

  afterEach(() => {
    if (fs.existsSync(output))
      fs.rmSync(path.resolve(output), { recursive: true });
    if (fs.existsSync(outputPDF))
      fs.rmSync(path.resolve(outputPDF), { recursive: true });
  });

  test("shoud work with full config", async () => {
    const config = {
      inputNames: ["Felipe", "Juan", "Pedro"],
      fontSize: 220,
      color: "#000000",
      positionNameX: 1653,
      textAlign: "center",
      positionNameY: 950,
      imageQuality: 0.9,
      fontPath: "/__tests__/fonts/itcedscr.ttf",
      inputTitlePath: "/__tests__/image/title.jpg",
      outputImgPath: output,
      outputPdfPath: outputPDF,
      exportPDF: true,
      enableLogging: false,
    };
    await generateTitles(config);
    const titles = FileSystemService.readDirContent(config.outputImgPath);
    const pdf = FileSystemService.checkFileExists(
      path.resolve(config.outputPdfPath)
    );

    expect(titles?.length).toBe(config.inputNames.length);
    expect(pdf).toBeTruthy();
  });

  test("shoud not generate pdf with exportPDF = false", async () => {
    const config = {
      exportPDF: false,
      inputNames: ["Felipe", "Juan", "Pedro"],
      enableLogging: false,
    };
    await generateTitles(config);
    expect(
      FileSystemService.checkFileExists(new PdfPath("").value)
    ).toBeFalsy();
  });

  test("shoud work with default config without parameters", async () => {
    const config = {
      inputNames: "__tests__/data/names.txt",
      enableLogging: false,
    };
    await generateTitles(config);
    const titles = FileSystemService.readDirContent(output);
    const names = FileSystemService.readList(config.inputNames);
    expect(titles?.length).toBe(names.length);

    const pdf = FileSystemService.checkFileExists(outputPDF);
    expect(pdf).toBeTruthy();
  });
});
