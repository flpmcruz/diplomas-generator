import { LoggingService } from "../../aplication/LoggingService.js";
import { FileSystemService } from "../services/FileSystemService.js";

export class FontPath {
  private readonly font: string = "itcedscr.ttf";
  value: string = FileSystemService.joinPaths(
    process.cwd(),
    "node_modules",
    "diplomas-generator",
    "dist",
    "src",
    "assets",
    "fonts",
    this.font
  );

  constructor(value?: string) {
    try {
      if (FileSystemService.checkFileExists(value) && value?.endsWith(".ttf")) {
        this.value = FileSystemService.joinPaths(process.cwd(), value);
      }
    } catch (error) {
      const Loggin = LoggingService.getInstance();
      Loggin.warning(
        `FontPath provided is not valid, using default font "${this.font}" instead.`
      );
    }
  }
}
