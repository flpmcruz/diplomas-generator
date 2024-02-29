import fs from "fs";
import path from "path";

export class FileSystemService {
  static recreateDir(outputPath: string, outputPDF: string) {
    try {
      if (fs.existsSync(outputPath)) fs.rmSync(outputPath, { recursive: true });
      if (fs.existsSync(path.dirname(outputPDF)))
        fs.rmSync(path.dirname(outputPDF), { recursive: true });

      fs.mkdirSync(outputPath, { recursive: true });
      fs.mkdirSync(path.dirname(outputPDF), { recursive: true });
    } catch (error) {
      throw error;
    }
  }

  static readList(listPath: string) {
    try {
      if (!fs.existsSync(listPath))
        throw new Error(`${listPath} does not found`);

      const namesList = fs.readFileSync(listPath, "utf-8").split("\n");
      if (namesList[0] === "") throw new Error("Empty List");
      return namesList;
    } catch (error) {
      throw error;
    }
  }

  static checkFileExists(filePath: string) {
    try {
      return fs.existsSync(path.resolve(filePath));
    } catch (error) {
      throw error;
    }
  }

  static createWriteStream(outputPath: string) {
    try {
      return fs.createWriteStream(outputPath);
    } catch (error) {
      throw error;
    }
  }

  static readDirContent(Path: string): string[] | void {
    try {
      return fs.readdirSync(Path).map((file) => path.join(Path, file));
    } catch (error) {
      throw error;
    }
  }

  static isValidPath(valor: string = "", fallback: string[]) {
    let inputPath = path.resolve(valor);
    if (path.resolve() !== inputPath) return inputPath;
    return path.join(path.resolve(), ...fallback);
  }

  static joinPaths(...paths: string[]) {
    return path.join(...paths);
  }
}
