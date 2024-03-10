import { generateTitles } from "./";

console.time("generateTitles");
generateTitles({
  inputNames: ["Felipe", "Juan"],
  fontSize: 220,
  color: "#000000",
  textAlign: "center",
  positionNameX: 1653,
  positionNameY: 950,
  imageQuality: 0.7,
  fontPath: "dist/src/assets/fonts/itcedscr.ttf",
  inputTitlePath: "dist/src/assets/image/title.jpg",
  exportImg: true,
  outputImgPath: "output/img",
  outputPdfPath: "output/titles.pdf",
  enableLogging: true,
  exportPDF: false,
})
  .then(() => console.timeEnd("generateTitles"))
  .catch((error) => console.error(error));
