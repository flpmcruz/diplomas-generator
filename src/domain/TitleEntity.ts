import {
  FontColor,
  FontSize,
  ImageQuality,
  Names,
  Position,
  TextAlign,
  FontPath,
  OutputImagePath,
} from "./ValueObjects/index.js";
import { LoadedImage, TitleProps } from "./interfaces/index.js";

export class TitleEntity implements TitleProps {
  fontSize: number;
  fontColor: string;
  textAlign: string;
  imageQuality: number;
  image: LoadedImage;
  position: { x: number; y: number };
  inputNames: string[];
  fontPath: string;
  outputImgPath: string;

  constructor(config: TitleProps) {
    this.fontSize = new FontSize(config?.fontSize).value;
    this.fontColor = new FontColor(config?.color).value;
    this.textAlign = new TextAlign(config?.textAlign).value;
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
    this.outputImgPath = new OutputImagePath(config?.outputImgPath).value;
  }
}
