import { generateTitles } from "./main.js";

generateTitles({
  fontSize: 220,
  positionNameX: 1653,
  positionNameY: 950,
  imageQuality: 0.9,
  fontPath: "src/fonts/itcedscr.ttf",
  inputTitlePath: "src/image/title.jpg",
  outputImgPath: "output/img",
  outputPdfPath: "output/titles.pdf",
  inputTxtPath: "src/data/names.txt",
});
