import { Component, OnInit, OnDestroy } from "@angular/core";
import { BsModalRef } from "ngx-bootstrap/modal";
import { CommonModel } from "../../model/common.model";

@Component({
  selector: "app-lib-error-dialog",
  templateUrl: "./error-dialog.component.html",
  styleUrls: ["./error-dialog.component.css"],
})
export class ErrorDialogComponent implements OnInit, OnDestroy {
  /** コード */
  public code = "";
  /** メッセージ */
  public message = "";

  /**
   * コンストラクタ
   * @param bsModalRef BsModalRef
   */
  constructor(private bsModalRef: BsModalRef) {}

  ngOnInit() {
    setTimeout(() => {
      document.getElementById("UNQ_sdeExtButtonOk").focus();
    });
  }

  ngOnDestroy() {
    // 戻り値 初期化
    CommonModel.setResult("");

    if (CommonModel.getCityAdd() !== undefined) {
      CommonModel.getCityAdd().cityAddForm.controls["name"].setValue("");
      CommonModel.getCityAdd().prefectures.nativeElement.focus();
    }
    if (CommonModel.getCityEdit() !== undefined) {
      CommonModel.getCityEdit().cityEditForm.controls["name"].setValue("");
      CommonModel.getCityEdit().prefectures.nativeElement.focus();
    }
  }

  public close(): void {
    // 戻り値 閉
    CommonModel.setResult("閉");
    // ダイアログ画面を閉じる
    this.bsModalRef.hide();
  }
}
