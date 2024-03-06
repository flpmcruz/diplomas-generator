import { generateTitles } from "./index.js";

generateTitles({
  inputNames: ["Felipe", "Juan"],
  fontSize: 220,
  color: "#000000",
  textAlign: "center",
  positionNameX: 1653,
  positionNameY: 950,
  imageQuality: 0.9,
  fontPath: "dist/src/assets/fonts/itcedscr.ttf",
  inputTitlePath: "dist/src/assets/image/title.jpg",
  outputImgPath: "output/img",
  outputPdfPath: "output/titles.pdf",
  enableLogging: true,
  exportPDF: true,
})
  .then(() => console.log("Done"))
  .catch((error) => console.error(error));
