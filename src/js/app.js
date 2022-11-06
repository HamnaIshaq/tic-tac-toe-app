// tic tac toe gameboard - revealing modular pattern

const GameBoard = (function() {
  // init 
  let _gameBoard = [
    {playerName: 'player1', marker: 'x'}, {playerName: 'player2', marker: 'o'}, {playerName: 'player1', marker: 'x'},
    {playerName: 'player2', marker: 'o'}, {playerName: 'player1', marker: 'x'}, {playerName: 'player1', marker: 'x'},
    {playerName: 'player2', marker: 'o'}, {playerName: 'player2', marker: 'o'}, {playerName: 'player1', marker: 'x'}
  ];

  // cache DOM
  const game = document.querySelector('#game-id');
  const ticTacToeBoard = game.querySelector('.tic-tac-toe-game-board');
  const gameCell = ticTacToeBoard.querySelectorAll('.game-cell');

  render();

  // render player move on board
  function render() {
    for(let cell = 0; cell < gameCell.length; cell++) {
      gameCell[cell].innerHTML = `
        <img src="./assets/marker-${_gameBoard[cell].marker}.png" alt="${_gameBoard[cell].marker}">
      `;
    }
  }

})();

// player - factory function
const playerFactory = function(name, marker) {
  return {name, marker}
}

const player1 = playerFactory('Bob', 'X');
console.log(player1)
const player2 = playerFactory('John', 'O');
console.log(player2)


/*document.querySelector('.btn-rules').addEventListener('click', showRules, false);*/

function showRules() {
  document.querySelector('.rules-section').classList.add('show');
}