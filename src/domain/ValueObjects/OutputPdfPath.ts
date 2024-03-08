import { LoggingService } from "../../aplication/LoggingService.js";
import { FileSystemService } from "../services/FileSystemService.js";

export class OutputPdfPath {
  value: string = FileSystemService.joinPaths(
    process.cwd(),
    "output",
    "titles.pdf"
  );

  constructor(value?: string) {
    if (typeof value === "string" && value.length > 0) {
      let inputPath = FileSystemService.joinPaths(process.cwd(), value);

      FileSystemService.createBaseDir(inputPath);
      this.value = value;
      return;
    }

    FileSystemService.createBaseDir(this.value);
    const Loggin = LoggingService.getInstance();
    Loggin.warning(
      `OutputPdfPath not provided or invalid, using the default path: ${this.value}`
    );
  }
}
