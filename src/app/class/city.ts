export class City {
  /** ドキュメントID */
  documentId?: string;
  /** 都市名 */
  name?: string;
  /** 天気 */
  weather?: string;
  /** 気温 */
  temp?: string;
  /** 湿度 */
  humidity?: string;
  /** 最高気温 */
  tempMax?: string;
  /** 最低気温 */
  tempMin?: string;
  /** 作成日時 */
  timeZone?: string;
  /** 天気アイコン */
  icon?: string;
  /** 緯度経度 */
  location?: {
    lat: number;
    lon: number;
  };
}
