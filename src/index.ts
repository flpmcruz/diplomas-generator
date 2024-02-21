console.time("Time elapsed");
import fs from "fs";
import path from "path";
import PDFDocument from "pdfkit";
import { createCanvas, loadImage, registerFont } from "canvas";
import { looging, messages } from "./logging.js";
import { Title } from "./Title.js";
import { CreatePDF } from "./CreatePDF.js";
import { recreateDir, readList } from "./validations.js";

interface generateTitlesProps {
  fontSize?: number;
  positionNameX?: number;
  positionNameY?: number;
  imageQuality?: number;
  fontPath?: string;
  inputTitlePath?: string;
  inputNames?: string[] | string;
  outputImgPath?: string;
  outputPdfPath?: string;
}

export async function generateTitles(config: generateTitlesProps) {
  let basePath = "node_modules/diplomas-generator/dist/src";
  let fontSize = config?.fontSize || 220;
  let positionNameX = config?.positionNameX || 1650;
  let positionNameY = config?.positionNameY || 950;
  let imageQuality = config?.imageQuality || 0.9;
  let outputImgPath = config?.outputImgPath || "output/img";
  let outputPdfPath = config?.outputPdfPath || "output/titles.pdf";

  let inputTitlePath =
    config?.inputTitlePath ||
    path.join(path.resolve(), basePath, "image/title.jpg") ||
    "./image/title.jpg";
  let inputNames = config?.inputNames || [];

  let fontPath =
    config?.fontPath ||
    path.join(path.resolve(), basePath, "fonts/itcedscr.ttf") ||
    "./fonts/itcedscr.ttf";

  // validate if the output directory exists
  recreateDir(outputImgPath, outputPdfPath);

  looging("Reading the list of names", messages.main);

  if (typeof inputNames === "string" && inputNames.length > 0)
    inputNames = readList(inputNames);

  if (!Array.isArray(inputNames) || inputNames.length === 0) {
    looging("No names found", messages.error);
    return;
  }

  looging("Generating images", messages.main);
  // Cargar la imagen del título
  const imageBaseTitle = await loadImage(inputTitlePath);
  const width = imageBaseTitle.width;
  const height = imageBaseTitle.height;

  const title = new Title({
    fontPath,
    fontSize,
    outputImgPath,
    positionNameX,
    positionNameY,
    width,
    height,
    imageBaseTitle,
    createCanvas,
    registerFont,
  });

  const titlesImages = inputNames.map((name, index) => {
    return new Promise((resolve) => {
      title.render({
        name,
        imageName: `${index + 1}.jpg`,
        imageQuality,
        callback: resolve,
      });
    });
  });
  await Promise.all(titlesImages);
  looging("Images generated", messages.success);

  looging("---------------------");

  looging("Generating PDF", messages.main);
  const imagenesPaths: string[] = fs
    .readdirSync(outputImgPath)
    .map((file) => `${outputImgPath}/${file}`);
  const convertPDF = new CreatePDF({
    doc: new PDFDocument(),
    outputPdfPath,
    width,
    height,
  });
  convertPDF.render(imagenesPaths);
  looging(`Count: ${imagenesPaths.length} titles`, messages.success);
  looging("PDF generated", messages.success);
  console.timeEnd("Time elapsed");
}
