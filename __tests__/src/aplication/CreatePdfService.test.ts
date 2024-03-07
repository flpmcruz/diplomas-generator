import fs from "fs";
import path from "path";
import { CreatePdfService } from "../../../src/aplication";
import { PdfEntity } from "../../../src/domain/PdfEntity.js";
import { FileSystemService } from "../../../src/domain/services/FileSystemService.js";

describe("Testing CreatePdfService", () => {
  const outputPdfPath = FileSystemService.joinPaths("output", "titles.pdf");

  afterEach(() => {
    if (fs.existsSync(outputPdfPath))
      fs.rmSync(path.dirname(outputPdfPath), { recursive: true });
  });

  test("shoud create pdf", async () => {
    const path = FileSystemService.joinPaths(
      process.cwd(),
      "__tests__/src/assets/image"
    );
    const pdfEntity = new PdfEntity({
      outputPdfPath,
      width: 595,
      height: 842,
      imagesPath: path,
    });
    const createPdfService = new CreatePdfService(pdfEntity);
    await createPdfService.render();
    expect(fs.existsSync(outputPdfPath)).toBe(true);
  });
});
