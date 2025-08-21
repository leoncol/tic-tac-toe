
const gameController = (function () {
    
    const playerOne = createPlayer('Player #1');
    const playerTwo = createPlayer('Player #2');
    const currentGame = playerTurn();
    let currentTurn = currentGame(playerOne);
    let currentGlobalCell = 0;

  return {playerOne, playerTwo, currentGame, currentTurn, currentGlobalCell}

})();

const domElements = {
    gamePositions: document.querySelectorAll('.game-position'),
    gameBoard: document.querySelector('.game-board'),
    createSymbol: function createSymbol() {
        let xSymbol = document.createElement("img");
        let oSymbol = document.createElement("img");
        let placeX = xSymbol;
        
        placeX.src = "./assets/PlayStationCross.png";
        oSymbol.src = "./assets/PlayStationCircle.png";
        placeX.className = oSymbol.className = "symbol";
        
        return {xSymbol, oSymbol};
        
    }
    
    
    

};



function insertSymbol(event) {

    if (gameController.currentTurn == 1){
        clicked = domElements.createSymbol().xSymbol;
    } else {
        clicked = domElements.createSymbol().oSymbol;
    }
    
    if (event.target.hasChildNodes() == false){
        event.target.appendChild(clicked);
        nextPlayer();
    }
}

function playGame(){
    domElements.gameBoard.addEventListener("click", addDomPosition);
    domElements.gameBoard.addEventListener("click", insertSymbol);
    
}

function addDomPosition(event){
    let currentCell = 0;
    switch (event.target.id){
        case 'position-1':
            currentCell = 1; 
            break;
        case 'position-2':
            currentCell = 2;
            break;
        case 'position-3':
            currentCell = 3;
            break;
        case 'position-4':
            currentCell = 4;
            break;
        case 'position-5':
            currentCell = 5;
            break;
        case 'position-6':
            currentCell = 6;
            break;
        case 'position-7':
            currentCell = 7;
            break;
        case 'position-8':
            currentCell = 8;
            break;
        case 'position-9':
            currentCell = 9;
            break;
    }
    gameController.currentGlobalCell = currentCell;
    chooseCell();
    
    
}



const gameBoard = (function () {
    const board = [];

     for (let i = 0; i < 9; i++) {
    board[i] = [];
  }

  return {board}

})();   

function playerTurn() {
    let turn = 0;
    return function resulting (player) {
    player.name == 'Player #1' ? turn = 1 : turn = 2;
    return turn;
    ;
            
        
    }
    

}  

function createPlayer(name) {
    let placedTokens = [];
    let isWinner = false;
    return {name, placedTokens, isWinner};
    
}

 function chooseCell(){
    if (gameController.currentTurn == 1) {
        let cell = Number(gameController.currentGlobalCell);
        targetArray(cell);
       
    
        
    } else {
        let cell = Number(gameController.currentGlobalCell);
        targetArray(cell);
        
    }
    
   

    
}





function placeToken(cell) {
    let token = cell + 1;
    gameBoard.board[cell].push(token);
    placedTokens(token);

    
    
}

function targetArray(cell) { // Adjusts values to target the right array.
    cell = cell - 1;
    isRepeated(cell);
}

function nextPlayer() {
    if (gameController.currentTurn == 1){
        gameController.currentTurn = gameController.currentGame(gameController.playerTwo);
        
    } else {
        gameController.currentTurn = gameController.currentGame(gameController.playerOne);
        
    }
}


function isRepeated(cell) {
    if (gameBoard.board[cell] == 0) {
        placeToken(cell);

    } else {
        alert('Cell taken! Choose another one.');
        
    }
}

function placedTokens(token) {
    if (gameController.currentTurn == 1){
        gameController.playerOne.placedTokens.push(token)
        checkWin(gameController.playerOne);
        
    } else {
        gameController.playerTwo.placedTokens.push(token);
        checkWin(gameController.playerTwo);
    }
}

function winCondition(player) {
    let diagonalWin1 = [1, 5, 9];
    let diagonalWin2 = [7, 5, 3];
    let upperRowWin = [1, 2, 3];
    let middleRowWin = [4, 5, 6];
    let lowerRow = [7, 8, 9];
    let firstColumnWin = [1, 4, 7];
    let secondColumnWin = [2, 5, 8];
    let thirdColumnWin = [3, 6, 9];
    let possibleWins = [diagonalWin1, diagonalWin2, upperRowWin, middleRowWin, lowerRow, firstColumnWin, secondColumnWin,
        thirdColumnWin];
    for (let i = 0; i < possibleWins.length; i++){
        if (possibleWins[i].every(num => player.placedTokens.includes(num)) == true){
            console.log(`${player.name} is the winner.`);
            player.isWinner = true;
            break;
            
        } 
            
    }
    
}



function checkWin(player) {
    if (player.placedTokens.length >= 3){
        winCondition(player);
        if (player.isWinner == true){
            console.log(`Congratulations, ${player.name}`);
            return;
        } else {
            isATie(gameBoard.board);
            
        }
    } else {
        isATie(gameBoard.board);
        
    }
    
}

function isATie(board, player) {
     if (board.every(num => num > 0) == true){
        console.log(`It's a tie!`);
     } 
}

function newGame() {
    let startAgain = Number(prompt('Press 1 to start a new game, press 2 to exit.'));
    while (startAgain != 1 && startAgain != 2){
        console.log('Invalid choice');
        startAgain = Number(prompt('Press 1 to start a new game, press 2 to exit.'));
        
    } 
    if (startAgain == 1){
        resetBoard(gameBoard.board);
        resetPlayers();
        gameController.currentTurn = gameController.currentGame(gameController.playerOne);
        
        
    } else {
        console.log('Bye!');
        return;
    }
    
}




function resetBoard(array) {
    for (let i = 0; i < 9; i++) {
    array[i] = [];
        }

}

function resetPlayers() {
    gameController.playerOne.placedTokens = [];
    gameController.playerTwo.placedTokens = [];
    gameController.playerOne.isWinner = false;
    gameController.playerTwo.isWinner = false;
}

playGame();
