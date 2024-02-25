import { type Image, loadImage } from "canvas";

interface LoadedImage {
  imageBaseTitle: Image;
  width: number;
  height: number;
}
/**
 * Load an image from the file system
 * @param inputTitlePath Path to the image
 * @returns The image and its dimensions
 * @returns null if the image can't be loaded
 */
export class LoadImage {
  static load = async (inputTitlePath: string): Promise<LoadedImage | null> => {
    try {
      let imageBaseTitle = await loadImage(inputTitlePath);
      let width = imageBaseTitle.width;
      let height = imageBaseTitle.height;
      return { imageBaseTitle, width, height };
    } catch (error) {
      return null;
    }
  };
}
