import { FileSystemService } from "../infraestructure/external-service/index.js";

export class InputsValidator {
  static isHexadecimalColor(valor: string = ""): string {
    const regex = /^#[0-9A-Fa-f]{6}$/;
    return regex.test(valor) ? valor : "#000000";
  }

  static isValidTextAlign(valor: string = ""): string {
    if (
      valor !== "center" &&
      valor !== "left" &&
      valor !== "right" &&
      valor !== "start" &&
      valor !== "end"
    )
      return "center";
    return valor;
  }

  static isBoolean(valor: boolean = true): boolean {
    if (typeof valor === "boolean") return valor;
    else return true;
  }

  static isValidFontSize(valor: number = 220): number {
    let fontSize = Number(valor);
    if (isNaN(fontSize) || fontSize < 10) return 220;
    return fontSize;
  }

  static isValidImageQuality(valor: number = 0.9): number {
    let imageQuality = Number(valor);
    if (isNaN(imageQuality) || imageQuality < 0 || imageQuality > 1) return 0.9;
    return imageQuality;
  }

  static isValidPath(valor: string = "", fallback: string[]) {
    return FileSystemService.isValidPath(valor, fallback);
  }
}
