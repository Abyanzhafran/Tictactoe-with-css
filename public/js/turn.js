var board;
// const player1 = 'O';
// const player2 = 'X';
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
var player2Turn = false

const cells = document.querySelectorAll('.cell')
startIt()

function readPlayer() {
  var player1 = document.getElementById('player_1').value
  var player2 = document.getElementById('player_2').value

  if (player1 == '' || player2 == '') {
    alert('harus diisi')
  } else {
    document.querySelector('#goToStart').addEventListener('click', () => {
      window.location.href = 'http://127.0.0.1:5501/index.html'
    })
  }
  // alert(player1 + player2)
  // console.log(player1)
  // console.log(player2)
}

function startIt() {
  readPlayer()
  // document.querySelector('.endgame').style.display = 'none'
  // document.querySelector('.change').style.display = 'none'

  board = Array.from(Array(9).keys())
  for (let i = 0; i < cells.length; i++) {
    cells[i].innerText = ''
    cells[i].style.removeProperty('background-color')
    cells[i].addEventListener('click', ifClick)
  }
}

function ifClick(square, player) {
  console.log(player)
  swapClick()
  if (player2Turn == false) {
    player = player1
    changeText(player2)
  } else {
    player = player2
    changeText(player1)
  }

  if (typeof board[square.target.id] == 'number') {
    board[square.target.id] = player
    document.getElementById(square.target.id).innerText = player
    checkIfWin(board)
  }
}

function swapClick() {
  player2Turn = !player2Turn
}

function changeText(who) {
  document.querySelector('.change').style.display = 'block'
  document.querySelector('.change .text-change').innerText = who + ' is' + ' turn'
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
  declareWin(whoWon == player1 ? 'O win' : 'X win')
}

function declareWin(who) {
  document.querySelector(".endgame").style.display = 'block'
  document.querySelector('.endgame .text-winner').innerText = who
}
