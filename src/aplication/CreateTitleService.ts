import { TitleEntity } from "../domain/TitleEntity.js";
import { CreateTitle } from "../domain/interfaces/index.js";
import { Canvas } from "../infraestructure/external-service/index.js";

export class CreateTitleService {
  titleEntity: TitleEntity;
  createTitleService: CreateTitle;

  constructor(titleEntity: TitleEntity) {
    this.titleEntity = titleEntity;
    this.createTitleService = new Canvas(this.titleEntity);
  }

  async render(): Promise<void> {
    await this.createTitleService.render();
  }
}
