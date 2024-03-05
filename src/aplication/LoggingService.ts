export class LoggingService {
  enable: boolean = true;
  instance: LoggingService | null = null;

  constructor(enable?: boolean) {
    enable ? (this.enable = enable) : true;
    if (this.instance) return this.instance;
    this.instance = this;
  }

  error(message: string) {
    return console.log(`\x1b[37m${"-".repeat(15)} \x1b[31m${message}\x1b[0m`);
  }

  warning(message: string) {
    return this.enable
      ? console.log(`\x1b[37m${"-".repeat(15)} \x1b[91m${message}\x1b[0m`)
      : null;
  }

  success(message: string) {
    return this.enable
      ? console.log(`\x1b[37m${"-".repeat(15)} \x1b[32m${message}\x1b[0m`)
      : null;
  }

  main(message: string) {
    return this.enable
      ? console.log(`\x1b[37m${"-".repeat(15)} \x1b[97m${message}\x1b[0m`)
      : null;
  }

  default(message: string) {
    return this.enable
      ? console.log(`\x1b[37m${"-".repeat(15)} ${message}\x1b[0m`)
      : null;
  }
}
