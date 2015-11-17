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
  DropChip(board.id)
}

function mouseoverevent () {
  var board = event.target
  if (board.className !== 'tileboard') return
  highlightColumn(board.id, '#AAE9E5')
  DisplayChip(board.id, 'CHIP')
  document.getElementById('chip' + board.id.charAt(board.id.length - 1)).style.borderColor = '#AAE9E5'
}

function mouseoutevent () {
  if (event.target.className !== 'tileboard') return
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
  colarray.forEach ((element, index) => {
    statusArray[index] = document.getElementById(element + Col.charAt(Col.length - 1)).textContent
  })
//
//
  if (statusArray.lastIndexOf('one') && statusArray.lastIndexOf('two')) updateStat(currentPlayer, -1, Col)
  if (statusArray.lastIndexOf('one') > statusArray.lastIndexOf('two')) updateStat(currentPlayer, statusArray.lastIndexOf('one'), Col)
  if (statusArray.lastIndexOf('one') < statusArray.lastIndexOf('two')) updateStat(currentPlayer, statusArray.lastIndexOf('two'), Col)
//
//
  currentPlayer === 'one' ? currentPlayer = 'two' : currentPlayer = 'one'
  document.getElementById('left4status').textContent = 'Player ' + currentPlayer.charAt(0).toUpperCase() + currentPlayer.slice(1)
  console.log(statusBoard)
}

function updateStat (player, row, column) {
  statusArray[row] = player
  document.getElementById((row + 1).toString(10) + column.charAt(column.length - 1)).textContent = player
  statusBoard[(row + 1).toString(10) + column.charAt(column.length - 1)] = player
}
