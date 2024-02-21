import colors from "@colors/colors";

export const messages = {
  error: "Error",
  success: "Success",
  main: "Main",
  default: "Default",
};

colors.setTheme({
  error: ["red", "underline"],
  success: ["green", "bold"],
  main: ["cyan", "bold"],
  default: ["white"],
});

export function looging(message: string, type = messages.default) {
  if (type === messages.main) {
    console.log("-".repeat(10), colors.bgBlack.white(message), "-".repeat(10));
    return;
  } else if (type === messages.error) {
    console.log("-".repeat(10), colors.red(message), "-".repeat(10));
    return;
  } else if (type === messages.success) {
    console.log("-".repeat(10), colors.green(message), "-".repeat(10));
    return;
  } else if (type === messages.default) {
    console.log(colors.white(message));
    return;
  }
  console.log(message);
}
