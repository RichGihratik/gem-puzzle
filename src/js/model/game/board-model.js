class Board {
    __boardInfo = [];
    __possibleMoves = [];
    __zeroCell = undefined;

    constructor() {
        this.setSize(4);
    }

    win() {
        let counter = 1;
        for (let y = 0; y < this.__boardInfo.length; y++) {
            for (let x = 0; x < this.__boardInfo[y].length; x++) {
                if (counter === this.__boardInfo.length * this.__boardInfo.length) {
                    if (this.__boardInfo[y][x] !== null) {
                        return false;
                    }
                } 
                else if (counter++ !== this.__boardInfo[y][x]) {
                    return false;
                }
            }
        }
        return true;
    }

    getBoard() {
        let result = [];
        for (let row of this.__boardInfo) {
            result.push([...row]);
        }
        return result;
    }

    getSize() {
        return this.__boardInfo.length;
    }

    getPossibleMoves() {
        return [...this.__possibleMoves];
    }

    getZeroCell() {
        return {...this.__zeroCell};
    }

    calculatePossibleMoves() {
        let offsets = [[1,0], [-1,0], [0,1], [0,-1]];
        this.__possibleMoves = [];

        for (let item of offsets) {
            if (
                this.__zeroCell.x + item[0] < this.__boardInfo[this.__zeroCell.y].length && this.__zeroCell.x + item[0] >= 0 &&
                this.__zeroCell.y + item[1] < this.__boardInfo.length && this.__zeroCell.y + item[1] >= 0
            )
                this.__possibleMoves.push({
                    x: this.__zeroCell.x + item[0],
                    y: this.__zeroCell.y + item[1],
                });
        }
    }

    resetBoard() {
        let size = this.getSize();
        this.setSize(size);
    }

    setSize(size) {
        let counter = 1;
        this.__boardInfo = [];
        for (let y = 0; y < size; y++) {
            this.__boardInfo.push([]);
            for (let x = 0; x < size; x++) {
                this.__boardInfo[y].push( counter === size * size ? null: counter++);
            }
        }
        this.__zeroCell = {
            x: size - 1, 
            y: size - 1
        };
        this.calculatePossibleMoves();
    }

    makeMove(x, y) {
        if (x >= this.__boardInfo[0].length || x < 0 || y >= this.__boardInfo[0].length || y < 0) 
            throw new Error(`Invalid coordinates (${x}, ${y}) !`);
        let finded = false;
        for (let item of this.__possibleMoves) {
            if (item.x === x && item.y === y) {
                let value = this.__boardInfo[item.y][item.x];
                this.__boardInfo[item.y][item.x] = null;
                this.__boardInfo[this.__zeroCell.y][this.__zeroCell.x] = value;
                this.__zeroCell.x = item.x;
                this.__zeroCell.y = item.y;
                this.calculatePossibleMoves();
                finded = true;
                break;
            }
        }
        if (!finded) throw new Error(`Invalid move (${x}, ${y}) !`);
    }

    validateBoard(board) {
        if (!Array.isArray(board) || board.length < 3) return false;

        let values = []

        for (let i = 1; i < board.length * board.length; i++) values.push(i);
        values.push(null);

        for (let y = 0; y < board.length; y++) {
            if (!Array.isArray(board) || board[y].length !== board.length) return false;
            for (let x = 0; x < board.length; x++) {
                let index = values.indexOf(board[y][x]);
                if (index === -1) return false;
                values.splice(index, 1);
            }
        }
        return true;
    }

    loadBoard(board) {
        if (!this.validateBoard(board)) throw new Error(`Invalid board: ${board}`);
        this.__boardInfo = board;

        for (let y = 0; y < this.__boardInfo.length; y++) {
            for (let x = 0; x < this.__boardInfo[y].length; x++) {
                if (this.__boardInfo[y][x] === null) {
                    this.__zeroCell.x = x;
                    this.__zeroCell.y = y;
                    break;
                }
            }
        }
        
        this.calculatePossibleMoves();
    }
}

module.exports = {
    Board,
}