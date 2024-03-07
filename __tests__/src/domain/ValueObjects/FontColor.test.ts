import { FontColor } from "../../../../src/domain/ValueObjects";
import { HexColor } from "../../../../src/domain/interfaces";

describe("Testing FontColor ValueObject", () => {
  test("shoud return #000000 if not valid color provided", () => {
    const fontColor = new FontColor("other" as HexColor).value;
    expect(fontColor).toBe("#000000");
  });
  test("shoud return same value with correct value provided", () => {
    const fontColor = new FontColor("#FFFFFF").value;
    expect(fontColor).toBe("#FFFFFF");
  });
});
