import { FileSystemService } from "../services/FileSystemService.js";
import { LoggingService } from "../../aplication/LoggingService";

export class OutputImagePath {
  value: string = "";

  constructor(value?: string) {
    let defaultPath = FileSystemService.joinPaths(
      process.cwd(),
      "output",
      "img"
    );

    if (typeof value === "string" && value.length > 0) {
      let inputPath = FileSystemService.joinPaths(process.cwd(), value);
      FileSystemService.createDir(inputPath);
      this.value = inputPath;
      return;
    }

    FileSystemService.createDir(defaultPath);
    this.value = defaultPath;
    const Loggin = LoggingService.getInstance();
    Loggin.warning(
      `OutputImagePath not provided or invalid, using the default path: ${defaultPath}`
    );
  }
}
