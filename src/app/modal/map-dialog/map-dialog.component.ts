import { Component, OnInit, HostListener, Input, OnDestroy } from "@angular/core";
import { BsModalRef } from "ngx-bootstrap/modal";
import { Router } from "@angular/router";
import { AngularFirestore } from "@angular/fire/firestore";
import { LeafletService } from "../../service/leaflet.service";
import { CityService } from "../../service/city.service";
import { LoggerService } from "../../service/logger.service";
import { OutputModel } from "../../model/output.model";
import { City } from "../../interface/city.model";

@Component({
  selector: "app-lib-map-dialog",
  templateUrl: "./map-dialog.component.html",
  styleUrls: ["./map-dialog.component.css"],
})
export class MapDialogComponent implements OnInit, OnDestroy {
  /** ドキュメントID */
  public documentId = "";
  /** 都市名 */
  public name = "";
  /** Cityクラス */
  public cities: City[] = [];

  /**
   * コンストラクタ
   * @param bsModalRef BsModalRef
   * @param router Router
   * @param db AngularFirestore
   * @param leafletService LeafletService
   * @param service CityService
   * @param loggerService LoggerService
   */
  constructor(
    private bsModalRef: BsModalRef,
    private router: Router,
    private db: AngularFirestore,
    private leafletService: LeafletService,
    private service: CityService,
    private loggerService: LoggerService,
  ) {}

  ngOnInit() {
    this.db
      .collection("cities")
      .valueChanges()
      .subscribe(
        (data: City[]) => {
          this.cities = data;
          // 登録されている都市にマーカーを作成
          this.addMarker(this.documentId);
        },
        (err) => {
          this.loggerService.error(err);
        },
      );

    setTimeout(() => {
      document.getElementById("UNQ_sdeExtButtonCancel").focus();
    });
  }

  ngOnDestroy() {
    // 戻り値 初期化
    OutputModel.setResult("");
    // ドキュメントID 初期化
    this.documentId = "";
    // 初期化
    if (OutputModel.getDashboard() !== undefined) {
      OutputModel.getDashboard().selectedCity = [];
    }
  }

  /**
   * 閉じる
   */
  public close(): void {
    // 戻り値 閉
    OutputModel.setResult("閉");
    // ダイアログ画面を閉じる
    this.bsModalRef.hide();
  }

  /**
   * 編集する
   */
  public edit(): void {
    // 戻り値 編集
    OutputModel.setResult("編集");
    // 編集画面に遷移する
    this.editCity(this.documentId);
    // ダイアログ画面を閉じる
    this.bsModalRef.hide();
  }

  /**
   * 削除する
   */
  public delete(): void {
    // 戻り値 削除
    OutputModel.setResult("削除");
    // 都市をテーブルから削除する
    this.deleteCity(this.documentId);
    // ダイアログ画面を閉じる
    this.bsModalRef.hide();
  }

  /**
   * マーカーを追加する
   * @param documentId ドキュメントID
   */
  private addMarker(documentId: string) {
    this.cities.map((city) => {
      if (city.documentId === documentId) {
        // 地図を生成する
        this.leafletService.createMap();
        // 登録されている都市にマーカーを作成する
        this.leafletService.addMarker(city.name, city.weather, city.location.lat, city.location.lon, city.icon);
      }
    });
  }

  /**
   * 編集画面に遷移する
   * @param documentId ドキュメントID
   */
  private editCity(documentId: string): void {
    this.router.navigate([`city/edit/${documentId}`]);
  }

  /**
   * 都市をテーブルから削除する
   * @param documentId ドキュメントID
   */
  private deleteCity(documentId: string): void {
    this.db
      .collection("cities")
      .doc(documentId)
      .delete()
      .then(() => {
        this.loggerService.trace("Document Successfully Deleted");
      })
      .catch((error) => {
        this.loggerService.error(error);
      });
  }
}
