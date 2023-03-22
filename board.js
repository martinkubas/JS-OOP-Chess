class Board{
    constructor(){
        this.whitePieces = [];
        this.blackPieces = [];
        this.whiteTaken = [];
        this.blackTaken = [];
        
    }

    startPieces(){

        //biele zaciatocne figurky
        this.whitePieces.push(new King(4,7,true)) 

        this.whitePieces.push(new Pawn(0,6,true))
        this.whitePieces.push(new Pawn(1,6,true))
        this.whitePieces.push(new Pawn(2,6,true))
        this.whitePieces.push(new Pawn(3,6,true))
        this.whitePieces.push(new Pawn(4,6,true))
        this.whitePieces.push(new Pawn(5,6,true))
        this.whitePieces.push(new Pawn(6,6,true))
        this.whitePieces.push(new Pawn(7,6,true))

        this.whitePieces.push(new Rook(0,7,true))
        this.whitePieces.push(new Rook(7,7,true))
        this.whitePieces.push(new Knight(1,7,true))
        this.whitePieces.push(new Knight(6,7,true))

        this.whitePieces.push(new Bishop(2,7,true))
        this.whitePieces.push(new Bishop(5,7,true))

        this.whitePieces.push(new Queen(3,7,true))
        

        ///cierne zaciatocne figurky
        this.blackPieces.push(new King(4,0,false))
        this.blackPieces.push(new Pawn(0,1,false))
        this.blackPieces.push(new Pawn(1,1,false))
        this.blackPieces.push(new Pawn(2,1,false))
        this.blackPieces.push(new Pawn(3,1,false))
        this.blackPieces.push(new Pawn(4,1,false))
        this.blackPieces.push(new Pawn(5,1,false))
        this.blackPieces.push(new Pawn(6,1,false))
        this.blackPieces.push(new Pawn(7,1,false))

        this.blackPieces.push(new Rook(0,0,false))
        this.blackPieces.push(new Rook(7,0,false))

        this.blackPieces.push(new Knight(1,0,false))
        this.blackPieces.push(new Knight(6,0,false))

        this.blackPieces.push(new Bishop(2,0,false))
        this.blackPieces.push(new Bishop(5,0,false))
        this.blackPieces.push(new Queen(3,0,false))

       /* this.whitePieces.push(new King(0,0,true));
        this.whitePieces.push(new Rook(1,0,true));
        this.blackPieces.push(new King(7,7, false));
        this.blackPieces.push(new Queen(4,4,false));
        this.blackPieces.push(new Queen(5,4,false));*/

        

    }

    
    show(){
        for (let i = 0; i < this.whitePieces.length; i++) {
            
            this.whitePieces[i].Show();
            
        }
        for (let i = 0; i < this.blackPieces.length; i++) {
            this.blackPieces[i].Show();
            
        }
        
    }

    drawBoard(){
        for(var x = 0;  x < 8; x++)
        {
            for(var y = 0; y < 8; y++)
            {
                if(y%2 == x%2)
                {
                    c.fillStyle = '#b58863';
                    c.fillRect(tileSize*x, tileSize*y, tileSize,tileSize);
                }
                else{
                    c.fillStyle = '#f0d9b5';
                    c.fillRect(tileSize*x, tileSize*y, tileSize,tileSize);
                }
            }
        }
    }
    IsThereAPiece(x, y, passedPiece){
        for(let i = 0; i < this.whitePieces.length; i++)
        {
           
            if(!passedPiece.isWhite && x == this.whitePieces[i].position[0] && y == this.whitePieces[i].position[1]){
                return {
                    isPiece: true,
                    isEnemy: true,
                }
            }
            else if(x == this.whitePieces[i].position[0] && y == this.whitePieces[i].position[1]){
                return {
                    isPiece: true,
                    isEnemy: false
                }
                
            }
            
        }
        for(let i = 0; i < this.blackPieces.length; i++)
        {
            
            if(passedPiece.isWhite && x == this.blackPieces[i].position[0] && y == this.blackPieces[i].position[1]){
                return {
                    isPiece: true,
                    isEnemy: true,
                }
            }
            else if( x == this.blackPieces[i].position[0] && y == this.blackPieces[i].position[1]){
                return {
                    isPiece: true,
                    isEnemy: false
                }             
            }
           
        }
        
        return {
            isPiece: false,
            isEnemy:false
        }



    }
    evalBoard(){        
       let score = 0;
        for(let i = 0; i < this.whitePieces.length; i++)
        {
            switch (this.whitePieces[i].type)
            {
                case 'PAWN':
                    score += wPawnTable[this.whitePieces[i].position[1]][this.whitePieces[i].position[0]];
                    break;
                case 'KNIGHT':
                    score += wKnightTable[this.whitePieces[i].position[1]][this.whitePieces[i].position[0]];
                    break;
                case 'BISHOP':
                    score += wBishopTable[this.whitePieces[i].position[1]][this.whitePieces[i].position[0]];
                    break;
                case 'ROOK':
                    score += wRookTable[this.whitePieces[i].position[1]][this.whitePieces[i].position[0]];
                    break;  
                case 'QUEEN' :
                    score += wQueenTable[this.whitePieces[i].position[1]][this.whitePieces[i].position[0]];
                    break;
                case 'KING' :
                    score += wKingTable[this.whitePieces[i].position[1]][this.whitePieces[i].position[0]];
                    break;
            }
        }
        for(let i = 0; i < this.blackPieces.length; i++)
        {
            switch(this.blackPieces[i].type)
            {
                case 'PAWN':
                    score -= bPawnTable[this.blackPieces[i].position[1]][this.blackPieces[i].position[0]];
                    break;
                case 'KNIGHT':
                    score -= bKnightTable[this.blackPieces[i].position[1]][this.blackPieces[i].position[0]];
                    break;
                case 'BISHOP':
                    score -= bBishopTable[this.blackPieces[i].position[1]][this.blackPieces[i].position[0]];
                    break;
                case 'ROOK':
                    score -= bRookTable[this.blackPieces[i].position[1]][this.blackPieces[i].position[0]];
                    break;  
                case 'QUEEN' :
                    score -= bQueenTable[this.blackPieces[i].position[1]][this.blackPieces[i].position[0]];
                    break;
                case 'KING' :
                    score -= bKingTable[this.blackPieces[i].position[1]][this.blackPieces[i].position[0]];
                    break;
            }
        }

        for(let i = 0; i < this.whiteTaken.length; i++)
        {
            score += wPieceScore[this.whiteTaken[i].type];
        }
        for(let i = 0; i < this.blackTaken.length; i++)
        {
            score += bPieceScore[this.blackTaken[i].type];
        }
        for(let i = 0; i < this.whitePieces.length; i++)
        {
            if(this.whitePieces[i].type == 'PAWN' && this.whitePieces[i].position[1] == 0)
            {
                score += 700;
            }
        }
        for(let i = 0; i < this.blackPieces.length; i++)
        {
            if(this.blackPieces[i].type == 'PAWN' && this.blackPieces[i].position[1] == 7)
            {
                score -= 700;
            } 
        }
        return score;
    }
    checkAvailableMoves(index, white)
    {
        let piece = white ? this.whitePieces[index] : this.blackPieces[index];

        let startPos = [piece.position[0], piece.position[1]];
        let moves = piece.AllAvailableMoves(this);
        let goodMoves = [];

        for(let i = moves.length - 1; i >= 0; i--)
        {
            piece.Update(moves[i][0], moves[i][1], true);
            
            if(piece.isWhite && moves[i][2] == 2) //ak tym tahom niekoho vyhodi
            {
                for(let j = this.blackPieces.length - 1; j >= 0; j--)
                {
                    if(checkSamePosition(moves[i], this.blackPieces[j].position))
                    {
                        let blackPiece = this.blackPieces[j];
                        this.blackPieces.splice(j, 1);
                        if(!this.checkCheck(true))
                        {
                            goodMoves.push(moves[i]);
                        }

                        if(blackPiece.type == 'KING'){
                            this.blackPieces.unshift(blackPiece);
                        }else{
                            this.blackPieces.push(blackPiece);
                        }
                        break;
                    }
                }
            }else if(moves[i][2] == 2){
                
                for(let j = this.whitePieces.length - 1; j >= 0; j--)
                {
                    if(checkSamePosition(moves[i], this.whitePieces[j].position))
                    {
                        let whitePiece = this.whitePieces[j];
                        this.whitePieces.splice(j, 1);
                        if(!this.checkCheck(false))
                        {             
                            goodMoves.push(moves[i]);
                        }
                        if(whitePiece.type == 'KING')
                        {
                            this.whitePieces.unshift(whitePiece);
                        }else{
                            this.whitePieces.push(whitePiece);
                        }
                        break;
                        
                    }
                }
            } 
            else if(!piece.isWhite && !this.checkCheck(false) && moves[i][2] != 1)
            {         
                goodMoves.push(moves[i])
            }else if(piece.isWhite && !this.checkCheck(true) && moves[i][2] != 1)
            {
                goodMoves.push(moves[i]);
            }


           
                      

            piece.Update(startPos[0], startPos[1], true);
        }
        

        
        return goodMoves;
    
    }
    
    checkCheck(white){    //funkcia na pozretie sachu
        let checkCHeckMoves = [];
        if(white){
            for(let i = 0; i < this.blackPieces.length; i++)
            {
                checkCHeckMoves.push(...this.blackPieces[i].AllAvailableMoves(this));  //vsetky tahy druhej farby v jednom poli
            }
            
        }else{
            for(let i = 0; i < this.whitePieces.length; i++)
            {  
                checkCHeckMoves.push(...this.whitePieces[i].AllAvailableMoves(this));
            }
        }
        for (let i = 0; i < checkCHeckMoves.length; i++) {
            if(white)   
            {
                if(checkSamePosition(checkCHeckMoves[i], this.whitePieces[0].position))
                {
                    return true;
                }
            }else{
                if(checkSamePosition(checkCHeckMoves[i], this.blackPieces[0].position))
                {
                    return true;
                }
            }
                    
        }
        return false;
    }
    checkCheckMate(white){      //funkcia na zistenie, ci nenastal sachmat
        let mateCheck = true;
        if(white)
        {
            if(!this.checkCheck(true)){
                return false;
            }
            for(let i = 0; i < this.whitePieces.length; i++)
            {
                if(this.checkAvailableMoves(i, true).length > 0)
                {
                    mateCheck = false;
                }
            }
        }
        else{
            if(!this.checkCheck(false)){
                return false;
            }

            for(let i = 0; i < this.blackPieces.length; i++)
            {
                if(this.checkAvailableMoves(i, false).length > 0)
                {
                    mateCheck = false;
                }
            }
        }
        
        
       return mateCheck;

    }
    checkStaleMate(white){
        let staleCheck = true;
        if(white){
            for(let i = 0; i < this.whitePieces.length; i++)
            {
                if(this.checkAvailableMoves(i, true).length > 0)
                {
                    staleCheck = false;
                }
            }
            if(staleCheck && !this.checkCheck(true)){
                return true;
            }

        }
        else{
            for(let i = 0; i < this.blackPieces.length; i++)
            {
                if(this.checkAvailableMoves(i, false).length > 0)
                {
                    staleCheck = false;
                }
            }
            if(staleCheck && !this.checkCheck(false)){
                return true;
            }
        }

        return false;

        
    }



    PassPieces(){   //zoberie vsetky figurky a vrati objekt zo vsetkym potrebnym info
        let wPieces = [];
        let bPieces = [];
        let wTaken = '';
        let bTaken = '';
        for(let i = 0; i < this.whitePieces.length; i++)
        {
            let position = this.whitePieces[i].position;
            switch(this.whitePieces[i].type){
                case 'KING':
                        if (this.whitePieces[i].moved) wPieces.push(`K${position[0]}${position[1]}t`);
                        else wPieces.push(`K${position[0]}${position[1]}f`);
                    break;
                case 'QUEEN':
                    wPieces.push(`Q${position[0]}${position[1]}`);
                    break;
                case 'BISHOP':
                    wPieces.push(`B${position[0]}${position[1]}`);
                    break;
                case 'ROOK':
                    if (this.whitePieces[i].moved) wPieces.push(`R${position[0]}${position[1]}t`);
                    else wPieces.push(`R${position[0]}${position[1]}f`);                    
                    break;
                case 'PAWN':
                    wPieces.push(`P${position[0]}${position[1]}`);
                    break;
                case 'KNIGHT':
                    wPieces.push(`C${position[0]}${position[1]}`);
                    break;
            }
        }  
        for(let i = 0; i < this.blackPieces.length; i++)
        {
            let position = this.blackPieces[i].position;
            switch(this.blackPieces[i].type){
                case 'KING':
                        if (this.blackPieces[i].moved) bPieces.push(`K${position[0]}${position[1]}t`);
                        else bPieces.push(`K${position[0]}${position[1]}f`);
                    break;
                case 'QUEEN':
                    bPieces.push(`Q${position[0]}${position[1]}`);
                    break;
                case 'BISHOP':
                    bPieces.push(`B${position[0]}${position[1]}`);
                    break;
                case 'ROOK':
                    if (this.blackPieces[i].moved) bPieces.push(`R${position[0]}${position[1]}t`);
                    else bPieces.push(`R${position[0]}${position[1]}f`);                    
                    break;
                case 'PAWN':
                    bPieces.push(`P${position[0]}${position[1]}`);
                    break;
                case 'KNIGHT':
                    bPieces.push(`C${position[0]}${position[1]}`);
                    break;
            }
        }      
        for(let i = 0; i < this.whiteTaken.length; i++)
        {
            switch(this.whiteTaken[i].type){
                case 'QUEEN':
                    wTaken += 'Q';
                    break;
                case 'BISHOP':
                    wTaken += 'B';
                    break;
                case 'ROOK':
                    wTaken += 'R';
                    break;
                case 'PAWN':
                    wTaken += 'P';
                    break;
                case 'KNIGHT':
                    wTaken += 'C';
                    break;
            }
        }
        for(let i = 0; i < this.blackTaken.length; i++)
        {
            switch(this.blackTaken[i].type){
                case 'QUEEN':
                    bTaken += 'Q';
                    break;
                case 'BISHOP':
                    bTaken += 'B';
                    break;
                case 'ROOK':
                    bTaken += 'R';
                    break;
                case 'PAWN':
                    bTaken += 'P';
                    break;
                case 'KNIGHT':
                    bTaken += 'C';
                    break;
            }
        }
        return {wPieces, bPieces, wTaken, bTaken};
    }

    GetPiecesFromBoard(pieces) // z objektu, ktory vrati funkcia PassPieces, nastavi figurky na momentalnu hraciu plochu
    {
        let wPiecesString = pieces.wPieces;
        let bPiecesString = pieces.bPieces;
        let wTakenString = pieces.wTaken;
        let bTakenString = pieces.bTaken;
        for(let i = 0; i < wPiecesString.length; i++)
        {
            let PiecePosition = [wPiecesString[i][1], wPiecesString[i][2]]
            switch(wPiecesString[i][0]){
                case 'K':
                    if(wPiecesString[i][3] == 't')this.whitePieces.unshift(new King(parseInt(PiecePosition[0]), parseInt(PiecePosition[1]), true, true));
                    else this.whitePieces.unshift(new King(parseInt(PiecePosition[0]), parseInt(PiecePosition[1]), true));
                    break;
                case 'R':
                    if(wPiecesString[i][3] == 't')this.whitePieces.push(new Rook(parseInt(PiecePosition[0]), parseInt(PiecePosition[1]), true, true));
                    else this.whitePieces.push(new Rook(parseInt(PiecePosition[0]), parseInt(PiecePosition[1]), true));
                    break;
                case 'Q':
                    this.whitePieces.push(new Queen(parseInt(PiecePosition[0]), parseInt(PiecePosition[1]), true))
                    break;
                case 'B':
                    this.whitePieces.push(new Bishop(parseInt(PiecePosition[0]), parseInt(PiecePosition[1]), true))
                    break;
                case 'P':
                    this.whitePieces.push(new Pawn(parseInt(PiecePosition[0]), parseInt(PiecePosition[1]), true))
                    break;
                case 'C':
                    this.whitePieces.push(new Knight(parseInt(PiecePosition[0]), parseInt(PiecePosition[1]), true))
                    break;
            }
        }
        for(let i = 0; i < bPiecesString.length; i++)
        {
            let PiecePosition = [bPiecesString[i][1], bPiecesString[i][2]]
            switch(bPiecesString[i][0]){
                case 'K':
                    if(bPiecesString[i][3] == 't')this.blackPieces.unshift(new King(parseInt(PiecePosition[0]), parseInt(PiecePosition[1]), false, true));
                    else this.blackPieces.unshift(new King(parseInt(PiecePosition[0]), parseInt(PiecePosition[1]), false));
                    break;
                case 'R':
                    if(bPiecesString[i][3] == 't')this.blackPieces.push(new Rook(parseInt(PiecePosition[0]), parseInt(PiecePosition[1]), false, true));
                    else this.blackPieces.push(new Rook(parseInt(PiecePosition[0]), parseInt(PiecePosition[1]), false));
                    break;
                case 'Q':
                    this.blackPieces.push(new Queen(parseInt(PiecePosition[0]), parseInt(PiecePosition[1]), false))
                    break;
                case 'B':
                    this.blackPieces.push(new Bishop(parseInt(PiecePosition[0]), parseInt(PiecePosition[1]), false))
                    break;
                case 'P':
                    this.blackPieces.push(new Pawn(parseInt(PiecePosition[0]), parseInt(PiecePosition[1]), false))
                    break;
                case 'C':
                    this.blackPieces.push(new Knight(parseInt(PiecePosition[0]), parseInt(PiecePosition[1]), false))
                    break;
            }
        }
        for(let i = 0; i < wTakenString.length; i++)
        {
            switch(wTakenString[i]){
                case 'R':
                    this.whiteTaken.push(new Rook(4,4, true));
                    break;
                case 'Q':
                    this.whiteTaken.push(new Queen(4,4, true));
                    break;
                case 'B':
                    this.whiteTaken.push(new Bishop(4,4, true));
                    break;
                case 'P':
                    this.whiteTaken.push(new Pawn(4,4, true));
                    break;
                case 'C':
                    this.whiteTaken.push(new Knight(4,4, true));
                    break;
            }
        }
        for(let i = 0; i < bTakenString.length; i++)
        {
            switch(bTakenString[i]){
                case 'R':
                    this.blackTaken.push(new Rook(4,4, false));
                    break;
                case 'Q':
                    this.blackTaken.push(new Queen(4,4, false));
                    break;
                case 'B':
                    this.blackTaken.push(new Bishop(4,4, false));
                    break;
                case 'P':
                    this.blackTaken.push(new Pawn(4,4, false));
                    break;
                case 'C':
                    this.blackTaken.push(new Knight(4,4, false));
                    break;
            }
        }
    }


}