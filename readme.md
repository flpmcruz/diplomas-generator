# This is a tool to generate diplomas from list of names

# Basic Usage

```js
const { generateTitles } = require("diplomas-generator");

// or add the following line to your package.json to use ES6 import
// "type": "module"
// import { generateTitles } from "diplomas-generator";

// All the parameters are optional, only the inputNames is required.
const config = {
  // fontSize: 220,
  // color: "#000000",
  // positionNameX: 1625,
  // positionNameY: 950,
  // imageQuality: 0.9,
  // fontPath: "src/fonts/itcedscr.ttf",
  // inputTitlePath: "src/image/title.jpg",
  // outputImgPath: "output/img",
  // outputPdfPath: "output/titles.pdf",
  inputNames: "src/data/names.txt", // or ["Felipe", "Juan", "Pedro"] *Required
};

generateTitles(config);
```

** Important **
This package uses the package [node-canvas](https://www.npmjs.com/package/canvas) to generate the diplomas, so you need to install the OS dependencies of this package to use it. See the OS specific instructions [here](https://www.npmjs.com/package/canvas)

File names.txt should contain a list of names separated by new line.

```txt
Maria Perez
Patrick Smith
Jane Doe
```

`positionNameX` and `positionNameY` are the coordinates (px) of the name in the diploma. Use these parameters to adjust the position of the name in the diploma. We use these coordinates as a center of the name.

![Example of generated diploma.](example.jpg)
