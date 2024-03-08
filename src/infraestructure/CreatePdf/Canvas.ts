import { createCanvas, loadImage } from "canvas";
import { PdfEntity } from "../../domain/PdfEntity";
import { FileSystemService } from "../../domain/services/FileSystemService";
import { CreatePdf } from "../../domain/interfaces";

export class CanvasPdf implements CreatePdf {
  pdfEntity: PdfEntity;

  constructor(pdfEntity: PdfEntity) {
    this.pdfEntity = pdfEntity;
  }

  async render(): Promise<void> {
    return new Promise(async (resolve, reject) => {
      const { width, height, outputPdfPath, imagesPaths } = this.pdfEntity;

      const canvas = createCanvas(width, height, "pdf");
      const ctx = canvas.getContext("2d");

      for (let file of imagesPaths) {
        try {
          const image = await loadImage(file);
          ctx.drawImage(image, 0, 0, width, height);
          if (file !== imagesPaths[imagesPaths.length - 1]) ctx.addPage();
        } catch (err) {
          reject("Error creating PDF file");
          return;
        }
      }

      const outputStream = FileSystemService.createWriteStream(outputPdfPath);
      const stream = canvas.createPDFStream();
      stream.pipe(outputStream);

      outputStream.on("finish", () => resolve());
      outputStream.on("error", () => reject("Error creating PDF file"));
    });
  }
}
