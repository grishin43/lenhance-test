import {Component, OnDestroy, OnInit} from '@angular/core';
import {forkJoin, mergeMap, of, Subscription} from "rxjs";
import {SheetsService} from "../../../services/sheets.service";
import {DEFAULT_ROWS_PER_PAGE} from "../../../helpers/table.helper";
import {SheetGridProperty} from "../../../models/sheets.model";

@Component({
  selector: 'app-sheets-view',
  templateUrl: './sheets-view.component.html',
  styleUrls: ['./sheets-view.component.scss']
})
export class SheetsViewComponent implements OnInit, OnDestroy {
  public skip: number = 0;
  public take: number = DEFAULT_ROWS_PER_PAGE;

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

  private initialize(): void {
    this.subs.add(
      this.sheetsService.getSheetMeta()
        .pipe(
          mergeMap((res: SheetGridProperty) => {
            return forkJoin([
              this.sheetsService.getHeadings(),
              this.sheetsService.getRows(this.skip, this.take),
              of(res)
            ])
          })
        ).subscribe({
          next: (res: any) => {
            console.log(res);
          }
        })
    );
  }

}
