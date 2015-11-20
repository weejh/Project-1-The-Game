import {checkWinner} from './lib/module.js'
var currentPlayer = 'one'
var body = document.querySelector('body')
var statusBoard = {}
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
        endofGameStatus(('Player ' + currentPlayer.charAt(0).toUpperCase() + currentPlayer.slice(1) + ' wins'))
        endofGame(winnerStatus[1])
        return
      }
      currentPlayer === 'one' ? currentPlayer = 'two' : currentPlayer = 'one'
      var endofColumn = ['60', '61', '63', '64', '65', '66']
      if (endofColumn.some(e => e === cellLocation)) {
        nextPlayer(cellLocation, currentPlayer)
      }
      nextPlayer(cellLocation, currentPlayer)
    } else {
      var chipLocation = '6' + board.id.charAt(board.id.length - 1)
      winnerStatus = checkWinner(chipLocation, currentPlayer, statusBoard)
      if (winnerStatus[2]) {
        highLightwinner(winnerStatus[0], winnerStatus[1])
      }
      endofColumn = ['60', '61', '63', '64', '65', '66']
      if (endofColumn.every(e => document.getElementById(e).textContent !== '')) {
        var chip = 'No more move, please click on reset'
        chipLocation = 'chip' + board.id.charAt(board.id.length - 1)
        displayCellmessage('left4status', chip)
        endofGame(chipLocation)
      }
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
  var chipLocation = 'chip' + column.charAt(column.length - 1)
  displayCellmessage(chipLocation, currentPlayer)
  displayCellmessage('left4status', ('Player ' + currentPlayer.charAt(0).toUpperCase() + currentPlayer.slice(1)))
}

function updateStat (player, row, column, statusArray) {
  statusArray[row] = player
  // location of last cell
  if ((row + 1) > 6) return
  var cellLocation = (row + 1).toString(10) + column.charAt(column.length - 1)
  displayCellmessage(cellLocation, player)
  statusBoard[cellLocation] = player
  return cellLocation
}

function highLightwinner (winnerCoordinate, winnerLocation) {
  winnerCoordinate.push(winnerLocation)
  highlightColumn(winnerLocation, 'green')
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
    console.log('reset')
    reStartgame()
  })
}

function endofGameStatus (messAge) {
  document.getElementById('left4status').textContent = messAge
  document.getElementById('left3status').textContent = 'Please click Reset to start new game'
}

function reStartgame () {
  console.log('in reStartgame')
  currentPlayer = 'one'
  body = document.querySelector('body')
  statusBoard = {}
  body.removeEventListener('click', clickevent)
  body.removeEventListener('mouseover', mouseoverevent)
  body.removeEventListener('mouseout', mouseoutevent)
  body.addEventListener('click', clickevent)
  body.addEventListener('mouseover', mouseoverevent)
  body.addEventListener('mouseout', mouseoutevent)
}
