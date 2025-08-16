
const playerOne = createPlayer('Player #1');
const playerTwo = createPlayer('Player #2');
const currentGame = playerTurn();
let currentTurn = currentGame(playerOne);


const gameBoard = (function () {
    const board = [];

     for (let i = 0; i < 9; i++) {
    board[i] = [];
  }

  return {board}

})();   

function playerTurn () {
    let turn = 0;
    return function resulting (player) {
    player.name == 'Player #1' ? turn = 1 : turn = 2;
    return turn;
    ;
            
        
    }
    

}  

function createPlayer (name) {
    return {name};
    
}

function chooseCell(){
    if (currentTurn == 1) {
        let cell = prompt(`${playerOne.name} Insert a position from 1 to 9.`);
        isRepeated(cell);
    } else {
        let cell = prompt(`${playerTwo.name} Insert a position from 1 to 9.`);
        isRepeated(cell);
    }
   
   
    
}

function placeToken(cell) {
    let token = 0;
    token = cell;
    gameBoard.board[cell].push(token);
    nextPlayer();
    
}


function nextPlayer () {
    if (currentTurn == 1){
        currentTurn = currentGame(playerTwo);
        playGame();
    } else {
        currentTurn = currentGame(playerOne);
        playGame();
    }
}

function isRepeated (cell) {
    if (gameBoard.board[cell] == 0) {
        placeToken(cell);
    } else {
        alert('Cell taken! Choose another one.');
        playGame();
    }
}


function playGame () {
    chooseCell();
}


playGame();