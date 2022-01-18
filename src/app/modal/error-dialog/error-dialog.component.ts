import { Component, OnInit, OnDestroy } from "@angular/core";
import { BsModalRef } from "ngx-bootstrap/modal";
import { OutputModel } from "../../model/output.model";

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
    OutputModel.setResult("");

    if (OutputModel.getCityAdd() !== undefined) {
      OutputModel.getCityAdd().cityAddForm.controls["name"].setValue("");
      OutputModel.getCityAdd().prefectures.nativeElement.focus();
    }
    if (OutputModel.getCityEdit() !== undefined) {
      OutputModel.getCityEdit().cityEditForm.controls["name"].setValue("");
      OutputModel.getCityEdit().prefectures.nativeElement.focus();
    }
  }

  public close(): void {
    // 戻り値 閉
    OutputModel.setResult("閉");
    // ダイアログ画面を閉じる
    this.bsModalRef.hide();
  }
}
