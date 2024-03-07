import { LoggingService } from "../../../src/aplication";

describe("Testing LoggingService", () => {
  test("Testing LoggingService.getInstance()", () => {
    const instance1 = LoggingService.getInstance(true);
    const instance2 = LoggingService.getInstance(false);
    expect(instance1).toBe(instance2);
  });

  test("Testing printMessage has not been called", () => {
    const instance = LoggingService.getInstance();
    instance.changeState(false);
    const spy = jest.spyOn(console, "log");
    instance.warning("test");
    expect(spy).not.toHaveBeenCalled();
  });

  test("Testing printMessage has been called", () => {
    const instance = LoggingService.getInstance(true);
    instance.changeState(true);
    const spy = jest.spyOn(console, "log");
    instance.warning("test");
    expect(spy).toHaveBeenCalled();
  });
});
