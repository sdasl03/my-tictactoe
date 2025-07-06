import { computed, Injectable, signal } from '@angular/core';
import { ScoreWins } from './models/score.interface';

@Injectable({
  providedIn: 'root'
})
export class GameService {
  readonly currentLevel = signal(1);
  readonly currentPlayer = signal('X');
  readonly currentBoard = signal<string[]>(Array(9).fill(""));
  readonly gameIsWon = signal(false);
  readonly gameIsDraw = signal(false);
  readonly numberOfPlays = signal(0);
  readonly player0 = signal<string | undefined>(undefined);
  readonly player1 = signal<string | undefined>(undefined);
  readonly score = signal<ScoreWins>({ winsPlayer0: 0, winsPlayer1: 0, draws: 0 });

  constructor() { }

  selectPlayerX(name: string) {
    this.player0.set(name);
  }
  selectPlayerO(name: string) {
    this.player1.set(name);
  }
  getPlayerName(symbol: string): string {
    let name = "";
    switch (symbol) {
      case "X":
        name = this.player0() || "";
        break;
      case "O":
        name = this.player1() || "";
        break;
    }
    console.log(name);
    return name;
  }

  selectLevel(level: number) {
    this.currentLevel.set(level);
  }

  changePlayer() {
    let nextPlayer = (this.currentPlayer() === 'X') ? 'O' : 'X';
    this.currentPlayer.set(nextPlayer);
  }

  makeMove(index: number) {
    let newBoard = this.currentBoard();
    if (newBoard[index] === '' && !this.gameIsWon() && this.numberOfPlays() < 9) {
      newBoard[index] = this.currentPlayer();
      this.currentBoard.set(newBoard);
      this.changePlayer();
      this.numberOfPlays.set(this.numberOfPlays() + 1);
    }
    this.verifyCompletion();
  }

  verifyCompletion() {
    let winningCombinations = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [0, 4, 8],
      [1, 4, 7],
      [2, 5, 8],
      [2, 4, 6]
    ];

    winningCombinations.some((combination) => {
      const [a, b, c] = combination;
      const combinationFound: boolean = (this.currentBoard()[a] && this.currentBoard()[a] === this.currentBoard()[b] && this.currentBoard()[a] === this.currentBoard()[c]) || false;

      if (combinationFound) {
        this.handleWin(this.currentBoard()[a]);
      }
    })
    if (this.numberOfPlays() > 8) {
      this.handleDraw();
    }
  }

  handleWin(winner: string) {
    this.gameIsWon.set(true);
    this.currentPlayer.set(winner);
    const player0Score: number = (winner === 'X') ? (this.score().winsPlayer0) + 1 : (this.score().winsPlayer0);
    const player1Score: number = (winner === 'O') ? (this.score().winsPlayer1) + 1 : (this.score().winsPlayer1);
    const newScore: ScoreWins = { winsPlayer0: player0Score, winsPlayer1: player1Score, draws: this.score().draws };
    this.score.set(newScore);
  }

  handleDraw() {
    this.gameIsDraw.set(true);
    this.score.set({
      winsPlayer0: this.score().winsPlayer0
      , winsPlayer1: this.score().winsPlayer1,
      draws: (this.score().draws + 1)
    });
  }

  resetBoard() {
    this.currentBoard.set(Array(9).fill(""));
    this.changePlayer();
    this.gameIsWon.set(false);
    this.gameIsDraw.set(false);
    this.currentPlayer.set('X');
    this.numberOfPlays.set(0);
  }

  boardReady = computed(() => {
    return this.player0() != undefined && this.player1() != undefined;
  });

}
