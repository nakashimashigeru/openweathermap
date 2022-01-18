import { TestBed } from "@angular/core/testing";
import { HttpClientModule } from "@angular/common/http";
import { RouterModule } from "@angular/router";
import { AngularFireModule } from '@angular/fire';

import { CityService } from "./city.service";
import { environment } from "src/environments/environment";

describe("CityService", () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports: [
      HttpClientModule,
      RouterModule.forRoot([]),
      AngularFireModule,
      AngularFireModule.initializeApp(environment.config)
    ],
  }));

  it("should be created", () => {
    const service: CityService = TestBed.inject(CityService);
    expect(service).toBeTruthy();
  });
});
