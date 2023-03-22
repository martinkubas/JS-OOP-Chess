const canvas = document.querySelector('canvas');
const c = canvas.getContext('2d');
canvas.width = 800;
canvas.height = 800;
var tileSize = 100;

c.font = '40px Arial';


let clickX = 10000;
let clickY = 10000;
const text = document.getElementById('text');
let whiteTurn = true;
let selectedPiece = '';
let availableMoves = [];
let gameType = localStorage.getItem('gameType')? localStorage.getItem('gameType') : 'PVP';
let difficulty = localStorage.getItem('difficulty') ? localStorage.getItem('difficulty') : '';
const board = new Board();
board.startPieces();








let animationId;
function draw(){
    c.clearRect(0,0, canvas.width, canvas.height);
    animationId = requestAnimationFrame(draw);

    if(whiteTurn && board.checkStaleMate(true)){
        text.style.display = 'block';
        text.innerHTML = 'Stalemate!';
        cancelAnimationFrame(animationId);
    }else if(!whiteTurn && board.checkStaleMate(true)){
        text.style.display = 'block';
        text.innerHTML = 'Stalemate!';
        cancelAnimationFrame(animationId);
    }else if(whiteTurn && board.checkCheckMate(true)){
        text.style.display = 'block';
        text.innerHTML = 'Koniec hry! Čierny vyhral!';
        cancelAnimationFrame(animationId);
        console.log('sachMat biely');
    }else if(board.checkCheckMate(false))
    {
        text.style.display = 'block';
        text.innerHTML = 'Koniec hry! Biely vyhral!';
        cancelAnimationFrame(animationId);
        console.log('sachMat cierny')

    }else if(board.checkCheck(true) || board.checkCheck(false)){
        text.style.display = 'block';
        text.innerHTML = 'Pozor Šach!';
        console.log('pozor sach');
    }else{
        text.style.display = 'none';
    }
    
    

    board.drawBoard();
    
    if (selectedPiece) {
        
        for (let i = 0; i < availableMoves.length; i++)
        {
            c.fillStyle = "rgba(255, 0, 0, 0.25)";
           
            c.fillRect(tileSize * availableMoves[i][0], tileSize * availableMoves[i][1], tileSize,tileSize);
            
        }

       if(selectedPiece && selectedPiece.position[0] != clickX || selectedPiece.position[1] != clickY) // ak si hrac vybral iny stvorec ako ten, na ktorom je jeho vybrata figurka
       {
        let posNow = [];
        if(whiteTurn){
            for(let i = 0; i < availableMoves.length; i++)
            {
                
                if(availableMoves[i][0] == clickX && availableMoves[i][1] == clickY)
                {
                    for(let i = 0; i < board.whitePieces.length; i++)
                    {
                        if(checkSamePosition(selectedPiece.position, board.whitePieces[i].position))      //vybratie presnej figurky, aby sme s nou mohli dalej manipulovat
                        {
                            posNow[0] = board.whitePieces[i].position[0];
                            posNow[1] = board.whitePieces[i].position[1];
                            if(board.whitePieces[i].type == 'KING' && clickX == 2 && clickY == 7 && board.whitePieces[i].moved == false)       //castling dolava
                            {
                                
                                board.whitePieces[i].Update(clickX, clickY);
                            
                                for(let j = 0; j < board.whitePieces.length; j++)
                                {
                                    if(board.whitePieces[j].type == 'ROOK' && board.whitePieces[j].position[0] == 0)    //najdeme lavu vezu a updatneme aj jej poziciu
                                    {
                                        board.whitePieces[j].Update(3,7);
                                        break;
                                    }
                                }
                               
                              
                               
                            }
                            else if(board.whitePieces[i].type == 'KING' && clickX == 6 && clickY == 7 && board.whitePieces[i].moved == false){     //castling doprava
                                board.whitePieces[i].Update(clickX, clickY);
                                
                                for(let j = 0; j < board.whitePieces.length; j++)
                                {
                                    if(board.whitePieces[j].type == 'ROOK' && board.whitePieces[j].position[0] == 7)    //najdeme pravu vezu a updatneme aj jej poziciu
                                    {
                                        board.whitePieces[j].Update(5,7);
                                        break;
                                    }
                                }
                                
                            }
                            else{ 
                                board.whitePieces[i].Update(clickX, clickY);
                            }

                            

                            if(board.whitePieces[i].type == 'PAWN' && board.whitePieces[i].position[1] == 0)        //ak sa pesiak dostane na druhu stranu hracej plochy tak sa zmeni na kralovnu
                            {   
                                board.whitePieces.push(new Queen(board.whitePieces[i].position[0], board.whitePieces[i].position[1], true));
                                board.whitePieces.splice(i, 1);
                                
                            }


                            for(let j = 0; j < board.blackPieces.length; j++)//vyhodenie
                            {
                                if(board.blackPieces[j].position[0] == clickX && board.blackPieces[j].position[1] == clickY)
                                {
                                    board.blackTaken.push(board.blackPieces[j]);
                                    board.blackPieces.splice(j, 1);
                                    break;
                                }
                            }

                            whiteTurn ^= true;
                            selectedPiece = '';
                            break;
                            
                           
                        }
                        
                        
                        
                        
                    }
                        
                    
                }
            }
        }
        else if(!whiteTurn && gameType == 'PVP'){              //cierny tah (hrac proti hracovi)
            for(let i = 0; i < availableMoves.length; i++)
            {
                
                if(availableMoves[i][0] == clickX && availableMoves[i][1] == clickY)
                {
                    for(let i = 0; i < board.blackPieces.length; i++)
                    {
                        if(checkSamePosition(selectedPiece.position, board.blackPieces[i].position))      
                        {
                            posNow[0] = board.blackPieces[i].position[0];
                            posNow[1] = board.blackPieces[i].position[1];
                            if(board.blackPieces[i].type == 'KING' && clickX == 2 && clickY == 0 && board.blackPieces[i].moved == false)       
                            {
                                
                                board.blackPieces[i].Update(clickX, clickY);
                            
                                for(let j = 0; j < board.blackPieces.length; j++)
                                {
                                    if(board.blackPieces[j].type == 'ROOK' && board.blackPieces[j].position[0] == 0)    
                                    {
                                        board.blackPieces[j].Update(3,0);
                                        break;
                                    }
                                }
                               
                              
                               
                            }
                            else if(board.blackPieces[i].type == 'KING' && clickX == 6 && clickY == 0 && board.blackPieces[i].moved == false){     
                                board.blackPieces[i].Update(clickX, clickY);
                                
                                for(let j = 0; j < board.blackPieces.length; j++)
                                {
                                    if(board.blackPieces[j].type == 'ROOK' && board.blackPieces[j].position[0] == 7)    
                                    {
                                        board.blackPieces[j].Update(5,0);
                                        break;
                                    }
                                }
                                
                            }
                            else{ 
                                board.blackPieces[i].Update(clickX, clickY);
                            }

                            

                            if(board.blackPieces[i].type == 'PAWN' && board.blackPieces[i].position[1] == 0)        
                            {   
                                board.blackPieces.push(new Queen(board.blackPieces[i].position[0], board.blackPieces[i].position[1], false));
                                board.blackPieces.splice(i, 1);
                                
                            }


                            for(let j = 0; j < board.whitePieces.length; j++)
                            {
                                if(board.whitePieces[j].position[0] == clickX && board.whitePieces[j].position[1] == clickY)
                                {
                                    board.whiteTaken.push(board.whitePieces[j]);
                                    board.whitePieces.splice(j, 1);
                                    break;
                                }
                            }                            
                            
                            whiteTurn ^= true;
                            selectedPiece = '';
                            break;
                            
                                
                        }
                        
                        
                        
                        
                    }
                        
                    
                }
            }
                                
        }
       
       }
       
    }else if(!whiteTurn && gameType == 'PVE' && difficulty == 'easy'){   //random pohyb ciernych (easy difficulty)
        easyAI();
    }else if(!whiteTurn && gameType == 'PVE' && difficulty == 'medium'){ //minimax algoritmus, ktory pozera dva tahy dopredu (medium difficulty)

        let result = minimax(board, 3, Number.NEGATIVE_INFINITY, Number.POSITIVE_INFINITY, false); //na zaklade toho, co vratil minmax algoritmus pocitac vykona tah
        console.log(result)
        let bestPiece = result[1];
        let bestMove = result[2];
        if(bestMove != undefined)
        {
            console.log(result)
            
            for(let i = 0; i < board.blackPieces.length; i++)
            {
                if(board.blackPieces[i].type == bestPiece.type && checkSamePosition(board.blackPieces[i].position, bestPiece.position))
                {
                    board.blackPieces[i].Update(bestMove[0], bestMove[1]);
                    
                    if(board.blackPieces[i].type == 'PAWN' && board.blackPieces[i].position[1] == 7)        //ak sa pesiak dostane na druhu stranu hracej plochy tak sa zmeni na kralovnu
                    {   
                        board.blackPieces.push(new Queen(board.blackPieces[i].position[0], board.blackPieces[i].position[1], false));
                        board.blackPieces.splice(i, 1);
                        
                    }
                    break;
                }
            }
            for(let i = 0; i < board.whitePieces.length; i++)
            {
                if(board.whitePieces[i].position[0] == bestMove[0] && board.whitePieces[i].position[1] == bestMove[1])
                {
                    board.whiteTaken.push(board.whitePieces[i]);
                    board.whitePieces.splice(i, 1);
                    break;
                }
            }
            
            whiteTurn ^= true;
        }else if(!board.checkCheckMate()){
            board.blackPieces[0].Update(board.checkAvailableMoves(0,false)[0][0], board.checkAvailableMoves(0,false)[0][1]);
            if(board.checkAvailableMoves(0,false)[0][2] == 2)
            {
                for(let i = 0; i < board.whitePieces.length; i++)
                {
                    if(board.whitePieces[i].position[0] == bestMove[0] && board.whitePieces[i].position[1] == bestMove[1])
                    {
                        board.whiteTaken.push(board.whitePieces[i]);
                        board.whitePieces.splice(i, 1);
                        break;
                    }
                }
            }

            console.log('error')
        }
        
    }
   board.show();

}

draw()


window.addEventListener('click', (event) => {
    
    clickX = Math.floor(event.pageX / 100);
    clickY = Math.floor(event.pageY / 100);

   
    if(whiteTurn){  //oznacit bielu figurku sa da len ak je tah bieleho hraca
        for(let i = 0; i < board.whitePieces.length; i++ )
        {
             if(board.whitePieces[i].position[0] == clickX && board.whitePieces[i].position[1] == clickY)   
             {
                
                selectedPiece = board.whitePieces[i];
                availableMoves = board.checkAvailableMoves(i, true);
                console.log(selectedPiece.AllAvailableMoves(board));
             }
        }
    }else{
        for(let i = 0; i < board.blackPieces.length; i++ )
        {
             if(board.blackPieces[i].position[0] == clickX && board.blackPieces[i].position[1] == clickY)
             {
                

                 selectedPiece = board.blackPieces[i];
                 availableMoves = board.checkAvailableMoves(i, false);  
             }
        }
    }
   
    
  })

 


