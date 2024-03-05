export class FontColor {
  value: string = "#000000";

  constructor(value: string | undefined) {
    if (value === undefined) return;
    /^#[0-9A-Fa-f]{6}$/.test(value)
      ? (this.value = value)
      : (this.value = "#000000");
  }
}
