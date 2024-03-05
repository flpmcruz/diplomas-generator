import PDFDocument from "pdfkit";
import { FileSystemService } from "../infraestructure/external-service/index.js";
import { PdfEntity } from "../domain/PdfEntity.js";

export class CreatePdfService {
  doc: typeof PDFDocument;
  pdfEntity: PdfEntity;

  constructor(pdfEntity: PdfEntity) {
    this.doc = new PDFDocument();
    this.pdfEntity = pdfEntity;
  }

  render = async (): Promise<boolean> => {
    return new Promise((resolve, reject) => {
      const { width, height, outputPdfPath, imagesPaths } = this.pdfEntity;

      const outputStream = FileSystemService.createWriteStream(outputPdfPath);
      if (!outputStream) throw new Error("Error creating PDF file");

      this.doc.pipe(outputStream);

      imagesPaths.forEach((imagenPath: string) => {
        this.doc.addPage({ size: [width, height] });
        this.doc.image(imagenPath, 0, 0, {
          width,
          height,
        });
      });

      this.doc.end();

      outputStream.on("finish", () => resolve(true));
      outputStream.on("error", (error) => reject(error));
    });
  };
}
