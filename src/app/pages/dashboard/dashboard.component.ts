import { Component, OnInit, ViewChild } from "@angular/core";
import { Router } from "@angular/router";
import { AngularFirestore } from "@angular/fire/firestore";
import { MessageDialogService, DialogResult, DialogSize } from "../../service/message-dialog.service";
import { CityService } from "../../service/city.service";
import { LoggerService } from "../../service/logger.service";
import { CommonModel } from "../../model/common.model";
import { City } from "../../interface/city.model";
import _ from "lodash";

@Component({
  selector: "app-dashboard",
  templateUrl: "./dashboard.component.html",
  styleUrls: ["./dashboard.component.scss"],
})
export class DashboardComponent implements OnInit {
  /** ドキュメントID */
  public documentId = "";
  /** 都市名 格納用 */
  public name = "";

  public cities: City[] = [];

  public selectedCity: City[] = [];

  public cols: any[] = [];

  /**
   * コンストラクタ
   * @param router Router
   * @param db AngularFirestore
   * @param messageDialogService MessageDialogService
   * @param service CityService
   * @param loggerService LoggerService
   */
  constructor(
    private router: Router,
    private db: AngularFirestore,
    private messageDialogService: MessageDialogService,
    private service: CityService,
    private loggerService: LoggerService,
  ) {}

  ngOnInit() {
    CommonModel.setDashboard(this);

    this.db
      .collection("cities")
      .valueChanges()
      .subscribe(
        (data: City[]) => {
          // 作成日時順（降順）
          this.cities = _.orderBy(data, "timeZone", "desc");
          const resultStr: string[] = [];
          this.cities.forEach((city) => {
            resultStr.push(city.name);
          });
        },
        (err) => {
          this.loggerService.error(err);
        },
      );

    this.cols = [
      { field: "name", header: "都市名" },
      { field: "weather", header: "天気" },
      { field: "temp", header: "気温" },
      { field: "humidity", header: "湿度" },
      { field: "timeZone", header: "作成日時" },
    ];
  }

  public onRowSelect(event): void {
    this.documentId = event.data.documentId;
    this.db
      .collection("cities")
      .doc(this.documentId)
      .get()
      .toPromise()
      .then((docRef) => {
        const city = docRef.data();
        this.name = city["name"];
        this.openMapDialogClick(this.documentId, this.name);
      })
      .catch((error) => {
        this.loggerService.error("Error getting document:", error);
      });
  }

  /**
   * 地図ダイアログ画面
   */
  public openMapDialogClick(documentId: string, name: string) {
    // コールバック関数
    const callBack = (result: string) => {
      if (result === DialogResult.EDIT) {
        // 編集ボタン押下時の処理
        this.loggerService.trace(result);
      } else if (result === DialogResult.DELETE) {
        // 削除ボタン押下時の処理
        this.loggerService.trace(result);
      } else if (result === DialogResult.CLOSE) {
        // 閉じるボタン押下時の処理
        this.loggerService.trace(result);
      } else {
        // 戻り値取得失敗時の処理
        this.loggerService.error("戻り値不正");
      }
    };
    this.messageDialogService.mapDialog(documentId, name, DialogSize.LG, callBack);
  }
}
