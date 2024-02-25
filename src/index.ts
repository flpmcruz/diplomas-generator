console.time("Time elapsed".bgCyan);

import path from "path";
import PDFDocument from "pdfkit";
import { createCanvas, registerFont } from "canvas";

import { Title } from "./Title.js";
import { CreatePDF } from "./CreatePDF.js";
import {
  Loggin,
  FileSystemService,
  LoadImage,
} from "./infraestructure/external-service/index.js";
export { LoadImage } from "./infraestructure/external-service/index.js";

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
  let fontSize = config?.fontSize || 220;
  let color = config?.color || "#000000";
  let positionNameX = config?.positionNameX;
  let positionNameY = config?.positionNameY;
  let imageQuality = config?.imageQuality || 0.9;
  let outputImgPath = config?.outputImgPath || "output/img";
  let outputPdfPath = config?.outputPdfPath || "output/titles.pdf";

  let basePath = "node_modules/diplomas-generator/dist";
  let inputTitlePath = path.join(
    path.resolve(),
    config?.inputTitlePath || `${basePath}/src/image/title.jpg`
  );
  let inputNames = config?.inputNames || [];

  let fontPath = path.join(
    path.resolve(),
    config?.fontPath || `${basePath}/src/fonts/itcedscr.ttf`
  );

  // fallback to default values if the files are not found in development mode
  if (!FileSystemService.checkFileExists(inputTitlePath))
    inputTitlePath = path.join(path.resolve(), `src/image/title.jpg`);
  if (!FileSystemService.checkFileExists(fontPath))
    fontPath = path.join(path.resolve(), `src/fonts/itcedscr.ttf`);
  //

  // validate if the output directory exists
  FileSystemService.recreateDir(outputImgPath, outputPdfPath);

  Loggin.main("Reading the list of names");

  if (typeof inputNames === "string" && inputNames.length > 0)
    inputNames = FileSystemService.readList(inputNames) || [];

  if (!Array.isArray(inputNames) || inputNames.length === 0) {
    Loggin.error("No names found");
    return;
  }
  /*  */
  Loggin.success("List read");
  Loggin.default("-".repeat(15).dim);
  Loggin.main("Generating images");
  /*  */

  // Load the title image
  const image = await LoadImage.load(inputTitlePath);
  if (!image) {
    Loggin.error("Error loading the title image");
    return;
  }
  const { width, height, imageBaseTitle } = image;
  Loggin.main(`Title size: ${width} x ${height}`);

  // Set position to the center if they are not provided
  if (!positionNameX) {
    positionNameX = Math.round(width / 2);
    Loggin.warning(
      `positionNameX not provided, using the width center of the image: ${positionNameX}`
    );
  }
  if (!positionNameY) {
    positionNameY = Math.round(height / 2);
    Loggin.warning(
      `positionNameY not provided, using the height center of the image: ${positionNameY}`
    );
  }

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
      name: name.trim(),
      imageName: `${index + 1}.jpg`,
      imageQuality,
    });
  });
  await Promise.all(renderPromises);

  /*  */
  Loggin.success("Images generated");
  Loggin.default("-".repeat(15).dim);
  Loggin.main("Generating PDF");
  /*  */

  const imagenesPaths: string[] | void =
    FileSystemService.readDirContent(outputImgPath);

  if (!Array.isArray(imagenesPaths)) {
    Loggin.error("No images found to generate PDF");
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
  Loggin.success(`PDF generated with ${imagenesPaths.length} titles`);
  console.timeEnd("Time elapsed".bgCyan);
}
