export class ImageQuality {
  value: number = 0.9;

  constructor(value: number | undefined) {
    let imageQuality = Number(value);
    if (isNaN(imageQuality)) return;
    if (imageQuality <= 0 || imageQuality > 1) return;
    this.value = imageQuality;
  }
}
