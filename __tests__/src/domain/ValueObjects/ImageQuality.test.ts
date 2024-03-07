import { ImageQuality } from "../../../../src/domain/ValueObjects";

describe("Testing ImageQuality ValueObject", () => {
  test("shoud return 0.9 if not valid value provided", () => {
    /* Valid values > 0 and <= 1 */
    const invalidValue1: any = "invalid_value";
    const invalidValue2: any = {};
    const invalidValue3: any = -1;
    const invalidValue4: any = 1.1;
    const invalidValue5: any = 0;

    const imageQuality1: any = new ImageQuality(invalidValue1).value;
    const imageQuality2: any = new ImageQuality(invalidValue2).value;
    const imageQuality3: any = new ImageQuality(invalidValue3).value;
    const imageQuality4: any = new ImageQuality(invalidValue4).value;
    const imageQuality5: any = new ImageQuality(invalidValue5).value;

    expect(imageQuality1).toBe(0.9);
    expect(imageQuality2).toBe(0.9);
    expect(imageQuality3).toBe(0.9);
    expect(imageQuality4).toBe(0.9);
    expect(imageQuality5).toBe(0.9);
  });

  test("shoud return same value with correct value provided", () => {
    const imageQuality = new ImageQuality(0.5).value;
    expect(imageQuality).toBe(0.5);
  });
});
