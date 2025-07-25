import { TestBed } from '@angular/core/testing';

import { GameService } from './game.service';

describe('GameService', () => {
  let service: GameService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GameService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should end the game as a win for X', () => {
    spyOn(service, 'currentBoard').and.returnValue(['X', 'X', 'X', 'O', '', 'O', '', '', '']);
    service.verifyCompletion();
    expect(service.gameIsWon()).toBeTrue();
    expect(service.currentPlayer() === 'X').toBeTruthy();
  });
  it('should end in a draw', () => {
    spyOn(service, 'numberOfPlays').and.returnValue(9);
    service.verifyCompletion();
    expect(service.gameIsDraw()).toBeTrue();
  });

  it('should make a move on an empty board', () => {

    const oldPlayer = service.currentPlayer();
    const oldNumberOfPlays = service.numberOfPlays();
    service.makeMove(0);
    const newBoard = service.currentBoard();
    const newPlayer = service.currentPlayer();
    const newNumberOfPlays = service.numberOfPlays();
    expect(newBoard).toContain(oldPlayer);
    expect(oldNumberOfPlays).toBeLessThan(newNumberOfPlays);
    expect(newPlayer !== oldPlayer).toBeTruthy();

  });



});
