import { FontSize } from "../../../../src/domain/ValueObjects";

describe("Testing FontSize ValueObject", () => {
  test("shoud return 220 if not valid value provided", () => {
    /* Valid values > 10 */
    const fontSize1 = new FontSize(0).value;
    const fontSize2 = new FontSize(-1).value;
    const fontSize3 = new FontSize(9).value;

    expect(fontSize1).toBe(220);
    expect(fontSize2).toBe(220);
    expect(fontSize3).toBe(220);
  });

  test("shoud return same value with correct value provided", () => {
    const fontSize = new FontSize(11).value;
    expect(fontSize).toBe(11);
  });
});
