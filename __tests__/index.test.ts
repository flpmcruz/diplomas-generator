import fs from "fs";
import { generateTitles } from "../src/index.js";
import {
  FileSystemService,
  LoggingService,
} from "../src/infraestructure/external-service/index.js";

describe("Testing generateTitles", () => {
  const output = "output";
  let fileSystemService: FileSystemService;

  beforeAll(() => {
    const loggingService = new LoggingService(true);
    fileSystemService = new FileSystemService(loggingService);
  });

  test("shoud work with config", async () => {
    const config = {
      fontSize: 220,
      color: "#000000",
      positionNameX: 1653,
      positionNameY: 950,
      imageQuality: 0.9,
      fontPath: "__tests__/fonts/itcedscr.ttf",
      inputTitlePath: "__tests__/image/title.jpg",
      outputImgPath: `${output}/img`,
      outputPdfPath: `${output}/titles.pdf`,
      inputNames: ["Felipe", "Juan", "Pedro"],
      enableLogging: false,
    };
    await generateTitles(config);
    const titles = fs.readdirSync(config.outputImgPath);
    expect(titles.length).toBe(config.inputNames.length);
  });

  test("shoud generate pdf", async () => {
    const config = {
      outputImgPath: `${output}/img`,
      outputPdfPath: `${output}/titles.pdf`,
      inputNames: ["Felipe", "Juan", "Pedro"],
      enableLogging: false,
    };
    await generateTitles(config);
    const pdf = fs.existsSync(config.outputPdfPath);
    expect(pdf).toBeTruthy();
  });

  test("shoud dont generate pdf", async () => {
    const config = {
      outputImgPath: `${output}2/img`,
      outputPdfPath: `${output}2/titles.pdf`,
      exportPDF: false,
      inputNames: ["Felipe", "Juan", "Pedro"],
      enableLogging: false,
    };
    await generateTitles(config);
    expect(fileSystemService.checkFileExists(config.outputPdfPath)).toBeFalsy();
  });

  test("shoud work with default config and path names.txt", async () => {
    const config = {
      inputNames: "__tests__/data/names.txt",
      enableLogging: false,
    };
    await generateTitles(config);
    const titles = fs.readdirSync(`${output}/img`);
    const names = fs.readFileSync(config.inputNames, "utf-8").split("\n");
    expect(titles.length).toBe(names.length);
  });
});
