import { generateTitles } from "./index.js";

generateTitles({
  fontSize: 220,
  color: "#000000",
  // positionNameX: 1653,
  // positionNameY: 950,
  imageQuality: 0.9,
  fontPath: "src/fonts/itcedscr.ttf",
  inputTitlePath: "src/image/title.jpg",
  outputImgPath: "output/img",
  outputPdfPath: "output/titles.pdf",
  inputNames: "src/data/names.txt", // or ["Felipe", "Juan", "Pedro"]
});
