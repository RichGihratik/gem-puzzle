const { Board } = require("./board-model.js");
const { shuffleBoard } = require("./board-shuffle.js");
import { Event } from "../../common/event.js";

class GameModel {
    __board = new Board();
    __isStarted = false;
    __movesCount = 0;
   
    winEvent = new Event();
    boardUpdatedEvent = new Event();
    gameStateChanged = new Event();

    __invokeBoardUpdate(madeMove) {
        this.boardUpdatedEvent.invoke(
            this.__board.getBoard(),
            this.__board.getSize(),
            this.__board.getPossibleMoves(),
            this.movesCount(),
            madeMove
        );
    }

    init() {
        this.setSize(4);
        this.__invokeBoardUpdate(false);
        this.gameStateChanged.invoke(false);
    }

    getSaveData() {
        return {
            board: this.__board.getBoard(),
            moves: this.__movesCount,
        }
    }

    movesCount() {
        return this.__movesCount;
    }

    isStarted() {
        return this.__isStarted;
    }

    loadGame(board, movesCount) {
        this.__board.loadBoard(board);
        this.__movesCount = movesCount;
        
        this.__isStarted = true;
        this.__invokeBoardUpdate(false);
        this.gameStateChanged.invoke(this.isStarted());
    }

    getSize() {
        return this.__board.getSize();
    }

    setSize(size) {
        if (this.isStarted()) throw new Error("Can't change size of board, when game is started!");
        this.__board.setSize(size);
        
        this.__invokeBoardUpdate(false);
    }

    restartGame() {
        this.__board.resetBoard();
        shuffleBoard(this.__board);
        
        this.__movesCount = 0;
        this.__isStarted = true;

        this.__invokeBoardUpdate(false);
        this.gameStateChanged.invoke(this.isStarted());
    }

    stop() {
        if (!this.isStarted()) throw new Error("Game isn't started!");
        this.__isStarted = false;
        this.__movesCount = 0;
        this.gameStateChanged.invoke(this.isStarted());
    }

    makeMove(x, y) {
        if (!this.isStarted()) throw new Error("Game isn't started!");
        this.__board.makeMove(x, y);
        this.__movesCount++;

        this.__invokeBoardUpdate(true);

        let checkWin = this.__board.win();

        if (checkWin) {
            this.winEvent.invoke(); 
            this.stop();
        }
    }

    updateBoard() {
        this.__invokeBoardUpdate(true);
    }

    getZeroCell() {
        return this.__board.getZeroCell();
    }
}

export {
    GameModel
}