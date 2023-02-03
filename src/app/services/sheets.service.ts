import {Injectable} from '@angular/core';
import {ApiService} from "./api.service";
import {map, Observable} from "rxjs";
import {
  SheetGridProperty,
  SheetsValueResponse,
  SpreadsheetMetaResponse,
  SpreadsheetSheet
} from "../models/sheets.model";
import {GOOGLE_SHEETS_API} from "../helpers/api.helper";

@Injectable()
export class SheetsService {

  constructor(
    private apiService: ApiService
  ) {
  }

  public getSheetMeta(): Observable<SheetGridProperty> {
    return this.apiService.getSpreadsheetMeta()
      .pipe(
        map((res: SpreadsheetMetaResponse) => {
          const matchSheet: SpreadsheetSheet | undefined = res.sheets.find((sheet: SpreadsheetSheet) => {
            return sheet.properties.sheetId == GOOGLE_SHEETS_API.SHEET_ID;
          });
          return matchSheet ? matchSheet.properties.gridProperties : {rowCount: 0, columnCount: 0};
        })
      )
  }

  public getHeadings(): Observable<string[]> {
    const cellsRange = `${GOOGLE_SHEETS_API.FIRST_CELL_PREFIX}1:${GOOGLE_SHEETS_API.LAST_CELL_PREFIX}1`;
    return this.apiService.getSheetRows(cellsRange)
      .pipe(
        map((res: SheetsValueResponse) => {
          return res && res.values.length ? res.values[0] : [];
        })
      );
  }

  public getRows(skip: number, take: number): Observable<string[][]> {
    const startIndex = 2 + skip;
    const endIndex = 1 + skip + take;
    const cellsRange = `${GOOGLE_SHEETS_API.FIRST_CELL_PREFIX}${startIndex}:${GOOGLE_SHEETS_API.LAST_CELL_PREFIX}${endIndex}`;
    return this.apiService.getSheetRows(cellsRange)
      .pipe(
        map((res: SheetsValueResponse) => {
          return res?.values || [];
        })
      );
  }

}
