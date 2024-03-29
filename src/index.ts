import {
  CreateTitleService,
  LoadImageService,
  LoggingService,
} from "./aplication";
import { TitleEntity } from "./domain/TitleEntity.js";
import { generateTitlesProps } from "./domain/interfaces";

// Utility to load an image from the file system
export { LoadImageDeprecated as LoadImage } from "./infraestructure";

/**
 * @param {generateTitlesProps} config
 * @returns {Promise<boolean>}
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
 *  exportImg: true,
 *  outputImgPath: "output/img",
 *  exportPDF: true,
 *  outputPdfPath: "output/titles.pdf",
 *  enableLogging: true,
 * });
 */
export async function generateTitles(
  config: generateTitlesProps
): Promise<boolean> {
  try {
    const Logging = LoggingService.getInstance(config?.enableLogging);
    const image = await new LoadImageService(config?.inputTitlePath).exec();
    const titleEntity = new TitleEntity({ ...config, image });

    /*  */
    Logging.success("List read");
    Logging.default("-".repeat(15));
    Logging.main("Generating titles");
    /*  */

    const title = new CreateTitleService(titleEntity);
    await title.render();

    /*  */
    titleEntity.exportImg && Logging.success("Images generated");
    titleEntity.exportPdf && Logging.success("PDF generated");
    Logging.default("-".repeat(15));
    /*  */

    return true;
  } catch (error) {
    if (error instanceof Error) throw error;
    throw new Error("An error occurred while generating the titles");
  }
}
