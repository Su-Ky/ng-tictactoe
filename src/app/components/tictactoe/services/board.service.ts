import {Injectable} from '@angular/core';

import {BehaviorSubject} from 'rxjs';

import {Board, boardToString, computerMakeMove, Empty, EMPTY, getNextMoveFromUser, isTerminalNode} from './board.manager';

const DEFAULT_DEPTH = 8;
const DEFAULT_FIRST_USER = true;
const DEFAULT_USER_PLAYER_X = true;
const EMPTY_VIEW = new BoardView(EMPTY, 0);

export interface BoardView {
  board: string[];
  score: number;
}

function BoardView(board, score) {
  this.board = board;
  this.score = score;
}

@Injectable()
export class BoardService {

  public readonly view$: BehaviorSubject<BoardView> = new BehaviorSubject(EMPTY_VIEW);

  private _userPlayerX: boolean;
  private _userFirst: boolean;
  private _level: number;
  private _board: Board;
  private _isPlayed = false;
  get isPlayed(): boolean {
    return this._isPlayed;
  }

  public play(
    userPlayerX: boolean = DEFAULT_USER_PLAYER_X,
    userFirst: boolean = DEFAULT_FIRST_USER,
    level: number = DEFAULT_DEPTH): void {

    if (!this._isPlayed) {
      let board: Board = new Board((this._userPlayerX && this._userFirst) || (!this._userPlayerX && !this._userFirst));
      this._userPlayerX = userPlayerX;
      this._userFirst = userFirst;
      this._level = level;
      this._isPlayed = true;
      if (!this._userFirst) {
        board = getNextMoveFromUser(board, 4);
      }

      this.next(board);
    }
  }

  public move(i: number): void {

    if (this._isPlayed && this._board.value[i] === Empty) {
      let board: Board | null = getNextMoveFromUser(this._board, i);

      if (board === null) {
        throw new Error(`Player can't move ${i} on board: ${board}`);
      }

      if (isTerminalNode(board)) {
        this._isPlayed = false;
      } else {
        /* tslint:disable */
        console.time('t');
        board = computerMakeMove(board, this._level);
        console.timeEnd('t');

        if (board === null) {
          throw new Error(`Player can't move ${i} on board: ${board}`);
        }

        if (isTerminalNode(board)) {
          this._isPlayed = false;
        }
      }

      this.next(board);
    }
  }

  public stop(): void {
    if (this._isPlayed) {

      delete this._userPlayerX;
      delete this._userFirst;
      delete this._level;

      this._isPlayed = false;
    }
  }

  private next(board: Board): void {
    this._board = board;
    this.view$.next(new BoardView(boardToString(this._board),
      this._userPlayerX
        ? this._board.score
        : -this._board.score
    ));
  }
}
