# Generate diplomas

A versatile tool for generating diplomas and certificates from a list of names, with support for customizable designs and output formats like PDF.

# Basic Usage

```js
import { generateTitles } from "diplomas-generator";

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
This package uses the package [node-canvas](https://www.npmjs.com/package/canvas) to generate the diplomas, so in some cases you need to install the OS dependencies of this package to use it. See the OS specific instructions [here](https://www.npmjs.com/package/canvas)

File names.txt should contain a list of names separated by new line.

```txt
Maria Perez
Patrick Smith
Jane Doe
```

You can also get dimensions of the title image using the static method `LoadImage.load` :

```js
import { LoadImage } from "diplomas-generator";

const image = await LoadImage.load("path/title.jpg");
if (image) {
  const { width, height } = image;
  // Do something with the dimensions
}
```

| Parameter        | Description                                                                         |
| ---------------- | ----------------------------------------------------------------------------------- |
| `fontSize`       | Font size for the name on the diplomas.                                             |
| `color`          | Text color for the name on the diplomas, in hexadecimal format.                     |
| `positionNameX`  | X coordinate (in pixels) for the horizontal position of the name on the diplomas.   |
| `positionNameY`  | Y coordinate (in pixels) for the vertical position of the name on the diplomas.     |
| `imageQuality`   | Quality of the base image of the title on the diplomas, as a value between 0 and 1. |
| `fontPath`       | File path for the text font for the names on the diplomas.                          |
| `inputTitlePath` | File path for the base image file of the title on the diplomas.                     |
| `outputImgPath`  | Output path to save the generated diplomas as images.                               |
| `outputPdfPath`  | Output path to save the generated diplomas as PDF files.                            |
| `inputNames`\*   | File path for the text file containing the names. Can be an array (required).       |

`positionNameX` and `positionNameY` are the coordinates (px) of the name in the diploma. By default, the name is centered in the diploma. Use these parameters to adjust the position of the name in the diploma. We use these coordinates as a center of the name.

![Example of generated diploma.](https://flpmcruz.github.io/diplomas-generator/example.jpg)
