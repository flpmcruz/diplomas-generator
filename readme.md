# Generate diplomas

![tests](https://github.com/flpmcruz/diplomas-generator/actions/workflows/ci.yml/badge.svg)

A versatile tool for generating diplomas and certificates from a list of names, with support for customizable designs and output formats like JPG and PDF.

![Example of generated diploma.](https://flpmcruz.github.io/diplomas-generator/example.jpg)

# Basic Usage

```js
import { generateTitles } from "diplomas-generator";
// const { generateTitles } = require("diplomas-generator"); // For CommonJS

// All the parameters are optional, only the inputNames is required.
const config = {
  inputNames: "src/data/names.txt", // or ["Felipe", "Juan"] *Required
  // fontPath: "src/fonts/itcedscr.ttf",
  // fontSize: 220,
  // color: "#000000",
  // textAlign: "center", // or "left"|"right"|"start"|"end"
  // positionNameX: 1625,
  // positionNameY: 950,
  // imageQuality: 0.9,
  // inputTitlePath: "src/image/title.jpg",
  // outputImgPath: "output/img",
  // outputPdfPath: "output/titles.pdf",
  // exportPDF: true, // default "true"
  // enableLogging: true // default "false"
};

const result = await generateTitles(config); // Returns a boolean

result ? console.log("Success") : console.log("Error");
```

** Important **
This package uses the package [node-canvas](https://www.npmjs.com/package/canvas) to generate the diplomas, so in some cases you need to install the OS dependencies of this package to use it. See the OS specific instructions [here](https://www.npmjs.com/package/canvas)

| Parameter        | Description                                                                                  |
| ---------------- | -------------------------------------------------------------------------------------------- |
| `inputNames`\*   | Required\* File path for the text file containing the names. Can be an array of strings.     |
| `fontSize`       | Font size for the name on the diplomas.                                                      |
| `color`          | Text color for the name on the diplomas, in hexadecimal format.                              |
| `textAlign`      | Horizontal alignment for the name on the diplomas. "center", "start", "end", "left", "right" |
| `positionNameX`  | X coordinate (in pixels) for the horizontal position of the name on the diplomas.            |
| `positionNameY`  | Y coordinate (in pixels) for the vertical position of the name on the diplomas.              |
| `imageQuality`   | Quality of the base image of the title on the diplomas, as a value between 0 and 1.          |
| `fontPath`       | File path for the text font for the names on the diplomas.                                   |
| `inputTitlePath` | File path for the base image file of the title on the diplomas.                              |
| `outputImgPath`  | Output path to save the generated diplomas as images.                                        |
| `outputPdfPath`  | Output path to save the generated diplomas as PDF files.                                     |
| `exportPDF`      | Boolean to enable or disable the export of the diplomas as PDF files.                        |
| `enableLogging`  | Boolean to enable or disable the logging of the process.                                     |

# Considerations

`inputNames`, `inputTitlePath`, `outputImgPath`, and `outputPdfPath` should be relative paths to the project root.
`positionNameX` and `positionNameY` are the coordinates (px) of the name in the diploma. By default, the name is centered in the diploma. Use these parameters to adjust the position of the name in the diploma. And `textAlign` to adjust the horizontal alignment of the name relative to the `positionNameX`.

File names.txt should contain a list of names separated by new line.

```txt
Maria Perez
Patrick Smith
Jane Doe
```

You can also get dimensions of the your title image using the static method `LoadImage.load` :

```js
import { LoadImage } from "diplomas-generator";

try {
  const image = await LoadImage.load("path/title.jpg");
  if (image) {
    const { width, height } = image;
    // Do something with the dimensions
  }
} catch (error) {}
```
