import {Injectable} from '@angular/core';
import {ApiService} from "./api.service";
import {forkJoin, map, mergeMap, Observable, of} from "rxjs";
import {
  SheetDataSource,
  SheetGridProperty,
  SheetsValueResponse,
  SpreadsheetMetaResponse,
  SpreadsheetSheet
} from "../models/sheets.model";
import {GOOGLE_SHEETS_API} from "../configs/api.config";

@Injectable()
export class SheetsService {

  constructor(
    private apiService: ApiService
  ) {
  }

  public getSheetDataSource(skip: number, take: number): Observable<SheetDataSource> {
    return this.getSheetGridProperty()
      .pipe(
        mergeMap((sheetGridProperty: SheetGridProperty) => {
          return forkJoin([
            this.getHeadings(),
            this.getRows(skip, take),
            of(sheetGridProperty)
          ])
        }),
        map(([headings, rows, gridProperty]: [string[], string[][], SheetGridProperty]) => ({
          headings, rows, totalCount: gridProperty.rowCount
        }))
      )
  }

  public getSheetGridProperty(): Observable<SheetGridProperty> {
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
