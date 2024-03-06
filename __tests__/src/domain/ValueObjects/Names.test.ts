import { Names } from "../../../../src/domain/ValueObjects/index.js";
import { FileSystemService } from "../../../../src/domain/services/FileSystemService.js";

describe("Testing Names ValueObject", () => {
  test("should return error if name not provided or path to txt does not exist", () => {
    const invalidNames1: any = undefined;
    const invalidNames2: any = "";
    const invalidNames3: any = "__tests__/names.txt";
    const invalidNames4: any = true;

    expect(() => {
      new Names(invalidNames1);
    }).toThrow("Invalid list of names");
    expect(() => {
      new Names(invalidNames2);
    }).toThrow("Invalid list of names");
    expect(() => {
      new Names(invalidNames3);
    }).toThrow("Invalid list of names");
    expect(() => {
      new Names(invalidNames4);
    }).toThrow("Invalid list of names");
  });

  test("shoud return list of names", () => {
    const validNames1 = ["Felipe", "Juan", "Pedro"];
    const validNames2 = "__tests__/src/assets/data/names.txt";

    const expectedNames = FileSystemService.readList(
      FileSystemService.joinPaths(process.cwd(), validNames2)
    );

    expect(new Names(validNames1).value.length).toBe(validNames1.length);
    expect(new Names(validNames2).value.length).toBe(expectedNames.length);
  });
});
