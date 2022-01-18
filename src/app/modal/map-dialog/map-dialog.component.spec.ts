import { ComponentFixture, TestBed, waitForAsync } from "@angular/core/testing";
import { HttpClientModule } from "@angular/common/http";
import { RouterModule } from "@angular/router";
import { BsModalRef, ModalModule } from "ngx-bootstrap/modal";
import { AngularFireModule } from '@angular/fire';

import { MapDialogComponent } from "./map-dialog.component";
import { environment } from "src/environments/environment";

describe("MapDialogComponent", () => {
  let component: MapDialogComponent;
  let fixture: ComponentFixture<MapDialogComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [MapDialogComponent],
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
    fixture = TestBed.createComponent(MapDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
