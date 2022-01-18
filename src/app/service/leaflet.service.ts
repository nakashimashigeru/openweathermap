import { Injectable } from "@angular/core";
import { LoggerService } from "./logger.service";
import * as L from "leaflet";

@Injectable({
  providedIn: "root",
})
export class LeafletService {
  /** 地図格納用 */
  public map: any = null;
  /** マーカー管理用 */
  public markers: L.FeatureGroup = null;

  /**
   * コンストラクタ
   * @param loggerService LoggerService
   */
  constructor(private loggerService: LoggerService) {}

  /**
   * 地図を作成する
   */
  public createMap(): void {
    this.map = L.map("map").setView([33.584261, 130.403789], 13);
    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    }).addTo(this.map);
  }

  /**
   * 都市名 天気 緯度・経度を受け取ってマーカー描画と吹き出しを付ける
   * @param name 都市名
   * @param weather 天気
   * @param lat 緯度
   * @param lon 経度
   * @param icon アイコン
   */
  public addMarker(name: string, weather: string, lat: number, lon: number, icon: string): void {
    // icon情報を追加
    const iconOpt = L.icon({
      iconUrl: icon,
      iconRetinaUrl: icon,
      iconSize: [75, 75],
      iconAnchor: [25, 25],
      popupAnchor: [0, 0],
    });
    // 初期化
    this.markers = new L.FeatureGroup();
    // マーカーを作成する
    this.markers.addLayer(L.marker([lat, lon], { icon: iconOpt }).bindPopup(name + ":\n" + weather));
    this.markers.addTo(this.map);
    // マーカー追加後にフィット処理を呼び出す
    this.changeBounds();
  }

  private changeBounds(): void {
    this.map.fitBounds(this.markers.getBounds());
    this.loggerService.trace(this.map.getZoom());
    this.map.setZoom(10);
  }
}
