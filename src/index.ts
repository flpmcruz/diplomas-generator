console.time("Time elapsed generating titles");

import PDFDocument from "pdfkit";
import { createCanvas, registerFont } from "canvas";

import { Title } from "./Title.js";
import { CreatePDF } from "./CreatePDF.js";
import {
  LoggingService,
  FileSystemService,
  LoadImage,
} from "./infraestructure/external-service/index.js";
import { InputsValidator } from "./utils/Validations.js";
import { OUTPUTIMGPATH, OUTPUTPDFPATH } from "./constants/paths.js";
export { LoadImage } from "./infraestructure/external-service/index.js";

interface generateTitlesProps {
  inputNames: string[] | string;
  fontSize?: number;
  textAlign?: string;
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
 *  textAlign: "center",
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
    let exportPDF = InputsValidator.isBoolean(config?.exportPDF);
    let enableLogging = InputsValidator.isBoolean(config?.enableLogging);
    let color = InputsValidator.isHexadecimalColor(config?.color);
    let textAlign = InputsValidator.isValidTextAlign(config?.textAlign);
    let fontSize = InputsValidator.isValidFontSize(config?.fontSize);
    let imageQuality = InputsValidator.isValidImageQuality(
      config?.imageQuality
    );
    let positionNameX = Number(config?.positionNameX);
    let positionNameY = Number(config?.positionNameY);

    let basePath = ["node_modules", "diplomas-generator", "dist", "src"];
    let inputTitlePath = InputsValidator.isValidPath(config?.inputTitlePath, [
      ...basePath,
      "image",
      "title.jpg",
    ]);
    let fontPath = InputsValidator.isValidPath(config?.fontPath, [
      ...basePath,
      "fonts",
      "itcedscr.ttf",
    ]);

    let outputImgPath = config?.outputImgPath || OUTPUTIMGPATH;
    let outputPdfPath = config?.outputPdfPath || OUTPUTPDFPATH;
    FileSystemService.recreateDir(outputImgPath, outputPdfPath);

    const Logging = new LoggingService(enableLogging);
    Logging.main("Reading the list of names");

    let inputNames = config?.inputNames || [];
    if (typeof inputNames === "string" && inputNames.length > 0)
      inputNames = FileSystemService.readList(inputNames) || [];
    if (!Array.isArray(inputNames) || inputNames.length === 0)
      throw new Error("Error reading the list of names");

    /*  */
    Logging.success("List read");
    Logging.default("-".repeat(15));
    Logging.main("Generating images");
    /*  */

    // Load the title image
    const image = await LoadImage.load(inputTitlePath);
    if (!image) throw new Error("Error loading the title image");

    const { width, height, imageBaseTitle } = image;
    Logging.main(`Title size: ${width} x ${height}`);

    // Set position to the center if they are not provided
    if (!positionNameX) {
      positionNameX = Math.round(width / 2);
      Logging.warning(
        `positionNameX not provided, using the width center of the image: ${positionNameX}`
      );
    }
    if (!positionNameY) {
      positionNameY = Math.round(height / 2);
      Logging.warning(
        `positionNameY not provided, using the height center of the image: ${positionNameY}`
      );
    }

    const title = new Title({
      fontPath,
      color,
      fontSize,
      textAlign,
      outputImgPath,
      positionNameX,
      positionNameY,
      width,
      height,
      imageBaseTitle,
      imageQuality,
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

    const imagenesPaths: string[] | void =
      FileSystemService.readDirContent(outputImgPath);

    if (!Array.isArray(imagenesPaths) || imagenesPaths?.length === 0)
      throw new Error("Error generating titles images");

    /*  */
    Logging.success("Images generated");
    Logging.default("-".repeat(15));
    /*  */

    if (exportPDF) {
      Logging.main("Generating PDF");
      const pdf = new CreatePDF({
        outputPdfPath,
        width,
        height,
        doc: new PDFDocument(),
      });

      await pdf.render(imagenesPaths);
      Logging.success(`PDF generated with ${imagenesPaths.length} titles`);
    }

    console.timeEnd("Time elapsed generating titles");
    return true;
  } catch (error) {
    if (error instanceof Error) console.log(error.message);
    else console.log("There has been an error");
    console.timeEnd("Time elapsed generating titles");
    return false;
  }
}
