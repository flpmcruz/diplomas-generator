import { FileSystemService } from "../services/FileSystemService.js";

export class OutputPdfPath {
  value: string = "";

  constructor(value: string | undefined) {
    if (typeof value === "string" && value.length > 0) {
      let inputPath = FileSystemService.joinPaths(process.cwd(), value);

      if (FileSystemService.existsPath(inputPath)) {
        this.value = inputPath;
        return;
      }

      FileSystemService.createBaseDir(inputPath);
      this.value = value;
      return;
    }

    let defaultPath = FileSystemService.joinPaths(
      process.cwd(),
      "output",
      "titles.pdf"
    );
    FileSystemService.createBaseDir(defaultPath);
    this.value = defaultPath;
  }
}
