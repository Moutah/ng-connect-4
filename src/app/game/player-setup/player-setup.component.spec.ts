import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideMockStore, MockStore } from '@ngrx/store/testing';
import { Player } from '../../shared/player';

import { GameService } from '../game.service';
import { GameState } from '../state';
import { NgxsModule } from '@ngxs/store';
import { FormsModule } from '@angular/forms';

import { PlayerSetupComponent } from './player-setup.component';

const gameServiceStub = {
  setup: (p1: Player, p2: Player) => {},
  start: () => {},
};

describe('PlayerSetupComponent', () => {
  let component: PlayerSetupComponent;
  let fixture: ComponentFixture<PlayerSetupComponent>;
  let store: MockStore;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PlayerSetupComponent],
      imports: [FormsModule, NgxsModule.forRoot([GameState])],
      providers: [
        provideMockStore(),
        { provide: GameService, useValue: gameServiceStub },
      ],
    }).compileComponents();

    store = TestBed.inject(MockStore);
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PlayerSetupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('can setup the game with players of custom names and start the game', () => {});

  it('displays starting player announcement when first player selected', () => {});
});
