import fs from "fs";
import { Loggin } from "./logging.js";

export class FileSystemService {
  static recreateDir(outputPath: string, outputPDF: string) {
    try {
      if (!fs.existsSync(outputPath))
        fs.mkdirSync(outputPath, { recursive: true });
      else {
        fs.rmSync(outputPath, { recursive: true });
        fs.existsSync(outputPDF) && fs.unlinkSync(outputPDF);
        fs.mkdirSync(outputPath, { recursive: true });
      }
    } catch (error) {
      this.errorHandler(error);
    }
  }

  static readList(listPath: string) {
    try {
      if (!fs.existsSync(listPath)) {
        Loggin.error(`${listPath} does not found`);
        process.exit(1);
      }
      const namesList = fs.readFileSync(listPath, "utf-8").split("\n");

      if (namesList[0] === "") {
        Loggin.error("Empty List");
        process.exit(1);
      }

      Loggin.success("List read");
      return namesList;
    } catch (error) {
      this.errorHandler(error);
    }
  }

  static createWriteStream(outputPath: string) {
    try {
      return fs.createWriteStream(outputPath);
    } catch (error) {
      this.errorHandler(error);
    }
  }

  static readDirContent(Path: string): string[] | void {
    try {
      return fs.readdirSync(Path).map((file) => `${Path}/${file}`);
    } catch (error) {
      this.errorHandler(error);
    }
  }

  private static errorHandler(error: unknown) {
    if (error instanceof Error) Loggin.error(error.message);
    else Loggin.error("There has been an error");
    process.exit(1);
  }
}
