export class LoggingService {
  private static instance: LoggingService | null = null;
  private enable: boolean = false;

  private constructor(enable?: boolean) {
    if (enable !== undefined) this.enable = enable;
  }

  public static getInstance(enable?: boolean): LoggingService {
    if (!LoggingService.instance)
      LoggingService.instance = new LoggingService(enable);
    return LoggingService.instance;
  }

  private format(message: string, color: string): void {
    if (this.enable)
      console.log(`\x1b[37m${"-".repeat(15)} ${color}${message}\x1b[0m`);
  }

  public warning = (message: string): void => this.format(message, "\x1b[91m");
  public success = (message: string): void => this.format(message, "\x1b[32m");
  public main = (message: string): void => this.format(message, "\x1b[97m");
  public default = (message: string): void => this.format(message, "");
  public error = (message: string): void =>
    console.error(`\x1b[37m${"-".repeat(15)} \x1b[31m${message}\x1b[0m`);
}
