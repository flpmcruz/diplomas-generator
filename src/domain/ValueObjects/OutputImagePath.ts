import { FileSystemService } from "../services/FileSystemService.js";

export class OutputImagePath {
  value: string = "";

  constructor(value: string | undefined) {
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
  }
}
