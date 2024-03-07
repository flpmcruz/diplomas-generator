import { PdfEntity } from "../PdfEntity.js";
import { TitleEntity } from "../TitleEntity.js";

export interface generateTitlesProps extends Omit<TitleProps, "image"> {
  outputPdfPath?: string;
  exportPDF?: boolean;
  enableLogging?: boolean;
}

export interface TitleProps {
  fontSize?: number;
  color?: string;
  inputNames: string[] | string;
  textAlign?: string;
  positionNameX?: number;
  positionNameY?: number;
  imageQuality?: number;
  fontPath?: string;
  inputTitlePath?: string;
  outputImgPath?: string;
  image: LoadedImage;
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
  titleEntity: TitleEntity;
  render: () => Promise<void>;
}

export interface CreatePdf {
  pdfEntity: PdfEntity;
  render: () => Promise<void>;
}

export interface ImageLoader {
  load: () => Promise<LoadedImage>;
}
