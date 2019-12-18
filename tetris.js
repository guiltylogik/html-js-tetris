const cvs = document.getElementById("tetris");
const ctx = cvs.getContext("2d");

const ROW = 20;
const COL = 10;
const SQ = 20;
const VACANT = "WHITE";

const PIECES = [
    [Z, "maroon"],
    [S, "yellow"],
    [O, "green"],
    [L, "grey"],
    [I, "cyan"],
    [J, "purple"],
    [T, "orange"]
]

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

function Piece(tetrimino, color){
    this.tetrimino = tetrimino
    this.color = color

    this.tetriminoInedx = 0;
    this.activeTetrimino = this.tetrimino[this.tetriminoInedx];

    // for controlling the pieces
    this.x = 0;
    this.y = 0;
}

Piece.prototype.draw = function(){
    for(r=0; r<this.activeTetrimino.length; r++){
        for(c=0; c<this.activeTetrimino.length; c++){
            if(this.activeTetrimino[r][c]){
                drawSq(this.x + c, this.y + r, this.color)
            }
        }
    }
}

let p = new Piece(PIECES[0][0], PIECES[0][1])

drawBoard();
p.draw();