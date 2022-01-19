import { ComponentFixture, TestBed, waitForAsync } from "@angular/core/testing";
import { HttpClientModule } from "@angular/common/http";
import { ReactiveFormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";
import { BsModalService, ModalModule } from "ngx-bootstrap/modal";
import { AngularFireModule } from '@angular/fire';
import { MatDialogModule } from "@angular/material/dialog";

import { CityAddComponent } from "./city-add.component";
import { environment } from "src/environments/environment";

describe("CityAddComponent", () => {
  let component: CityAddComponent;
  let fixture: ComponentFixture<CityAddComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [CityAddComponent],
      imports: [
        HttpClientModule,
        ReactiveFormsModule,
        RouterModule.forRoot([]),
        ModalModule.forRoot(),
        AngularFireModule,
        AngularFireModule.initializeApp(environment.config),
        MatDialogModule
      ],
      providers: [BsModalService],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CityAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
