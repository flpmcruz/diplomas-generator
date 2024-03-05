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
 * @returns Error if the image could not be loaded
 */
export class LoadImage {
  static load = async (inputTitlePath: string): Promise<LoadedImage> => {
    try {
      if (!inputTitlePath) throw new Error("Error loading the title image");
      let imageBaseTitle = await loadImage(inputTitlePath);

      if (!imageBaseTitle) throw new Error("Error loading the title image");
      let width = imageBaseTitle.width;
      let height = imageBaseTitle.height;
      return { imageBaseTitle, width, height };
    } catch (error) {
      throw error;
    }
  };
}
