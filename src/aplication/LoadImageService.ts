import { ImageLoader, LoadedImage } from "../domain/interfaces/index.js";
import { InputImagePath } from "../domain/ValueObjects/InputImagePath.js";
import { CanvasLoaderImage } from "../infraestructure/index.js";

export class LoadImageService {
  private inputTitlePath: string;
  private imageLoader: ImageLoader;

  constructor(inputTitlePath?: string) {
    this.inputTitlePath = new InputImagePath(inputTitlePath).value;
    this.imageLoader = new CanvasLoaderImage(this.inputTitlePath);
  }

  async exec(): Promise<LoadedImage> {
    return await this.imageLoader.load();
  }
}
