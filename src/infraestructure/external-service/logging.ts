import colors from "@colors/colors";

export class Loggin {
  static error(message: string) {
    return console.log("-".repeat(15), colors.red(message));
  }
  static success(message: string) {
    return console.log("-".repeat(15), colors.green(message));
  }
  static main(message: string) {
    return console.log("-".repeat(15), colors.bgBlack.white(message));
  }
  static default(message: string) {
    return console.log(colors.white(message));
  }
}
