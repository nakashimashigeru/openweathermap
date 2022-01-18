import { ComponentFixture, TestBed, waitForAsync } from "@angular/core/testing";
import { HttpClientModule } from "@angular/common/http";
import { ReactiveFormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";
import { BsModalService, ModalModule } from "ngx-bootstrap/modal";
import { AngularFireModule } from '@angular/fire';

import { CityEditComponent } from "./city-edit.component";
import { environment } from "src/environments/environment";

describe("CityEditComponent", () => {
  let component: CityEditComponent;
  let fixture: ComponentFixture<CityEditComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [CityEditComponent],
      imports: [
        HttpClientModule,
        ReactiveFormsModule,
        RouterModule.forRoot([]),
        ModalModule.forRoot(),
        AngularFireModule,
        AngularFireModule.initializeApp(environment.config)
      ],
      providers: [BsModalService],
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
