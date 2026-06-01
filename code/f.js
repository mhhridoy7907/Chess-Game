//=========new update funtion===========///

const P={
 bR:"♜",bN:"♞",bB:"♝",bQ:"♛",bK:"♚",bP:"♟",
 wR:"♖",wN:"♘",wB:"♗",wQ:"♕",wK:"♔",wP:"♙"
};

let board, turn, selected=null, legalMoves=[];
let aiMode=false;
let promoData=null;
let hack={w:false,b:false};

function enableHack(color){
 let pass=prompt("Enter Password:");
 if(pass==="@mh2hridoy99"){
  hack[color]=true;
 }else{
  document.getElementById(color==="w"?"hackW":"hackB").checked=false;
 }
}

function startGame(){
 aiMode=document.getElementById("mode").value==="ai";
 document.getElementById("startScreen").style.display="none";
 resetBoard();
 draw();
}

function resetBoard(){
 board=[
 ['bR','bN','bB','bQ','bK','bB','bN','bR'],
 ['bP','bP','bP','bP','bP','bP','bP','bP'],
 ['','','','','','','',''],
 ['','','','','','','',''],
 ['','','','','','','',''],
 ['','','','','','','',''],
 ['wP','wP','wP','wP','wP','wP','wP','wP'],
 ['wR','wN','wB','wQ','wK','wB','wN','wR']
 ];
 turn="w";
}

function findKing(color,b=board){
 for(let r=0;r<8;r++)
 for(let c=0;c<8;c++)
 if(b[r][c]===color+"K") return {r,c};
 return null;
}

function isInCheck(color,b=board){
 let k=findKing(color,b);
 if(!k) return false;
 return isSquareAttacked(k.r,k.c,color,b);
}

function isSquareAttacked(r,c,color,b){
 let enemy=color==="w"?"b":"w";
 for(let i=0;i<8;i++){
  for(let j=0;j<8;j++){
   let p=b[i][j];
   if(p && p[0]===enemy){
    let m=getMoves(i,j,b,true);
    if(m.some(x=>x.r===r&&x.c===c)) return true;
   }
  }
 }
 return false;
}

function simulateMove(sr,sc,dr,dc,color){
 let temp=JSON.parse(JSON.stringify(board));
 temp[dr][dc]=temp[sr][sc];
 temp[sr][sc]="";
 return !isInCheck(color,temp);
}

function draw(){
 let b=document.getElementById("board");
 b.innerHTML="";

 for(let r=0;r<8;r++){
 for(let c=0;c<8;c++){

 let cell=document.createElement("div");
 cell.className="cell "+((r+c)%2?"black":"white");

 let piece=board[r][c];
 cell.innerText=P[piece]||"";

 //  ONLY CHANGE: blue piece color
 if(piece && piece[0]==="b") cell.style.color="#0026ff";

 if(selected && selected.r==r && selected.c==c)
 cell.classList.add("selected");

 if(legalMoves.some(m=>m.r==r&&m.c==c))
 cell.classList.add("legal");

 cell.onclick=()=>click(r,c);
 b.appendChild(cell);
 }
 }
}

function click(r,c){
 let p=board[r][c];

 if(selected){
 let moves=getLegalMoves(selected.r,selected.c);

 if(moves.some(m=>m.r==r&&m.c==c)){
  move(selected.r,selected.c,r,c);
  selected=null;
  legalMoves=[];
  draw();
  return;
 }

 selected=null;
 legalMoves=[];
 }

 if(p && p[0]==turn){
 selected={r,c};
 legalMoves=getLegalMoves(r,c);
 }

 draw();
}

function move(sr,sc,dr,dc){
 let piece=board[sr][sc];
 let killed=board[dr][dc];

 board[dr][dc]=piece;
 board[sr][sc]="";

 if(piece=="wP"&&dr==0) openPromo(dr,dc,"w");
 if(piece=="bP"&&dr==7) openPromo(dr,dc,"b");

 if(killed=="wK"||killed=="bK"){
  showWin(turn);
  return;
 }

 turn=turn==="w"?"b":"w";

 if(aiMode && turn=="b") setTimeout(ai,200);
 checkGameEnd();
}

function getLegalMoves(r,c){
 let col=board[r][c][0];

 if(hack[col]){
  let all=[];
  for(let i=0;i<8;i++)
  for(let j=0;j<8;j++)
  if(i!==r||j!==c) all.push({r:i,c:j});
  return all;
 }

 let raw=getMoves(r,c,board,false);
 return raw.filter(m=>simulateMove(r,c,m.r,m.c,col));
}

function getMoves(r,c,b,attackOnly){
 let p=b[r][c];
 if(!p) return [];

 let t=p[1], col=p[0], m=[];
 const add=(x,y)=>{
  if(x>=0&&x<8&&y>=0&&y<8)
  if(!b[x][y]||b[x][y][0]!=col)
  m.push({r:x,c:y});
 };

 if(t=="P"){
  let d=col=="w"?-1:1;

  if(!attackOnly){
   if(!b[r+d]?.[c]) m.push({r:r+d,c});
  }

  [-1,1].forEach(x=>{
   if(b[r+d]?.[c+x]&&b[r+d][c+x][0]!=col)
   m.push({r:r+d,c:c+x});
  });
 }

 if(t=="R"||t=="Q"){
  [[1,0],[-1,0],[0,1],[0,-1]].forEach(d=>{
   let x=r,y=c;
   while(true){
    x+=d[0];y+=d[1];
    if(x<0||x>7||y<0||y>7) break;
    if(!b[x][y]) m.push({r:x,c:y});
    else{ if(b[x][y][0]!=col)m.push({r:x,c:y}); break;}
   }
  });
 }

 if(t=="B"||t=="Q"){
  [[1,1],[1,-1],[-1,1],[-1,-1]].forEach(d=>{
   let x=r,y=c;
   while(true){
    x+=d[0];y+=d[1];
    if(x<0||x>7||y<0||y>7) break;
    if(!b[x][y]) m.push({r:x,c:y});
    else{ if(b[x][y][0]!=col)m.push({r:x,c:y}); break;}
   }
  });
 }

 if(t=="N"){
  [[2,1],[2,-1],[-2,1],[-2,-1],[1,2],[1,-2],[-1,2],[-1,-2]]
  .forEach(d=>add(r+d[0],c+d[1]));
 }

 if(t=="K"){
  [[1,0],[-1,0],[0,1],[0,-1],[1,1],[1,-1],[-1,1],[-1,-1]]
  .forEach(d=>add(r+d[0],c+d[1]));
 }

 return m;
}

function ai(){
 let all=[];

 for(let r=0;r<8;r++)
 for(let c=0;c<8;c++){
  if(board[r][c]&&board[r][c][0]=="b"){
   getLegalMoves(r,c).forEach(m=>{
    all.push({sr:r,sc:c,dr:m.r,dc:m.c});
   });
  }
 }

 if(all.length==0) return;

 let m=all[Math.floor(Math.random()*all.length)];
 board[m.dr][m.dc]=board[m.sr][m.sc];
 board[m.sr][m.sc]="";

 turn="w";
 draw();
 checkGameEnd();
}

function checkGameEnd(){
 let hasMoves=false;

 for(let r=0;r<8;r++)
 for(let c=0;c<8;c++){
  if(board[r][c]&&board[r][c][0]==turn){
   if(getLegalMoves(r,c).length>0) hasMoves=true;
  }
 }

 if(!hasMoves){
  if(isInCheck(turn)){
   showWin(turn==="w"?"Black":"White");
  }else showWin("Draw");
 }
}

function showWin(w){
 let el=document.getElementById("winScreen");
 el.style.display="flex";
 el.innerHTML=`🏆 ${w.toUpperCase()} WINS!`;
}

function openPromo(r,c,color){
 promoData={r,c,color};
 document.getElementById("promo").style.display="flex";
}

function setPromo(t){
 board[promoData.r][promoData.c]=promoData.color+t;
 promoData=null;
 document.getElementById("promo").style.display="none";
 draw();
}

draw();

