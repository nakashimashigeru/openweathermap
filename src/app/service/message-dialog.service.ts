import { Injectable } from "@angular/core";
import { BsModalService } from "ngx-bootstrap/modal";
import { MapDialogComponent } from "../modal/map-dialog/map-dialog.component";
import { ErrorDialogComponent } from "../modal/error-dialog/error-dialog.component";
import { DialogState } from "../interface/dialog.model";
import { CommonModel } from "../model/common.model";

export enum DialogSize {
  /** ダイアログサイズ 小 */
  SM = "modal-sm",
  /** ダイアログサイズ 中 */
  MD = "modal-md",
  /** ダイアログサイズ 大 */
  LG = "modal-lg",
  /** ダイアログサイズ 特大 */
  XL = "modal-xl",
}

export enum DialogResult {
  /** 戻り値 編集 */
  EDIT = "編集",
  /** 戻り値 削除 */
  DELETE = "削除",
  /** 戻り値 削除 */
  CLOSE = "閉",
}

@Injectable({
  providedIn: "root",
})
export class MessageDialogService {
  /**
   * コンストラクタ
   * @param modalService BsModalService
   */
  constructor(private modalService: BsModalService) {}

  /**
   * 地図ダイアログ画面
   * @param documentId ドキュメントID
   * @param name 都市名
   * @param dialogSize ダイアログサイズ
   * @param callBack コールバック関数
   */
  public mapDialog(documentId: string, name: string, dialogSize: string, callBack: any): void {
    // ダイアログ共通処理
    this.dialogCommonProcessing(MapDialogComponent, documentId, name, null, null, dialogSize, callBack);
  }

  /**
   * エラーダイアログ画面
   * @param code コード
   * @param message メッセージ
   * @param dialogSize ダイアログサイズ
   * @param callBack コールバック関数
   */
  public errorDialog(code: string, message: string, dialogSize: string, callBack: any): void {
    // ダイアログ共通処理
    this.dialogCommonProcessing(ErrorDialogComponent, null, null, code, message, dialogSize, callBack);
  }

  /**
   * ダイアログ共通処理
   * @param content コンテンツ
   * @param documentId ドキュメントID
   * @param name 都市名
   * @param code コード
   * @param message メッセージ
   * @param dialogSize ダイアログサイズ
   * @param callBack コールバック関数
   */
  private dialogCommonProcessing(
    content: any,
    documentId: string,
    name: string,
    code: string,
    message: string,
    dialogSize: string,
    callBack: any,
  ): void {
    const classList = dialogSize + " modal-dialog modal-dialog-centered";

    const dialogState:DialogState = {
      documentId,
      name,
      code,
      message,
    };
    const initialState = {
      documentId: dialogState.documentId,
      name: dialogState.name,
      code: dialogState.code,
      message: dialogState.message,
    };

    this.modalService.show(content, {
      initialState,
      class: classList,
      backdrop: "static",
      keyboard: false,
      animated: false,
    });

    const newSubscriber = this.modalService.onHide.subscribe(() => {
      // コールバック関数有りの場合
      callBack(CommonModel.getResult());
      newSubscriber.unsubscribe();
    });
  }
}
