import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SheetsViewComponent } from './sheets-view.component';

describe('TableViewComponent', () => {
  let component: SheetsViewComponent;
  let fixture: ComponentFixture<SheetsViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SheetsViewComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SheetsViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
