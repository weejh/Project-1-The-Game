import {checkWinner} from './lib/module.js'
var currentPlayer = 'one'
var body = document.querySelector('body')
var statusBoard = {}
// var statusArray = []
// var completedColumn = []
body.addEventListener('click', clickevent)
body.addEventListener('mouseover', mouseoverevent)
body.addEventListener('mouseout', mouseoutevent)

function clickevent (event) {
  var board = event.target
  if (board.className !== 'tileboard') return
  //
  // check if reset
  if (board.id === 'reset') document.location.reload(true)
  else {
    // check for winner
    var statusReturn = checkWinner(dropChip(board.id), currentPlayer, statusBoard)
    // if there is winner
    if (statusReturn[2]) {
      highLightwinner(statusReturn[0], statusReturn[1])
      displayCellmessage(statusReturn[1], currentPlayer)
      displayCellmessage('left4status', ('Player ' + currentPlayer.charAt(0).toUpperCase() + currentPlayer.slice(1) + ' wins'))
      displayCellmessage('left3status', 'Please click Reset to start new game')

      endofGame()
    } else {
    //  console.log('statusReturn 1 : ' + statusReturn[1])
      // check if reach end of board
      // endofBoard(statusBoard)
      nextPlayer(statusReturn[1])
    }
  }
}

function mouseoverevent (event) {
  var board = event.target
  if (board.className !== 'tileboard') return
  if (board.id === 'reset') return
  highlightColumn(board.id, '#AAE9E5')
  var chipLocation = 'chip' + board.id.charAt(board.id.length - 1)
  displayCellmessage(chipLocation, currentPlayer)
  document.getElementById(chipLocation).style.borderColor = '#AAE9E5'
}

function mouseoutevent (event) {
  var board = event.target
  if (board.className !== 'tileboard') return
  if (board.id === 'reset') return
  highlightColumn(board.id, 'green')
  var chipLocation = 'chip' + board.id.charAt(board.id.length - 1)
  displayCellmessage(chipLocation, '')
  document.getElementById(chipLocation).style.borderColor = 'black'
}

function highlightColumn (column, Color) {
  var colarray = ['0', '1', '2', '3', '4', '5', '6']
  colarray.forEach(element => {
    var cellLocation = element + column.charAt(column.length - 1)
    document.getElementById(cellLocation).style.borderColor = Color
  })
}

function displayCellmessage (cellLocation, chip) {
  document.getElementById(cellLocation).textContent = chip
}

function readStatusBoard (column) {
  var statusArray = []
  var columnArray = ['0', '1', '2', '3', '4', '5', '6']
  //
  // read the status from the board
  columnArray.forEach((element, index) => {
    var cellLocation = element + column.charAt(column.length - 1)
    statusArray[index] = document.getElementById(cellLocation).textContent
  })
  return statusArray
}

function dropChip (column) {
// location of the last cell occupied
  var oneLocation = readStatusBoard(column).lastIndexOf('one')
  var twoLocation = readStatusBoard(column).lastIndexOf('two')
//  console.log('oneLocation: ' + oneLocation + ' | twoLocation: ' + twoLocation)
//  console.log('statusArray: ' + statusArray + ' | ' + statusArray.indexOf(''))
  if ((readStatusBoard(column).indexOf('') <= 6) && readStatusBoard(column).indexOf('') > -1) {
    if (oneLocation && twoLocation) updateStat(currentPlayer, -1, column, readStatusBoard(column))
    if ((oneLocation > twoLocation)) updateStat(currentPlayer, oneLocation, column, readStatusBoard(column))
    if ((oneLocation < twoLocation)) updateStat(currentPlayer, twoLocation, column, readStatusBoard(column))
  }
  // if (readStatusBoard(column).every(e => e !== '')) {
  // else {// completedColumn.find(ele => ele === column) ? column : completedColumn.push(column)
  //
  // endofBoard(oneLocation, twoLocation)
  console.log('cell location: ' + column)
  // console.log('completedColumn: ' + completedColumn)
  console.log(statusBoard)
  // }
  // current player location
  var currentRow = (readStatusBoard(column).lastIndexOf(currentPlayer)).toString(10)
  var currentCol = column.charAt(column.length - 1)
  var currentPlayerlocation = currentRow + currentCol
  if (currentRow === '6' || currentRow === '7') {
    console.log('currentPlayerlocation: 6' + currentCol)
//    var colArray = ['0', '1', '2', '3', '4', '5', '6']
//    if colArry.forEach((ecompletedColumn..push('6' + currentCol)
    displayCellmessage('left3status', 'No more move, select next column, please.')
    return ('6' + currentCol)
  }
  console.log('currentPlayerlocation: ' + currentPlayerlocation)

  return currentPlayerlocation
}
function nextPlayer (column) {
  currentPlayer === 'one' ? currentPlayer = 'two' : currentPlayer = 'one'
  var chipLocation = 'chip' + column.charAt(column.length - 1)
  displayCellmessage(chipLocation, currentPlayer)
  displayCellmessage('left4status', ('Player ' + currentPlayer.charAt(0).toUpperCase() + currentPlayer.slice(1)))
}
// function moveChip (sourceLocation) {
//  var colGiven = parseInt(sourceLocation.charAt(sourceLocation.length - 1), 10)
//  var rowGiven = parseInt(sourceLocation.charAt(sourceLocation.length - sourceLocation.length), 10)
//  console.log('row : ' + rowGiven + ' | col: ' + colGiven)
//  var column = ['6', '5', '4', '3', '2', '1', '0'].slice(0, 8 - rowGiven)
//  console.log(column);
// }
function updateStat (player, row, column, statusArray) {
  statusArray[row] = player
  // console.log(' in func  row: ' + (row + 1))
  // location of last cell
  if ((row + 1) > 6) return
  var cellLocation = (row + 1).toString(10) + column.charAt(column.length - 1)
  displayCellmessage(cellLocation, player)
//  document.getElementById(cellLocation).textContent = player
  statusBoard[cellLocation] = player
}

function highLightwinner (winnerCoordinate, winnerLocation) {
  winnerCoordinate.push(winnerLocation)
  highlightColumn(winnerLocation, 'green')
  // console.log('highLightwinner : ' + winnerLocation)
  resetCursor()
  document.getElementById('reset').style.cursor = 'pointer'
  var chipLocation = 'chip' + winnerLocation.charAt(winnerLocation.length - 1)
  displayCellmessage(chipLocation, '')
  document.getElementById(chipLocation).style.borderColor = 'black'
  winnerCoordinate.forEach(ele => {
    var d = document.getElementById(ele)
    d.style.color = 'white'
    d.style.backgroundColor = 'blue'
    d.style.borderColor = 'red'
  })
}

function resetCursor () {
  var eleA = ['chip', '0', '1', '2', '3', '4', '5', '6']
  var eleB = ['0', '1', '2', '3', '4', '5', '6']
  eleA.forEach(ele1 => {
    eleB.forEach(ele2 => {
      var pp = ele1 + ele2
      var p = document.getElementById(pp)
      p.style.cursor = 'default'
    })
  })
}

function endofGame () {
  body.removeEventListener('click', clickevent)
  body.removeEventListener('mouseover', mouseoverevent)
  body.removeEventListener('mouseout', mouseoutevent)
  body.addEventListener('click', event => {
    var reSet = event.target
    if (reSet.id !== 'reset') return
    document.location.reload(true)
  })
}
/*
function endofGameStatus (messAge) {
  document.getElementById('left4status').textContent = messAge
  document.getElementById('left3status').textContent = 'Please click Reset to start new game'
}
*/
