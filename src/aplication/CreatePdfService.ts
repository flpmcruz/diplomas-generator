import { PdfEntity } from "../domain/PdfEntity.js";
import { CreatePdf } from "../domain/interfaces";
import { Pdfkit } from "../infraestructure";

export class CreatePdfService {
  pdfEntity: PdfEntity;
  createPdfService: CreatePdf;

  constructor(pdfEntity: PdfEntity) {
    this.pdfEntity = pdfEntity;
    this.createPdfService = new Pdfkit(this.pdfEntity);
  }

  async render(): Promise<void> {
    await this.createPdfService.render();
  }
}
