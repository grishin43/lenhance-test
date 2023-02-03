import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {AppComponent} from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {ApiService} from "./services/api.service";
import {SheetsViewComponent} from './views/components/table-view/sheets-view.component';
import {HttpClientModule} from "@angular/common/http";
import {SheetsService} from "./services/sheets.service";
import {MatTableModule} from "@angular/material/table";
import {MatPaginatorModule} from "@angular/material/paginator";
import {MatProgressSpinnerModule} from "@angular/material/progress-spinner";
import {MatButtonModule} from "@angular/material/button";

@NgModule({
  declarations: [
    AppComponent,
    SheetsViewComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MatTableModule,
    MatPaginatorModule,
    MatProgressSpinnerModule,
    MatButtonModule
  ],
  providers: [
    ApiService,
    SheetsService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
