var express = require("express");
let router = express.Router();

router.get("/", (req, res) => {
    res.json({ message: "Hello from ./handlers/cpu" });
});

router.get("/easy/:board", (req, res) => {
    /*
     * Finds the first column it can play in, left to right
     */
    let board = JSON.parse(req.params.board);

    // find first open column
    let x;
    for (let col = 0; col < board[0].length; col++) {
        if (!isColumnFull(board, col)) {
            x = col;
            break;
        }
    }

    let y = 0;
    // increase y until you reach the bottom of the board or you hit another piece
    while (y < board.length - 1 && !board[y + 1][x].val) {
        y++;
    }
    res.json({ success: true, location: { x: x, y: y } });
});

router.get("/medium/:board", (req, res) => {
    const board = JSON.parse(req.params.board);

    let randX = Math.floor(Math.random() * 7);
    while (isColumnFull(board, randX)) {
        randX = Math.floor(Math.random() * 7);
    }

    let y = 0;
    // increase y until you reach the bottom of the board or you hit another piece
    while (y < board.length - 1 && !board[y + 1][randX].val) {
        y++;
    }
    res.json({ success: true, location: { x: randX, y: y } });
});

const isColumnFull = (board, colNum) => {
    for (let y = 0; y < board.length; y++) {
        if (board[y][colNum].val === 0) {
            return false;
        }
    }
    return true;
};

module.exports = router;
