
const gameController = (function () {
    let createPlayer = function(name) {
        let placedTokens = [];
        let isWinner = false;
        let score = `Score:`;
    return {name, placedTokens, isWinner, score};
    
    }    
    const playerOne = createPlayer('Player #1');
    const playerTwo = createPlayer('Player #2');
    const activePlayer = playerOne;
    const placeToken = function(cell) {
        gameBoard.board[cell].push(cell);
        gameController.activePlayer.placedTokens.push(cell);
        }
    const isRepeated = function(cell) {
        if (gameBoard.board[cell].length == 0) {
            gameController.placeToken(cell);
            return false;

            } else {
            alert('Cell taken! Choose another one.');
            return true;
        }
    }
    const checkWin = function(player) {
        if (player.placedTokens.length >= 3){
            gameController.winCondition(player);
            if (player.isWinner == true){
                domController.displayAlerts(`Congratulations, ${player.name}`);
                resetController.resetGame();
                return;
            } else {
                gameState.isATie(gameBoard.board);
            
            }
        } else {
        gameState.isATie(gameBoard.board);
        }
    
    }

    const winCondition = function(player) {
        let diagonalWin1 = [0, 4, 8];
        let diagonalWin2 = [6, 4, 2];
        let upperRowWin = [0, 1, 2];
        let middleRowWin = [3, 4, 5];
        let lowerRow = [6, 7, 8];
        let firstColumnWin = [0, 3, 6];
        let secondColumnWin = [1, 4, 7];
        let thirdColumnWin = [2, 5, 8];
        let possibleWins = [diagonalWin1, diagonalWin2, upperRowWin, middleRowWin, lowerRow, firstColumnWin, secondColumnWin,
            thirdColumnWin];
        for (let i = 0; i < possibleWins.length; i++){
         if (possibleWins[i].every(num => player.placedTokens.includes(num)) == true){
                domController.displayAlerts(`${player.name} is the winner.`);
                player.isWinner = true;
                break;
            
            } 
            
        }
    
    }

    

  return {playerOne, playerTwo, activePlayer, placeToken, isRepeated, checkWin, winCondition}

})();

const domController =(function() {
    const createSymbol = function() {
        if (gameController.activePlayer == gameController.playerOne){
             let xSymbol = document.createElement("img");
             xSymbol.src = "./assets/PlayStationCross.png";
             xSymbol.className = "symbol";
             return xSymbol;
        } else {
            let oSymbol = document.createElement("img");
            oSymbol.src = "./assets/PlayStationCircle.png";
            oSymbol.className = "symbol";
            return oSymbol;
        }
       
    
        
    }
    const domElements = {
    gamePositions: document.querySelectorAll('.game-position'),
    gameBoard: document.querySelector('.game-board'),
    player1Form: document.querySelector('#enter-name1'),
    player2Form: document.querySelector('#enter-name2'),
    player1Name: document.querySelector('#player1-name'),
    player2Name: document.querySelector('#player2-name'),
    player1updateName: document.querySelector('#player1-name-form'),
    player2updateName: document.querySelector('#player2-name-form'),
    submitName1: document.querySelector('#submit1'),
    submitName2: document.querySelector('#submit2'),
    player1Score: document.querySelector('#player1-score'),
    player2Score: document.querySelector('#player2-score'),
    
    };

    const addDomPosition = function(event){
    let currentCell = 0;
    switch (event.target.id){
        case 'position-0':
            currentCell = 0; 
            break;
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
    }
    gameState.gameFlow(currentCell);
   
    
    
    }

    const insertSymbol = function(cell, symbol) {
        let chosenCell = document.getElementById(`position-${cell}`);
        if (chosenCell.hasChildNodes() == false){
            chosenCell.appendChild(symbol);
            }
    }

    const displayAlerts = function(message){
            alert(message);
    }

  

    const displayPlayerName = function(){
        domElements.player1Name.innerText = gameController.playerOne.name;
        domElements.player2Name.innerText = gameController.playerTwo.name;

    }

    /* const updateScore = function() {
        let onePoint =  0;
        gameController.playerOne.score
        domElements.player2Score.innerHTML = 
    }
    */

    const displayScore = function(){
        domController.domElements.player1Score.innerHTML = gameController.playerOne.score;
        domController.domElements.player2Score.innerHTML = gameController.playerTwo.score;
    }
     
    const updateScore = function(player){
        player.score += ` I `;
    }




    return {createSymbol,domElements, addDomPosition, insertSymbol, displayAlerts,displayPlayerName, updateScore,displayScore}
})();




const gameState = (function () {
    const isANewGame = function(){
    let value = true;
    for (let i = 0; i < gameBoard.board.length; i++) {
        if (gameBoard.board[i].length != 0){
            value = false;
            break;
        
        } 
    }
    return value;
    }

    const nextPlayer = function(isreset) {
    if (isreset == false) {
        if (gameController.activePlayer == gameController.playerOne){
        gameController.activePlayer = gameController.playerTwo;
        
        } else {
        gameController.activePlayer = gameController.playerOne;
        
    }
    } else {
        return;
    }
    
    }

    function isATie(board) {
        if (board.every(num => num.length > 0) == true){
        domController.displayAlerts(`It's a tie!`);
        resetController.resetGame();
        } 
    }
    function gameFlow(cell) {
     if (gameController.isRepeated(cell) == false){
        let symbol = domController.createSymbol();
        domController.insertSymbol(cell,symbol);
        domController.updateScore(gameController.activePlayer);
        domController.displayScore();
        gameController.checkWin(gameController.activePlayer);
        let reset = gameState.isANewGame();
        gameState.nextPlayer(reset);
     
     }
     
    

    }


   

    return {gameFlow, isATie, nextPlayer, isANewGame}

})();


const handleNames = (function (){



    const changePlayersName = function(event){

        if (event.target.id == 'submit1'){
            gameController.playerOne.name = domController.domElements.player1updateName.value;

        } else {
            gameController.playerTwo.name = domController.domElements.player2updateName.value;
        }
        
        domController.displayPlayerName();
    }

    const changeNameButtonListeners = function(){
        domController.domElements.gameBoard.addEventListener("click", domController.addDomPosition);
        domController.domElements.submitName1.addEventListener("click", changePlayersName);
        domController.domElements.submitName2.addEventListener("click", changePlayersName);
        domController.domElements.player1Form.addEventListener("submit", function (event){
        event.preventDefault();
        domController.domElements.player2Form.addEventListener("submit", function (event){
        event.preventDefault();
         });



    });
  
    }
    return { changePlayersName, changeNameButtonListeners}
    
        

})();





function playGame(){
    domController.domElements.gameBoard.addEventListener("click", domController.addDomPosition);
    

    
}




const gameBoard = (function () {
    const board = [];

     for (let i = 0; i < 9; i++) {
    board[i] = [];
  }

  return {board}

})();   





const resetController = (function(){

    const resetBoard = function(array) {
    for (let i = 0; i < 9; i++) {
    array[i] = [];
        }

    
    }
   

    const resetPlayers = function() {
    gameController.playerOne.placedTokens.length = 0;
    gameController.playerTwo.placedTokens.length = 0;
    gameController.playerOne.isWinner = false;
    gameController.playerTwo.isWinner = false;
    }

    const resetDom = function(){
        for (let i = 0; i < 9; i++){
        let div = document.getElementById(`position-${i}`);
        div.innerHTML = '';
        }
    }

    const resetGame = function() {
        resetBoard(gameBoard.board);
        resetPlayers();
        resetDom();
        gameController.activePlayer = gameController.playerOne;
    

    }
    return {resetGame}
    }
    
)();






playGame();
domController.displayPlayerName();
handleNames.changeNameButtonListeners(); 
domController.displayScore();
