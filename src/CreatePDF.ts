import type PDFDocument from "pdfkit";
import { FileSystemService } from "./infraestructure/external-service/index.js";

interface CreatePDFProps {
  doc: typeof PDFDocument;
  outputPdfPath: string;
  width: number;
  height: number;
}

export class CreatePDF {
  private doc: typeof PDFDocument;
  private outputPdfPath: string;
  private width: number;
  private height: number;

  constructor({ doc, outputPdfPath, width, height }: CreatePDFProps) {
    this.doc = doc;
    this.outputPdfPath = outputPdfPath;
    this.width = width;
    this.height = height;
  }

  render = (imagenesPaths: string[]) => {
    // Crear el archivo PDF
    const outputStream = FileSystemService.createWriteStream(
      this.outputPdfPath
    );
    if (!outputStream) process.exit(1);
    this.doc.pipe(outputStream);

    imagenesPaths.forEach((imagenPath) => {
      // Ajustar el tamaño de la página del PDF según el tamaño de la imagen
      this.doc.addPage({ size: [this.width, this.height] });

      // Agregar la imagen al PDF
      this.doc.image(imagenPath, 0, 0, {
        width: this.width,
        height: this.height,
      });
    });

    this.doc.end();
  };
}
