import { TestBed } from '@angular/core/testing';
import { NgxsModule, Store, Actions, ofActionDispatched } from '@ngxs/store';
import { Observable } from 'rxjs';
import { GridState } from 'src/app/grid/state';
import { Player } from '../player';
import { GameState } from '../state';

import { AiService } from './ai.service';
import { GameService } from './game.service';

describe('AiService', () => {
  let ai: AiService;
  let game: GameService;
  let store: Store;
  let players: Player[];
  let actions$: Observable<any>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [NgxsModule.forRoot([GameState, GridState])],
    });

    ai = TestBed.inject(AiService);
    store = TestBed.inject(Store);
    game = TestBed.inject(GameService);
    actions$ = TestBed.inject(Actions);
    players = [new Player('p1', 'Batman'), new Player('p2', 'Superman')];
    game.setup(players[0], players[1]);
  });

  it('should be created', () => {
    expect(ai).toBeTruthy();
  });
});
