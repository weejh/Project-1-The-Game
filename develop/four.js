// import { checkWinner } from './module.js'
var currentPlayer = 'one'
var body = document.querySelector('body')
var statusBoard = {}
var statusArray = Array.of(7)
body.addEventListener('click', clickevent)
body.addEventListener('mouseover', mouseoverevent)
body.addEventListener('mouseout', mouseoutevent)

function clickevent () {
  var board = event.target
  if (board.className !== 'tileboard') return
  if (board.id === 'reset') document.location.reload(true)
  else DropChip(board.id)
}

function mouseoverevent () {
  var board = event.target
  if (board.className !== 'tileboard') return
  if (board.id === 'reset') return
  highlightColumn(board.id, '#AAE9E5')
  DisplayChip(board.id, currentPlayer)
  document.getElementById('chip' + board.id.charAt(board.id.length - 1)).style.borderColor = '#AAE9E5'
}

function mouseoutevent () {
  if (event.target.className !== 'tileboard') return
  if (event.target.id === 'reset') return
  highlightColumn(event.target.id, 'green')
  DisplayChip(event.target.id, '')
  document.getElementById('chip' + event.target.id.charAt(event.target.id.length - 1)).style.borderColor = 'blue'
}

function highlightColumn (Col, Color) {
  var colarray = ['0', '1', '2', '3', '4', '5', '6']
  colarray.forEach(element => {
    document.getElementById(element + Col.charAt(Col.length - 1)).style.borderColor = Color
  })
}

function DisplayChip (Col, chip) {
  document.getElementById('chip' + Col.charAt(Col.length - 1)).textContent = chip
}

function DropChip (Col) {
  var colarray = ['0', '1', '2', '3', '4', '5', '6']
  //
  // read the status
  colarray.forEach ((element, index) => {
    statusArray[index] = document.getElementById(element + Col.charAt(Col.length - 1)).textContent
  })
//
// update the status array
  if (statusArray.lastIndexOf('one') && statusArray.lastIndexOf('two')) updateStat(currentPlayer, -1, Col)
  if (statusArray.lastIndexOf('one') > statusArray.lastIndexOf('two')) updateStat(currentPlayer, statusArray.lastIndexOf('one'), Col)
  if (statusArray.lastIndexOf('one') < statusArray.lastIndexOf('two')) updateStat(currentPlayer, statusArray.lastIndexOf('two'), Col)
//
// to check for winner
  //  checkWinner ((statusArray.lastIndexOf(currentPlayer) + 1).toString(10) + Col.charAt(Col.length - 1), currentPlayer)
  // checkWinner ((statusArray.lastIndexOf(currentPlayer) + 1).toString(10) + Col.charAt(Col.length - 1), statusBoard, currentPlayer)
  if (checkWinner ((statusArray.lastIndexOf(currentPlayer) + 1).toString(10) + Col.charAt(Col.length - 1), currentPlayer)) {
    document.getElementById('left4status').textContent = 'Player ' + currentPlayer.charAt(0).toUpperCase() + currentPlayer.slice(1) + ' wins'
    body.removeEventListener('click', clickevent)
    body.removeEventListener('mouseover', mouseoverevent)
    body.removeEventListener('mouseout', mouseoutevent)
  } else {
// next player
    currentPlayer === 'one' ? currentPlayer = 'two' : currentPlayer = 'one'
    document.getElementById('left4status').textContent = 'Player ' + currentPlayer.charAt(0).toUpperCase() + currentPlayer.slice(1)
  }// document.getElementById('left4status').style.co
}

function updateStat (player, row, column) {
  statusArray[row] = player
  document.getElementById((row + 1).toString(10) + column.charAt(column.length - 1)).textContent = player
  statusBoard[(row + 1).toString(10) + column.charAt(column.length - 1)] = player
}

function checkWinner (Col, player) {
  // always check for next 3 location in all direction
  var rowgiven = parseInt(Col.charAt(Col.length - 1), 10)
  var colgiven = parseInt(Col.charAt(Col.length - Col.length), 10)
  var indexarray = [-1, 0, 1]
  var arrayprocess = Array.of(3)
  var arraycoordinate = Array.of(3)
  var Astatus = []
  var winner = '0'
  console.log('in check winner, location: ' + colgiven + rowgiven + ' | player : ' + player)
  console.log(statusBoard)
  indexarray.forEach(rowIndex => {
    indexarray.forEach(columnIndex => {
      [1, 2, 3].forEach((element, elementIndex) => {
        arraycoordinate[elementIndex] = (((columnIndex * element) + colgiven).toString(10) + ((rowIndex * element) + rowgiven).toString(10))
        arrayprocess[elementIndex] = statusBoard[((columnIndex * element) + colgiven).toString(10) + ((rowIndex * element) + rowgiven).toString(10)]
      })
     console.log('player:' + player + ' | loc : '+ arraycoordinate + ' | arrayprocess : ' + arrayprocess )
      Astatus.push(arraycoordinate.every(cord => cord !== Col) && arrayprocess.every(ele => ele === player))
      arraycoordinate = Array.of(3)
    })
  })
  indexarray.forEach(rowIndex => {
    indexarray.forEach(columnIndex => {
      [-1, 1, 2].forEach((element, elementIndex) => {
        arraycoordinate[elementIndex] = (((columnIndex * element) + colgiven).toString(10) + ((rowIndex * element) + rowgiven).toString(10))
        arrayprocess[elementIndex] = statusBoard[((columnIndex * element) + colgiven).toString(10) + ((rowIndex * element) + rowgiven).toString(10)]
      })
     console.log('player:' + player + ' | loc : '+ arraycoordinate + ' | arrayprocess : ' + arrayprocess )
      Astatus.push(arraycoordinate.every(cord => cord !== Col) && arrayprocess.every(ele => ele === player))
      arraycoordinate = Array.of(3)
    })
  })
  console.log('player ' + player + ' win is '+ Astatus.some(e => e === true))
  return Astatus.some(e => e === true)

}
