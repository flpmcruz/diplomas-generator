import { createCanvas, registerFont } from "canvas";
import { TitleEntity } from "../../domain/TitleEntity.js";
import { FileSystemService } from "../../domain/services/FileSystemService.js";
import { CreateTitle } from "../../domain/interfaces/index.js";

export class Canvas implements CreateTitle {
  titleEntity: TitleEntity;
  private createCanvas: Function;
  private registerFont: Function;

  constructor(titleEntity: TitleEntity) {
    this.titleEntity = titleEntity;
    this.createCanvas = createCanvas;
    this.registerFont = registerFont;
    this.registerFont(this.titleEntity.fontPath, { family: "MyFont" });
  }

  async render(): Promise<void> {
    const {
      inputNames,
      outputImgPath,
      fontSize,
      fontColor,
      textAlign,
      position,
      imageQuality,
    } = this.titleEntity;
    const {
      width,
      height,
      imageBaseTitle: image,
    } = this.titleEntity.imageBaseTitle;

    await Promise.all(
      inputNames.map(async (name, index) => {
        const canvas = this.createCanvas(width, height);
        const ctx = canvas.getContext("2d");
        ctx.font = `${fontSize}px 'MyFont'`;
        ctx.fillStyle = fontColor;
        ctx.textAlign = textAlign;

        // Dibujar la imagen base del título en el lienzo
        ctx.drawImage(image, 0, 0, width, height);

        // Escribir el nombre en el lienzo
        ctx.fillText(name, position.x, position.y);

        // Guardar el lienzo como archivo JPEG en la carpeta de salida
        const path = FileSystemService.joinPaths(outputImgPath, `${index}.jpg`);
        const outputStream = FileSystemService.createWriteStream(path);

        if (!outputStream)
          throw new Error("Error al crear el flujo de escritura.");

        const stream = canvas.createJPEGStream({
          imageQuality, // Calidad de compresión JPEG
          chromaSubsampling: false, // Desactivar submuestreo de croma para evitar artefactos de color
        });

        await new Promise<void>((resolve, reject) => {
          stream.pipe(outputStream);
          outputStream.on("finish", () => resolve());
          outputStream.on("error", (error) => reject(error));
        });
      })
    );
  }
}
