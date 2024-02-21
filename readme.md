# This is a tool to generate diplomas from list of names

# Basic Usage

```js
import { generateTitle } from "titles-generator";

// All the parameters are optional, only the inputNames is required.
const config = {
  fontSize: 220,
  color: "#000000",
  positionNameX: 1625,
  positionNameY: 950,
  imageQuality: 0.9,
  fontPath: "src/fonts/itcedscr.ttf",
  inputTitlePath: "src/image/title.jpg",
  outputImgPath: "output/img",
  outputPdfPath: "output/titles.pdf",
  inputNames: "src/data/names.txt", // or ["Felipe", "Juan", "Pedro"] *Required
};

generateTitles(config);
```

File names.txt should contain a list of names separated by new line.

```txt
John Doe
Patrick Smith
Jane Doe
```
