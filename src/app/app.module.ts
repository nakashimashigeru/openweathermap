import { BrowserModule } from "@angular/platform-browser";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from "@angular/core";
import { AppRoutingModule } from "./app-routing.module";
import { FormsModule, FormBuilder, ReactiveFormsModule } from "@angular/forms";
import { HttpClientModule } from "@angular/common/http";
import { environment } from "../environments/environment";
import { AngularFireModule } from "@angular/fire";
import { AngularFireAuthModule } from "@angular/fire/auth";
import { AngularFirestoreModule } from "@angular/fire/firestore";
import { AppComponent } from "./app.component";
import { AccordionModule } from "primeng/accordion";
import { TableModule } from "primeng/table";
import { InputTextModule } from "primeng/inputtext";
import { ButtonModule } from "primeng/button";
import { DropdownModule } from "primeng/dropdown";
import * as firebase from "firebase/app";
import { A11yModule } from "@angular/cdk/a11y";
import { MapDialogComponent } from "./modal/map-dialog/map-dialog.component";
import { ErrorDialogComponent } from "./modal/error-dialog/error-dialog.component";
import { BsModalService, BsModalRef, ModalModule } from "ngx-bootstrap/modal";
import { MessageDialogService } from "./service/message-dialog.service";
import { DashboardComponent } from "./pages/dashboard/dashboard.component";
import { CityAddComponent } from "./pages/city/city-add/city-add.component";
import { CityEditComponent } from "./pages/city/city-edit/city-edit.component";
import { HeaderComponent } from "./pages/header/header.component";
import { MenuComponent } from "./pages/menu/menu.component";
import { LeafletService } from "./service/leaflet.service";
import { CityService } from "./service/city.service";
import { LoggerService } from "./service/logger.service";
import { SharedKaleidModule } from "projects/shared-kaleid/src/lib/shared-kaleid.module";
import { ConfirmDialogComponent } from './dumb/confirm-dialog/confirm-dialog.component';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    CityAddComponent,
    CityEditComponent,
    HeaderComponent,
    MenuComponent,
    MapDialogComponent,
    ErrorDialogComponent,
    ConfirmDialogComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    AngularFireModule.initializeApp(environment.config),
    AngularFireAuthModule,
    AngularFirestoreModule,
    AccordionModule,
    TableModule,
    InputTextModule,
    ButtonModule,
    DropdownModule,
    A11yModule,
    ModalModule.forRoot(),
    SharedKaleidModule,
    MatDialogModule,
    MatButtonModule,
  ],
  providers: [
    BsModalRef,
    BsModalService,
    MessageDialogService,
    LeafletService,
    CityService,
    LoggerService,
    FormBuilder,
  ],
  bootstrap: [AppComponent],
  entryComponents: [MapDialogComponent, ErrorDialogComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class AppModule {}
