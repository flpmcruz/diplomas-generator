import fs from "fs";
import path from "path";

export class FileSystemService {
  static createDir(outputPath: string) {
    try {
      if (!fs.existsSync(outputPath)) {
        fs.mkdirSync(outputPath, { recursive: true });
        return outputPath;
      }
    } catch (error) {
      throw error;
    }
  }

  static createBaseDir(outputPath: string) {
    try {
      if (!fs.existsSync(outputPath))
        fs.mkdirSync(path.dirname(outputPath), { recursive: true });
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

  static checkFileExists(filePath?: string) {
    try {
      const resolvedPath = path.resolve(filePath || "");
      const stats = fs.statSync(resolvedPath);
      return stats.isFile(); // Verifica si es un archivo normal
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

  static readDirContent(Path: string): string[] {
    try {
      const result = fs.readdirSync(Path).map((file) => path.join(Path, file));
      if (result.length === 0) throw new Error("Empty Directory");
      return result;
    } catch (error) {
      throw error;
    }
  }

  static existsPath(value: string): boolean {
    return fs.existsSync(value);
  }

  static joinPaths(...paths: string[]) {
    return path.join(...paths);
  }
}
