import { Injectable } from "@angular/core";

@Injectable({
  providedIn: "root",
})
export class LoggerService {
  /**
   * console.traceメソッドを利用し、ログを出力する
   * @param result 戻り値
   * @param optionalParams オプションパラメータ
   */
  public trace(result: string, ...optionalParams: object[]): void {
    console.trace(result, optionalParams);
  }

  /**
   * console.debugメソッドを利用し、ログを出力する
   * @param result 戻り値
   * @param optionalParams オプションパラメータ
   */
  public debug(result: string, ...optionalParams: object[]): void {
    console.debug(result, optionalParams);
  }

  /**
   * console.infoメソッドを利用し、ログを出力する
   * @param result 戻り値
   * @param optionalParams オプションパラメータ
   */
  public info(result: string, ...optionalParams: object[]): void {
    console.info(result, optionalParams);
  }

  /**
   * console.warnメソッドを利用し、ログを出力する
   * @param result 戻り値
   * @param optionalParams オプションパラメータ
   */
  public warn(result: string, ...optionalParams: object[]): void {
    console.warn(result, optionalParams);
  }

  /**
   * console.errorメソッドを利用し、ログを出力する
   * @param result 戻り値
   * @param optionalParams オプションパラメータ
   */
  public error(result: string, ...optionalParams: object[]): void {
    console.error(result, optionalParams);
  }
}
