import {checkWinner, clearBoard, nextChip} from './lib/module.js'
var currentPlayer = '♢'
var previousPlayer = ''
var body = document.querySelector('body')
// var statusBoard = {}
var currentBoardstatus = {}
displayCellmessage('left4status', ('Player ' + currentPlayer))
body.addEventListener('click', clickevent)
body.addEventListener('mouseover', mouseoverevent)
body.addEventListener('mouseout', mouseoutevent)

function clickevent (event) {
  var board = event.target
  if (board.className !== 'tileboard') return
  //
  // check if reset
  if (board.id === 'reset') {
    reStartgame()
  } else {
    var cellLocation = dropChip(board.id)
    var winnerStatus = checkWinner(cellLocation, previousPlayer, currentBoardstatus)
    if (winnerStatus[2]) {
      highLightwinner(winnerStatus[0], winnerStatus[1])
      endofGameStatus(('Player ' + previousPlayer + ' wins'))
      endofGame(winnerStatus[1])
      return
    }
    previousPlayer = currentPlayer
    var endofColumn = ['60', '61', '63', '64', '65', '66', '67']
    if (endofColumn.some(e => e === cellLocation)) {
      nextPlayer(cellLocation, currentPlayer)
      document.getElementById(cellLocation).style.borderColor = 'green'
    }
    if (endofColumn.every(e => document.getElementById(e).textContent !== '')) {
      var chip = 'No more move, please click on reset'
      var chipLocation = 'chip' + board.id.charAt(board.id.length - 1)
      displayCellmessage('left4status', chip)
      endofGame(chipLocation)
      return
    }
    nextPlayer(cellLocation, currentPlayer)
  }
}

function mouseoverevent (event) {
  var board = event.target
  if (board.className !== 'tileboard') return
  if (board.id === 'reset') return
  nextChip(board.id, currentPlayer, readStatusBoard(board.id), true)
//  if (readStatusBoard(board.id).every(e => e !== '')) console.log('mouseoverevent full')
}

function mouseoutevent (event) {
  var board = event.target
  if (board.className !== 'tileboard') return
  if (board.id === 'reset') return
  var cellLocation = nextChip(board.id, currentPlayer, readStatusBoard(board.id), false)
  var chipLocation = 'chip' + board.id.charAt(board.id.length - 1)
  displayCellmessage(chipLocation, '')
  document.getElementById(chipLocation).style.borderColor = 'black'
  if (readStatusBoard(board.id).every(e => e !== '')) {
    if (currentBoardstatus['6' + board.id.charAt(board.id.length - 1)] === undefined) {
      cellLocationT = 'chip' + board.id.charAt(board.id.length - 1)
      document.getElementById(cellLocationT).style.borderColor = 'black'
      displayCellmessage(cellLocationT, '')
      cellLocationT = '6' + board.id.charAt(board.id.length - 1)
      displayCellmessage(cellLocationT, '')
      document.getElementById(cellLocationT).style.borderColor = 'green'
      if (currentBoardstatus[cellLocationT] === '') displayCellmessage(cellLocationT, '')
    }
    return
  }
  var colGiven = cellLocation.charAt(cellLocation.length - 1)
  var rowGiven = parseInt(cellLocation.charAt(cellLocation.length - cellLocation.length), 10) - 1
  var cellLocationT = rowGiven.toString(10) + colGiven
  document.getElementById(cellLocationT).style.borderColor = 'green'
  displayCellmessage(cellLocationT, '')
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
  var checkA = ['0', '1', '2', '3', '4', '5', '6']
  var colG = column.charAt(column.length - 1)
  var arr = checkA.map(e => { return currentBoardstatus[e + colG] })
  var rowG = arr.indexOf(undefined)
  if (rowG === -1) {
    if (currentBoardstatus['6' + colG] === '') {
      currentBoardstatus['6' + colG] = currentPlayer
  //    statusBoard['6' + colG] = currentPlayer
    }
    return '6' + colG
  } else {
    currentBoardstatus[rowG.toString(10) + colG] = currentPlayer
  //  statusBoard[rowG.toString(10) + colG] = currentPlayer
    document.getElementById(rowG.toString(10) + colG).style.borderColor = 'green'
    if (rowG !== 6) document.getElementById((rowG + 1).toString(10) + colG).style.borderColor = '#AAE9E5'
    currentPlayer === '♢' ? currentPlayer = '☆' : currentPlayer = '♢'
    return rowG.toString(10) + colG
  }
}
/*
function dropChip (column) {
// location of the last cell occupied
  var oneLocation = readStatusBoard(column).lastIndexOf('♢')
  var twoLocation = readStatusBoard(column).lastIndexOf('☆')
  var cellLocation = ''
  if ((readStatusBoard(column).indexOf('') < 7) && readStatusBoard(column).indexOf('') > -1) {
    if (oneLocation === twoLocation) {
      cellLocation = updateStat(currentPlayer, -1, column, readStatusBoard(column))
    }
    if ((oneLocation > twoLocation)) {
      cellLocation = updateStat(currentPlayer, oneLocation, column, readStatusBoard(column))
    }
    if ((oneLocation < twoLocation)) {
      cellLocation = updateStat(currentPlayer, twoLocation, column, readStatusBoard(column))
    }
  }
  console.log('drop chip no check =>  oneLocation | twoLocation ' + oneLocation +'  ' + twoLocation)
  console.log(currentBoardstatus)
  return cellLocation
}
*/
function nextPlayer (column, currentPlayer) {
  displayCellmessage('left4status', ('Player ' + currentPlayer))
  var colGiven = column.charAt(column.length - 1)
  var rowGiven = parseInt(column.charAt(column.length - column.length), 10) + 1
  var cellLocationT = rowGiven.toString(10) + colGiven
  if (rowGiven < 7) displayCellmessage(cellLocationT, currentPlayer)
}
/*
function updateStat (player, row, column, statusArray) {
  if ((row + 1) > 6) return
  var cellLocation = (row).toString(10) + column.charAt(column.length - 1)
  if (row === -1) cellLocation = '0' + column.charAt(column.length - 1)
  displayCellmessage(cellLocation, player)
  statusBoard[cellLocation] = player
  let pX = document.getElementById(cellLocation)
  pX.style.borderColor = 'green'
  nextChip(cellLocation, currentPlayer, readStatusBoard(cellLocation), true)
  return cellLocation
}
*/
function highLightwinner (winnerCoordinate, winnerLocation) {
  var colGiven = winnerLocation.charAt(winnerLocation.length - 1)
  var rowGiven = parseInt(winnerLocation.charAt(winnerLocation.length - winnerLocation.length), 10) + 1
  if (rowGiven < 0) rowGiven = 1
  var cellLocationT = rowGiven.toString(10) + colGiven
//  console.log('highLightwinner   ' + cellLocationT)
  displayCellmessage(cellLocationT, '')
  winnerCoordinate.push(winnerLocation)
  highlightColumn(winnerLocation, 'green')
  resetCursor()
  document.getElementById('reset').style.cursor = 'pointer'
  winnerCoordinate.forEach(ele => {
    var d = document.getElementById(ele)
    d.style.color = 'white'
    d.style.backgroundColor = 'blue'
    d.style.borderColor = 'red'
  })
}

function resetCursor () {
  var eleA = ['chip', '0', '1', '2', '3', '4', '5', '6']
  var eleB = ['0', '1', '2', '3', '4', '5', '6', '7']
  eleA.forEach(ele1 => {
    eleB.forEach(ele2 => {
      var pp = ele1 + ele2
      var p = document.getElementById(pp)
      p.style.cursor = 'default'
    })
  })
}

function endofGame (sLocation) {
  body.removeEventListener('click', clickevent)
  body.removeEventListener('mouseover', mouseoverevent)
  body.removeEventListener('mouseout', mouseoutevent)
  var chipLocation = 'chip' + sLocation.charAt(sLocation.length - 1)
  displayCellmessage(chipLocation, '')
  document.getElementById(chipLocation).style.borderColor = 'black'
  body.addEventListener('click', event => {
    var reSet = event.target
    if (reSet.id !== 'reset') return
    reStartgame()
  })
}

function endofGameStatus (messAge) {
  document.getElementById('left4status').textContent = messAge
  document.getElementById('left3status').textContent = 'Please click Reset to start new game'
}

function reStartgame () {
  currentPlayer = '♢'
  body = document.querySelector('body')
//  statusBoard = {}
  currentBoardstatus = {}
  body.removeEventListener('click', clickevent)
  body.removeEventListener('mouseover', mouseoverevent)
  body.removeEventListener('mouseout', mouseoutevent)
  clearBoard()
  displayCellmessage('left3status', '')
  displayCellmessage('left4status', ('Player ' + currentPlayer))
  body.addEventListener('click', clickevent)
  body.addEventListener('mouseover', mouseoverevent)
  body.addEventListener('mouseout', mouseoutevent)
}
