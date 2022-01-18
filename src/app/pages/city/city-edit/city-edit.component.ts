import {
  Component,
  OnInit,
  ViewChild,
  ElementRef,
  ViewContainerRef,
  ChangeDetectorRef,
  AfterContentChecked,
} from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { FormGroup, Validators, FormBuilder } from "@angular/forms";
import { AngularFirestore } from "@angular/fire/firestore";
import { MessageDialogService, DialogResult, DialogSize } from "../../../service/message-dialog.service";
import { CityService } from "../../../service/city.service";
import { LoggerService } from "../../../service/logger.service";
import { OutputModel } from "../../../model/output.model";
import { validateEnterOnlySpaces } from "../../../shared/custom.validators";
import { City } from "../../../class/city";

@Component({
  selector: "app-city-edit",
  templateUrl: "./city-edit.component.html",
  styleUrls: ["./city-edit.component.scss"],
})
export class CityEditComponent implements OnInit, AfterContentChecked {
  /** 都市名 テキストボックス */
  @ViewChild("prefectures", { read: ElementRef, static: true }) prefectures: ElementRef<HTMLInputElement>;

  public readonly cityEditForm: FormGroup = this.formBuilder.group({
    name: ["", [Validators.required, validateEnterOnlySpaces]],
  });

  /**
   * コンストラクタ
   * @param activatedroute ActivatedRoute
   * @param formBuilder FormBuilder
   * @param db AngularFirestore
   * @param messageDialogService MessageDialogService
   * @param service CityService
   * @param loggerService LoggerService
   * @param changeDetectorRef ChangeDetectorRef
   */
  constructor(
    private activatedroute: ActivatedRoute,
    private formBuilder: FormBuilder,
    private db: AngularFirestore,
    private messageDialogService: MessageDialogService,
    private service: CityService,
    private loggerService: LoggerService,
    private changeDetectorRef: ChangeDetectorRef,
  ) {}

  ngOnInit() {
    OutputModel.setCityEdit(this);

    const id = this.activatedroute.snapshot.paramMap.get("id");
    this.db
      .collection("cities")
      .doc(id)
      .get()
      .toPromise()
      .then((docRef) => {
        const city = docRef.data();
        this.cityEditForm.controls["name"].setValue(city["name"]);
        this.prefectures.nativeElement.focus();
      })
      .catch((error) => {
        this.loggerService.error("Error getting document:", error);
      });

    this.prefectures.nativeElement.focus();
  }

  ngAfterContentChecked() {
    this.changeDetectorRef.detectChanges();
  }

  public onSubmit(): void {
    // Cityクラスのインスタンスを生成して名前を指定
    const city: City = new City();
    city.name = this.cityEditForm.controls["name"].value;
    // 初期化
    city.weather = "";
    city.icon = "";
    city.temp = "";
    city.humidity = "";
    city.tempMax = "";
    city.tempMin = "";
    city.timeZone = "";

    const id = this.activatedroute.snapshot.paramMap.get("id");
    // サービスの都市登録メソッドに渡す
    this.service.addCity(city, id);
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
