import { TestBed } from "@angular/core/testing";

import { CityService } from "./city.service";

describe("CityService", () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it("should be created", () => {
    const service: CityService = TestBed.inject(CityService);
    expect(service).toBeTruthy();
  });
});
