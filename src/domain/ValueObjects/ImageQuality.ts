import { imgQuality } from "../interfaces";

export class ImageQuality {
  value: imgQuality = 0.9;

  constructor(value?: imgQuality) {
    let imageQuality = Number(value);
    if (isNaN(imageQuality)) return;
    if (imageQuality <= 0 || imageQuality > 1) return;
    this.value = imageQuality as imgQuality;
  }
}
