import { LoadImage } from "../infraestructure/external-service/index.js";
import { LoadedImage } from "../domain/interfaces/index.js";

export class LoadImageService {
  static async exec(inputTitlePath?: string): Promise<LoadedImage> {
    const fallback =
      "/node_modules/diplomas-generator/dist/src/assets/image/title.jpg";

    try {
      const res = await LoadImage.load(inputTitlePath || "");
      if (res.imageBaseTitle) return res;
    } catch (error) {}

    try {
      const res = await LoadImage.load(fallback);
      if (res.imageBaseTitle) return res;
    } catch (error) {}

    throw new Error("Error loading the title image");
  }
}
