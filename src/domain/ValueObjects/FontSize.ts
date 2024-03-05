export class FontSize {
  value: number = 220;

  constructor(value: number | undefined) {
    let fontSize = Number(value);
    if (value === undefined) return;
    if (isNaN(fontSize)) return;
    if (fontSize < 10) return;
    this.value = fontSize;
  }
}
