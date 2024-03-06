import { FileSystemService } from "../services/FileSystemService.js";

export class Names {
  value: string[] = [];

  constructor(value: string | string[]) {
    if (Array.isArray(value)) {
      this.value = value.filter(
        (name) => typeof name === "string" && name.length > 0
      );
      if (this.value.length === 0) throw new Error("Invalid list of names");
      return;
    }

    if (typeof value === "string" && value.length > 0) {
      try {
        let path = FileSystemService.joinPaths(process.cwd(), value);
        this.value = FileSystemService.readList(path);
        if (this.value.length === 0) throw new Error("Invalid list of names");
        return;
      } catch (error) {
        throw new Error("Invalid list of names");
      }
    }

    throw new Error("Invalid list of names");
  }
}
