import {
  FontColor,
  FontSize,
  ImageQuality,
  Names,
  Position,
  TextAlignment,
  FontPath,
  OutputImagePath,
  Export,
  OutputPdfPath,
} from "./ValueObjects";
import { LoadedImage, TextAlign, TitleProps, imgQuality } from "./interfaces";

export class TitleEntity implements TitleProps {
  fontSize: number;
  fontColor: string;
  textAlignment: TextAlign;
  imageQuality: imgQuality;
  image: LoadedImage;
  position: { x: number; y: number };
  inputNames: string[];
  fontPath: string;
  exportImg: boolean;
  outputImgPath: string;
  exportPdf: boolean;
  outputPdfPath: string;

  constructor(config: TitleProps) {
    this.exportImg = new Export(config?.exportImg).value;
    this.exportPdf = new Export(config?.exportPDF).value;
    this.checkExportIsDefined();

    this.outputImgPath = this.exportImg
      ? new OutputImagePath(config?.outputImgPath).value
      : "";
    this.outputPdfPath = this.exportPdf
      ? new OutputPdfPath(config?.outputPdfPath).value
      : "";

    this.fontSize = new FontSize(config?.fontSize).value;
    this.fontColor = new FontColor(config?.color).value;
    this.textAlignment = new TextAlignment(config?.textAlign).value;
    this.imageQuality = new ImageQuality(config?.imageQuality).value;
    this.image = config.image;

    this.position = new Position({
      xFallback: this.image.width,
      yFallback: this.image.height,
      x: config?.positionNameX,
      y: config?.positionNameY,
    });
    this.inputNames = new Names(config?.inputNames).value;
    this.fontPath = new FontPath(config?.fontPath).value;
  }

  private checkExportIsDefined(): void {
    if (!this.exportImg && !this.exportPdf)
      throw new Error("At least one export option must be enabled");
  }
}
