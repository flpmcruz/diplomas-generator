import { InputsValidator } from "../src/utils/Validations";

describe("Testing classes", () => {
  test("should validate textAlign", () => {
    const res1 = InputsValidator.isValidTextAlign("");
    const res2 = InputsValidator.isValidTextAlign("otra cosa");
    const res3 = InputsValidator.isValidTextAlign("left");
    const res4 = InputsValidator.isValidTextAlign("right");
    const res5 = InputsValidator.isValidTextAlign("start");
    const res6 = InputsValidator.isValidTextAlign("end");
    const res7 = InputsValidator.isValidTextAlign("center");

    expect(res1).toBe("center");
    expect(res2).toBe("center");
    expect(res3).toBe("left");
    expect(res4).toBe("right");
    expect(res5).toBe("start");
    expect(res6).toBe("end");
    expect(res7).toBe("center");
  });

  test("should validate hexadecimal color", () => {
    const res1 = InputsValidator.isHexadecimalColor("");
    const res2 = InputsValidator.isHexadecimalColor("otra cosa");
    const res3 = InputsValidator.isHexadecimalColor("#000000");
    const res4 = InputsValidator.isHexadecimalColor("#FFFFFF");

    expect(res1).toBe("#000000");
    expect(res2).toBe("#000000");
    expect(res3).toBe("#000000");
    expect(res4).toBe("#FFFFFF");
  });

  test("should validate fontSize", () => {
    const res1 = InputsValidator.isValidFontSize(0);
    const res2 = InputsValidator.isValidFontSize(10);
    const res3 = InputsValidator.isValidFontSize(220);

    expect(res1).toBe(220);
    expect(res2).toBe(10);
    expect(res3).toBe(220);
  });

  test("should validate imageQuality", () => {
    const res1 = InputsValidator.isValidImageQuality(0);
    const res2 = InputsValidator.isValidImageQuality(0.5);
    const res3 = InputsValidator.isValidImageQuality(0.9);
    const res4 = InputsValidator.isValidImageQuality(1);
    const res5 = InputsValidator.isValidImageQuality(2);
    const res6 = InputsValidator.isValidImageQuality(-1);

    expect(res1).toBe(0.9);
    expect(res2).toBe(0.5);
    expect(res3).toBe(0.9);
    expect(res4).toBe(1);
    expect(res5).toBe(0.9);
    expect(res6).toBe(0.9);
  });
});
