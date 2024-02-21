import fs from "fs";
import { looging, messages } from "./logging.js";

export function recreateDir(outputPath: string, outputPDF: string) {
  try {
    if (!fs.existsSync(outputPath))
      fs.mkdirSync(outputPath, { recursive: true });
    else {
      fs.rmSync(outputPath, { recursive: true });
      fs.existsSync(outputPDF) ?? fs.unlinkSync(outputPDF);
      fs.mkdirSync(outputPath, { recursive: true });
    }
  } catch (error) {
    looging(error as any, messages.error);
    process.exit(1);
  }
}

export function readList(listPath: string) {
  try {
    if (!fs.existsSync(listPath)) {
      looging(`${listPath} does not found`, messages.error);
      process.exit(1);
    }
    const namesList = fs.readFileSync(listPath, "utf-8").split("\n");

    if (namesList[0] === "") {
      looging("Empty List", messages.error);
      process.exit(1);
    } else looging("List read", messages.success);

    return namesList;
  } catch (error) {
    looging(error as any, messages.error);
    process.exit(1);
  }
}
