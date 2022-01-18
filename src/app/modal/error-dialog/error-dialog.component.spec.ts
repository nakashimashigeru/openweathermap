import { ComponentFixture, TestBed, waitForAsync } from "@angular/core/testing";
import { HttpClientModule } from "@angular/common/http";
import { RouterModule } from "@angular/router";
import { BsModalRef, ModalModule } from "ngx-bootstrap/modal";
import { AngularFireModule } from '@angular/fire';

import { ErrorDialogComponent } from "./error-dialog.component";
import { environment } from "src/environments/environment";

describe("ErrorDialogComponent", () => {
  let component: ErrorDialogComponent;
  let fixture: ComponentFixture<ErrorDialogComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ErrorDialogComponent],
      imports: [
        HttpClientModule,
        RouterModule.forRoot([]),
        ModalModule.forRoot(),
        AngularFireModule,
        AngularFireModule.initializeApp(environment.config)
      ],
      providers: [BsModalRef],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ErrorDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
