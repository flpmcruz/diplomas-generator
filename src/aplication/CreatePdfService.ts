import { PdfEntity } from "../domain/PdfEntity.js";
import { CreatePdf } from "../domain/interfaces";
import { CanvasPdf } from "../infraestructure";

export class CreatePdfService {
  pdfEntity: PdfEntity;
  createPdfService: CreatePdf;

  constructor(pdfEntity: PdfEntity) {
    this.pdfEntity = pdfEntity;
    this.createPdfService = new CanvasPdf(this.pdfEntity);
  }

  async render(): Promise<void> {
    await this.createPdfService.render();
  }
}
