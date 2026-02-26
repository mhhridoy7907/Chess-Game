
const pieces = {
    'bR':'♜','bN':'♞','bB':'♝','bQ':'♛','bK':'♚','bP':'♟',
    'wR':'♖','wN':'♘','wB':'♗','wQ':'♕','wK':'♔','wP':'♙'
};

let board = [
 ['bR','bN','bB','bQ','bK','bB','bN','bR'],
 ['bP','bP','bP','bP','bP','bP','bP','bP'],
 ['','','','','','','',''],
 ['','','','','','','',''],
 ['','','','','','','',''],
 ['','','','','','','',''],
 ['wP','wP','wP','wP','wP','wP','wP','wP'],
 ['wR','wN','wB','wQ','wK','wB','wN','wR']
];

const chessboard = document.getElementById('chessboard');
const overlay = document.getElementById('gameOverOverlay');

let selected = null;
let turn = 'w';
let gameOver = false;

function drawBoard(){
    chessboard.innerHTML='';
    for(let r=0;r<8;r++){
        for(let c=0;c<8;c++){
            const cell=document.createElement('div');
            cell.className='cell '+((r+c)%2===0?'white':'black');
            cell.dataset.row=r;
            cell.dataset.col=c;

            if((isBlackKingInCheck() && board[r][c]==='bK') ||
               (isWhiteKingInCheck() && board[r][c]==='wK')){
                cell.style.background='red';
            }

            if(selected && selected.row==r && selected.col==c)
                cell.classList.add('selected');

            cell.innerHTML=pieces[board[r][c]]||'';
            cell.onclick=selectCell;
            chessboard.appendChild(cell);
        }
    }
}

function selectCell(){
    if(gameOver) return;

    const r=parseInt(this.dataset.row);
    const c=parseInt(this.dataset.col);
    const piece=board[r][c];

    if(selected){
        if(canMove(selected.row,selected.col,r,c)){
            const target=board[r][c];
            board[r][c]=board[selected.row][selected.col];
            board[selected.row][selected.col]='';
            selected=null;
            drawBoard();

            if(target && target[1]==='K'){
                endGame("You Win!");
                return;
            }

            turn='b';
            setTimeout(aiMove,200);
            return;
        }
        selected=null;
        drawBoard();
    }else{
        if(piece && piece[0]==='w'){
            selected={row:r,col:c};
            drawBoard();
        }
    }
}

//////////////////////////
// AI MOVE (MINIMAX)
//////////////////////////

function aiMove(){
    if(gameOver) return;

    let bestScore=-Infinity;
    let bestMove=null;

    for(let r=0;r<8;r++){
        for(let c=0;c<8;c++){
            if(board[r][c] && board[r][c][0]==='b'){
                for(let r2=0;r2<8;r2++){
                    for(let c2=0;c2<8;c2++){
                        if(canMove(r,c,r2,c2)){
                            const src=board[r][c];
                            const dst=board[r2][c2];

                            board[r2][c2]=src;
                            board[r][c]='';

                            if(!isBlackKingInCheck()){
                                let score=minimax(2,false,-Infinity,Infinity);
                                if(score>bestScore){
                                    bestScore=score;
                                    bestMove={sr:r,sc:c,dr:r2,dc:c2};
                                }
                            }

                            board[r][c]=src;
                            board[r2][c2]=dst;
                        }
                    }
                }
            }
        }
    }

    if(!bestMove){
        endGame("You Win!");
        return;
    }

    const target=board[bestMove.dr][bestMove.dc];
    board[bestMove.dr][bestMove.dc]=board[bestMove.sr][bestMove.sc];
    board[bestMove.sr][bestMove.sc]='';

    drawBoard();

    if(target && target[1]==='K'){
        endGame("Game Over! You Lose!");
        return;
    }

    turn='w';
}

//////////////////////////
// MINIMAX
//////////////////////////

function minimax(depth,isMax,alpha,beta){
    if(depth===0) return evaluateBoard();

    if(isMax){
        let maxEval=-Infinity;
        for(let r=0;r<8;r++){
            for(let c=0;c<8;c++){
                if(board[r][c] && board[r][c][0]==='b'){
                    for(let r2=0;r2<8;r2++){
                        for(let c2=0;c2<8;c2++){
                            if(canMove(r,c,r2,c2)){
                                const s=board[r][c];
                                const d=board[r2][c2];
                                board[r2][c2]=s;
                                board[r][c]='';

                                let eval=minimax(depth-1,false,alpha,beta);

                                board[r][c]=s;
                                board[r2][c2]=d;

                                maxEval=Math.max(maxEval,eval);
                                alpha=Math.max(alpha,eval);
                                if(beta<=alpha) return maxEval;
                            }
                        }
                    }
                }
            }
        }
        return maxEval;
    }else{
        let minEval=Infinity;
        for(let r=0;r<8;r++){
            for(let c=0;c<8;c++){
                if(board[r][c] && board[r][c][0]==='w'){
                    for(let r2=0;r2<8;r2++){
                        for(let c2=0;c2<8;c2++){
                            if(canMove(r,c,r2,c2)){
                                const s=board[r][c];
                                const d=board[r2][c2];
                                board[r2][c2]=s;
                                board[r][c]='';

                                let eval=minimax(depth-1,true,alpha,beta);

                                board[r][c]=s;
                                board[r2][c2]=d;

                                minEval=Math.min(minEval,eval);
                                beta=Math.min(beta,eval);
                                if(beta<=alpha) return minEval;
                            }
                        }
                    }
                }
            }
        }
        return minEval;
    }
}

//////////////////////////
// EVALUATION
//////////////////////////

function evaluateBoard(){
    let score=0;

    for(let r=0;r<8;r++){
        for(let c=0;c<8;c++){
            const p=board[r][c];
            if(!p) continue;

            let val=pieceValue(p);

            if(p[0]==='b') score+=val;
            else score-=val;

            // pawn advance bonus
            if(p[1]==='P'){
                if(p[0]==='b') score+=(6-r)*0.1;
                else score-=(r-1)*0.1;
            }
        }
    }

    if(isBlackKingInCheck()) score-=50;
    if(isWhiteKingInCheck()) score+=50;

    return score;
}

function pieceValue(p){
    switch(p[1]){
        case 'P': return 1;
        case 'N':
        case 'B': return 3;
        case 'R': return 5;
        case 'Q': return 9;
        case 'K': return 100;
    }
    return 0;
}

//////////////////////////
// MOVE RULES
//////////////////////////

function canMove(sr,sc,dr,dc){
    const piece=board[sr][sc];
    if(!piece) return false;
    const target=board[dr][dc];
    if(target && target[0]===piece[0]) return false;
    return canMoveNormal(sr,sc,dr,dc,piece);
}

function canMoveNormal(sr,sc,dr,dc,piece){
    const dx=dc-sc;
    const dy=dr-sr;
    const target=board[dr][dc];

    switch(piece[1]){
        case 'P':
            if(piece[0]==='b'){
                if(dy===1 && dx===0 && !target) return true;
                if(sr===1 && dy===2 && dx===0 && !target && !board[sr+1][sc]) return true;
                if(dy===1 && Math.abs(dx)===1 && target && target[0]==='w') return true;
            }else{
                if(dy===-1 && dx===0 && !target) return true;
                if(sr===6 && dy===-2 && dx===0 && !target && !board[sr-1][sc]) return true;
                if(dy===-1 && Math.abs(dx)===1 && target && target[0]==='b') return true;
            }
            break;

        case 'R':
            if((dx===0||dy===0) && isPathClear(sr,sc,dr,dc)) return true;
            break;

        case 'N':
            if((Math.abs(dx)===2 && Math.abs(dy)===1)||(Math.abs(dx)===1 && Math.abs(dy)===2))
                return true;
            break;

        case 'B':
            if(Math.abs(dx)===Math.abs(dy) && isPathClear(sr,sc,dr,dc)) return true;
            break;

        case 'Q':
            if((dx===0||dy===0||Math.abs(dx)===Math.abs(dy)) && isPathClear(sr,sc,dr,dc))
                return true;
            break;

        case 'K':
            if(Math.abs(dx)<=1 && Math.abs(dy)<=1 &&
               !isSquareAttacked(dr,dc,piece[0]==='w'?'b':'w'))
                return true;
            break;
    }
    return false;
}

function isPathClear(sr,sc,dr,dc){
    let dx=Math.sign(dc-sc);
    let dy=Math.sign(dr-sr);
    let x=sc+dx;
    let y=sr+dy;
    while(x!==dc || y!==dr){
        if(board[y][x]!=='') return false;
        x+=dx;
        y+=dy;
    }
    return true;
}

//////////////////////////
// CHECK DETECTION
//////////////////////////

function isSquareAttacked(r,c,byColor){
    for(let i=0;i<8;i++){
        for(let j=0;j<8;j++){
            if(board[i][j] && board[i][j][0]===byColor){
                if(canMoveNormal(i,j,r,c,board[i][j])) return true;
            }
        }
    }
    return false;
}

function isBlackKingInCheck(){
    for(let r=0;r<8;r++)
        for(let c=0;c<8;c++)
            if(board[r][c]==='bK')
                return isSquareAttacked(r,c,'w');
    return false;
}

function isWhiteKingInCheck(){
    for(let r=0;r<8;r++)
        for(let c=0;c<8;c++)
            if(board[r][c]==='wK')
                return isSquareAttacked(r,c,'b');
    return false;
}

//////////////////////////
// GAME END
//////////////////////////

function endGame(text){
    gameOver=true;
    overlay.innerText=text;
    overlay.style.opacity=1;
    overlay.style.pointerEvents='auto';
}

drawBoard();
