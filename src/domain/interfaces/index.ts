import { TitleEntity } from "../TitleEntity.js";

export type imgQuality =
  | 0.1
  | 0.2
  | 0.3
  | 0.4
  | 0.5
  | 0.6
  | 0.7
  | 0.8
  | 0.9
  | 1;

export type TextAlign = "center" | "left" | "right" | "start" | "end";
export type HexColor = `#${string}`;

export interface TitleProps {
  fontSize?: number;
  color?: HexColor;
  inputNames: string[] | string;
  textAlign?: TextAlign;
  positionNameX?: number;
  positionNameY?: number;
  imageQuality?: imgQuality;
  fontPath?: string;
  image: LoadedImage;
  inputTitlePath?: string;
  exportImg?: boolean;
  outputImgPath?: string;
  exportPDF?: boolean;
  outputPdfPath?: string;
}

export interface generateTitlesProps extends Omit<TitleProps, "image"> {
  outputPdfPath?: string;
  exportPDF?: boolean;
  enableLogging?: boolean;
}

export interface PdfProps {
  outputPdfPath?: string;
  imagesPath: string;
  width: number;
  height: number;
}

export interface LoadedImage {
  imageBaseTitle: any;
  width: number;
  height: number;
}

export interface CreateTitle {
  titleEntity: InstanceType<typeof TitleEntity>;
  render: () => Promise<void>;
}

export interface ImageLoader {
  load: () => Promise<LoadedImage>;
}
