export interface generateTitlesProps
  extends Omit<TitleProps, "imageBaseTitle"> {
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
  imageBaseTitle: LoadedImage;
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
