import fs from "fs";
import path from "path";
import { type LoggingService } from "./LoggingService.js";

export class FileSystemService {
  constructor(readonly LoggingService: LoggingService) {}

  recreateDir(outputPath: string, outputPDF: string) {
    try {
      if (fs.existsSync(outputPath)) fs.rmSync(outputPath, { recursive: true });
      fs.mkdirSync(outputPath, { recursive: true });
      fs.mkdirSync(path.dirname(outputPDF), { recursive: true });
    } catch (error) {
      this.errorHandler(error);
    }
  }

  readList(listPath: string) {
    try {
      if (!fs.existsSync(listPath))
        throw new Error(`${listPath} does not found`);

      const namesList = fs.readFileSync(listPath, "utf-8").split("\n");
      if (namesList[0] === "") throw new Error("Empty List");
      return namesList;
    } catch (error) {
      this.errorHandler(error);
    }
  }

  checkFileExists(filePath: string) {
    try {
      return fs.existsSync(filePath);
    } catch (error) {
      this.errorHandler(error);
    }
  }

  createWriteStream(outputPath: string) {
    try {
      return fs.createWriteStream(outputPath);
    } catch (error) {
      this.errorHandler(error);
    }
  }

  readDirContent(Path: string): string[] | void {
    try {
      return fs.readdirSync(Path).map((file) => `${Path}/${file}`);
    } catch (error) {
      this.errorHandler(error);
    }
  }

  private errorHandler(error: unknown) {
    if (error instanceof Error) this.LoggingService.error(error.message);
    else this.LoggingService.error("There has been an error");
    throw error;
  }
}
