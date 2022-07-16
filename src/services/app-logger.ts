import { LogType } from "../constants/enums/log-type";

class AppLogger {
  public static instance: AppLogger;
  private userId?: string;

  constructor() {
    if (!AppLogger.instance) {
      AppLogger.instance = this;
    }

    return AppLogger.instance;
  }

  public setUserId(userId: string) {
    this.userId = userId || this.userId;
  }

  private stringifyData(data: any) {
    let stringified = "";

    if (data == null) {
      //catch null or undefind but not false
      stringified = "";
    } else if (data instanceof Error) {
      stringified = data.toString();
    } else if (Array.isArray(data)) {
      stringified = data.toString();
    } else if (typeof data === "object") {
      stringified = JSON.stringify(data, null, 2);
    } else {
      //all other primitive values
      stringified = `${data}`;
    }

    return stringified;
  }

  public log(message?: any, data?: any, logType: LogType = LogType.LOG) {
    const userIdToPrint = this.userId ? `- ${this.userId} ` : "";
    const logStart = `${new Date().toISOString()} ${userIdToPrint}- ${logType.toUpperCase()} - `;
    const logData = data ? this.stringifyData(data) : "";
    const log = message
      ? logStart + this.stringifyData(message) + " " + logData
      : "";

    switch (logType.toLowerCase()) {
      case LogType.INFO:
      case LogType.DEBUG:
        console.log(log);
        break;

      case LogType.WARNING:
        console.warn(log);
        break;

      case LogType.ERROR:
        console.error(log);
        break;

      default:
        console.log(log);
    }
  }

  public info(message?: any, data?: any) {
    this.log(message, data, LogType.INFO);
  }

  public warning(message?: any, data?: any) {
    this.log(message, data, LogType.WARNING);
  }

  public error(message?: any, data?: any) {
    this.log(message, data, LogType.ERROR);
  }

  public debug(message?: any, data?: any) {
    this.log(message, data, LogType.DEBUG);
  }
}

const appLogger = new AppLogger();

export default appLogger;
