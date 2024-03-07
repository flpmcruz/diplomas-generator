import {
  CreateTitleService,
  CreatePdfService,
  LoadImageService,
  LoggingService,
} from "./aplication/index.js";
import { TitleEntity } from "./domain/TitleEntity.js";
import { generateTitlesProps } from "./domain/interfaces/index.js";
import { PdfEntity } from "./domain/PdfEntity.js";
import { ExportPdf } from "./domain/ValueObjects/index.js";

// Utility to load an image from the file system
export { LoadImageDeprecated as LoadImage } from "./infraestructure/index.js";

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
 *  enableLogging: true // default "true"
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
    Logging.success("Images generated");
    Logging.default("-".repeat(15));
    /*  */

    const exportPdf = new ExportPdf(config?.exportPDF).value;
    if (exportPdf) {
      Logging.main("Generating PDF");

      const pdfEntity = new PdfEntity({
        outputPdfPath: config?.outputPdfPath,
        imagesPath: titleEntity.outputImgPath,
        width: image.width,
        height: image.height,
      });

      const pdf = new CreatePdfService(pdfEntity);
      await pdf.render();
      Logging.success(`PDF generated`);
    }

    return true;
  } catch (error) {
    if (error instanceof Error) throw error.message;
    throw new Error("An error occurred while generating the titles");
  }
}
