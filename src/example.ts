import { generateTitles } from "./index.js";

const result = await generateTitles({
  inputNames: "src/data/names.txt", // or ["Felipe", "Juan"]
  fontSize: 220,
  color: "#000000",
  // positionNameX: 1653,
  // positionNameY: 950,
  imageQuality: 0.9,
  fontPath: "src/fonts/itcedscr.ttf",
  inputTitlePath: "src/image/title.jpg",
  outputImgPath: "output/img",
  outputPdfPath: "output/titles.pdf",
  // enableLogging: true, // default "true"
  // exportPDF: true, // default "true"
});

result ? console.log("Success") : console.log("Error");
