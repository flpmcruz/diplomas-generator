import fs from "fs";
import path from "path";
import { CreateTitleService, LoadImageService } from "../../../src/aplication";
import { TitleEntity } from "../../../src/domain/TitleEntity.js";
import { FileSystemService } from "../../../src/domain/services/FileSystemService.js";
import {
  HexColor,
  TextAlign,
  imgQuality,
} from "../../../src/domain/interfaces";

describe("Testing CreateTitleService", () => {
  const outputImgPath = FileSystemService.joinPaths("output", "img");

  afterEach(() => {
    if (fs.existsSync(outputImgPath))
      fs.rmSync(path.dirname(outputImgPath), { recursive: true });
  });

  test("shoud create images titles", async () => {
    const path = "__tests__/src/assets/title.jpg";
    const image = await new LoadImageService(path).exec();

    const config = {
      inputNames: ["Felipe", "Juan"],
      fontSize: 220,
      textAlign: "center" as TextAlign,
      color: "#000000" as HexColor,
      positionNameX: 1653,
      positionNameY: 950,
      imageQuality: 0.9 as imgQuality,
      fontPath: "__tests__/src/assets/fonts/itcedscr.ttf",
      outputImgPath,
    };

    const titleEntity = new TitleEntity({ ...config, image });
    const title = new CreateTitleService(titleEntity);
    await title.render();

    expect(titleEntity.outputImgPath).toBe(
      FileSystemService.joinPaths(process.cwd(), outputImgPath)
    );
    expect(fs.existsSync(outputImgPath)).toBe(true);
    expect(fs.readdirSync(outputImgPath).length).toBe(2);
    expect(titleEntity.fontColor).toBe("#000000");
    expect(titleEntity.fontSize).toBe(220);
    expect(titleEntity.textAlignment).toBe("center");
    expect(titleEntity.imageQuality).toBe(0.9);
    expect(titleEntity.position.x).toBe(1653);
    expect(titleEntity.position.y).toBe(950);
    expect(titleEntity.fontPath).toBe(
      FileSystemService.joinPaths(
        process.cwd(),
        "__tests__/src/assets/fonts/itcedscr.ttf"
      )
    );
  });
});
