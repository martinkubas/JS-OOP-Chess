function easyAI(){  //najlahsia obtiaznost, nahodne vybere figurku a nahodne s nou pohne
    let randomPieceIndex =  Math.floor(Math.random() * board.blackPieces.length);
    let randomMove = board.checkAvailableMoves(randomPieceIndex, false)[Math.floor(Math.random() * board.checkAvailableMoves(randomPieceIndex, false).length)];
     
    if(board.blackPieces[randomPieceIndex].type == 'KING' && randomMove[0] == 2 && randomMove[1] == 0 && board.blackPieces[randomPieceIndex].moved == false)
    {
        
        board.blackPieces[randomPieceIndex].Update(randomMove[0], randomMove[1]);
    
        for(let i = 0; i < board.blackPieces.length; i++)
        {
            if(board.blackPieces[i].type == 'ROOK' && board.blackPieces[i].position[0] == 0)   
            {
                board.blackPieces[i].Update(3,0);
                break;
            }
        }
        
        
        
    }
    else if(board.blackPieces[randomPieceIndex].type == 'KING' && randomMove[0] == 6 && randomMove[1] == 0 && board.blackPieces[randomPieceIndex].moved == false){     
        board.blackPieces[randomPieceIndex].Update(randomMove[0], randomMove[1]);
        
        for(let i = 0; i < board.blackPieces.length; i++)
        {
            if(board.blackPieces[i].type == 'ROOK' && board.blackPieces[i].position[0] == 7)    
            {
                board.blackPieces[i].Update(5,0);
                break;
            }
        }
        
    }
    else{ 
        board.blackPieces[randomPieceIndex].Update(randomMove[0], randomMove[1]);
    }

    if(board.blackPieces[randomPieceIndex].type == 'PAWN' && board.blackPieces[randomPieceIndex].position[1] == 0)        
    {   
        board.blackPieces.push(new Queen(board.blackPieces[randomPieceIndex].position[0], board.blackPieces[randomPieceIndex].position[1], false));
        board.blackPieces.splice(randomPieceIndex, 1);
        
    }


    for(let i = 0; i < board.whitePieces.length; i++)
    {
        if(board.whitePieces[i].position[0] == randomMove[0] && board.whitePieces[i].position[1] == randomMove[1])
        {
            board.whitePieces.splice(i, 1);
            break;
        }
    }   
    
whiteTurn ^=true;
}