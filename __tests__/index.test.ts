import fs from "fs";
import { generateTitles } from "../src/index.js";

describe("Testing generateTitles", () => {
  test("shoud work with config", async () => {
    const config = {
      fontSize: 220,
      color: "#000000",
      positionNameX: 1653,
      positionNameY: 950,
      imageQuality: 0.9,
      fontPath: "__tests__/fonts/itcedscr.ttf",
      inputTitlePath: "__tests__/image/title.jpg",
      outputImgPath: "output/img",
      outputPdfPath: "output/titles.pdf",
      inputNames: ["Felipe", "Juan", "Pedro"],
    };
    await generateTitles(config);
    const titles = fs.readdirSync(config.outputImgPath);
    expect(titles.length).toBe(config.inputNames.length);
  });

  test("shoud generate pdf", async () => {
    const config = {
      outputPdfPath: "output/titles.pdf",
      inputNames: ["Felipe", "Juan", "Pedro"],
    };
    await generateTitles(config);
    const pdf = fs.readFileSync(config.outputPdfPath);
    expect(pdf).toBeTruthy();
  });

  test("shoud work with default config and path names.txt", async () => {
    const config = {
      inputNames: "__tests__/data/names.txt",
    };
    await generateTitles(config);
    const titles = fs.readdirSync("output/img");
    const names = fs.readFileSync(config.inputNames, "utf-8").split("\n");
    expect(titles.length).toBe(names.length);
  });
});
