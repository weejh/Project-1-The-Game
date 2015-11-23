import {checkWinner, clearBoard, nextChip} from './lib/module.js'
var currentPlayer = '♢'
var body = document.querySelector('body')
var statusBoard = {}
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
    if (readStatusBoard(board.id).some(e => e === '')) {
      var cellLocation = dropChip(board.id)
      var winnerStatus = checkWinner(cellLocation, currentPlayer, statusBoard)
      if (winnerStatus[2]) {
        highLightwinner(winnerStatus[0], winnerStatus[1])
        endofGameStatus(('Player ' + currentPlayer + ' wins'))
        endofGame(winnerStatus[1])
        return
      }
      currentPlayer === '♢' ? currentPlayer = '☆' : currentPlayer = '♢'
      var endofColumn = ['60', '61', '63', '64', '65', '66', '67']
      if (endofColumn.some(e => e === cellLocation)) {
        nextPlayer(cellLocation, currentPlayer)
      }
      if (endofColumn.every(e => document.getElementById(e).textContent !== '')) {
        console.log('check for end of col')
        var chip = 'No more move, please click on reset'
        var chipLocation = 'chip' + board.id.charAt(board.id.length - 1)
        displayCellmessage('left4status', chip)
        endofGame(chipLocation)
        return
      }
      nextPlayer(cellLocation, currentPlayer)
    }
  }
}

function mouseoverevent (event) {
  var board = event.target
  if (board.className !== 'tileboard') return
  if (board.id === 'reset') return
  nextChip(board.id, currentPlayer, readStatusBoard(board.id), true)
//  var chipLocation = 'chip' + board.id.charAt(board.id.length - 1)
//  displayCellmessage(chipLocation, currentPlayer)
  console.log(currentPlayer)
}

function mouseoutevent (event) {
  var board = event.target
  if (board.className !== 'tileboard') return
  if (board.id === 'reset') return
  var cellLocation = nextChip(board.id, currentPlayer, readStatusBoard(board.id), false)
  var chipLocation = 'chip' + board.id.charAt(board.id.length - 1)
  displayCellmessage(chipLocation, '')
//  displayCellmessage(cellLocation, currentPlayer)
  document.getElementById(chipLocation).style.borderColor = 'black'
  var colGiven = cellLocation.charAt(cellLocation.length - 1)
  var rowGiven = parseInt(cellLocation.charAt(cellLocation.length - cellLocation.length), 10) - 1
  var cellLocationT = rowGiven.toString(10) + colGiven
  console.log(cellLocationT)
//  console.log(currentPlayer)
  document.getElementById(cellLocationT).style.borderColor = 'green'
  displayCellmessage(cellLocationT, '')
//  displayCellmessage(cellLocationT, currentPlayer)
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
  var oneLocation = readStatusBoard(column).lastIndexOf('♢')
  var twoLocation = readStatusBoard(column).lastIndexOf('☆')
  var cellLocation = ''
  if ((readStatusBoard(column).indexOf('') <= 6) && readStatusBoard(column).indexOf('') > -1) {
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
  return cellLocation
}

function nextPlayer (column, currentPlayer) {
//  var chipLocation = 'chip' + column.charAt(column.length - 1)
//  displayCellmessage(chipLocation, currentPlayer)
  displayCellmessage('left4status', ('Player ' + currentPlayer))
  var colGiven = column.charAt(column.length - 1)
  var rowGiven = parseInt(column.charAt(column.length - column.length), 10) + 1
  var cellLocationT = rowGiven.toString(10) + colGiven
  console.log(currentPlayer + ' | ' + cellLocationT)
  if (rowGiven < 7) displayCellmessage(cellLocationT, currentPlayer)
}

function updateStat (player, row, column, statusArray) {
//  console.log(statusArray)
//  statusArray[row] = player
//  console.log(statusArray)
//  console.log('player => ' + player)
//  console.log('row => ' + row)
//  console.log('column => ' + column)
  // location of last cell
  if ((row + 1) > 6) return
  var cellLocation = (row).toString(10) + column.charAt(column.length - 1)
/*
  var sourceLocation = 'chip' + cellLocation.charAt(cellLocation.length - 1)
  var p1 = document.getElementById(sourceLocation)
  p1.style.position = 'absolute'
  setInterval(moveChip(), 500)
  */
  if (row === -1) cellLocation = '0' + column.charAt(column.length - 1)
  displayCellmessage(cellLocation, player)
  statusBoard[cellLocation] = player
  let pX = document.getElementById(cellLocation)
  pX.style.borderColor = 'green'
  nextChip(cellLocation, currentPlayer, readStatusBoard(cellLocation), true)
  return cellLocation
/*
  function moveChip () {
    var x = p1.style.top || '10px'
    x = parseInt(x, 10)
    x = x + 1
    if (x < 1000) {
      p1.style.top = (x).toString(10) + 'px'
    }
    console.log(p1)
    console.log(p1.style.top)
  }
  */
}

function highLightwinner (winnerCoordinate, winnerLocation) {
  winnerCoordinate.push(winnerLocation)
  highlightColumn(winnerLocation, 'green')
  resetCursor()
  document.getElementById('reset').style.cursor = 'pointer'
//  var chipLocation = 'chip' + winnerLocation.charAt(winnerLocation.length - 1)
//  displayCellmessage(chipLocation, '')
//  document.getElementById(chipLocation).style.borderColor = 'black'
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
  statusBoard = {}
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
