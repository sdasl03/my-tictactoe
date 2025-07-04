import { computed, Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GameService {
  readonly currentLevel = signal(1);
  readonly currentPlayer = signal('X');
  readonly currentBoard = signal<string[]>(Array(9).fill(""));
  readonly gameHasEnded = signal(false);
  readonly numberOfPlays = signal(0);
  readonly player0 = signal<string | undefined>(undefined);
  readonly player1 = signal<string | undefined>(undefined);

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
        name = this.player0() ||"";
        break;
      case "O":
        name = this.player1() ||"";
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
    if (newBoard[index] === '' && !this.gameHasEnded() && this.numberOfPlays() < 9) {
      newBoard[index] = this.currentPlayer();
      newBoard.splice(index, 1, this.currentPlayer());
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
        this.gameHasEnded.set(true);
        this.currentPlayer.set(this.currentBoard()[a]);
      }
    })
    if (this.numberOfPlays() > 8) {
      this.gameHasEnded.set(true);
    }
  }

  resetBoard() {
    this.currentBoard.set(Array(9).fill(""));
    this.changePlayer();
    this.gameHasEnded.set(false);
    this.currentPlayer.set('X');
    this.numberOfPlays.set(0);
  }

  boardReady = computed(()=>{
    return this.player0()!=undefined &&this.player1()!= undefined;
  })
}
