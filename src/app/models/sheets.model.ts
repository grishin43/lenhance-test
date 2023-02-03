export interface SpreadsheetMetaResponse {
  spreadsheetId: string;
  properties: any;
  sheets: SpreadsheetSheet[];
  spreadsheetUrl: string;
}

export interface SpreadsheetSheet {
  properties: SheetProperty;
}

export interface SheetProperty {
  sheetId: string;
  title: string;
  index: number;
  sheetType: string;
  gridProperties: SheetGridProperty;
}

export interface SheetGridProperty {
  rowCount: number;
  columnCount: number;
}

export interface SheetsValueResponse {
  majorDimension: string;
  range: string;
  values: string[][];
}
