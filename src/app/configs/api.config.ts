export const GOOGLE_SHEETS_API = {
  ROUTES: {
    ORIGIN: 'https://sheets.googleapis.com/v4/spreadsheets',
    CHILDREN: {
      RANGE_VALUES: 'values'
    }
  },
  PARAMS: {
    KEY: 'key'
  },
  API_KEY: 'AIzaSyAEpuT5FBjGoH_YezrWvSxUrRdqQE80UtU',
  SPREADSHEET_ID: '1e1mzpKFtQuJhoqXbE7j3u5QtkmCpWYf4dMujJTbe8BU',
  SHEET_ID: '1275695233',
  FIRST_CELL_PREFIX: 'A',
  LAST_CELL_PREFIX: 'Z'
}

export function getSpreadsheetMetaRequestUrl() {
  return `${GOOGLE_SHEETS_API.ROUTES.ORIGIN}/${GOOGLE_SHEETS_API.SPREADSHEET_ID}?${GOOGLE_SHEETS_API.PARAMS.KEY}=${GOOGLE_SHEETS_API.API_KEY}`;
}

export function getSpreadsheetSheetRowsRequestUrl(cellsRange: string) {
  return `${GOOGLE_SHEETS_API.ROUTES.ORIGIN}` +
    `/${GOOGLE_SHEETS_API.SPREADSHEET_ID}` +
    `/${GOOGLE_SHEETS_API.ROUTES.CHILDREN.RANGE_VALUES}` +
    `/${cellsRange}` +
    `?${GOOGLE_SHEETS_API.PARAMS.KEY}=${GOOGLE_SHEETS_API.API_KEY}`;
}
