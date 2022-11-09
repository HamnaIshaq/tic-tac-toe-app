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
const player2 = playerFactory('John', 'O', false);

// tic tac toe gameboard - revealing modular pattern
const GameBoard = (function() {
  // init 
  let _gameBoard = [
    ['', '', ''],
    ['', '', ''],
    ['', '', '']
  ];
  let _currentPlayer;
  let _filledBoard = -1;
  let _winner;

  // cache DOM
  const game = document.querySelector('#game-id');
  const ticTacToeBoard = game.querySelector('.tic-tac-toe-game-board');
  const currentPlayerName = game.querySelector('.current-player-name');
  const gameCell = ticTacToeBoard.querySelectorAll('.game-cell');
  const player1Score = game.querySelector('.player-1-score');
  const tieScore = game.querySelector('.tie-score');
  const player2Score = game.querySelector('.player-2-score');
  const player1Name = game.querySelector('.player-1-name');
  const player2Name = game.querySelector('.player-2-name');

  // bind events
  gameCell.forEach(cell => {
    cell.addEventListener('click', addMoveToGameBoard, false);
  })

  render();

  // render player move on board - updates DOM
  function render() {
    _filledBoard++;
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

    // show players name
    player1Name.textContent = player1.name;
    player2Name.textContent = player2.name;

    // highlight winning row/column
    if(_winner === _currentPlayer.moveOnBoard().marker && _winner === 'x') {
      player1Score.textContent = parseInt(player1Score.textContent)+1;
    }
    else if(_winner === _currentPlayer.moveOnBoard().marker && _winner === 'o') {
      player2Score.textContent = parseInt(player2Score.textContent)+1;
    }
    
    if( _filledBoard === 9) {
      tieScore.textContent = parseInt(tieScore.textContent)+1;
    }

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
    unbindClickFromFilledCell(e.target);
    
    gameOver();
  }

  // unbind click from already filled cell
  function unbindClickFromFilledCell(cell) {
    cell.removeEventListener('click', addMoveToGameBoard);
  }

  // bind function on game cell
  function bindClickFromFilledCell() {
    gameCell.forEach(cell => {
      cell.addEventListener('click', addMoveToGameBoard);
    });
  }

  function gameOver() {
    
    gameWin();
    gameTie();
    
  }

  function gameWin() {
    let winner = rowWinCondition() || columnWinCondition();

    if(winner === true) {
      _winner = _currentPlayer.moveOnBoard().marker;
      resetGameBoard();
      render();
      bindClickFromFilledCell();
      _winner = '';
    }
    else {
      changePlayer();
      render();
    }
  }

  // 3 in a row
  function rowWinCondition() {
    // game win by one player - 3 in a row
    for(let col = 0; col < _gameBoard.length; col++) {
      // 3 in a row
      if(_gameBoard[col][0].marker === _currentPlayer.moveOnBoard().marker 
      && _gameBoard[col][1].marker === _currentPlayer.moveOnBoard().marker 
      && _gameBoard[col][2].marker === _currentPlayer.moveOnBoard().marker) {
        return true;
      }
    }
  }
  // 3 in a column
  function columnWinCondition() {
    // game win by one player - 3 in a column
    for(let col = 0; col < _gameBoard.length; col++) {
      // 3 in a column
      if(_gameBoard[0][col].marker === _currentPlayer.moveOnBoard().marker 
      && _gameBoard[1][col].marker === _currentPlayer.moveOnBoard().marker 
      && _gameBoard[2][col].marker === _currentPlayer.moveOnBoard().marker) {
        //resetGameBoard();
        //render();
        return true;
      }
    }
  }

  function gameTie() {
    let tie = tieCondition();

    if(tie === true) {
      resetGameBoard();
      render();
      bindClickFromFilledCell();
    }
  }

  function tieCondition() {
    if(_filledBoard === 9) {
      return true;
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