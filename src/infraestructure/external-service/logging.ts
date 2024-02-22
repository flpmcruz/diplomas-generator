import colors from "@colors/colors";

type MessageType = "error" | "success" | "main" | "default";

colors.setTheme({
  error: ["red", "underline"],
  success: ["green", "bold"],
  main: ["cyan", "bold"],
  default: ["white"],
});

export function looging(message: string, type: MessageType = "default") {
  if (type === "main") {
    return console.log("-".repeat(10), colors.bgBlack.white(message));
  } else if (type === "error") {
    return console.log("-".repeat(10), colors.red(message));
  } else if (type === "success") {
    return console.log("-".repeat(10), colors.green(message));
  } else if (type === "default") {
    return console.log(colors.white(message));
  }

  neverAssert(type);
}

function neverAssert(never: never) {}
