const shuffleBoardMoves = 200;

function shuffleBoard(board) {
    let lastMove = {};
    for (let i = 0; i < shuffleBoardMoves; i++) {
        let possibleMoves = board.getPossibleMoves();
        let index = possibleMoves.indexOf(lastMove);
        if ( index !== -1 ) possibleMoves.splice(index, 1);
        let random = Math.floor(Math.random() * possibleMoves.length);
        let move = possibleMoves[random];
        lastMove = board.getZeroCell();
        board.makeMove(move.x, move.y);
    }
}

module.exports = {
    shuffleBoard
}
