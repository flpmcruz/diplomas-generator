import { TextAlignment } from "../../../../src/domain/ValueObjects";

describe("Testing TextAlign ValueObject", () => {
  test("shoud return center if no valid value provided", () => {
    const textAlign1 = new TextAlignment("other").value;
    const textAlign2 = new TextAlignment("").value;
    expect(textAlign1).toBe("center");
    expect(textAlign2).toBe("center");
  });
  test("shoud return same value with correct value provided", () => {
    const textAlign1 = new TextAlignment("left").value;
    const textAlign2 = new TextAlignment("right").value;
    const textAlign3 = new TextAlignment("center").value;
    const textAlign4 = new TextAlignment("start").value;
    const textAlign5 = new TextAlignment("end").value;

    expect(textAlign1).toBe("left");
    expect(textAlign2).toBe("right");
    expect(textAlign3).toBe("center");
    expect(textAlign4).toBe("start");
    expect(textAlign5).toBe("end");
  });
});
