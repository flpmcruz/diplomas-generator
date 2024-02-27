import { type FileSystemService } from "./infraestructure/external-service/index.js";

export type TextAlign = "center" | "left" | "right" | "start" | "end";

interface TitleProps {
  fontPath: string;
  color: string;
  fontSize: number;
  textAlign: TextAlign;
  positionNameX: number;
  positionNameY: number;
  outputImgPath: string;
  width: number;
  height: number;
  imageBaseTitle: any;
  imageQuality: number;
  /*  */
  createCanvas: any;
  registerFont: any;
  fs: FileSystemService;
}

interface RenderProps {
  name: string;
  imageName: string;
}

export class Title {
  private fontPath: string;
  private fontSize: number;
  private textAlign: TextAlign;
  private color: string;
  private positionNameX: number;
  private positionNameY: number;
  private outputImgPath: string;
  private width: number;
  private height: number;
  private createCanvas: any;
  private registerFont: any;
  private imageBaseTitle: any;
  private imageQuality: number;

  private fs: FileSystemService;
  private canvas: any;
  private ctx: any;

  constructor(config: TitleProps) {
    this.fontPath = config.fontPath;
    this.fontSize = config.fontSize;
    this.textAlign = config.textAlign;
    this.color = config.color;
    this.outputImgPath = config.outputImgPath;
    this.width = config.width;
    this.height = config.height;
    this.positionNameX = config.positionNameX;
    this.positionNameY = config.positionNameY;
    this.imageBaseTitle = config.imageBaseTitle;
    this.imageQuality = config.imageQuality;

    this.fs = config.fs;
    this.createCanvas = config.createCanvas;
    this.registerFont = config.registerFont;

    this.registerFont(this.fontPath, { family: "MyFont" });
  }

  render({ name, imageName }: RenderProps): Promise<void> {
    this.canvas = this.createCanvas(this.width, this.height);
    this.ctx = this.canvas.getContext("2d");
    this.ctx.font = `${this.fontSize}px 'MyFont'`;
    this.ctx.fillStyle = this.color;
    this.ctx.textAlign = this.textAlign;

    // Dibujar la imagen base del título en el lienzo
    this.ctx.drawImage(this.imageBaseTitle, 0, 0, this.width, this.height);

    // Escribir el nombre en el lienzo
    this.ctx.fillText(name, this.positionNameX, this.positionNameY);

    // Guardar el lienzo como archivo JPEG en la carpeta de salida
    const outputStream = this.fs.createWriteStream(
      `${this.outputImgPath}/${imageName}`
    );
    if (!outputStream) return Promise.reject();

    const stream = this.canvas.createJPEGStream({
      imageQuality: this.imageQuality, // Calidad de compresión JPEG
      chromaSubsampling: false, // Desactivar submuestreo de croma para evitar artefactos de color
    });

    return new Promise<void>((resolve, reject) => {
      stream.pipe(outputStream);
      outputStream.on("finish", resolve);
      outputStream.on("error", reject);
    });
  }
}
