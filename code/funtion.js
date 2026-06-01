
// ---------------- PIECES ----------------
const pieces = {
  bR:'♜',bN:'♞',bB:'♝',bQ:'♛',bK:'♚',bP:'♟',
  wR:'♖',wN:'♘',wB:'♗',wQ:'♕',wK:'♔',wP:'♙'
};

// ---------------- BOARD ----------------
const startBoard = [
 ['bR','bN','bB','bQ','bK','bB','bN','bR'],
 ['bP','bP','bP','bP','bP','bP','bP','bP'],
 ['','','','','','','',''],
 ['','','','','','','',''],
 ['','','','','','','',''],
 ['','','','','','','',''],
 ['wP','wP','wP','wP','wP','wP','wP','wP'],
 ['wR','wN','wB','wQ','wK','wB','wN','wR']
];

let board = JSON.parse(localStorage.getItem("chessBoard")) || JSON.parse(JSON.stringify(startBoard));
let turn = localStorage.getItem("turn") || 'w';
let flipped = localStorage.getItem("flipped")==="true";
let undoStack = [];
let selected=null, legalMoves=[], hintMove=null, gameOver=false;

const chessboard=document.getElementById("chessboard");
const overlay=document.getElementById("gameOverOverlay");

// ---------------- DRAW ----------------
function drawBoard(){
 chessboard.innerHTML="";
 for(let r=0;r<8;r++){
  for(let c=0;c<8;c++){
   let rr = flipped ? 7-r : r;
   let cc = flipped ? 7-c : c;
   const cell = document.createElement("div");
   cell.className = "cell "+((rr+cc)%2?"black":"white");
   cell.dataset.row = rr;
   cell.dataset.col = cc;
   cell.dataset.piece = pieces[board[rr][cc]] || "";
   cell.onclick = selectCell;

   if(selected && selected.row===rr && selected.col===cc) cell.classList.add("selected");
   if(legalMoves.some(m=>m.r===rr && m.c===cc)) cell.classList.add("legal");
   if(hintMove && hintMove.dr===rr && hintMove.dc===cc) cell.classList.add("hint");
   if((isBlackKingInCheck()&&board[rr][cc]==='bK')||(isWhiteKingInCheck()&&board[rr][cc]==='wK')) cell.classList.add("check");

   chessboard.appendChild(cell);
  }
 }
}

// ---------------- SELECT ----------------
function selectCell(){
 if(gameOver) return;
 const r=+this.dataset.row, c=+this.dataset.col, piece=board[r][c];
 if(selected){
   if(canMove(selected.row,selected.col,r,c)){
     movePiece(selected.row,selected.col,r,c);
     return;
   }
   selected=null; legalMoves=[]; hintMove=null; drawBoard();
 } else {
   if(piece && piece[0]===turn){
     selected={row:r,col:c};
     legalMoves=getLegalMoves(r,c);
     hintMove=findBestPlayerMove(r,c);
     drawBoard();
   }
 }
}

// ---------------- MOVE ----------------
function movePiece(sr,sc,dr,dc){
 const moveData = {sr, sc, dr, dc, piece: board[sr][sc], target: board[dr][dc], turnBefore: turn, flippedBefore: flipped};
 undoStack.push(moveData);

 const target = board[dr][dc];
 board[dr][dc] = board[sr][sc];
 board[sr][sc] = "";

 saveGame(); playMoveSound();

 selected=null; legalMoves=[]; hintMove=null;

 if(target && target[1]==='K'){ endGame(turn==='w'?"You Win!":"You Lose!"); return; }
 turn = turn==='w'?'b':'w';
 drawBoard();
 if(isCheckmate(turn)){ endGame(turn==='w'?"Black Wins":"White Wins"); return; }
 if(turn==='b') setTimeout(aiMove,250);
}

// ---------------- UNDO ----------------
function undoMove(){
 if(undoStack.length===0 || gameOver) return;
 const last = undoStack.pop();
 board[last.sr][last.sc]=last.piece;
 board[last.dr][last.dc]=last.target;
 turn=last.turnBefore;
 drawBoard(); saveGame();
}

// ---------------- RESTART ----------------
function restartGame(){
 localStorage.clear();
 board=JSON.parse(JSON.stringify(startBoard));
 turn='w'; flipped=false; gameOver=false;
 overlay.style.opacity=0; overlay.style.pointerEvents="none";
 drawBoard(); undoStack=[];
}

// ---------------- SOUND ----------------
function playMoveSound(){
 const a=new Audio("move.mp3"); a.play().catch(()=>{});
}

// ---------------- DRAW INITIAL ----------------
drawBoard();

// ------------------ PLACEHOLDER FUNCTIONS ----------------
function getLegalMoves(r,c){ return []; }
function canMove(sr,sc,dr,dc){ return true; }
function findBestPlayerMove(sr,sc){ return null; }
function aiMove(){}
function isBlackKingInCheck(){ return false; }
function isWhiteKingInCheck(){ return false; }
function isCheckmate(color){ return false; }
function saveGame(){}
function endGame(text){ gameOver=true; overlay.innerText=text; overlay.style.opacity=1; overlay.style.pointerEvents="auto"; }

