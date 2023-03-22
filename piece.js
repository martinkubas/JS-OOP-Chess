class Piece{
    constructor(x,y, isWhite){
        this.position = [x,y];
        this.pixelPosition = [ x*tileSize + 10, y*tileSize + 7];
        this.isWhite = isWhite;
        
    }

    Show(){}
    Update(x, y, onlyPos = false){
        if(onlyPos)
        {
            this.position[0] = x;
            this.position[1] = y;
        }else
        {
            this.position[0] = x;
            this.position[1] = y;
            this.pixelPosition[0] = this.SetPixelPos(x,y)[0];
            this.pixelPosition[1] = this.SetPixelPos(x,y)[1];
            
        }
        
        
    }
    AllAvailableMoves(){}
    SetPixelPos(a,b){
        a = a * tileSize + 10;
        b = b* tileSize + 10;
        return [a,b];
    }
    
}


class King extends Piece{
    constructor(x, y, isWhite, moved = false){
        super(x,y, isWhite);
        this.type = 'KING';
        this.moved = moved;
        
    }


    Show(){
        if(this.isWhite){
            var img = new Image();
            img.src = 'chesspieces/wK.png';
            c.drawImage(img, this.pixelPosition[0], this.pixelPosition[1]);
            

        }else{
            var img = new Image();
            img.src = 'chesspieces/bK.png';
            c.drawImage(img, this.pixelPosition[0], this.pixelPosition[1]);
            
        }
    }
    Update(x, y, onlyPos = false){
        if(onlyPos)
        {
            this.position[0] = x;
            this.position[1] = y;
        }else
        {
            this.position[0] = x;
            this.position[1] = y;
            this.pixelPosition[0] = this.SetPixelPos(x,y)[0];
            this.pixelPosition[1] = this.SetPixelPos(x,y)[1];
            this.moved = true;
        }
        
        
    }
    AllAvailableMoves(passedBoard){    //vrati vsetky mozne tahy bez ohladu na to, ci po tahu nastane sach
        let availableMoves = [];    //x, y, 0/1/2 - 0 ak nieje na pozici ziadna figurka, 1 ak je priatelska figurka, 2 ak je nepriatelska
        let x = this.position[0];
        let y = this.position[1];


        /*Basic movement*/
        if(x + 1 <= 7 && y - 1 >= 0 && passedBoard.IsThereAPiece(x + 1, y - 1, this).isEnemy)
        {
            availableMoves.push([x+1, y-1, 2]);
        }else if(x + 1 <= 7 && y - 1 >= 0 && passedBoard.IsThereAPiece(x + 1, y - 1, this).isPiece && !passedBoard.IsThereAPiece(x + 1, y - 1, this).isEnemy) {
            availableMoves.push([x+1, y-1, 1]);
        }else if(x + 1 <= 7 && y - 1 >= 0 && !passedBoard.IsThereAPiece(x + 1, y - 1, this).isPiece){
            availableMoves.push([x+1, y-1, 0]);
        }

        if(x + 1 <= 7 && passedBoard.IsThereAPiece(x + 1, y, this).isEnemy)
        {
            availableMoves.push([x+1, y, 2]);
        }else if(x + 1 <= 7 && passedBoard.IsThereAPiece(x + 1, y, this).isPiece && !passedBoard.IsThereAPiece(x + 1, y, this).isEnemy){
            availableMoves.push([x+1, y, 1]);
        }else if(x + 1 <= 7 && !passedBoard.IsThereAPiece(x + 1, y, this).isPiece){
            availableMoves.push([x+1, y, 0]);
        }

        if(x + 1 <= 7 && y + 1 <= 7 &&  passedBoard.IsThereAPiece(x + 1, y + 1, this).isEnemy)
        {
            availableMoves.push([x+1, y+1, 2]);
        }else if(x + 1 <= 7 && y + 1 <= 7 && passedBoard.IsThereAPiece(x + 1, y + 1, this).isPiece && !passedBoard.IsThereAPiece(x + 1, y + 1, this).isEnemy){
            availableMoves.push([x+1, y+1, 1]);
        }else if(x + 1 <= 7 && y + 1 <= 7 && !passedBoard.IsThereAPiece(x + 1, y + 1, this).isPiece){
            availableMoves.push([x+1, y+1, 0]);
        }

        if(x - 1 >= 0  && y - 1 >= 0 &&  passedBoard.IsThereAPiece(x - 1, y - 1, this).isEnemy)
        {
            availableMoves.push([x-1, y-1, 2]);
        }else if(x - 1 >= 0  && y - 1 >= 0 && passedBoard.IsThereAPiece(x - 1, y - 1, this).isPiece && !passedBoard.IsThereAPiece(x - 1, y - 1, this).isEnemy){
            availableMoves.push([x-1, y-1, 1]);
        }else if(x - 1 >= 0  && y - 1 >= 0 && !passedBoard.IsThereAPiece(x - 1, y - 1, this).isPiece){
            availableMoves.push([x-1, y-1, 0]);

        }

        if(x - 1 >= 0 && passedBoard.IsThereAPiece(x - 1, y, this).isEnemy)
        {
            availableMoves.push([x-1, y, 2]);
        }else if(x - 1 >= 0 && passedBoard.IsThereAPiece(x - 1, y, this).isPiece && !passedBoard.IsThereAPiece(x - 1, y, this).isEnemy){
            availableMoves.push([x-1, y, 1]);
        }else if(x - 1 >= 0 && !passedBoard.IsThereAPiece(x - 1, y, this).isPiece){
            availableMoves.push([x-1, y, 0]);
            
        }

        if(x - 1 >= 0 && y + 1 <= 7 && passedBoard.IsThereAPiece(x - 1, y + 1, this).isEnemy)
        {
            availableMoves.push([x-1, y+1, 2]);
        }else if(x - 1 >= 0 && y + 1 <= 7 && passedBoard.IsThereAPiece(x - 1, y + 1, this).isPiece && passedBoard.IsThereAPiece(x - 1, y + 1, this).isEnemy){
            availableMoves.push([x-1, y+1, 1]);
        }else if(x - 1 >= 0 && y + 1 <= 7 && !passedBoard.IsThereAPiece(x - 1, y + 1, this).isPiece){
            availableMoves.push([x-1, y+1, 0]);

        }

        if (y - 1 >= 0 &&  passedBoard.IsThereAPiece(x, y - 1, this).isEnemy)
        {
            availableMoves.push([x, y-1, 2]);
        }else if(y - 1 >= 0 && passedBoard.IsThereAPiece(x, y - 1, this).isPiece && !passedBoard.IsThereAPiece(x, y - 1, this).isEnemy){
            availableMoves.push([x, y-1, 1]);
        }else if(y - 1 >= 0 && !passedBoard.IsThereAPiece(x, y - 1, this).isPiece){
            availableMoves.push([x, y-1, 0]);
        }

        if(y + 1 <= 7  && passedBoard.IsThereAPiece(x, y + 1, this).isEnemy)
        {
            availableMoves.push([x, y+1, 2]);
        }else if(y + 1 <= 7  && passedBoard.IsThereAPiece(x, y + 1, this).isPiece && !passedBoard.IsThereAPiece(x, y + 1, this).isEnemy){
            availableMoves.push([x, y+1, 1]);
        }else if(y + 1 <= 7  && !passedBoard.IsThereAPiece(x, y + 1, this).isPiece){
            availableMoves.push([x, y+1, 0]);
        }


       /*Castling*/
        if(!this.moved && !passedBoard.IsThereAPiece(x - 1, y, this).isPiece &&  !passedBoard.IsThereAPiece(x - 2, y, this).isPiece && !passedBoard.IsThereAPiece(x - 3, y, this).isPiece){       //dolava
            if(this.isWhite)
            {
                for(let i = 0; i < passedBoard.whitePieces.length; i++)
                {
                    if(passedBoard.whitePieces[i].type == 'ROOK' && passedBoard.whitePieces[i].position[0] == 0 && passedBoard.whitePieces[i].moved == false)
                    {
                        availableMoves.push([x-2, y, false]);
                    }
                }
            }else{
                for(let i = 0; i < passedBoard.blackPieces.length; i++)
                {
                    if(passedBoard.blackPieces[i].type == 'ROOK' && passedBoard.blackPieces[i].position[0] == 0 && passedBoard.blackPieces[i].moved == false)
                    {
                        availableMoves.push([x-2, y, false]);
                    }
                }
            }
        }

        if(!this.moved && !passedBoard.IsThereAPiece(x + 1, y, this).isPiece &&  !passedBoard.IsThereAPiece(x + 2, y, this).isPiece){        //doprava
            if(this.isWhite)
            {
                for(let i = 0; i < passedBoard.whitePieces.length; i++)
                {
                    if(passedBoard.whitePieces[i].type == 'ROOK' && passedBoard.whitePieces[i].position[0] == 7 && passedBoard.whitePieces[i].moved == false)
                    {
                        availableMoves.push([x+2, y, false]);
                    }
                }
            }else{
                for(let i = 0; i < passedBoard.blackPieces.length; i++)
                {
                    if(passedBoard.blackPieces[i].type == 'ROOK' && passedBoard.blackPieces[i].position[0] == 7 && passedBoard.blackPieces[i].moved == false)
                    {
                        availableMoves.push([x+2, y, false]);
                    }
                }
            }
        }
        
       
        
        

    


    
        return availableMoves;
    }

    
}


class Queen extends Piece{
    constructor(x, y, isWhite){
        super(x,y, isWhite)
        this.type = 'QUEEN';
    }


    Show(){
       
        if(this.isWhite){
            var img = new Image()
            img.src = 'chesspieces/wQ.png'
            c.drawImage(img, this.pixelPosition[0], this.pixelPosition[1])

        }
        else{
            var img = new Image()
            img.src = 'chesspieces/bQ.png'
            c.drawImage(img, this.pixelPosition[0], this.pixelPosition[1])
        }
        
        
    }
    AllAvailableMoves(passedBoard){
        let availableMoves = []
    
        /*styri loopy, kde sa riesi horziontalny a vertikalny pohyb do kazdej strany */
        for(let i  = this.position[0] + 1; i < 8; i++)
        {
            if(passedBoard.IsThereAPiece(i, this.position[1], this).isPiece && !passedBoard.IsThereAPiece(i, this.position[1], this).isEnemy)
            {
                availableMoves.push([i, this.position[1], 1]);
                break;
            }else if(passedBoard.IsThereAPiece(i, this.position[1], this).isEnemy){
                availableMoves.push([i, this.position[1], 2]);
                break;
            }else if(!passedBoard.IsThereAPiece(i, this.position[1], this).isPiece){
                availableMoves.push([i, this.position[1], 0]);
            }else {
                break;
            }
        }


        for(let i = this.position[0] - 1; i >= 0; i--)
        {  
            if(passedBoard.IsThereAPiece(i, this.position[1], this).isPiece && !passedBoard.IsThereAPiece(i, this.position[1], this).isEnemy)
            {
                availableMoves.push([i, this.position[1], 1]);
                break;
            }else if(passedBoard.IsThereAPiece(i, this.position[1], this).isEnemy){
                availableMoves.push([i, this.position[1], 2]);
                break;
            }else if(!passedBoard.IsThereAPiece(i, this.position[1], this).isPiece){
                availableMoves.push([i, this.position[1], 0]);
            }else {
                break;
            }
             
                        
        }
       


        for(let i = this.position[1] + 1; i < 8; i++)
        {
            if(passedBoard.IsThereAPiece(this.position[0], i, this).isPiece && !passedBoard.IsThereAPiece(this.position[0], i, this).isEnemy)
            {
                availableMoves.push([this.position[0], i, 1]);
                break;
            }else if(passedBoard.IsThereAPiece(this.position[0], i, this).isEnemy){
                availableMoves.push([this.position[0], i, 2]);
                break;
            }else if(!passedBoard.IsThereAPiece(this.position[0], i, this).isPiece){
                availableMoves.push([this.position[0], i, 0]);
            }else {
                break;
            }
        }

        for(let i = this.position[1] - 1; i >= 0; i--)
        {
            if(passedBoard.IsThereAPiece(this.position[0], i, this).isPiece && !passedBoard.IsThereAPiece(this.position[0], i, this).isEnemy)
            {
                availableMoves.push([this.position[0], i, 1]);
                break;
            }else if(passedBoard.IsThereAPiece(this.position[0], i, this).isEnemy){
                availableMoves.push([this.position[0], i, 2]);
                break;
            }else if(!passedBoard.IsThereAPiece(this.position[0], i, this).isPiece){
                availableMoves.push([this.position[0], i, 0]);
            }else {
                break;
            }
        }
        /********************** */


        /*taktiez styri loopy, kde sa riesi diagonalny pohyb */
        let x = this.position[0] + 1;                                                  
        let y = this.position[1] + 1;                                     
        for (let i = 0; i < 8; i++) {   
            if(x > 7 || y > 7)
            {
                break;
            }  
                                          //
            if(!passedBoard.IsThereAPiece(x, y, this).isPiece)
            {
                availableMoves.push([x, y, 0]); 
            }else if(passedBoard.IsThereAPiece(x, y, this).isEnemy){
                availableMoves.push([x, y, 2]);
                break;
            }else if(passedBoard.IsThereAPiece(x, y, this).isPiece && !passedBoard.IsThereAPiece(x, y, this).isEnemy)
            {
                availableMoves.push([x, y, 1]);
                break;
            }else{
                break;
            }
            
            
            x ++;
            y ++;
            
        }
        x = this.position[0] - 1;
        y = this.position[1] - 1;
        for (let i = 0; i < 8; i++) {
            if(x < 0 || y < 0)
            {
                break;
            }

            if(!passedBoard.IsThereAPiece(x, y, this).isPiece)
            {
                availableMoves.push([x, y, 0]); 
            }else if(passedBoard.IsThereAPiece(x, y, this).isEnemy){
                availableMoves.push([x, y, 2]); 
                break;
            }else if(passedBoard.IsThereAPiece(x, y, this).isPiece && !passedBoard.IsThereAPiece(x, y, this).isEnemy){
                availableMoves.push([x, y, 1]); 
                break;
            }else{
                break;
            }
            x -= 1;
            y -= 1;                                                          

        }
        x = this.position[0] + 1;
        y = this.position[1] - 1;                                          
        for(let i = 0; i < 8; i++)                                      
        {   
            if(x > 7 || y < 0)
            {
                break;
            }
            
            if(!passedBoard.IsThereAPiece(x, y, this).isPiece)
            {
                availableMoves.push([x, y, 0]) 
            }
            else if(passedBoard.IsThereAPiece(x, y, this).isPiece && passedBoard.IsThereAPiece(x, y, this).isEnemy){
                availableMoves.push([x, y, 2]); 
                break;
            }else if(passedBoard.IsThereAPiece(x, y, this).isPiece && !passedBoard.IsThereAPiece(x, y, this).isEnemy){
                availableMoves.push([x, y, 1]); 
                break;
            }else{
                break;
            }
            x += 1;
            y -= 1;
        }
       x = this.position[0] - 1
       y = this.position[1] + 1
       for(let i = 0; i < 8; i++)
       {
            if(x < 0 || y > 7)
            {
                break;
            }

            if(!passedBoard.IsThereAPiece(x, y, this).isPiece)
            {
                availableMoves.push([x, y, 0]); 
            }
            else if(passedBoard.IsThereAPiece(x, y, this).isPiece && passedBoard.IsThereAPiece(x, y, this).isEnemy){
                availableMoves.push([x, y, 2]); 
                break;
            }else if(passedBoard.IsThereAPiece(x, y, this).isPiece && !passedBoard.IsThereAPiece(x, y, this).isEnemy){
                availableMoves.push([x, y, 1]); 
                break;
            }else{
                break;
            }
                                                                    
            x -= 1;                                                      
            y += 1;                                                      
       }     
       /*********************** */                                                       

       
        return availableMoves
    }
}


class Pawn extends Piece{
    constructor(x, y, isWhite){
        super(x,y, isWhite);
        this.type = 'PAWN';
        
    }


    Show(){
        if(this.isWhite){
            var img = new Image();
            img.src = 'chesspieces/wP.png';
            c.drawImage(img, this.pixelPosition[0], this.pixelPosition[1]);

        }
        else{
            var img = new Image();
            img.src = 'chesspieces/bP.png';
            c.drawImage(img, this.pixelPosition[0], this.pixelPosition[1]);
        }
        
        
    }
  

    AllAvailableMoves(passedBoard){
        let availableMoves = [];
        let x = this.position[0];
        let y = this.position[1];

        if(this.isWhite){ //pesiaci sa hybu podla toho, aku maju farbu
            if(this.position[1] == 6 && !passedBoard.IsThereAPiece(x , y - 1, this).isPiece )      //ak je na zaciatocnej pozicii
            {
                if(!passedBoard.IsThereAPiece(x , y - 2, this).isPiece){
                    availableMoves.push([x, y-2, 0]);
                }
                availableMoves.push([x, y-1, 0]);
            
            }else if(y - 1 >= 0 && !passedBoard.IsThereAPiece(x , y - 1, this).isPiece){
                availableMoves.push([x, y-1, 0]);
            } 

            if(y - 1 >= 0 && x + 1 <= 7  && passedBoard.IsThereAPiece(x + 1 , y - 1, this).isEnemy){
                availableMoves.push([x + 1, y - 1, 2]);
            }

            if(y - 1 >= 0 && x - 1 >= 0 && passedBoard.IsThereAPiece(x - 1 , y - 1, this).isEnemy){
                availableMoves.push([x - 1, y - 1, 2]);
            }
        }else{

            if(this.position[1] == 1 && !passedBoard.IsThereAPiece(x , y + 1, this).isPiece)
            {
                if(!passedBoard.IsThereAPiece(x , y + 2, this).isPiece){
                    availableMoves.push([x, y+2, 0]);
                }
                availableMoves.push([x, y+1, 0]);
            
            }else if(y + 1 <= 7 && !passedBoard.IsThereAPiece(x , y + 1, this).isPiece){
                availableMoves.push([x, y+1, 0]);
            } 

            if(y + 1 <= 7 && x + 1 <= 7  && passedBoard.IsThereAPiece(x + 1 , y + 1, this).isEnemy){
                availableMoves.push([x + 1, y + 1, 2]);
            }

            if(y + 1 <= 7 && x - 1 >= 0 && passedBoard.IsThereAPiece(x - 1 , y + 1, this).isEnemy){
                availableMoves.push([x - 1, y + 1, 2]);
            }

        }
                

        return availableMoves;
    }

    
}


class Knight extends Piece{
    constructor(x, y, isWhite){
        super(x,y, isWhite);
        this.type = 'KNIGHT';
    }


    Show(){
        if(this.isWhite){
            var img = new Image();
            img.src = 'chesspieces/wN.png';
            c.drawImage(img, this.pixelPosition[0], this.pixelPosition[1]);

        }else{
            var img = new Image();
            img.src = 'chesspieces/bN.png';
            c.drawImage(img, this.pixelPosition[0], this.pixelPosition[1]);
        }        
    }

    

    AllAvailableMoves(passedBoard){
        let availableMoves = [];
        let x = this.position[0];
        let y = this.position[1];

        if(x + 2 <= 7 && y - 1 >= 0 && !passedBoard.IsThereAPiece(x + 2, y - 1, this).isPiece ){ 
            availableMoves.push([x+2, y-1, 0]);
        }else if(x + 2 <= 7 && y - 1 >= 0 && passedBoard.IsThereAPiece(x + 2, y - 1, this).isEnemy){
            availableMoves.push([x+2,y-1, 2]);
        }else if(x + 2 <= 7 && y - 1 >= 0 && passedBoard.IsThereAPiece(x + 2, y - 1, this).isPiece){
            availableMoves.push([x+2,y-1, 1]);
        }

        if(x + 2 <= 7 && y + 1  <= 7 && !passedBoard.IsThereAPiece(x + 2, y + 1, this).isPiece ){
            availableMoves.push([x+2, y+1, 0]);
        }else if(x + 2 <= 7 && y + 1  <= 7 && passedBoard.IsThereAPiece(x + 2, y + 1, this).isEnemy){
            availableMoves.push([x+2, y+1, 2]);
        }else if(x + 2 <= 7 && y + 1  <= 7 && passedBoard.IsThereAPiece(x + 2, y + 1, this).isPiece){
            availableMoves.push([x+2, y+1, 1]);

        }

        if(x - 2 >= 0 && y - 1 >=0 && !passedBoard.IsThereAPiece(x - 2, y - 1, this).isPiece){
            availableMoves.push([x-2, y-1,0]);
        }else if(x - 2 >= 0 && y - 1 >=0 && passedBoard.IsThereAPiece(x - 2, y - 1, this).isEnemy){
            availableMoves.push([x-2,y-1,2]);
        }else if(x - 2 >= 0 && y - 1 >=0 && passedBoard.IsThereAPiece(x - 2, y - 1, this).isPiece){
            availableMoves.push([x-2,y-1,1]);
        }

        if(x - 2 >= 0 && y + 1 <= 7 && !passedBoard.IsThereAPiece(x - 2, y + 1, this).isPiece){
            availableMoves.push([x-2, y+1, 0]);
        }else if(x - 2 >= 0 && y + 1 <= 7 && passedBoard.IsThereAPiece(x - 2, y + 1, this).isEnemy){
            availableMoves.push([x-2, y+1, 2]);
        }else if(x - 2 >= 0 && y + 1 <= 7 && passedBoard.IsThereAPiece(x - 2, y + 1, this).isPiece){
            availableMoves.push([x-2, y+1, 1]);

        }



        if(x + 1 <= 7 && y + 2 <= 7 && !passedBoard.IsThereAPiece(x + 1, y + 2, this).isPiece){
            availableMoves.push([x+1, y+2, 0]);
        }else if(x + 1 <= 7 && y + 2 <= 7 && passedBoard.IsThereAPiece(x + 1, y + 2, this).isEnemy){
            availableMoves.push([x+1, y+2, 2]);
        }else if(x + 1 <= 7 && y + 2 <= 7 && passedBoard.IsThereAPiece(x + 1, y + 2, this).isPiece){
            availableMoves.push([x+1, y+2, 1]);

        }

        if(x + 1 <= 7 && y - 2 >=0 && !passedBoard.IsThereAPiece(x + 1, y - 2, this).isPiece)
        {
            availableMoves.push([x+1, y-2,0]);
        }else if(x + 1 <= 7 && y - 2 >=0 && passedBoard.IsThereAPiece(x + 1, y - 2, this).isEnemy){
            availableMoves.push([x+1, y-2,2]);
        }else if(x + 1 <= 7 && y - 2 >=0 && passedBoard.IsThereAPiece(x + 1, y - 2, this).isPiece){
            availableMoves.push([x+1, y-2,1]);
        }

        if(x - 1 >= 0 && y + 2 <= 7 && !passedBoard.IsThereAPiece(x - 1, y + 2, this).isPiece)
        {
            availableMoves.push([x-1, y+2, 0]);
        }else if(x - 1 >= 0 && y + 2 <= 7 && passedBoard.IsThereAPiece(x - 1, y + 2, this).isEnemy){
            availableMoves.push([x-1, y+2, 2]);
        }else if(x - 1 >= 0 && y + 2 <= 7 && passedBoard.IsThereAPiece(x - 1, y + 2, this).isEnemy){
            availableMoves.push([x-1, y+2, 1]);
        }

        if(x - 1 >= 0  && y - 2 >=0 && !passedBoard.IsThereAPiece(x - 1, y - 2, this).isPiece)
        {
            availableMoves.push([x-1, y-2, 0]);
        }else if(x - 1 >= 0  && y - 2 >=0 && passedBoard.IsThereAPiece(x - 1, y - 2, this).isEnemy){
            availableMoves.push([x-1, y-2, 2]);
        }else if(x - 1 >= 0  && y - 2 >=0 && passedBoard.IsThereAPiece(x - 1, y - 2, this).isPiece){
            availableMoves.push([x-1, y-2, 1]);
        }

        return availableMoves;
    }
}


class Bishop extends Piece{
    constructor(x, y, isWhite){
        super(x,y, isWhite);
        this.type = 'BISHOP';
    }


    Show(){
        if(this.isWhite){
            var img = new Image();
            img.src = 'chesspieces/wB.png';
            c.drawImage(img, this.pixelPosition[0], this.pixelPosition[1]);

        }else{
            var img = new Image()
            img.src = 'chesspieces/bB.png';
            c.drawImage(img, this.pixelPosition[0], this.pixelPosition[1]);
        }        
    }
    AllAvailableMoves(passedBoard){
        let availableMoves = [];
    

        let x = this.position[0] + 1;                                                  
        let y = this.position[1] + 1;                                     
        for (let i = 0; i < 8; i++) {   
            if(x > 7 || y > 7)
            {
                break;
            }  
                
            if(!passedBoard.IsThereAPiece(x, y, this).isPiece)
            {
                availableMoves.push([x, y, 0]); 
            }else if(passedBoard.IsThereAPiece(x, y, this).isEnemy){
                availableMoves.push([x, y, 2]);
                break;
            }else if(passedBoard.IsThereAPiece(x, y, this).isPiece && !passedBoard.IsThereAPiece(x, y, this).isEnemy)
            {
                availableMoves.push([x, y, 1]);
                break;
            }else{
                break;
            }
            
            
            x ++;
            y ++;
            
        }
        x = this.position[0] - 1;
        y = this.position[1] - 1;
        for (let i = 0; i < 8; i++) {
            if(x < 0 || y < 0)
            {
                break;
            }

            if(!passedBoard.IsThereAPiece(x, y, this).isPiece)
            {
                availableMoves.push([x, y, 0]); 
            }else if(passedBoard.IsThereAPiece(x, y, this).isEnemy){
                availableMoves.push([x, y, 2]); 
                break;
            }else if(passedBoard.IsThereAPiece(x, y, this).isPiece && !passedBoard.IsThereAPiece(x, y, this).isEnemy){
                availableMoves.push([x, y, 1]); 
                break;
            }else{
                break;
            }
            x -= 1;
            y -= 1;                                                          

        }
        x = this.position[0] + 1;
        y = this.position[1] - 1;                                          
        for(let i = 0; i < 8; i++)                                      
        {   
            if(x > 7 || y < 0)
            {
                break;
            }
            
            if(!passedBoard.IsThereAPiece(x, y, this).isPiece)
            {
                availableMoves.push([x, y, 0]) 
            }
            else if(passedBoard.IsThereAPiece(x, y, this).isPiece && passedBoard.IsThereAPiece(x, y, this).isEnemy){
                availableMoves.push([x, y, 2]); 
                break;
            }else if(passedBoard.IsThereAPiece(x, y, this).isPiece && !passedBoard.IsThereAPiece(x, y, this).isEnemy){
                availableMoves.push([x, y, 1]); 
                break;
            }else{
                break;
            }
            x += 1;
            y -= 1;
        }
       x = this.position[0] - 1
       y = this.position[1] + 1
       for(let i = 0; i < 8; i++)
       {
            if(x < 0 || y > 7)
            {
                break;
            }

            if(!passedBoard.IsThereAPiece(x, y, this).isPiece)
            {
                availableMoves.push([x, y, 0]); 
            }
            else if(passedBoard.IsThereAPiece(x, y, this).isPiece && passedBoard.IsThereAPiece(x, y, this).isEnemy){
                availableMoves.push([x, y, 2]); 
                break;
            }else if(passedBoard.IsThereAPiece(x, y, this).isPiece && !passedBoard.IsThereAPiece(x, y, this).isEnemy){
                availableMoves.push([x, y, 1]); 
                break;
            }else{
                break;
            }
                                                                    
            x -= 1;                                                      
            y += 1;                                                      
       }                                                             

        return availableMoves;
    }
}


class Rook extends Piece{
    constructor(x, y, isWhite, moved = false){
        super(x,y, isWhite);
        this.type = 'ROOK';
        this.moved = moved;
    }


    Show(){
        if(this.isWhite){
            var img = new Image();
            img.src = 'chesspieces/wR.png';
            c.drawImage(img, this.pixelPosition[0], this.pixelPosition[1]);

        }else{
            var img = new Image();
            img.src = 'chesspieces/bR.png';
            c.drawImage(img, this.pixelPosition[0], this.pixelPosition[1]);
        }
        
        
    }
    Update(x, y, onlyPos = false){
        if(onlyPos)
        {
            this.position[0] = x;
            this.position[1] = y;
        }else
        {
            this.position[0] = x;
            this.position[1] = y;
            this.pixelPosition[0] = this.SetPixelPos(x,y)[0];
            this.pixelPosition[1] = this.SetPixelPos(x,y)[1];
            this.moved = true;
        }
        
        
    }
    AllAvailableMoves(passedBoard){
        let availableMoves = [];
        
        for(let i  = this.position[0] + 1; i < 8; i++)
        {
            if(passedBoard.IsThereAPiece(i, this.position[1], this).isPiece && !passedBoard.IsThereAPiece(i, this.position[1], this).isEnemy)
            {
                availableMoves.push([i, this.position[1], 1]);
                break;
            }else if(passedBoard.IsThereAPiece(i, this.position[1], this).isEnemy){
                availableMoves.push([i, this.position[1], 2]);
                break;
            }else if(!passedBoard.IsThereAPiece(i, this.position[1], this).isPiece){
                availableMoves.push([i, this.position[1], 0]);
            }else {
                break;
            }
        }


        for(let i = this.position[0] - 1; i >= 0; i--)
        {  
            if(passedBoard.IsThereAPiece(i, this.position[1], this).isPiece && !passedBoard.IsThereAPiece(i, this.position[1], this).isEnemy)
            {
                availableMoves.push([i, this.position[1], 1]);
                break;
            }else if(passedBoard.IsThereAPiece(i, this.position[1], this).isEnemy){
                availableMoves.push([i, this.position[1], 2]);
                break;
            }else if(!passedBoard.IsThereAPiece(i, this.position[1], this).isPiece){
                availableMoves.push([i, this.position[1], 0]);
            }else {
                break;
            }
             
                        
        }
       


        for(let i = this.position[1] + 1; i < 8; i++)
        {
            if(passedBoard.IsThereAPiece(this.position[0], i, this).isPiece && !passedBoard.IsThereAPiece(this.position[0], i, this).isEnemy)
            {
                availableMoves.push([this.position[0], i, 1]);
                break;
            }else if(passedBoard.IsThereAPiece(this.position[0], i, this).isEnemy){
                availableMoves.push([this.position[0], i, 2]);
                break;
            }else if(!passedBoard.IsThereAPiece(this.position[0], i, this).isPiece){
                availableMoves.push([this.position[0], i, 0]);
            }else {
                break;
            }
        }

        for(let i = this.position[1] - 1; i >= 0; i--)
        {
            if(passedBoard.IsThereAPiece(this.position[0], i, this).isPiece && !passedBoard.IsThereAPiece(this.position[0], i, this).isEnemy)
            {
                availableMoves.push([this.position[0], i, 1]);
                break;
            }else if(passedBoard.IsThereAPiece(this.position[0], i, this).isEnemy){
                availableMoves.push([this.position[0], i, 2]);
                break;
            }else if(!passedBoard.IsThereAPiece(this.position[0], i, this).isPiece){
                availableMoves.push([this.position[0], i, 0]);
            }else {
                break;
            }
        }


        return availableMoves;
    }
}