console.time("Time elapsed");
import fs from "fs";
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
  inputTxtPath?: string;
  outputImgPath?: string;
  outputPdfPath?: string;
}

export async function generateTitles({
  fontSize = 220,
  positionNameX = 1753,
  positionNameY = 1150,
  imageQuality = 0.9,
  fontPath = "src/fonts/itcedscr.ttf",
  inputTitlePath = "src/image/title.jpg",
  inputTxtPath = "src/data/names.txt",
  outputImgPath = "output/img",
  outputPdfPath = "output/titles.pdf",
}: generateTitlesProps) {
  // validando
  recreateDir(outputImgPath, outputPdfPath);
  const namesList = readList(inputTxtPath);

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

  const titlesImages = namesList.map((name, index) => {
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
  looging("PDF generated", messages.success);
  console.timeEnd("Time elapsed");
}
