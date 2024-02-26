import { FileSystemService } from "./infraestructure/external-service/index.js";

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
  imageQuality: number;
}

interface RenderProps {
  name: string;
  imageName: string;
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
  private imageQuality: number;
  private canvas: any;
  private ctx: any;

  constructor(config: TitleProps) {
    this.fontPath = config.fontPath;
    this.fontSize = config.fontSize;
    this.color = config.color;
    this.outputImgPath = config.outputImgPath;
    this.width = config.width;
    this.height = config.height;
    this.positionNameX = config.positionNameX;
    this.positionNameY = config.positionNameY;
    this.createCanvas = config.createCanvas;
    this.registerFont = config.registerFont;
    this.imageBaseTitle = config.imageBaseTitle;
    this.imageQuality = config.imageQuality;
    this.registerFont(this.fontPath, { family: "MyFont" });
  }

  render({ name, imageName }: RenderProps): Promise<void> {
    this.canvas = this.createCanvas(this.width, this.height);
    this.ctx = this.canvas.getContext("2d");
    this.ctx.font = `${this.fontSize}px 'MyFont'`;
    this.ctx.fillStyle = this.color;
    this.ctx.textAlign = "center";

    // Dibujar la imagen base del título en el lienzo
    this.ctx.drawImage(this.imageBaseTitle, 0, 0, this.width, this.height);

    // Escribir el nombre en el lienzo
    this.ctx.fillText(name, this.positionNameX, this.positionNameY);

    // Guardar el lienzo como archivo JPEG en la carpeta de salida
    const outputStream = FileSystemService.createWriteStream(
      `${this.outputImgPath}/${imageName}`
    );
    if (!outputStream) process.exit(1);

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
