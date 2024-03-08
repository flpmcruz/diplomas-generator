import { LoggingService } from "../../aplication/LoggingService.js";
import { FileSystemService } from "../services/FileSystemService.js";

export class InputImagePath {
  value: string = FileSystemService.joinPaths(
    process.cwd(),
    "node_modules",
    "diplomas-generator",
    "dist",
    "src",
    "assets",
    "image",
    "title.jpg"
  );

  constructor(value?: string) {
    try {
      if (FileSystemService.checkFileExists(value)) {
        this.value = FileSystemService.joinPaths(process.cwd(), value + "");
      }
    } catch (error) {
      const Loggin = LoggingService.getInstance();
      Loggin.warning(
        "Image title provided is not valid, using default image title. This is only for testing purposes."
      );
    }
  }
}
