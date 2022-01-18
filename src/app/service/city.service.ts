import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Router } from "@angular/router";
import { AngularFirestore } from "@angular/fire/firestore";
import { LoggerService } from "./logger.service";
import { OutputModel } from "../model/output.model";
import { City } from "../class/city";

@Injectable({
  providedIn: "root",
})
export class CityService {
  environment = {
    production: false,
    appId: "a45cebc95a4d4136b742329ed478f73d",
    baseUrl: "http://api.openweathermap.org/data/2.5/",
  };

  /**
   * コンストラクタ
   * @param http HttpClient
   * @param router Router
   * @param db AngularFirestore
   * @param loggerService LoggerService
   */
  constructor(
    private http: HttpClient,
    private router: Router,
    private db: AngularFirestore,
    private loggerService: LoggerService,
  ) {}

  public addCity(city: City, id: string): void {
    // openweathermapのAPIを呼び出す処理
    const apiEndPoint: string =
      this.environment.baseUrl +
      "weather?q=" +
      city.name +
      "&appid=" +
      this.environment.appId +
      "&units=metric&lang=ja";

    this.getWeatheritemsbyCity(apiEndPoint).subscribe(
      (res) => {
        // 都市名
        const name = res.name;
        // 天気
        const weather = res.weather[0].description;
        // 気温
        const temp = String(Math.floor(res.main.temp * 10) / 10) + "℃";
        // 湿度
        const humidity = String(Math.floor(res.main.humidity * 10) / 10) + "%";
        // 最高気温
        const tempMax = String(Math.floor(res.main.temp_max * 10) / 10) + "℃";
        // 最低気温
        const tempMin = String(Math.floor(res.main.temp_min * 10) / 10) + "℃";
        // 作成日時
        const timeZone = new Date().toLocaleString(res.timeZone);
        // 天気アイコン
        const icon = "https://openweathermap.org/img/w/" + res.weather[0].icon + ".png";
        // 緯度経度
        const coord = res.coord;
        const location = {
          lat: coord.lat,
          lon: coord.lon,
        };

        if (id === null) {
          const cityInfo: City = {};
          this.db
            .collection("cities")
            .add(cityInfo)
            .then((docRef) => {
              // ドキュメントID
              const documentId = docRef.id;
              const addCityInfo: City = {
                documentId,
                name,
                weather,
                temp,
                humidity,
                tempMax,
                tempMin,
                timeZone,
                icon,
                location,
              };
              this.db.collection("cities").doc(docRef.id).set(addCityInfo);
            });
          // ダッシュボードに遷移
          this.router.navigate(["dashboard"]);
        } else {
          // ドキュメントID
          const documentId = id;
          const updateCityInfo: City = {
            documentId,
            name,
            weather,
            temp,
            humidity,
            tempMax,
            tempMin,
            timeZone,
            icon,
            location,
          };
          this.db.collection("cities").doc(id).set(updateCityInfo);
          // ダッシュボードに遷移
          this.router.navigate(["dashboard"]);
        }
      },
      (err) => {
        if (id === null) {
          // モーダル画面を表示
          OutputModel.getCityAdd().openErrorDialogClick(err.error.cod, err.error.message);
        } else {
          // モーダル画面を表示
          OutputModel.getCityEdit().openErrorDialogClick(err.error.cod, err.error.message);
        }
        this.loggerService.error(err);
      },
    );
  }

  /**
   * 受け取ったURLにリクエストを発行
   * @param apiEndPoint URL
   */
  private getWeatheritemsbyCity(apiEndPoint: string): Observable<any> {
    return this.http.get(apiEndPoint);
  }
}
