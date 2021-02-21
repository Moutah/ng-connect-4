import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CellComponent } from './cell/cell.component';
import { GRID_COLS, GRID_ROWS } from './config';

import { GridComponent } from './grid.component';

@Component({ selector: 'app-cell', template: '' })
class CellStubComponent {}

describe('GridComponent', () => {
  let component: GridComponent;
  let fixture: ComponentFixture<GridComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [GridComponent, CellStubComponent],
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

  it('should display rows according to config', () => {
    const rows = fixture.nativeElement.querySelectorAll('.grid__row');
    expect(rows.length).toBe(GRID_ROWS);
  });

  it('should display cells in each row according to config', () => {
    const rows = fixture.nativeElement.querySelectorAll('.grid__row');
    const cellsPerRow = Array.from(rows).map(
      (row: HTMLElement) => row.querySelectorAll('app-cell').length
    );

    expect(cellsPerRow.every((cellCount) => cellCount === GRID_COLS)).toBe(
      true
    );
  });

  it('sets column as hovered on cell hover', () => {
    expect(component.hoveredCol).toBe(undefined);

    // hover the cell
    fixture.nativeElement
      .querySelector('app-cell')
      .dispatchEvent(new Event('mouseover'));
    expect(component.hoveredCol).not.toBe(undefined);

    // leave the cell
    fixture.nativeElement
      .querySelector('app-cell')
      .dispatchEvent(new Event('mouseout'));
    expect(component.hoveredCol).toBe(undefined);
  });
});
