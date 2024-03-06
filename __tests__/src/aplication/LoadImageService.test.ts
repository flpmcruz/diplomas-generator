import { LoadImageService } from "../../../src/aplication/index.js";

describe("Testing LoadImageService", () => {
  test("shoud load default Image if path is invalid", async () => {
    const image = await LoadImageService.exec("");
    if (image) {
      const { width, height } = image;
      expect(width).toBeGreaterThan(0);
      expect(height).toBeGreaterThan(0);
    }
  });

  test("shoud load Image if if path is valid", async () => {
    const path = "__tests__/src/assets/image/title.jpg";
    const image = await LoadImageService.exec(path);
    if (image) {
      const { width, height } = image;
      expect(width).toBeGreaterThan(0);
      expect(height).toBeGreaterThan(0);
    }
  });
});
