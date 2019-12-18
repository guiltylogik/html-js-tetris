const cvs = document.getElementById("tetris");
const ctx = cvs.getContext("2d");

const ROW = 20;
const COL = 10;
const SQ = 20;
const VACANT = "WHITE";

const PIECES = [
    [Z, "fuchsia"],
    [S, "yellow"],
    [O, "teal"],
    [L, "navy"],
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

    this.tetriminoIndex = 0;
    this.activeTetrimino = this.tetrimino[this.tetriminoIndex];

    // for controlling the pieces
    this.x = 4;
    this.y = 0;
}

Piece.prototype.fill = function(color){
    for(r=0; r<this.activeTetrimino.length; r++){
        for(c=0; c<this.activeTetrimino.length; c++){
            if(this.activeTetrimino[r][c]){
                drawSq(this.x + c, this.y + r, color)
            }
        }
    }
}

Piece.prototype.draw = function(){
    this.fill(this.color);
}

Piece.prototype.unDraw = function(){
    this.fill(VACANT)
}

Piece.prototype.moveDown = function(){
    this.unDraw();
    this.y++;
    this.draw();
}

Piece.prototype.moveRight = function(){
    this.unDraw();
    this.x++;
    this.draw();
}

Piece.prototype.moveLeft = function(){
    this.unDraw();
    this.x--;
    this.draw();
}

Piece.prototype.rotatePiece = function(){
    this.unDraw();
    this.tetriminoIndex = (this.tetriminoIndex + 1) % this.tetrimino.length;
    this.activeTetrimino = this.tetrimino[this.tetriminoIndex];
    this.draw();
}

let dropStart = Date.now();
function drop(){
    let now = Date.now();
    let rateChange = now - dropStart;

    if(rateChange > 1000){
        p.moveDown();
        dropStart = Date.now()
    }
    requestAnimationFrame(drop);
}

let p = new Piece(PIECES[0][0], PIECES[0][1])

document.addEventListener("keydown", CONTROL);

function CONTROL(event){
    if(event.keyCode == 37){
        p.moveLeft();
        dropStart = Date.now();
    }else if(event.keyCode == 38){
        p.rotatePiece();
        dropStart = Date.now();
    }else if(event.keyCode == 39){
        p.moveRight();
        dropStart = Date.now();
    }else if(event.keyCode == 40){
        p.moveDown();
        dropStart = Date.now();
    }
}

drawBoard();
drop();
