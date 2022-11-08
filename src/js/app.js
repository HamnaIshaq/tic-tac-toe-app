// player - factory function
const playerFactory = function(name, marker, turn) {
  function moveOnBoard() {
    let moveX = marker.toLowerCase() === 'x' ? true : false;
    let move; 
    if(moveX === true) {
      move = `<img src="./assets/marker-x.png" alt="cross">`;
    }
    else {
      move = `<img src="./assets/marker-o.png" alt="circle">`;
    }
    return { name, marker: marker.toLowerCase(), move }
  }
  return {name, moveOnBoard, turn}
}

const player1 = playerFactory('Bob', 'X', true);
console.log(player1)
const player2 = playerFactory('John', 'O', false);
console.log(player2)

// tic tac toe gameboard - revealing modular pattern
/*
let _gameBoard = [
    [{marker:'x',move:'<img src="./assets/marker-x.png" alt="cross">'}, {marker:'x',move:'<img src="./assets/marker-x.png" alt="cross">'}, {marker:'x',move:'<img src="./assets/marker-x.png" alt="cross">'}],
    [{marker:'x',move:'<img src="./assets/marker-x.png" alt="cross">'}, {marker:'x',move:'<img src="./assets/marker-x.png" alt="cross">'}, {marker:'x',move:'<img src="./assets/marker-x.png" alt="cross">'}],
    [{marker:'x',move:'<img src="./assets/marker-x.png" alt="cross">'}, {marker:'x',move:'<img src="./assets/marker-x.png" alt="cross">'}, {marker:'x',move:'<img src="./assets/marker-x.png" alt="cross">'}]
  ];
*/
const GameBoard = (function() {
  // init 
  let _gameBoard = [
    ['', '', ''],
    ['', '', ''],
    ['', '', '']
  ];
  let _currentPlayer;

  // cache DOM
  const game = document.querySelector('#game-id');
  const ticTacToeBoard = game.querySelector('.tic-tac-toe-game-board');
  const currentPlayerName = game.querySelector('.current-player-name');
  const gameCell = ticTacToeBoard.querySelectorAll('.game-cell');

  // bind events
  gameCell.forEach(cell => {
    cell.addEventListener('click', addMoveToGameBoard, false);
  })

  render();

  // render player move on board - updates DOM
  function render() {
    let boardCell = 0;
    for(let row = 0; row < _gameBoard.length; row++) {
      for(let col = 0; col < _gameBoard.length; col++) {
        if(_gameBoard[row][col] === '') {
          gameCell[boardCell].innerHTML = _gameBoard[row][col];
        }
        else {
          gameCell[boardCell].innerHTML = _gameBoard[row][col].move;
        }
        boardCell++
      } 
    }

    _currentPlayer = getCurrentPlayer();
    currentPlayerName.innerHTML = `
      ${_currentPlayer.moveOnBoard().marker === 'x' ? '<img style="width: 18px;" src="./assets/marker-x.png" alt="cross">' : '<img style="width: 18px;" src="./assets/marker-o.png" alt="circle">'}
      ${_currentPlayer.name}
    `;

  }

  // determine current player
  function getCurrentPlayer() {
    return player1.turn === true ? player1 : player2;
  }

  // change current player
  function changePlayer() {
    player1.turn = !player1.turn;
    player2.turn = !player2.turn;
  }

  // add move to gameboard
  function addMoveToGameBoard(e) {
    const row = parseInt(e.target.getAttribute('data-row'));
    const col = parseInt(e.target.getAttribute('data-col'));

    _currentPlayer = getCurrentPlayer();
    _gameBoard[row][col] = _currentPlayer.moveOnBoard();
    console.log(_currentPlayer.moveOnBoard())
    unbindClickFromFilledCell(e.target);
    
    gameOver();
    changePlayer();
    render();
  }

  // unbind click from already filled cell
  function unbindClickFromFilledCell(cell) {
    cell.removeEventListener('click', addMoveToGameBoard);
  }

  function gameOver() {
    
    // game win by one player - 3 in a row, 3 in a column
    for(let col = 0; col < _gameBoard.length; col++) {
      // 3 in a row
      if(_gameBoard[col][0].marker === _currentPlayer.moveOnBoard().marker 
      && _gameBoard[col][1].marker === _currentPlayer.moveOnBoard().marker 
      && _gameBoard[col][2].marker === _currentPlayer.moveOnBoard().marker) {
        console.log('game won by ', _currentPlayer.moveOnBoard().marker, _currentPlayer.moveOnBoard().name);
        //resetGameBoard();
        //render();
      }
      // 3 in a column
      else if(_gameBoard[0][col].marker === _currentPlayer.moveOnBoard().marker 
      && _gameBoard[1][col].marker === _currentPlayer.moveOnBoard().marker 
      && _gameBoard[2][col].marker === _currentPlayer.moveOnBoard().marker) {
        console.log('game won by ', _currentPlayer.moveOnBoard().marker, _currentPlayer.moveOnBoard().name);
        //resetGameBoard();
        //render();
      }
      else {

      }
    }
    
  }

  function resetGameBoard() {
    _gameBoard = [
      ['', '', ''],
      ['', '', ''],
      ['', '', '']
    ];
  }

})();




/*document.querySelector('.btn-rules').addEventListener('click', showRules, false);*/

function showRules() {
  document.querySelector('.rules-section').classList.add('show');
}