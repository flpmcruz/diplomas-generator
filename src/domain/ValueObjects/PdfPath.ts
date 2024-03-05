import { FileSystemService } from "../../infraestructure/external-service/index.js";

export class PdfPath {
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

    let defaultPath = FileSystemService.joinPaths(process.cwd(), "output");
    FileSystemService.createBaseDir(defaultPath);
    this.value = defaultPath;
  }
}
