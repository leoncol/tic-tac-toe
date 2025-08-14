const gameBoard = (function () {
    const board = [];

     for (let i = 0; i < 9; i++) {
    board[i] = [];
  }

  return {board}

})();   

console.log(gameBoard);

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
}

const gameflow = function () {
    let turn = 0;
    decideTurn = (player) => player.name == 'Player #1' ? turn = 1 : turn = 2;
    decideTurn();
    return turn;
    
    


}  

const playerOne = createPlayer('Player #1');
const playerTwo = createPlayer('Plater #2');

console.log(playerOne, playerTwo);
