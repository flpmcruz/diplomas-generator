import { TitleEntity } from "../domain/TitleEntity.js";
import { CreateTitle } from "../domain/interfaces";
import { Canvas } from "../infraestructure";

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
