import { loadImage } from "canvas";
import { LoadedImage, ImageLoader } from "../../domain/interfaces";

export class CanvasLoaderImage implements ImageLoader {
  constructor(private inputTitlePath: string) {}

  async load(): Promise<LoadedImage> {
    try {
      let imageBaseTitle = await loadImage(this.inputTitlePath);
      if (!imageBaseTitle) throw new Error("Image not loaded");
      let width = imageBaseTitle.width;
      let height = imageBaseTitle.height;
      return { imageBaseTitle, width, height };
    } catch (error) {
      throw error;
    }
  }
}
