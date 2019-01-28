import {cloneArray} from '../../../utils/utils';

export type GridEntry = number;
export const Empty: GridEntry = 0;
export const PlayerO: GridEntry = 1;
export const PlayerX: GridEntry = 2;

const MAX_CHILDREN = 9;
const LINES = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6]
];

export const EMPTY_STR = ' ';
export const X_STR = 'X';
export const O_STR = 'O';

export const EMPTY_BOARD: GridEntry[] = Array(MAX_CHILDREN).fill(Empty);
export const EMPTY = Array(9).fill(EMPTY_STR);

export interface Board {
  gameOver: boolean;
  score: number;
  playerX: boolean;
  value: GridEntry[];
}

export function Board(playerX, value = EMPTY_BOARD) {
  this.playerX = playerX;
  this.value = value;
  this.gameOver = false;
  computeScore(this);
}

function computeScore(board: Board): void {
  board.score = 0;

  for (let i = 0, lenI = LINES.length; i < lenI; i++) {
    const l: GridEntry[] = [board.value[LINES[i][0]], board.value[LINES[i][1]], board.value[LINES[i][2]]];
    let countX = 0;
    let countO = 0;
    let advantage = 1;

    for (let j = 0, lenJ = l.length; j < lenJ; j++) {
      if (l[j] === PlayerX) {
        countX++;
      } else if (l[j] === PlayerO) {
        countO++;
      }
    }

    if (countO === 3 || countX === 3) {
      board.gameOver = true;
    }

    // The player who has turn should have more advantage.
    if (countO === 0) {
      if (board.playerX) {
        advantage = 3;
      }
      board.score += (Math.pow(10, countX) - 1) * advantage;
    } else {
      if (countX === 0) {
        if (!board.playerX) {
          advantage = 3;
        }
        board.score -= (Math.pow(10, countO) - 1) * advantage;
      }
    }
  }
}

export function getNextMoveFromUser(board: Board, i: number): Board {
  const value: GridEntry[] = cloneArray(board.value);
  value[i] = board.playerX ? PlayerX : PlayerO;

  return new Board(!board.playerX, value);
}

export function boardToString(board: Board | null): string[] {
  let str: string[];

  if (board === null) {
    str = EMPTY;
  } else {
    const len: number = board.value.length;
    str = Array(len);

    for (let i = 0; i < len; i++) {
      if (board.value[i] === Empty) {
        str[i] = EMPTY_STR;
      } else if (board.value[i] === PlayerO) {
        str[i] = O_STR;
      } else {
        str[i] = X_STR;
      }
    }
  }

  return str;
}

export function isTerminalNode(board: Board | null): boolean {

  if (board === null || board.gameOver) {
    return true;
  }

  for (let i = 0, len = board.value.length; i < len; i++) {
    if (board.value[i] === Empty) {
      return false;
    }
  }
  return true;
}

function getChildren(board: Board): Iterator<Board> {
  let i = 0;

  return {
    next: () => {
      while (i < MAX_CHILDREN) {
        if (board.value[i] === Empty) {
          const value: GridEntry[] = cloneArray(board.value);
          value[i] = board.playerX ? PlayerX : PlayerO;

          i += 1;
          return {value: new Board(!board.playerX, value), done: false};
        }

        i += 1;
      }

      return {done: true};
    }
  } as Iterator<Board>;
}

export function computerMakeMove(board: Board, depth: number): Board | null {
  let ret: Board | null = null;
  let alpha: number = Number.NEGATIVE_INFINITY;
  const beta: number = Number.POSITIVE_INFINITY;

  const children: Iterator<Board> = getChildren(board);

  for (let cur = children.next(); !cur.done; cur = children.next()) {
    const score: number = -miniMaxR(cur.value, depth - 1, -beta, -alpha);

    if (alpha < score) {
      alpha = score;
      ret = cur.value;

      if (alpha >= beta) {
        break;
      }
    }
  }

  return ret;
}

function miniMaxR(
  board: Board,
  depth: number,
  alpha: number,
  beta: number): number {

  if (depth === 0 || isTerminalNode(board)) {
    return board.playerX ? board.score : -board.score;
  }

  const children: Iterator<Board> = getChildren(board);

  for (let cur = children.next(); !cur.done; cur = children.next()) {
    const score: number = -miniMaxR(cur.value, depth - 1, -beta, -alpha);

    if (alpha < score) {
      alpha = score;
      if (alpha >= beta) {
        break;
      }
    }
  }

  return alpha;
}
