# This is a tool to generate diplomas from list of names

# Basic Usage

```sh
import { generateTitle } from 'titles-generator';
generateTitles({
  fontSize: 220,
  positionNameX: 1650,
  positionNameY: 950,
  imageQuality: 0.9,
  fontPath: "src/fonts/itcedscr.ttf",
  inputTitlePath: "src/image/title.jpg",
  outputImgPath: "output/img",
  outputPdfPath: "output/titles2.pdf",
  inputTxtPath: "src/data/names2.txt",
});
```

File names2.txt should contain a list of names separated by new line.

```txt
John Doe
Patrick Smith
Jane Doe
```
