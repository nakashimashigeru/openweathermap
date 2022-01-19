import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Router } from "@angular/router";
import { AngularFirestore } from "@angular/fire/firestore";
import { LoggerService } from "./logger.service";
import { City } from "../interface/city.model";
import { CommonModel } from "../model/common.model";

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
    const apiEndPoint: string = this.callOpenWeatherMapAPI(city);

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
          const city: City = {};
          this.db
            .collection("cities")
            .add(city)
            .then((docRef) => {
              // ドキュメントID
              const documentId = docRef.id;
              this.db
                .collection("cities")
                .doc(docRef.id)
                .set({
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
                });
              this.loggerService.trace("Document Successfully Created");
              // ダッシュボードに遷移
              this.router.navigate(["dashboard"]);
            },
            (err) => {
                this.loggerService.error(err);
            },
          );
        } else {
          // ドキュメントID
          const documentId = id;
          this.db
            .collection("cities")
            .doc(id)
            .update({
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
            })
            .then(
              () => {
                this.loggerService.trace("Document Successfully Updated");
                // ダッシュボードに遷移
                this.router.navigate(["dashboard"]);
              },
              (err) => {
                this.loggerService.error(err);
              },
            );
        }
      },
      (err) => {
        if (id === null) {
          // モーダル画面を表示
          CommonModel.getCityAdd().openErrorDialogClick(err.error.cod, err.error.message);
        } else {
          // モーダル画面を表示
          CommonModel.getCityEdit().openErrorDialogClick(err.error.cod, err.error.message);
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

  /**
   * OpenWeatherMap APIを呼ぶ
   */
  private callOpenWeatherMapAPI(city: City): string {
    const apiEndPoint: string =
      this.environment.baseUrl +
      "weather?q=" +
      city.name +
      "&appid=" +
      this.environment.appId +
      "&units=metric&lang=ja";
    return apiEndPoint;
  }
}
