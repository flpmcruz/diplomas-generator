import colors from "@colors/colors";

export class Loggin {
  static error(message: string) {
    return console.log("-".repeat(15).dim, colors.red(message));
  }
  static warning(message: string) {
    return console.log("-".repeat(15).dim, colors.brightRed(message));
  }
  static success(message: string) {
    return console.log("-".repeat(15).dim, colors.green(message));
  }
  static main(message: string) {
    return console.log(
      "-".repeat(15).dim,
      colors.bgBlack.white.italic(message)
    );
  }
  static default(message: string) {
    return console.log(colors.white(message));
  }
}
