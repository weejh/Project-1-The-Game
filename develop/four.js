// import { checkWinner } from './module.js'
var currentPlayer = 'one'
var body = document.querySelector('body')
var statusBoard = {}
var statusArray = []
var completedColumn = []
var winner4 = ''
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
  document.getElementById(chipLocation).style.borderColor = 'black'
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
//  console.log('oneLocation: ' + oneLocation + ' | twoLocation: ' + twoLocation)
 console.log('statusArray: '+ statusArray + ' | ' + statusArray.indexOf(''))
  if ((statusArray.indexOf('') < 7) && statusArray.indexOf('') > -1) {
    if (oneLocation && twoLocation) updateStat(currentPlayer, -1, column)
    if ((oneLocation > twoLocation)) updateStat(currentPlayer, oneLocation, column)
    if ((oneLocation < twoLocation)) updateStat(currentPlayer, twoLocation, column)
  } else completedColumn.find(ele => ele === column) ? column : completedColumn.push(column)
  //
  console.log('completedColumn: ' + completedColumn);
  console.log(statusBoard);
  // current player location
  var currentPlayerlocation = (statusArray.lastIndexOf(currentPlayer) + 1).toString(10) + column.charAt(column.length - 1)
  // console.log(currentPlayerlocation)
//  moveChip(currentPlayerlocation)
  // check for winner
  if (checkWinner(currentPlayerlocation, currentPlayer)) {
    //
    // update wining status
    document.getElementById('left4status').textContent = 'Player ' + currentPlayer.charAt(0).toUpperCase() + currentPlayer.slice(1) + ' wins'
    // remove all event listener and wait for reset
    body.removeEventListener('click', clickevent)
    body.removeEventListener('mouseover', mouseoverevent)
    body.removeEventListener('mouseout', mouseoutevent)
    body.addEventListener('click', event => {
      var reSet = event.target
      if (reSet.id !== 'reset') return
      document.location.reload(true)
    })
  } else {
    // next player
    currentPlayer === 'one' ? currentPlayer = 'two' : currentPlayer = 'one'
    var chipLocation = 'chip' + column.charAt(column.length - 1)
    displayChip(chipLocation, currentPlayer)
    document.getElementById('left4status').textContent = 'Player ' + currentPlayer.charAt(0).toUpperCase() + currentPlayer.slice(1)
  }
}

function moveChip (sourceLocation) {
  var colGiven = parseInt(sourceLocation.charAt(sourceLocation.length - 1), 10)
  var rowGiven = parseInt(sourceLocation.charAt(sourceLocation.length - sourceLocation.length), 10)
//  console.log('row : ' + rowGiven + ' | col: ' + colGiven)
//  var column = ['6', '5', '4', '3', '2', '1', '0'].slice(0, 8 - rowGiven)
//  console.log(column);
}
function updateStat (player, row, column) {
  statusArray[row] = player
  console.log(' in func  row: ' + (row + 1))
  // location of last cell
  if ((row + 1) > 6) return
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
//
// compute the status of the board
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
        winner4 = (arrayCoordinate.every(cord => cord !== column) && arrayProcess.every(ele => ele === player))
        if (winner4) highLightwinner(arrayCoordinate, column)
        aStatus.push(winner4)
        arrayCoordinate = []
      })
    })
  }
}
function highLightwinner (winnerCoordinate, winner) {
  winnerCoordinate.push(winner)
  highlightColumn(winner, 'green')
  displayChip(winner, '')
  resetCursor()
  document.getElementById('reset').style.cursor = 'pointer'
  var chipLocation = 'chip' + winner.charAt(winner.length - 1)
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
