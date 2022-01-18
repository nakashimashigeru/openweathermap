import { ComponentFixture, TestBed, waitForAsync } from "@angular/core/testing";

import { CityEditComponent } from "./city-edit.component";

describe("CityEditComponent", () => {
  let component: CityEditComponent;
  let fixture: ComponentFixture<CityEditComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [CityEditComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CityEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
