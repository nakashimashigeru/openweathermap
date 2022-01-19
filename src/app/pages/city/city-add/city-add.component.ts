import { Component, OnInit, ViewChild, ElementRef } from "@angular/core";
import { Router } from "@angular/router";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { MessageDialogService, DialogResult, DialogSize } from "../../../service/message-dialog.service";
import { CityService } from "../../../service/city.service";
import { LoggerService } from "../../../service/logger.service";
import { CommonModel } from "../../../model/common.model";
import { validateEnterOnlySpaces } from "../../../shared/custom.validators";
import { City } from "../../../interface/city.model";

@Component({
  selector: "app-city-add",
  templateUrl: "./city-add.component.html",
  styleUrls: ["./city-add.component.scss"],
})
export class CityAddComponent implements OnInit {
  /** 都市名 テキストボックス */
  @ViewChild("prefectures", { read: ElementRef, static: true }) prefectures: ElementRef<HTMLInputElement>;

  public readonly cityAddForm: FormGroup = this.formBuilder.group({
    name: ["", [Validators.required, validateEnterOnlySpaces]],
  });

  /**
   * コンストラクタ
   * @param router Router
   * @param formBuilder FormBuilder
   * @param messageDialogService MessageDialogService
   * @param service CityService
   * @param loggerService LoggerService
   */
  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private messageDialogService: MessageDialogService,
    private service: CityService,
    private loggerService: LoggerService,
  ) {}

  ngOnInit() {
    CommonModel.setCityAdd(this);

    this.prefectures.nativeElement.focus();
  }

  public onSubmit(): void {
    const city: City = {
    name: this.cityAddForm.controls["name"].value,
    weather: "",
    icon: "",
    temp: "",
    humidity: "",
    tempMax: "",
    tempMin: "",
    timeZone: "",
    };

    // サービスの都市登録メソッドに渡す
    this.service.addCity(city, null);
  }

  public onKeydown(event) {
    // Enterキー押下時は画面遷移不可
    if (event.key === "Enter") {
      return false;
    }
  }

  /**
   * エラーダイアログ画面
   */
  public openErrorDialogClick(code: string, message: string) {
    // コールバック関数
    const callBack = (result: string) => {
      if (result === DialogResult.CLOSE) {
        // OKボタン押下時の処理
        this.loggerService.trace(result);
      } else {
        // 戻り値取得失敗時の処理
        this.loggerService.error("戻り値不正");
      }
    };
    this.messageDialogService.errorDialog(code, message, DialogSize.MD, callBack);
  }
}
