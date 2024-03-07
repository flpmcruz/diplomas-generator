import { HexColor } from "../interfaces";

export class FontColor {
  value: HexColor = "#000000";

  constructor(value?: HexColor) {
    if (value === undefined) return;
    /^#[0-9A-Fa-f]{6}$/.test(value)
      ? (this.value = value)
      : (this.value = "#000000");
  }
}
