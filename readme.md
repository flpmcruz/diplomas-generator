# This is a tool to generate diplomas from list of names

# Basic Usage

```js
import { generateTitle } from "titles-generator";

const config = {
  fontSize: 220,
  positionNameX: 1650,
  positionNameY: 950,
  imageQuality: 0.9,
  fontPath: "src/fonts/itcedscr.ttf",
  inputTitlePath: "src/image/title.jpg",
  outputImgPath: "output/img",
  outputPdfPath: "output/titles.pdf",
  inputNames: "src/data/names.txt", // or ["Felipe", "Juan", "Pedro"]
};

generateTitles(config);
```

File names2.txt should contain a list of names separated by new line.

```txt
John Doe
Patrick Smith
Jane Doe
```
