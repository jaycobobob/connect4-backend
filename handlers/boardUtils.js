var express = require("express");
let router = express.Router();

router.get("/", (req, res) => {
    res.json({ message: "hello from /handlers/boardUtils" });
});

router.get("/isGameOver/:board", (req, res) => {
    let board = JSON.parse(req.params.board);

    const dirs = {
        N: [0, -1],
        E: [1, 0],
        S: [0, 1],
        W: [0, -1],
        NE: [1, -1],
        SE: [1, 1],
        SW: [-1, 1],
        NW: [-1, -1],
    };
    const height = board.length;
    const width = board[0].length;

    for (let y = 0; y < height; y++) {
        for (let x = 0; x < width; x++) {
            // only check cells with pieces for wins
            if (board[y][x].val) {
                for (let v2 of Object.values(dirs)) {
                    let start = { x: x, y: y };
                    let end = { x: x + v2[0] * 4, y: y + v2[1] * 4 };

                    // if the end point is within the bounds of the board
                    if (end.x >= 0 && end.x < width && end.y >= 0 && end.y < height) {
                        const target = board[start.y][start.x].val;
                        let match = true;

                        // check every piece bewteen start and end to see if they all match
                        while (start.x !== end.x || start.y !== end.y) {
                            if (board[start.y][start.x].val !== target) {
                                match = false;
                                break;
                            }
                            start = { x: start.x + v2[0], y: start.y + v2[1] };
                        }
                        if (match) {
                            res.json({ success: true, winner: target });
                            return;
                        }
                    }
                }
            }
        }
    }

    let boardFull = true;
    for (let col = 0; col < board[0].length; col++) {
        if (!isColumnFull(board, col)) {
            boardFull = false;
            break;
        }
    }
    if (boardFull) {
        res.json({ success: true, winner: "Tie" });
    } else {
        res.json({ success: false });
    }
});

router.get("/drop/:board/:x", (req, res) => {
    const board = JSON.parse(req.params.board);
    const x = parseInt(req.params.x);

    if (isColumnFull(board, x)) {
        res.json({ success: false, msg: "Column full" });
        return;
    }

    let y = 0;
    // increase y until you reach the bottom of the board or you hit another piece
    while (y < board.length - 1 && !board[y + 1][x].val) {
        y++;
    }
    res.json({ success: true, location: { x: x, y: y } });
});

router.get("/new/:width/:height", (req, res) => {
    let width = parseInt(req.params.width);
    let height = parseInt(req.params.height);

    let out = [];
    for (let i = 0; i < height; i++) {
        let temp = [];
        for (let j = 0; j < width; j++) {
            temp.push({ x: j, y: i, val: 0 });
        }
        out.push(temp);
    }
    res.json({ success: true, board: out });
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
