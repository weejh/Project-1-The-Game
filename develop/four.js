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
  DisplayChip(board.id, currentPlayer)
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
// next player
  document.getElementById('left4status').textContent = 'Player ' + currentPlayer.charAt(0).toUpperCase() + currentPlayer.slice(1)
//  console.log(statusBoard)
//console.log('current player : ' + currentPlayer + ' | location :' + (statusArray.lastIndexOf(currentPlayer) + 1).toString(10) + Col.charAt(Col.length - 1))
  // to check for winner
//  console.log(checkWinner ((statusArray.lastIndexOf(currentPlayer) + 1).toString(10) + Col.charAt(Col.length - 1), currentPlayer))
//console.log(statusBoard);
checkWinner ((statusArray.lastIndexOf(currentPlayer) + 1).toString(10) + Col.charAt(Col.length - 1), currentPlayer)

currentPlayer === 'one' ? currentPlayer = 'two' : currentPlayer = 'one'
}

function updateStat (player, row, column) {
  statusArray[row] = player
  document.getElementById((row + 1).toString(10) + column.charAt(column.length - 1)).textContent = player
  statusBoard[(row + 1).toString(10) + column.charAt(column.length - 1)] = player
}

function checkWinner (Col, player) {
  // always check for next 3 location in all direction
  var colgiven = parseInt(Col.charAt(Col.length - 1), 10)
  var rowgiven = parseInt(Col.charAt(Col.length - Col.length), 10)
  var indexarray = [-1, 0, 1]
  var arrayprocess = Array.of(3)
  var Astatus = []
  //console.log('in check winner, location: ' + colgiven + rowgiven + ' | player : ' + player);
  console.log(statusBoard);
  indexarray.forEach(rowIndex => {
    indexarray.forEach(columnIndex => {
      [1, 2, 3].forEach((element, elementIndex) => {
          if ((columnIndex.toString(10) + rowIndex.toString(10)) !== '00') {
    //  arrayprocess[elementIndex] = (columnIndex*element).toString(10) + (rowIndex*element).toString(10)

     arrayprocess[elementIndex] = statusBoard[((rowIndex * element) + colgiven).toString(10) + ((columnIndex * element) + rowgiven).toString(10)]
  //  console.log(typeof(arrayprocess[elementIndex]));
  console.log('col : ' + (columnIndex * element) + ' | row : ' + (rowIndex * element) + ' | arrayprocess ' + arrayprocess)
  }

      })
      console.log(Astatus);
      if (arrayprocess.every(ele => ele === player)) Astatus.push('matched')
    //  console.log('status : ' + status);
      arrayprocess = Array.of(3)
    })
  })
  return Astatus
}
