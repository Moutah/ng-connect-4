import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NgxsModule, Store } from '@ngxs/store';
import { GameService } from 'src/app/game/game.service';
import { MaterialModule } from 'src/app/material.module';
import { Player } from 'src/app/shared/player';
import { GRID_ROWS } from '../config';
import { GridState } from '../state';
import * as Grid from '../state/actions';
import { CellComponent } from './cell.component';

const gameServiceStub = {
  play: (col: number) => {},
};

describe('CellComponent', () => {
  let component: CellComponent;
  let fixture: ComponentFixture<CellComponent>;
  let store: Store;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CellComponent],
      imports: [MaterialModule, NgxsModule.forRoot([GridState])],
      providers: [{ provide: GameService, useValue: gameServiceStub }],
    }).compileComponents();

    store = TestBed.inject(Store);
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CellComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('can display as highlighted', () => {
    component.col = 1;
    component.row = 1;

    // dispatch highlight of other cell
    store.dispatch(new Grid.HighlightCells([{ col: 1, row: 0 }]));
    fixture.detectChanges();
    expect(
      fixture.nativeElement
        .querySelector('.cell')
        .classList.contains('cell--highlighted')
    ).toBe(false);

    // dispatch highlight of this cell
    store.dispatch(new Grid.HighlightCells([{ col: 1, row: 1 }]));
    fixture.detectChanges();
    expect(
      fixture.nativeElement
        .querySelector('.cell')
        .classList.contains('cell--highlighted')
    ).toBe(true);
  });

  it('calculates fall height depending on given row prop', () => {
    // reboot component
    component.row = 1;
    component.ngOnInit();

    expect(component.fallHeight).toBe(GRID_ROWS);
  });

  it('can display coin for a player', async () => {
    const playerA = new Player('A', 'Player A');
    const playerB = new Player('B', 'Player B');
    const getCoinEl = () => fixture.nativeElement.querySelector('.cell__coin');

    // no coin is displayed at these grid coords
    expect(getCoinEl().style.opacity).toBe('0');

    // dispatch some coin plays
    store.dispatch(new Grid.Reset());
    store.dispatch(new Grid.PlayCoin(playerA, 2));
    store.dispatch(new Grid.PlayCoin(playerB, 2));

    // reboot component
    component.row = 0;
    component.col = 0;
    component.ngOnInit();
    fixture.detectChanges();

    // no coin displayed at these grid coords
    expect(getCoinEl().style.opacity).toBe('0');

    // reboot component
    component.row = 1;
    component.col = 2;
    component.ngOnInit();
    fixture.detectChanges();

    // coin of player B is displayed at these grid coords
    console.log(getCoinEl());
    expect(getCoinEl().style.opacity).toBe('1');
    expect(getCoinEl().classList.contains('cell__coin--B')).toBe(true);
  });

  it('triggers play when clicked', () => {
    const gamePlaySpy = spyOn(gameServiceStub, 'play');

    fixture.nativeElement.querySelector('.cell').click();

    expect(gamePlaySpy).toHaveBeenCalled();
  });
});
