export class Export {
  value: boolean = true;

  constructor(value?: boolean) {
    if (typeof value !== "boolean") return;
    this.value = value;
  }
}
