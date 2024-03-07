# Generate diplomas

![tests](https://github.com/flpmcruz/diplomas-generator/actions/workflows/ci.yml/badge.svg)

A versatile tool for generating diplomas and certificates from a list of names, with support for customizable designs and output formats like JPG and PDF.

![Example of generated diploma.](https://flpmcruz.github.io/diplomas-generator/example.jpg)

# Basic usage

```js
import { generateTitles } from "diplomas-generator";

// Configuration object for generating titles.
const config = {
  inputNames: "src/data/names.txt", // or [ "name1", "name2", ...]
  inputTitlePath: "src/image/title.jpg", // Path to the title image file
};

generateTitles(config)
  .then(() => {
    console.log("Diplomas generated successfully!");
  })
  .catch((error) => {
    console.error("Error generating diplomas:", error);
  });
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

`positionNameX` and `positionNameY` are the coordinates (px) of the name in the diploma. By default, the name is centered in the diploma. Use these parameters to adjust the position of the name in the diploma.

Use `textAlign` to adjust the horizontal alignment of the name relative to the `positionNameX`.

File names.txt should contain a list of names separated by new line.

```txt
Maria Perez
Patrick Smith
Jane Doe
```

# CommonJS usage

```js
const { generateTitles } = require("diplomas-generator");
const config {
  ...
}
generateTitles(config).then().catch();
```

# Advanced usage

```js
import { generateTitles } from "diplomas-generator";

// Configuration object for generating titles.
const config = {
  inputNames: "src/data/names.txt", // or [ "name1", "name2", ...]
  fontPath: "src/fonts/itcedscr.ttf", // Path to the font file
  fontSize: 220, // Font size in pixels
  color: "#000000", // Text color in hexadecimal format
  textAlign: "center", // Text alignment
  positionNameX: 1625, // X-coordinate position for placing the name
  positionNameY: 950, // Y-coordinate position for placing the name
  imageQuality: 0.9, // Image quality (0 to 1)
  inputTitlePath: "src/image/title.jpg", // Path to the title image file
  outputImgPath: "output/img",
  outputPdfPath: "output/titles.pdf",
  exportPDF: true, // Whether to export PDF (default: true)
  enableLogging: true, // Whether to enable logging (default: false)
};

generateTitles(config)
  .then(() => {
    console.log("Diplomas generated successfully!");
  })
  .catch((error) => {
    console.error("Error generating diplomas:", error);
  });
```
