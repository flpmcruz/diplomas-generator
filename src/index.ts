console.time("Time elapsed".bgCyan);
import path from "path";
import PDFDocument from "pdfkit";
import { createCanvas, loadImage, registerFont } from "canvas";
import { looging } from "./infraestructure/external-service/logging.js";
import { Title } from "./Title.js";
import { CreatePDF } from "./CreatePDF.js";
import { FileSystemService } from "./infraestructure/external-service/FileSystemService.js";

interface generateTitlesProps {
  fontSize?: number;
  color?: string;
  positionNameX?: number;
  positionNameY?: number;
  imageQuality?: number;
  fontPath?: string;
  inputTitlePath?: string;
  inputNames: string[] | string;
  outputImgPath?: string;
  outputPdfPath?: string;
}
/**
 * @param {generateTitlesProps} config
 * @returns {Promise<void>}
 * @description Generate titles with the names provided in the inputNames parameter, and save them in the outputImgPath directory. Then, it generates a PDF with the images and saves it in the outputPdfPath directory. Only the inputNames parameter is required, the rest of the parameters are optional.
 * @example
 * generateTitles({
 *  fontSize: 220,
 *  color: "#000000",
 *  positionNameX: 1653,
 *  positionNameY: 950,
 *  imageQuality: 0.9,
 *  fontPath: "src/fonts/itcedscr.ttf",
 *  inputTitlePath: "src/image/title.jpg",
 *  outputImgPath: "output/img",
 *  outputPdfPath: "output/titles.pdf",
 *  inputNames: "src/data/names.txt", // or ["Felipe", "Juan", "Pedro"]
 * });
 */
export async function generateTitles(
  config: generateTitlesProps
): Promise<void> {
  let basePath = "node_modules/diplomas-generator/dist/src";
  let fontSize = config?.fontSize || 220;
  let positionNameX = config?.positionNameX || 1625;
  let positionNameY = config?.positionNameY || 950;
  let imageQuality = config?.imageQuality || 0.9;
  let color = config?.color || "#000000";
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
  FileSystemService.recreateDir(outputImgPath, outputPdfPath);

  looging("Reading the list of names", "main");

  if (typeof inputNames === "string" && inputNames.length > 0)
    inputNames = FileSystemService.readList(inputNames) || [];

  if (!Array.isArray(inputNames) || inputNames.length === 0) {
    looging("No names found", "error");
    return;
  }

  looging("Generating images", "main");
  // Cargar la imagen del título
  const imageBaseTitle = await loadImage(inputTitlePath);
  const width = imageBaseTitle.width;
  const height = imageBaseTitle.height;

  const title = new Title({
    fontPath,
    color,
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

  const renderPromises = inputNames.map((name, index) => {
    return title.render({
      name,
      imageName: `${index + 1}.jpg`,
      imageQuality,
    });
  });
  await Promise.all(renderPromises);

  /*  */
  looging("Images generated", "success");
  looging("-".repeat(10));
  looging("Generating PDF", "main");
  /*  */

  const imagenesPaths: string[] | void =
    FileSystemService.readDirContent(outputImgPath);

  if (!Array.isArray(imagenesPaths)) {
    looging("No images found to generate PDF", "error");
    console.timeEnd("Time elapsed".bgCyan);
    return;
  }

  const convertPDF = new CreatePDF({
    doc: new PDFDocument(),
    outputPdfPath,
    width,
    height,
  });
  convertPDF.render(imagenesPaths);

  /*  */
  looging(`Count: ${imagenesPaths.length} titles`, "success");
  looging("PDF generated", "success");
  console.timeEnd("Time elapsed".bgCyan);
}
