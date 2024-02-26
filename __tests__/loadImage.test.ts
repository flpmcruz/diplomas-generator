import { LoadImage } from "../src/index.js";

describe("Testing LoadImage", () => {
  test("shoud load Image", async () => {
    const image = await LoadImage.load("__tests__/image/title.jpg");
    if (image) {
      const { width, height } = image;
      expect(width).toBeGreaterThan(0);
      expect(height).toBeGreaterThan(0);
    }
  });
  test("shoud return null", async () => {
    const image = await LoadImage.load("");
    expect(image).toBeNull();
  });
});
