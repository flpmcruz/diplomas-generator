import { FileSystemService } from "../../infraestructure/external-service/FileSystemService.js";

export class ImagePath {
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
      this.value = value;
      return;
    }

    FileSystemService.createDir(defaultPath);
    this.value = defaultPath;
  }
}
