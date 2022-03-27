var board;
const player1 = 'O';
const player2 = 'X';
const currPlayer = player1;
const combos = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [6, 4, 2],
]

const cells = document.querySelectorAll('.cell')
startIt()

function startIt() {
  document.querySelector('.endgame').style.display = 'none'
  board = Array.from(Array(9).keys())
  for (let i = 0; i < cells.length; i++) {
    cells[i].innerText = ''
    cells[i].style.removeProperty('background-color')
    cells[i].addEventListener('click', ifClick)
    // console.log(cells[i])
  }
}

// change this to change the player is click
// run bestMove() HERE !!!
function ifClick(square) {
  if (typeof board[square.target.id] == 'number') {
    board[square.target.id] = player1
    document.getElementById(square.target.id).innerText = player1
    checkIfWin(board)
    minimax(board)
    // if (!checkIfWin(board, player1) && bestSpot())
  }
}

function checkIfWin(arrBoard) {
  let newP1 = []
  let newP2 = []

  for (let j = 0; j < arrBoard.length; j++) {
    if (arrBoard[j] == 'O') { newP1.push(j) }
    if (arrBoard[j] == 'X') { newP2.push(j) }
  }

  for (let i = 0; i < combos.length; i++) {
    let checkP1 = combos[i].filter(x => newP1.includes(x))
    let checkP2 = combos[i].filter(e => newP2.includes(e))

    if (checkP1.length > 2) {
      gameOver(player1)
    } else if (checkP2.length > 2) {
      gameOver(player2)
    }
  }
}

function gameOver(whoWon) {
  declareWin(whoWon == player1 ? 'p1 win' : 'p2 win')
}

function declareWin(who) {
  document.querySelector(".endgame").style.display = 'block'
  document.querySelector('.endgame .text-winner').innerText = who
}

function findEmptyBoard() {
  return board.filter(x => typeof x == 'number')
}
