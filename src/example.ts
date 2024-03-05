import { generateTitles } from "./index.js";

const result = await generateTitles({
  inputNames: ["Felipe", "Juan"],
  fontSize: 220,
  color: "#000000",
  textAlign: "center",
  // positionNameX: 1653,
  // positionNameY: 950,
  imageQuality: 0.9,
  fontPath: "dist/src/assets/fonts/itcedscr.ttf",
  inputTitlePath: "dist/src/assets/image/title.jpg",
  outputImgPath: "output/img",
  outputPdfPath: "output/titles.pdf",
  // enableLogging: true, // default "true"
  exportPDF: true, // default "true"
});

result ? console.log("Success") : console.log("Error");
