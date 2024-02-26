import type PDFDocument from "pdfkit";
import { FileSystemService } from "./infraestructure/external-service/index.js";

interface CreatePDFProps {
  doc: typeof PDFDocument;
  fs: FileSystemService;
  outputPdfPath: string;
  width: number;
  height: number;
}

export class CreatePDF {
  private doc: typeof PDFDocument;
  private fs: FileSystemService;
  private outputPdfPath: string;
  private width: number;
  private height: number;

  constructor(props: CreatePDFProps) {
    this.doc = props.doc;
    this.fs = props.fs;
    this.outputPdfPath = props.outputPdfPath;
    this.width = props.width;
    this.height = props.height;
  }

  render = (imagenesPaths: string[]) => {
    // Crear el archivo PDF
    const outputStream = this.fs.createWriteStream(this.outputPdfPath);
    if (!outputStream) throw new Error("Error creating the PDF file");
    this.doc.pipe(outputStream);

    imagenesPaths.forEach((imagenPath) => {
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
