import { LoadImage } from "../src/index.js";

describe("Testing LoadImage", () => {
  test("shoud load Image", async () => {
    const image = await LoadImage.load(
      process.cwd() + "/__tests__/image/title.jpg"
    );
    if (image) {
      const { width, height } = image;
      expect(width).toBeGreaterThan(0);
      expect(height).toBeGreaterThan(0);
    }
  });
  test("shoud throw error", async () => {
    await expect(LoadImage.load("")).rejects.toThrow(
      "Error loading the title image"
    );
  });
});
