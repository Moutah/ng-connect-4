import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CoinComponent } from './coin.component';

describe('CoinComponent', () => {
  let component: CoinComponent;
  let fixture: ComponentFixture<CoinComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CoinComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CoinComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('use color prop to set coin CSS class', () => {
    // initial state : no color
    expect(
      fixture.nativeElement
        .querySelector('.coin')
        .classList.contains('coin--le-color')
    ).toBe(false);

    // update component prop
    component.color = 'le-color';
    fixture.detectChanges();

    // has color
    expect(
      fixture.nativeElement
        .querySelector('.coin')
        .classList.contains('coin--le-color')
    ).toBe(true);
  });
});
