/*
 * Migrate http://www.codeproject.com/Articles/43622/Solve-Tic-Tac-Toe-with-the-MiniMax-algorithm
 */

import {ChangeDetectionStrategy, Component, OnDestroy, OnInit} from '@angular/core';
import {BoardService, BoardView} from './services/board.service';
import {EMPTY} from './services/board.manager';

import {Subscription} from 'rxjs';

@Component({
  selector: 'app-tictactoe',
  styleUrls: ['tictactoe.component.scss'],
  templateUrl: 'tictactoe.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TicTacToeComponent implements OnDestroy, OnInit {

  public difficulty = 4;
  public firstUser = true;
  public playerX = false;
  public score = 0;
  public board: string[] = EMPTY;
  private sub: Subscription;

  constructor(private game: BoardService) {
  }

  public ngOnInit() {
    this.sub = this.game.view$.subscribe((view: BoardView) => {
      this.score = view.score;
      this.board = view.board;
    });
    this.play();
  }

  public ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

  public trackByFn(_, item) {
    return item;
  }

  public play() {
    if (!this.game.isPlayed) {
      this.game.play(this.playerX, this.firstUser, this.difficulty);
    }
  }

  public move(i: number) {
    if (this.game.isPlayed) {
      this.game.move(i);
    }
  }

  public reset() {
    this.stop();
    this.play();
  }

  public stop() {
    if (this.game.isPlayed) {
      this.game.stop();
    }
  }
}
