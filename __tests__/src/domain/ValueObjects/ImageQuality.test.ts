import { ImageQuality } from "../../../../src/domain/ValueObjects/index.js";

describe("Testing ImageQuality ValueObject", () => {
  test("shoud return 0.9 if not valid value provided", () => {
    /* Valid values > 0 and <= 1 */
    const invalidValue1: any = "invalid_value";
    const imageQuality1 = new ImageQuality(0).value;
    const imageQuality2 = new ImageQuality(-1).value;
    const imageQuality3 = new ImageQuality(1.1).value;
    const imageQuality4 = new ImageQuality(invalidValue1).value;

    expect(imageQuality1).toBe(0.9);
    expect(imageQuality2).toBe(0.9);
    expect(imageQuality3).toBe(0.9);
    expect(imageQuality4).toBe(0.9);
  });

  test("shoud return same value with correct value provided", () => {
    const imageQuality = new ImageQuality(0.5).value;
    expect(imageQuality).toBe(0.5);
  });
});
