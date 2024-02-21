import fs from "fs";

interface TitleProps {
  fontPath: string;
  color: string;
  fontSize: number;
  positionNameX: number;
  positionNameY: number;
  outputImgPath: string;
  width: number;
  height: number;
  createCanvas: any;
  registerFont: any;
  imageBaseTitle: any;
}

interface RenderProps {
  name: string;
  imageName: string;
  imageQuality: number;
}

export class Title {
  private fontPath: string;
  private fontSize: number;
  private color: string;
  private positionNameX: number;
  private positionNameY: number;
  private outputImgPath: string;
  private width: number;
  private height: number;
  private createCanvas: any;
  private registerFont: any;
  private imageBaseTitle: any;
  private canvas: any;
  private ctx: any;

  constructor({
    fontPath,
    fontSize,
    color,
    positionNameX,
    positionNameY,
    outputImgPath,
    width,
    height,
    createCanvas,
    registerFont,
    imageBaseTitle,
  }: TitleProps) {
    this.fontPath = fontPath;
    this.fontSize = fontSize;
    this.color = color;
    this.outputImgPath = outputImgPath;
    this.width = width;
    this.height = height;
    this.positionNameX = positionNameX;
    this.positionNameY = positionNameY;
    this.createCanvas = createCanvas;
    this.registerFont = registerFont;
    this.imageBaseTitle = imageBaseTitle;
    this.registerFont(this.fontPath, { family: "MiFuente" });
  }

  render({ name, imageName, imageQuality }: RenderProps): Promise<void> {
    this.canvas = this.createCanvas(this.width, this.height);
    this.ctx = this.canvas.getContext("2d");
    this.ctx.font = `${this.fontSize}px 'MiFuente'`;
    this.ctx.fillStyle = this.color;
    this.ctx.textAlign = "center";

    // Dibujar la imagen base del título en el lienzo
    this.ctx.drawImage(this.imageBaseTitle, 0, 0, this.width, this.height);

    // Escribir el nombre en el lienzo
    this.ctx.fillText(name, this.positionNameX, this.positionNameY);

    // Guardar el lienzo como archivo JPEG en la carpeta de salida
    const outputStream = fs.createWriteStream(
      `${this.outputImgPath}/${imageName}`
    );
    const stream = this.canvas.createJPEGStream({
      imageQuality, // Calidad de compresión JPEG
      chromaSubsampling: false, // Desactivar submuestreo de croma para evitar artefactos de color
    });

    return new Promise<void>((resolve, reject) => {
      stream.pipe(outputStream);
      outputStream.on("finish", resolve);
      outputStream.on("error", reject);
    });
  }
}
