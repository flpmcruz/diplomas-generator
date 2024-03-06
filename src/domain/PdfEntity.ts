import { FileSystemService } from "./services/FileSystemService.js";
import { OutputPdfPath } from "./ValueObjects/OutputPdfPath.js";
import { PdfProps } from "./interfaces/index.js";

export class PdfEntity {
  outputPdfPath: string;
  width: number;
  height: number;
  imagesPaths: string[];

  constructor(props: PdfProps) {
    this.outputPdfPath = new OutputPdfPath(props.outputPdfPath).value;
    this.width = props.width;
    this.height = props.height;
    this.imagesPaths = FileSystemService.readDirContent(props.imagesPath);
  }
}
