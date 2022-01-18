import { ComponentFixture, TestBed, waitForAsync } from "@angular/core/testing";
import { HttpClientModule } from "@angular/common/http";
import { RouterModule } from "@angular/router";
import { BsModalService, ModalModule } from "ngx-bootstrap/modal";
import { AngularFireModule } from '@angular/fire';

import { DashboardComponent } from "./dashboard.component";
import { environment } from "src/environments/environment";

describe("DashboardComponent", () => {
  let component: DashboardComponent;
  let fixture: ComponentFixture<DashboardComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [DashboardComponent],
      imports: [
        HttpClientModule,
        RouterModule.forRoot([]),
        ModalModule.forRoot(),
        AngularFireModule,
        AngularFireModule.initializeApp(environment.config)
      ],
      providers: [BsModalService],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
