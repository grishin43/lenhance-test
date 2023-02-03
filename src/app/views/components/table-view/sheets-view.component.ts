import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from "rxjs";
import {SheetsService} from "../../../services/sheets.service";
import {DEFAULT_ROWS_PER_PAGE, TABLE_CONFIG} from "../../../configs/table.config";
import {SheetDataSource} from "../../../models/sheets.model";
import {MatTableDataSource} from "@angular/material/table";
import {PageEvent} from "@angular/material/paginator";

@Component({
  selector: 'app-sheets-view',
  templateUrl: './sheets-view.component.html',
  styleUrls: ['./sheets-view.component.scss']
})
export class SheetsViewComponent implements OnInit, OnDestroy {
  public skip: number = 0;
  public take: number = DEFAULT_ROWS_PER_PAGE;
  public totalCount: number = 0;
  public matTableDataSource!: MatTableDataSource<string[]>;
  public displayedColumns!: string[];
  public isLoading!: boolean;
  public paginationSizeOption = TABLE_CONFIG.ROWS_PER_PAGE;

  public readonly addExtraColumn = true;

  private subs = new Subscription();

  constructor(
    private sheetsService: SheetsService
  ) {
  }

  ngOnInit() {
    this.initialize();
  }

  ngOnDestroy() {
    this.subs.unsubscribe();
  }

  public get showTableOverlay(): boolean {
    return !this.matTableDataSource?.data?.length || this.isLoading;
  }

  private initialize(): void {
    this.isLoading = true;
    this.subs.add(
      this.sheetsService.getSheetDataSource(this.skip, this.take, this.addExtraColumn)
        .subscribe({
          next: (dataSource: SheetDataSource) => {
            this.displayedColumns = dataSource.headings;
            this.totalCount = dataSource.totalCount;
            this.matTableDataSource = new MatTableDataSource(dataSource.rows);
            this.isLoading = false;
          },
          error: this.requestFailureCb
        })
    );
  }

  private requestFailureCb = () => {
    this.totalCount = 0;
    this.matTableDataSource = new MatTableDataSource(undefined);
    this.isLoading = false;
  }

  public refreshData(): void {
    this.isLoading = true;
    this.subs.add(
      this.sheetsService.getRows(this.skip, this.take, this.addExtraColumn)
        .subscribe({
          next: (rows: string[][]) => {
            this.matTableDataSource = new MatTableDataSource(rows);
            this.isLoading = false;
          },
          error: this.requestFailureCb
        })
    );
  }

  public onPageChanged(e: PageEvent): void {
    this.skip = e.pageSize * e.pageIndex;
    this.take = e.pageSize;
    this.refreshData();
  }

}
