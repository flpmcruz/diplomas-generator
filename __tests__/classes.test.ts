import { Title } from "../src/Title";
import PDFDocument from "pdfkit";
import { createCanvas, registerFont } from "canvas";
import { LoadImage } from "../src/infraestructure/external-service";
import { CreatePDF } from "../src/CreatePDF";

describe("Testing classes", () => {
  test("should intance class title", async () => {
    const image = await LoadImage.load("__tests__/image/title.jpg");

    const config = {
      fontPath: "__tests__/fonts/itcedscr.ttf",
      fontSize: 220,
      textAlign: "center",
      color: "#000000",
      outputImgPath: "output/img",
      width: 1920,
      height: 1080,
      positionNameX: 1653,
      positionNameY: 950,
      imageQuality: 0.9,
      imageBaseTitle: image?.imageBaseTitle,
      createCanvas,
      registerFont,
    };

    const title = new Title(config);
    expect(title).toBeInstanceOf(Title);
  });

  test("should intance class PDF", async () => {
    const outputPdfPath = "output/titles.pdf";
    const width = 1920;
    const height = 1080;

    const pdf = new CreatePDF({
      outputPdfPath,
      width,
      height,
      doc: new PDFDocument(),
    });
    expect(pdf).toBeInstanceOf(CreatePDF);
  });
});
