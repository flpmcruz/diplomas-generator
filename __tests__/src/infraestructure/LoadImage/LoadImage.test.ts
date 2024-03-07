import { LoadImage } from "../../../../src";

describe("Testing LoadImage", () => {
  test("shoud load Image", async () => {
    const path = "__tests__/src/assets/image/title.jpg";
    const image = await LoadImage.load(path);
    if (image) {
      const { width, height } = image;
      expect(width).toBeGreaterThan(0);
      expect(height).toBeGreaterThan(0);
    }
  });
  test("should throw error", async () => {
    await expect(LoadImage.load("")).rejects.toThrow(
      "Error loading the title image"
    );
  });
});
