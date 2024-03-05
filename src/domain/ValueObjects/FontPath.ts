import { FileSystemService } from "../../infraestructure/external-service/FileSystemService.js";

export class FontPath {
  value: string = "";

  constructor(value: string | undefined) {
    if (FileSystemService.checkFileExists(value) && value?.endsWith(".ttf")) {
      this.value = process.cwd() + value;
      return;
    }

    this.value = FileSystemService.joinPaths(
      process.cwd(),
      "node_modules",
      "diplomas-generator",
      "dist",
      "src",
      "assets",
      "fonts",
      "itcedscr.ttf"
    );
  }
}
