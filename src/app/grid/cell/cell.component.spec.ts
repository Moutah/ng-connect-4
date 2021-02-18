import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideMockStore, MockStore } from '@ngrx/store/testing';
import { NgxsModule } from '@ngxs/store';
import { GameService } from 'src/app/game/game.service';
import { GridState } from '../state';
import { CellComponent } from './cell.component';

const gameServiceStub = {
  play: (col: number) => {},
};

describe('CellComponent', () => {
  let component: CellComponent;
  let fixture: ComponentFixture<CellComponent>;
  let store: MockStore;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CellComponent],
      imports: [NgxsModule.forRoot([GridState])],
      providers: [
        provideMockStore(),
        { provide: GameService, useValue: gameServiceStub },
      ],
    }).compileComponents();

    store = TestBed.inject(MockStore);
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CellComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('can display coin for a player', () => {
    // prepare state
    store.setState({
      grid: {
        cols: [[], [], ['a', 'b', 'c']],
      },
    });

    // set component props
    component.row = 1;
    component.col = 2;

    // a coin is displayed
    const children = fixture.nativeElement.children;
    expect(children.length).toBeGreaterThan(0);

    // the coin is for appropriate player
    expect(children[0].classList.contains('cell__coin-b'));
  });

  it('triggers play when clicked', () => {
    const gamePlaySpy = spyOn(gameServiceStub, 'play');

    console.log({ NE: fixture.nativeElement });
    fixture.nativeElement.querySelector('.cell').click();

    expect(gamePlaySpy).toHaveBeenCalled();
  });
});
