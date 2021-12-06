var board;
const player1 = 'O';
const player2 = 'X';
const combos = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [6, 4, 2],
  [6, 4, 2]
]

const cells = document.querySelectorAll('.cell')
startIt()

function startIt() {
  document.querySelector('.endgame').style.display = 'none'
  board = Array.from(Array(9).keys())
  // console.log(board)
  for (let i = 0; i < cells.length; i++) {
    cells[i].innerText = ''
    cells[i].style.removeProperty('background-color')
    cells[i].addEventListener('click', ifClick, false)
  }
}

function ifClick(square) {
  if (typeof board[square.target.id] == 'number') {
    board[square.target.id] = player1
    document.getElementById(square.target.id).innerText = player1
    // if (!checkIfWin(board, player1) && )
    checkIfWin(board)
    // console.log(board)
  }
}

function checkIfWin(arr, player) {
  ifClick
  let newP1 = []
  let newP2 = []

  for (let j = 0; j < combos.length; j++) {
    if (arr[j] == 'O') { newP1.push(j) }
    if (arr[j] == 'X') { newP2.push(j) }
  }

  for (let i = 0; i < combos.length; i++) {
    let checkP1 = combos[i].filter(x => newP1.includes(x))
    let checkP2 = combos[i].filter(e => newP2.includes(e))
    console.log(checkP1)

    if (checkP1.length > 2) {
      gameOver(player1)
    } else if (checkP2.length > 2) {
      gameOver(player2)
    }
  }
}

// old thing but important
// function checkIfWin(arr, player) {
//   ifClick
//   for (let i = 0; i < combos.length; i++) {
//     let checkVal = combos[i].filter(x => !arr.includes(x))
//     if (checkVal.length > 2) {
//       gameOver(player1)
//     }
//   }
// }

function gameOver(whoWon) {
  declareWin(whoWon == player1 ? 'p1 win' : 'p2 win')
}

// blum dipake
function bestSpot() {
  return minimax(board, player2).index
}

function declareWin(who) {
  document.querySelector(".endgame").style.display = 'block'
  document.querySelector('.endgame .text-winner').innerText = who
}

// belum dipake
// function tieGame(board) {
//   let stack = []

//   for (let i = 0; i < board.length; i++) {
//     if (typeof board[i] !== 'number') {
//       stack += board[i]
//     }
//   }

//   if (stack.length == 9) {
//     alert('tie game')
//   }
// }

// belum dipake
function minimax(newBoard, player) {
  var availSpots = emptySquares();

  if (checkWin(newBoard, huPlayer)) {
    return { score: -10 };
  } else if (checkWin(newBoard, aiPlayer)) {
    return { score: 10 };
  } else if (availSpots.length === 0) {
    return { score: 0 };
  }
  var moves = [];
  for (var i = 0; i < availSpots.length; i++) {
    var move = {};
    move.index = newBoard[availSpots[i]];
    newBoard[availSpots[i]] = player;

    if (player == aiPlayer) {
      var result = minimax(newBoard, huPlayer);
      move.score = result.score;
    } else {
      var result = minimax(newBoard, aiPlayer);
      move.score = result.score;
    }

    newBoard[availSpots[i]] = move.index;

    moves.push(move);
  }

  var bestMove;
  if (player === aiPlayer) {
    var bestScore = -10000;
    for (var i = 0; i < moves.length; i++) {
      if (moves[i].score > bestScore) {
        bestScore = moves[i].score;
        bestMove = i;
      }
    }
  } else {
    var bestScore = 10000;
    for (var i = 0; i < moves.length; i++) {
      if (moves[i].score < bestScore) {
        bestScore = moves[i].score;
        bestMove = i;
      }
    }
  }

  return moves[bestMove]
}