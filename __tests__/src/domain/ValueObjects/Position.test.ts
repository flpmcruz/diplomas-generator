import { Position } from "../../../../src/domain/ValueObjects";

describe("Testing Position ValueObject", () => {
  test("Shoud return fallback position if position not provided", () => {
    const invalidPosition1: any = {
      xFallback: 50,
      yFallback: 50,
      x: undefined,
      y: undefined,
    };
    const invalidPosition2: any = {
      xFallback: 50,
      yFallback: 50,
      x: "",
      y: "",
    };
    const invalidPosition3: any = {
      xFallback: 50,
      yFallback: 50,
      x: 0,
      y: 0,
    };

    expect(new Position(invalidPosition1).x).toBe(
      invalidPosition1.xFallback / 2
    );
    expect(new Position(invalidPosition1).y).toBe(
      invalidPosition1.yFallback / 2
    );
    expect(new Position(invalidPosition2).x).toBe(
      invalidPosition2.xFallback / 2
    );
    expect(new Position(invalidPosition2).y).toBe(
      invalidPosition2.yFallback / 2
    );
    expect(new Position(invalidPosition3).x).toBe(
      invalidPosition3.xFallback / 2
    );
    expect(new Position(invalidPosition3).y).toBe(
      invalidPosition3.yFallback / 2
    );
  });

  test("Shoud return position if position provided", () => {
    const validPosition1 = {
      xFallback: 50,
      yFallback: 50,
      x: 10,
      y: 10,
    };

    expect(new Position(validPosition1).x).toBe(validPosition1.x);
    expect(new Position(validPosition1).y).toBe(validPosition1.y);
  });
});
