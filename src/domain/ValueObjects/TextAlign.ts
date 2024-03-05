export class TextAlign {
  value: string = "center";

  constructor(value: string | undefined) {
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
