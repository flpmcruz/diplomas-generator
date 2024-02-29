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

  constructor(props: CreatePDFProps) {
    this.doc = props.doc;
    this.outputPdfPath = props.outputPdfPath;
    this.width = props.width;
    this.height = props.height;
  }

  render = async (imagenesPaths: string[]): Promise<boolean> => {
    return new Promise((resolve, reject) => {
      const outputStream = FileSystemService.createWriteStream(
        this.outputPdfPath
      );
      if (!outputStream) throw new Error("Error creating PDF file");

      this.doc.pipe(outputStream);

      imagenesPaths.forEach((imagenPath) => {
        this.doc.addPage({ size: [this.width, this.height] });
        this.doc.image(imagenPath, 0, 0, {
          width: this.width,
          height: this.height,
        });
      });

      this.doc.end();

      outputStream.on("finish", () => resolve(true));
      outputStream.on("error", (error) => reject(error));
    });
  };
}
