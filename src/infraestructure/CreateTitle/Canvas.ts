import { createCanvas, registerFont } from "canvas";
import { TitleEntity } from "../../domain/TitleEntity.js";
import { FileSystemService } from "../../domain/services/FileSystemService.js";
import { CreateTitle } from "../../domain/interfaces";

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
      textAlignment,
      position,
      imageQuality,
    } = this.titleEntity;
    const { width, height, imageBaseTitle: image } = this.titleEntity.image;

    await Promise.all(
      inputNames.map(async (name, index) => {
        const canvas = this.createCanvas(width, height);
        const ctx = canvas.getContext("2d");

        ctx.font = `${fontSize}px 'MyFont'`;
        ctx.fillStyle = fontColor;
        ctx.textAlign = textAlignment;
        ctx.drawImage(image, 0, 0, width, height);
        ctx.fillText(name, position.x, position.y);

        const path = FileSystemService.joinPaths(
          outputImgPath,
          `${index + 1}.jpg`
        );
        const outputStream = FileSystemService.createWriteStream(path);
        if (!outputStream)
          throw new Error("Error creating the output stream for the canvas.");

        const stream = canvas.createJPEGStream({
          imageQuality,
          chromaSubsampling: false,
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
