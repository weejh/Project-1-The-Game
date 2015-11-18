// import { checkWinner } from './module.js'
var currentPlayer = 'one'
var body = document.querySelector('body')
var statusBoard = {}
var statusArray = []
body.addEventListener('click', clickevent)
body.addEventListener('mouseover', mouseoverevent)
body.addEventListener('mouseout', mouseoutevent)

function clickevent (event) {
  var board = event.target
  if (board.className !== 'tileboard') return
  if (board.id === 'reset') document.location.reload(true)
  else dropChip(board.id)
}

function mouseoverevent (event) {
  var board = event.target
  if (board.className !== 'tileboard') return
  if (board.id === 'reset') return
  highlightColumn(board.id, '#AAE9E5')
  displayChip(board.id, currentPlayer)
  var chipLocation = 'chip' + board.id.charAt(board.id.length - 1)
  document.getElementById(chipLocation).style.borderColor = '#AAE9E5'
}

function mouseoutevent (event) {
  var board = event.target
  if (board.className !== 'tileboard') return
  if (board.id === 'reset') return
  highlightColumn(board.id, 'green')
  displayChip(board.id, '')
  var chipLocation = 'chip' + board.id.charAt(board.id.length - 1)
  document.getElementById(chipLocation).style.borderColor = 'blue'
}

function highlightColumn (column, Color) {
  var colarray = ['0', '1', '2', '3', '4', '5', '6']
  colarray.forEach(element => {
    var cellLocation = element + column.charAt(column.length - 1)
    document.getElementById(cellLocation).style.borderColor = Color
  })
}

function displayChip (column, chip) {
  var chipLocation = 'chip' + column.charAt(column.length - 1)
  document.getElementById(chipLocation).textContent = chip
}

function dropChip (column) {
  var columnArray = ['0', '1', '2', '3', '4', '5', '6']
  //
  // read the status from the board
  columnArray.forEach((element, index) => {
    var cellLocation = element + column.charAt(column.length - 1)
    statusArray[index] = document.getElementById(cellLocation).textContent
  })
//
// update the status array
  var oneLocation = statusArray.lastIndexOf('one')
  var twoLocation = statusArray.lastIndexOf('two')
  if (oneLocation && twoLocation) updateStat(currentPlayer, -1, column)
  if (oneLocation > twoLocation) updateStat(currentPlayer, oneLocation, column)
  if (oneLocation < twoLocation) updateStat(currentPlayer, twoLocation, column)
  //
  // current player location
  var currentPlayerlocation = (statusArray.lastIndexOf(currentPlayer) + 1).toString(10) + column.charAt(column.length - 1)
  // check for winner
  if (checkWinner(currentPlayerlocation, currentPlayer)) {
    //
    // update wining status
    document.getElementById('left4status').textContent = 'Player ' + currentPlayer.charAt(0).toUpperCase() + currentPlayer.slice(1) + ' wins'
    body.removeEventListener('click', clickevent)
    body.removeEventListener('mouseover', mouseoverevent)
    body.removeEventListener('mouseout', mouseoutevent)
  } else {
    // next player
    currentPlayer === 'one' ? currentPlayer = 'two' : currentPlayer = 'one'
    document.getElementById('left4status').textContent = 'Player ' + currentPlayer.charAt(0).toUpperCase() + currentPlayer.slice(1)
  }
}

function updateStat (player, row, column) {
  statusArray[row] = player
  // location of last cell
  var cellLocation = (row + 1).toString(10) + column.charAt(column.length - 1)
  document.getElementById(cellLocation).textContent = player
  statusBoard[cellLocation] = player
}

function checkWinner (column, player) {
  // always check for next 3 location in all direction
  var rowGiven = parseInt(column.charAt(column.length - 1), 10)
  var colGiven = parseInt(column.charAt(column.length - column.length), 10)
  var indexArray = [-1, 0, 1]
  var arrayProcess = []
  var arrayCoordinate = []
  var aStatus = []
//  console.log('in check winner, location: ' + colGiven + rowGiven + ' | player : ' + player)
//  console.log(statusBoard)
  computeStatus([1, 2, 3])
  computeStatus([-1, 1, 2])
  // console.log('player ' + player + ' win is '+ Astatus.some(e => e === true))
  // return status
  return aStatus.some(e => e === true)

  function computeStatus (elementRequired) {
    indexArray.forEach(rowIndex => {
      indexArray.forEach(columnIndex => {
        elementRequired.forEach((element, elementIndex) => {
          var column = ((columnIndex * element) + colGiven).toString(10)
          var row = ((rowIndex * element) + rowGiven).toString(10)
          arrayCoordinate[elementIndex] = (column + row)
          arrayProcess[elementIndex] = statusBoard[column + row]
        })
      // console.log('player:' + player + ' | loc : '+ arraycoordinate + ' | arrayprocess : ' + arrayprocess )
        aStatus.push(arrayCoordinate.every(cord => cord !== column) && arrayProcess.every(ele => ele === player))
        arrayCoordinate = []
      })
    })
  }
}
