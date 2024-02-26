console.time("Time elapsed generating titles");

import path from "path";
import PDFDocument from "pdfkit";
import { createCanvas, registerFont } from "canvas";

import { Title } from "./Title.js";
import { CreatePDF } from "./CreatePDF.js";
import {
  LoggingService,
  FileSystemService,
  LoadImage,
} from "./infraestructure/external-service/index.js";
export { LoadImage } from "./infraestructure/external-service/index.js";

interface generateTitlesProps {
  inputNames: string[] | string;
  fontSize?: number;
  color?: string;
  positionNameX?: number;
  positionNameY?: number;
  imageQuality?: number;
  fontPath?: string;
  inputTitlePath?: string;
  outputImgPath?: string;
  outputPdfPath?: string;
  exportPDF?: boolean;
  enableLogging?: boolean;
}
/**
 * @param {generateTitlesProps} config
 * @returns {Promise<void>}
 * @description Generate titles with the names provided in the inputNames parameter, and save them in the outputImgPath directory. Then, it generates a PDF with the images and saves it in the outputPdfPath directory. Only the inputNames parameter is required, the rest of the parameters are optional.
 * @example
 * generateTitles({
 *  inputNames: "src/data/names.txt", // or ["Felipe", "Juan"]
 *  fontSize: 220,
 *  color: "#000000",
 *  positionNameX: 1653,
 *  positionNameY: 950,
 *  imageQuality: 0.9,
 *  fontPath: "src/fonts/itcedscr.ttf",
 *  inputTitlePath: "src/image/title.jpg",
 *  outputImgPath: "output/img",
 *  outputPdfPath: "output/titles.pdf",
 *  exportPDF: true, // default "true"
 *  enableLogging: "true" // default "true"
 * });
 */
export async function generateTitles(
  config: generateTitlesProps
): Promise<boolean> {
  try {
    let fontSize = Number(config?.fontSize) || 220;
    let color = config?.color || "#000000";
    let positionNameX = Number(config?.positionNameX);
    let positionNameY = Number(config?.positionNameY);
    let imageQuality = Number(config?.imageQuality) || 0.9;
    let outputImgPath = config?.outputImgPath || "output/img";
    let outputPdfPath = config?.outputPdfPath || "output/titles.pdf";
    let exportPDF =
      typeof config?.exportPDF === "boolean" ? config.exportPDF : true;
    let enableLogging =
      typeof config?.enableLogging === "boolean" ? config.enableLogging : true;

    let basePath = "node_modules/diplomas-generator/dist";
    let inputTitlePath = path.join(
      path.resolve(),
      config?.inputTitlePath ||
        `${
          process.env.environment === "dev" ? "" : basePath
        }/src/image/title.jpg`
    );
    let inputNames = config?.inputNames || [];

    let fontPath = path.join(
      path.resolve(),
      config?.fontPath ||
        `${
          process.env.environment === "dev" ? "" : basePath
        }/src/fonts/itcedscr.ttf`
    );

    const Loggin = new LoggingService(enableLogging);
    const fs = new FileSystemService(Loggin);
    // validations
    fs.checkFileExists(inputTitlePath);
    fs.checkFileExists(fontPath);
    fs.recreateDir(outputImgPath, outputPdfPath);

    Loggin.main("Reading the list of names");

    if (typeof inputNames === "string" && inputNames.length > 0)
      inputNames = fs.readList(inputNames) || [];

    if (!Array.isArray(inputNames) || inputNames.length === 0) {
      Loggin.error("No names found");
      return false;
    }
    /*  */
    Loggin.success("List read");
    Loggin.default("-".repeat(15));
    Loggin.main("Generating images");
    /*  */

    // Load the title image
    const image = await LoadImage.load(inputTitlePath);
    if (!image) {
      Loggin.error("Error loading the title image");
      return false;
    }
    const { width, height, imageBaseTitle } = image;
    if (enableLogging) Loggin.main(`Title size: ${width} x ${height}`);

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
      imageQuality,
      fs,
      createCanvas,
      registerFont,
    });

    const renderPromises = inputNames.map((name, index) => {
      return title.render({
        name: name.trim(),
        imageName: `${index + 1}.jpg`,
      });
    });
    await Promise.all(renderPromises);

    /*  */
    Loggin.success("Images generated");
    Loggin.default("-".repeat(15));
    /*  */

    const imagenesPaths: string[] | void = fs.readDirContent(outputImgPath);

    if (!Array.isArray(imagenesPaths)) {
      Loggin.error("No images found to generate PDF");
      console.timeEnd("Time elapsed generating titles");
      return false;
    }

    if (exportPDF) {
      Loggin.main("Generating PDF");
      new CreatePDF({
        doc: new PDFDocument(),
        fs,
        outputPdfPath,
        width,
        height,
      }).render(imagenesPaths);
      Loggin.success(`PDF generated with ${imagenesPaths.length} titles`);
    }

    console.timeEnd("Time elapsed generating titles");
    return true;
  } catch (error) {
    return false;
  }
}
