
const gameController = (function () {
    
    const playerOne = createPlayer('Player #1');
    const playerTwo = createPlayer('Player #2');
    const currentGame = playerTurn();
    let currentTurn = currentGame(playerOne);

  return {playerOne, playerTwo, currentGame, currentTurn}

})();

const domElements = {
    gamePositions: document.querySelectorAll('.game-position'),
    position1: document.querySelector('.game-board'),
    createSymbol: function createSymbol() {
        let xSymbol = document.createElement("img");
        let oSymbol = document.createElement("img");
        let placeX = xSymbol;
        
        placeX.src = "./assets/PlayStationCross.png";
        oSymbol.src = "./assets/PlayStationCircle.png";
        placeX.className = oSymbol.className = "symbol";
        
        return placeX;
        
    }
    
    
    

};



function domController() {
    
    function functionTest(event) {
        
        event.target.appendChild(domElements.createSymbol());
        console.log(`${event.target.id} working`);
    }
    domElements.position1.addEventListener("click", functionTest);
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
        let cell = Number(prompt(`${gameController.playerOne.name} Insert a position from 1 to 9.`));
        delimitChoce(cell);
    
        
    } else {
        let cell = Number(prompt(`${gameController.playerTwo.name} Insert a position from 1 to 9.`));
        delimitChoce(cell);
        
    }
    
   

    
}


function delimitChoce (cell) {
    while (cell < 1 || cell > 9 ){
            alert('Invalid position. Try again. ');
            if (cell == 0){
                alert('Game paused');
                return;
                
            } else {
                chooseCell()
            }   
        }
        targetArray(cell);
        
}



function placeToken(cell) {
    let token = cell + 1; // Adjusts value to push the right token.
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
        playGame();
    } else {
        gameController.currentTurn = gameController.currentGame(gameController.playerOne);
        playGame();
    }
}

function isRepeated(cell) {
    if (gameBoard.board[cell] == 0) {
        placeToken(cell);
    } else {
        alert('Cell taken! Choose another one.');
        playGame();
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
            alert(`${player.name} is the winner.`);
            player.isWinner = true;
            break;
            
        } 
            
    }
    
}



function checkWin(player) {
    if (player.placedTokens.length >= 3){
        winCondition(player);
        if (player.isWinner == true){
            newGame();
            return;
        } else {
            isATie(gameBoard.board);
            nextPlayer();
        }
    } else {
        isATie(gameBoard.board);
        nextPlayer();
    }
    
}

function isATie(board, player) {
     if (board.every(num => num > 0) == true){
        console.log(`It's a tie!`);
        newGame();
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
        playGame();
        
    } else {
        console.log('Bye!');
        return;
    }
    
}

function playGame() {
    chooseCell();
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

// playGame();
domController();
