const cvs = document.getElementById("tetris");
const ctx = cvs.getContext("2d");

const ROW = 20;
const COL = 10;
const SQ = 20;
const VACANT = "WHITE";

// draw a square
function drawSq(x, y, color, strokeColor = "BLACK"){
    ctx.fillStyle = color;
    ctx.fillRect(x*SQ, y*SQ, SQ, SQ)

    ctx.strokeStyle = strokeColor
    ctx.strokeRect(x*SQ, y*SQ, SQ, SQ)
}

// drawSq(1,1,"blue", "green")

// Create board
let board = [];
for(r=0; r < ROW; r++){
    board[r] = [];
    for(c=0; c<COL; c++){
        board[r][c] = VACANT;
    }
}

function drawBoard(){
    for(r=0; r < ROW; r++){
        for(c=0; c<COL; c++){
            drawSq(c, r, board[r][c]);
        }
    }
}

drawBoard()