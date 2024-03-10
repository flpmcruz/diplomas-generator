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
      exportImg,
      exportPdf,
      outputPdfPath,
    } = this.titleEntity;
    const { width, height, imageBaseTitle } = this.titleEntity.image;

    const fillCtx = (ctx: CanvasRenderingContext2D, name: string) => {
      ctx.font = `${fontSize}px 'MyFont'`;
      ctx.fillStyle = fontColor;
      ctx.textAlign = textAlignment;
      ctx.drawImage(imageBaseTitle, 0, 0, width, height);
      ctx.fillText(name, position.x, position.y);
    };

    //PDF
    let ctxPDF: any;
    let outputPDFStream: any;
    let stream: any;
    if (exportPdf) {
      const myCanvasPDF = this.createCanvas(width, height, "pdf");
      ctxPDF = myCanvasPDF.getContext("2d");
      outputPDFStream = FileSystemService.createWriteStream(outputPdfPath);
      stream = myCanvasPDF.createPDFStream();
    }

    await Promise.all(
      inputNames.map(async (name, index) => {
        //JPG
        if (exportImg) {
          const canvasJPG = this.createCanvas(width, height);
          const ctxJPG = canvasJPG.getContext("2d");
          fillCtx(ctxJPG, name);

          const path = FileSystemService.joinPaths(
            outputImgPath,
            `${index + 1}.jpg`
          );
          const outputStream = FileSystemService.createWriteStream(path);
          const stream = canvasJPG.createJPEGStream({
            imageQuality,
            chromaSubsampling: false,
          });

          await new Promise<void>((resolve, reject) => {
            stream.pipe(outputStream);
            outputStream.on("finish", () => resolve());
            outputStream.on("error", (error) => reject(error));
          });
        }

        //PDF
        if (exportPdf) {
          fillCtx(ctxPDF, name);
          ctxPDF.addPage();
        }
      })
    );

    //PDF
    if (exportPdf) {
      await new Promise<void>((resolve, reject) => {
        stream.pipe(outputPDFStream);
        outputPDFStream.on("finish", () => resolve());
        outputPDFStream.on("error", () => reject("Error creating PDF file"));
      });
    }
  }
}
