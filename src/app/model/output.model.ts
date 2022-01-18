import { DashboardComponent } from "../pages/dashboard/dashboard.component";
import { CityAddComponent } from "../pages/city/city-add/city-add.component";
import { CityEditComponent } from "../pages/city/city-edit/city-edit.component";

// @dynamic
export class OutputModel {
  /** 戻り値 */
  private static result = "";
  /** ダッシュボード */
  private static dashboard: DashboardComponent;
  /** 追加画面 */
  private static cityAdd: CityAddComponent;
  /** 編集画面 */
  private static cityEdit: CityEditComponent;

  /** 戻り値 getter */
  public static getResult(): string {
    return this.result;
  }
  /** 戻り値 setter */
  public static setResult(data: string) {
    this.result = data;
  }

  /** ダッシュボード getter */
  public static getDashboard(): DashboardComponent {
    return this.dashboard;
  }
  /** ダッシュボード setter */
  public static setDashboard(data: DashboardComponent) {
    this.dashboard = data;
  }

  /** 追加画面 getter */
  public static getCityAdd(): CityAddComponent {
    return this.cityAdd;
  }
  /** 追加画面 setter */
  public static setCityAdd(data: CityAddComponent) {
    this.cityAdd = data;
  }

  /** 編集画面 getter */
  public static getCityEdit(): CityEditComponent {
    return this.cityEdit;
  }
  /** 編集画面 setter */
  public static setCityEdit(data: CityEditComponent) {
    this.cityEdit = data;
  }
}
