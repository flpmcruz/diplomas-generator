import { LoggingService } from "../../aplication/LoggingService.js";
import { FileSystemService } from "../services/FileSystemService.js";

export class FontPath {
  value: string = FileSystemService.joinPaths(
    process.cwd(),
    "node_modules",
    "diplomas-generator",
    "dist",
    "src",
    "assets",
    "fonts",
    "itcedscr.ttf"
  );

  constructor(value: string | undefined) {
    try {
      if (FileSystemService.checkFileExists(value) && value?.endsWith(".ttf")) {
        this.value = FileSystemService.joinPaths(process.cwd(), value);
      }
    } catch (error) {
      const Loggin = LoggingService.getInstance();
      Loggin.warning("FontPath provided is not valid, using default font");
    }
  }
}
