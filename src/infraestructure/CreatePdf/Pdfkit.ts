import PDFDocument from "pdfkit";
import { FileSystemService } from "../../domain/services/FileSystemService.js";
import { PdfEntity } from "../../domain/PdfEntity.js";
import { CreatePdf } from "../../domain/interfaces/index.js";

export class Pdfkit implements CreatePdf {
  doc: typeof PDFDocument;
  pdfEntity: PdfEntity;

  constructor(pdfEntity: PdfEntity) {
    this.doc = new PDFDocument();
    this.pdfEntity = pdfEntity;
  }

  async render(): Promise<void> {
    return new Promise((resolve, reject) => {
      const { width, height, outputPdfPath, imagesPaths } = this.pdfEntity;

      const outputStream = FileSystemService.createWriteStream(outputPdfPath);
      if (!outputStream) throw new Error("Error creating PDF file");

      this.doc.pipe(outputStream);
      imagesPaths.forEach((imgPath: string) => {
        this.doc.addPage({ size: [width, height] });
        this.doc.image(imgPath, 0, 0, { width, height });
      });
      this.doc.end();

      outputStream.on("finish", () => resolve());
      outputStream.on("error", () => reject("Error creating PDF file"));
    });
  }
}
