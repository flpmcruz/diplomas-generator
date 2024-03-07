import { TextAlign } from "../interfaces";

export class TextAlignment {
  value: TextAlign = "center";

  constructor(value?: string) {
    if (
      value !== "center" &&
      value !== "left" &&
      value !== "right" &&
      value !== "start" &&
      value !== "end"
    )
      this.value = "center";
    else this.value = value;
  }
}
