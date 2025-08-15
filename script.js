
const playerOne = createPlayer('Player #1');
const playerTwo = createPlayer('Plater #2');
const currentGame = playerTurn();


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
        if (turn == 1){
            let cell = prompt('Insert a position from 1 to 9.');
            chooseCell(playerOne, cell);
        } else {
            let cell = prompt('Insert a position from 1 to 9.');
            chooseCell(playerTwo, cell);
        }
    }
    

}  

function createPlayer (name, boardCells, symbol) {
    boardCells = [];

    if (name == 'Player #1'){
        symbol = 'X';
    } else {
        symbol = 'O'
    }
    return {name, boardCells, symbol};
    
}

function chooseCell(player, cell){
    gameBoard.board[cell].push(player.symbol);
    player.boardCells.push(gameBoard.board[cell]);
    nextPlayer(player);
    
}

function nextPlayer (player) {
    if (player == playerOne){
        currentGame(playerTwo);
    } else {
        currentGame(playerOne);
    }
}

function playGame () {
    currentGame(playerOne);
}


playGame();