// tic tac toe gameboard - revealing modular pattern

const GameBoard = (function() {
  // private tic tac toe gameboard array
  let _gameBoard = [
    ['', '', ''],
    ['', '', ''],
    ['', '', '']
  ];
  // functions needed
  // update gameboard 
})();

// player - factory function
const playerFactory = function(name, marker) {
  return {name, marker}
}

const player1 = playerFactory('Bob', 'X');
console.log(player1)
const player2 = playerFactory('John', 'O');
console.log(player2)


document.querySelector('.btn-rules').addEventListener('click', showRules, false);

function showRules() {
  document.querySelector('.rules-section').classList.add('show');
}