import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GridComponent } from './grid.component';

describe('GridComponent', () => {
  let component: GridComponent;
  let fixture: ComponentFixture<GridComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [GridComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display 6 rows', () => {
    const rows = fixture.nativeElement.querySelectorAll('.grid__row');
    expect(rows.length).toBe(6);
  });

  it('should display 7 cells in each row', () => {
    const rows = fixture.nativeElement.querySelectorAll('.grid__row');
    const cellsPerRow = Array.from(rows).map(
      (row: HTMLElement) => row.querySelectorAll('app-cell').length
    );

    expect(cellsPerRow.every((cellCount) => cellCount === 7)).toBe(true);
  });
});
