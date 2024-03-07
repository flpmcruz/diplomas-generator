import { ExportPdf } from "../../../../src/domain/ValueObjects";

describe("Testing ExportPdf ValueObject", () => {
  test("shoud return true if not valid value provided", () => {
    const invalidValue1: any = "invalid_value";
    const invalidValue2: any = 0;

    const exportPdf1 = new ExportPdf(invalidValue1).value;
    const exportPdf2 = new ExportPdf(invalidValue2).value;

    expect(exportPdf1).toBe(true);
    expect(exportPdf2).toBe(true);
  });

  test("shoud return same value with correct value provided", () => {
    const exportPdf1 = new ExportPdf(false).value;
    const exportPdf2 = new ExportPdf(true).value;
    expect(exportPdf1).toBe(false);
    expect(exportPdf2).toBe(true);
  });
});
