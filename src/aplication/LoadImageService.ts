import { LoadImage } from "../infraestructure/external-service/index.js";
import { FileSystemService } from "../domain/services/FileSystemService.js";
import { LoadedImage } from "../domain/interfaces/index.js";

export class LoadImageService {
  static async exec(inputTitlePath?: string): Promise<LoadedImage> {
    const fallback =
      "/node_modules/diplomas-generator/dist/src/assets/image/title.jpg";
    const loadPath = (path: string) =>
      FileSystemService.joinPaths(process.cwd(), path);

    try {
      const res = await LoadImage.load(loadPath(inputTitlePath || ""));
      if (res.imageBaseTitle) return res;
    } catch (error) {}

    return LoadImage.load(loadPath(fallback));
  }
}
