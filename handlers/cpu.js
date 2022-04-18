var express = require("express");
let router = express.Router();

router.get("/", (req, res) => {
    res.json({ message: "Hello from ./handlers/cpu" });
});

router.get("/easy", (req, res) => {
    /*
     * Finds the first column it can play in, left to right
     */
    let board = req.body.board;
    if (!board) {
        res.json({ success: false, msg: "Did not specify board" });
        return;
    }

    // find first open column
    let x = -1;
    for (let col = 0; col < board[0].length; col++) {
        if (!isColumnFull(board, col)) {
            x = col;
            break;
        }
    }
    if (x === -1) {
        res.json({ success: false, msg: "Could not find an open spot." });
        return;
    }
    console.log(x);
    let y = 0;
    // increase y until you reach the bottom of the board or you hit another piece
    while (y < board.length - 1 && !board[y + 1][x]) {
        y++;
    }
    res.json({ success: true, move: { x: x, y: y } });
});

const isColumnFull = (board, colNum) => {
    for (let y = 0; y < board.length; y++) {
        if (board[y][colNum] === 0) {
            return false;
        }
    }
    return true;
};

module.exports = router;
