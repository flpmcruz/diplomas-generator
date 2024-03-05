import { TextAlign } from "../../../../src/domain/ValueObjects/index.js";

describe("Testing TextAlign ValueObject", () => {
  test("shoud return center if no valid value provided", () => {
    const textAlign1 = new TextAlign("other").value;
    const textAlign2 = new TextAlign("").value;
    expect(textAlign1).toBe("center");
    expect(textAlign2).toBe("center");
  });
  test("shoud return same value with correct value provided", () => {
    const textAlign1 = new TextAlign("left").value;
    const textAlign2 = new TextAlign("right").value;
    const textAlign3 = new TextAlign("center").value;
    const textAlign4 = new TextAlign("start").value;
    const textAlign5 = new TextAlign("end").value;

    expect(textAlign1).toBe("left");
    expect(textAlign2).toBe("right");
    expect(textAlign3).toBe("center");
    expect(textAlign4).toBe("start");
    expect(textAlign5).toBe("end");
  });
});
