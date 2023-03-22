
function minimax(PrevBoard, depth, alpha, beta, isMaximizing){
    let NowBoard = new Board();
    NowBoard.GetPiecesFromBoard(PrevBoard.PassPieces());

    if(depth == 0){
        return [NowBoard.evalBoard()];
    } 
    if(isMaximizing && NowBoard.checkCheckMate(true) && !NowBoard.checkStaleMate(true)){
        return [-6_000_000];
    }else if(!isMaximizing && NowBoard.checkCheckMate(false) && !NowBoard.checkStaleMate(false)){
        return [6_000_000];
    }else if(isMaximizing && NowBoard.checkStaleMate(true))
    {
        return[200000];
    }else if(!isMaximizing && NowBoard.checkStaleMate(false))
    {
        return[-200000]
    }


    if(isMaximizing)
    {
        let bestPiece;
        let bestMove;
        let allMoves;
        let maxEval = Number.NEGATIVE_INFINITY;
        let eval;
        for(let i = NowBoard.whitePieces.length - 1; i >= 0; i--)
        {  
            for(let j = NowBoard.checkAvailableMoves(i, true).length - 1; j >= 0; j--)
            {
                let xPos = NowBoard.whitePieces[i].position[0];
                let yPos = NowBoard.whitePieces[i].position[1];
                let takenPiece;
                let taking = false;

            
                if(NowBoard.checkAvailableMoves(i, true)[j][2] == 2){
                    for(let k = 0; k < NowBoard.blackPieces.length; k++){
                        if(checkSamePosition(NowBoard.blackPieces[k].position, NowBoard.checkAvailableMoves(i, true)[j])){
                            taking = true;
                            takenPiece = NowBoard.blackPieces[k];
                            NowBoard.blackTaken.push(NowBoard.blackPieces[k]);
                        }
                    }
                    console.log(NowBoard.checkAvailableMoves(i, true)[j]);
                }
                NowBoard.whitePieces[i].Update(NowBoard.checkAvailableMoves(i, true)[j][0],NowBoard.checkAvailableMoves(i, true)[j][1]);
                    
                
                
                
                let eval = minimax(NowBoard, depth - 1, alpha, beta,  false)[0];
                alpha = Math.max(alpha, eval);

                NowBoard.whitePieces[i].Update(xPos,yPos);
                if(taking){
                    NowBoard.blackTaken.splice(NowBoard.blackTaken.length - 1, 1);
                }

                if(eval > maxEval){
                    maxEval = eval;

                    bestPiece = NowBoard.whitePieces[i];
                    bestMove = NowBoard.checkAvailableMoves(i, true)[j];
                }
                if(beta <= alpha)
                {
                    break;
                }
                
                
                
                
            }
            if(beta <= alpha)
            {
                break;
            }
        }
        return [maxEval, bestPiece, bestMove];
    }
    else
    {
        let bestPiece;
        let bestMove;
        let allMoves;
        let minEval = Number.POSITIVE_INFINITY;
        for(let i = NowBoard.blackPieces.length - 1; i >= 0; i--)
        {
            
            for (let j = NowBoard.checkAvailableMoves(i, false).length - 1; j >=0; j--)
            {
                let xPos = NowBoard.blackPieces[i].position[0];
                let yPos = NowBoard.blackPieces[i].position[1];
                let takenPiece;
                let taking;
                
                
                if(NowBoard.checkAvailableMoves(i, false)[j][2] == 2){
                    for(let k = 0; k < NowBoard.whitePieces.length; k++){
                        if(checkSamePosition(NowBoard.whitePieces[k].position, NowBoard.checkAvailableMoves(i, false)[j])){
                            taking = true;
                            takenPiece = NowBoard.whitePieces[k];
                            NowBoard.whiteTaken.push(NowBoard.whitePieces[k]);
                            break;
                        }
                    }
                }
                NowBoard.blackPieces[i].Update(NowBoard.checkAvailableMoves(i, false)[j][0], NowBoard.checkAvailableMoves(i, false)[j][1]);
                    
                

                let eval = minimax(NowBoard, depth - 1, alpha, beta, true)[0];
                beta = Math.min(beta, eval);

                NowBoard.blackPieces[i].Update(xPos, yPos);
                if(taking){  
                    NowBoard.whiteTaken.splice(NowBoard.whiteTaken.length - 1, 1);      
                }

                if(eval < minEval){
                    minEval = eval;
                    bestPiece = NowBoard.blackPieces[i];
                    bestMove = NowBoard.checkAvailableMoves(i, false)[j];
                }
                if(beta <= alpha){
                    break;
                }
                
                
                
            }
            if(beta <= alpha){
                break;
            }
        }
        return [minEval, bestPiece, bestMove];
    }
}