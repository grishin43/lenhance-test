import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {AppComponent} from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {ApiService} from "./services/api.service";
import {SheetsViewComponent} from './views/components/table-view/sheets-view.component';
import {HttpClientModule} from "@angular/common/http";
import {SheetsService} from "./services/sheets.service";

@NgModule({
  declarations: [
    AppComponent,
    SheetsViewComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule
  ],
  providers: [
    ApiService,
    SheetsService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
