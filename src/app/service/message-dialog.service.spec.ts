import { TestBed } from "@angular/core/testing";
import { ModalModule } from "ngx-bootstrap/modal";
import { AngularFireModule } from '@angular/fire';

import { MessageDialogService } from "./message-dialog.service";
import { environment } from "src/environments/environment";

describe("MessageDialogService", () => {
  let service: MessageDialogService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        ModalModule.forRoot(),
        AngularFireModule,
        AngularFireModule.initializeApp(environment.config)
      ],
    });
    service = TestBed.inject(MessageDialogService);
  });

  it("should be created", () => {
    expect(service).toBeTruthy();
  });
});
