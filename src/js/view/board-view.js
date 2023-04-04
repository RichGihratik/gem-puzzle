import { ViewBase } from "./view-base.js";

import { DOMGrid } from "./dom-generation/dom-grid.js";


class BoardView extends ViewBase {
    _ids = ['gameboard']
    _grid = new DOMGrid();

    _subscribeToModelEvents(model) {
        this._grid.init(this.gameboard, this._domGenerator);
        model.onBoardUpdate.addEventListener(
            (board, size, possibleMoves, movesCount, madeMove) => this.__createBoard(board, size, possibleMoves, madeMove)
        )

        window.addEventListener('resize', () => {
            this.__onResize();
        })
    }

    __createBoard(board, size, possibleMoves, madeMove) {
        this._grid.createGrid(board, size, possibleMoves, madeMove);
    }

    __onResize() {
        this._grid.resizeTiles();
    }
}

export {
    BoardView
}