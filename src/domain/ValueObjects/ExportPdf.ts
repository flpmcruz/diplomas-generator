export class ExportPdf {
  value: boolean = true;

  constructor(value: boolean | undefined) {
    if (typeof value !== "boolean") return;
    this.value = value;
  }
}
