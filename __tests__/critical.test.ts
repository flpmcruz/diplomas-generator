import fs from "fs";
import path from "path";
import { generateTitles } from "../src/index.js";
import { FileSystemService } from "../src/infraestructure/external-service/index.js";
import { OUTPUTIMGPATH, OUTPUTPDFPATH } from "../src/constants/paths.js";
import { Title } from "../src/Title.js";

describe("Testing generateTitles", () => {
  const output = "output/img";
  const outputPDF = "output/titles.pdf";

  afterEach(() => {
    if (fs.existsSync(output)) fs.rmSync(output, { recursive: true });
    if (fs.existsSync(path.dirname(outputPDF)))
      fs.rmSync(path.dirname(outputPDF), { recursive: true });
  });

  test("shoud work with full config", async () => {
    const config = {
      fontSize: 220,
      color: "#000000",
      positionNameX: 1653,
      textAlign: "center",
      positionNameY: 950,
      imageQuality: 0.9,
      fontPath: "__tests__/fonts/itcedscr.ttf",
      inputTitlePath: "__tests__/image/title.jpg",
      outputImgPath: output,
      outputPdfPath: outputPDF,
      exportPDF: true,
      inputNames: ["Felipe", "Juan", "Pedro"],
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

  test("shoud not generate pdf", async () => {
    const config = {
      outputPdfPath: outputPDF,
      exportPDF: false,
      inputNames: ["Felipe", "Juan", "Pedro"],
      enableLogging: false,
    };
    await generateTitles(config);
    expect(FileSystemService.checkFileExists(OUTPUTPDFPATH)).toBeFalsy();
  });

  test("shoud work with default config without parameters", async () => {
    const config = {
      inputNames: "__tests__/data/names.txt",
      enableLogging: false,
    };
    await generateTitles(config);
    const titles = FileSystemService.readDirContent(OUTPUTIMGPATH);
    const names = FileSystemService.readList(config.inputNames);
    expect(titles?.length).toBe(names.length);
    expect(FileSystemService.checkFileExists(OUTPUTPDFPATH)).toBeTruthy();
  });
});
