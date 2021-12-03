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
  [6, 4, 2]
]

const cells = document.querySelectorAll('.cell')
startIt()

function startIt() {
  document.querySelector('.endgame').style.display = 'none'
  board = Array.from(Array(9).keys())
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
  }
  checkIfWin(board)
}

function checkIfWin(arr, player) {
  ifClick
  for (let i = 0; i < combos.length; i++) {
    let checkVal = combos[i].filter(x => !arr.includes(x))
    if (checkVal.length > 2) {
      gameOver(player2)
    }
  }
}

function gameOver(whoWon) {
  declareWin(whoWon.player == player1 ? 'p2 win' : 'p1 win')
}

function declareWin(who) {
  document.querySelector(".endgame").style.display = 'block'
  document.querySelector('.endgame .text-winner').innerText = who
}

