import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {SheetsValueResponse, SpreadsheetMetaResponse} from "../models/sheets.model";
import {getSpreadsheetMetaRequestUrl, getSpreadsheetSheetRowsRequestUrl} from "../configs/api.config";

@Injectable()
export class ApiService {

  constructor(
    private http: HttpClient
  ) {
  }

  public getSpreadsheetMeta(): Observable<SpreadsheetMetaResponse> {
    return this.http.get<SpreadsheetMetaResponse>(getSpreadsheetMetaRequestUrl());
  }

  public getSheetRows(cellsRange: string): Observable<SheetsValueResponse> {
    return this.http.get<SheetsValueResponse>(getSpreadsheetSheetRowsRequestUrl(cellsRange));
  }

}
