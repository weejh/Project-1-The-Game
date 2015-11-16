var currentPlayer = 'one'
var body = document.querySelector('body')
var statusBoard = {}
var statusArray = Array.of(7)
// console.log(body)
body.addEventListener('click', clickevent)
body.addEventListener('mouseover', mouseoverevent)
body.addEventListener('mouseout', mouseoutevent)

function clickevent () {
//  console.log('click event')
  var board = event.target
  if (board.className !== 'tileboard') return
  DropChip(board.id)

//  console.log(board)
}
function mouseoverevent () {
//  console.log('mouseover')
  var board = event.target
  if (board.className !== 'tileboard') return
//  console.log(board.className)
//  console.log(board.id.charAt(board.id.length - 1))
//  highlightColum (board.id.charAt(board.id.length - 1))
// currentColumn = board.id
// console.log('current : ' + board.id);
  highlightColumn(board.id, '#AAE9E5')
  DisplayChip(board.id, 'CHIP')
  document.getElementById('chip' + board.id.charAt(board.id.length - 1)).style.borderColor = '#AAE9E5'

}

function mouseoutevent () {
  var board = event.target
  if (board.className !== 'tileboard') return
//  console.log('past : ' + board.id );
  highlightColumn(board.id, 'green')
  DisplayChip(board.id, '')
  document.getElementById('chip' + board.id.charAt(board.id.length - 1)).style.borderColor = 'blue'

}

function highlightColumn (Col, Color) {
  var colarray = ['0', '1', '2', '3', '4', '5', '6']
  // console.log(pastColumnelement);
  // pastColumnelement.style.backgroundColor='black'

  colarray.forEach(element => {
  // console.log(element + Col.charAt(Col.length-1))
    document.getElementById(element + Col.charAt(Col.length - 1)).style.borderColor = Color
  // console.log(Columnelement)
  })

//   pastColumnelement = currentColumnelement || ''
//   colarray.forEach ((Col) => {
//     board.id
//   })
}

function DisplayChip (Col, chip) {
  document.getElementById('chip' + Col.charAt(Col.length - 1)).textContent = chip
}

function DropChip (Col) {
  var colarray = ['0', '1', '2', '3', '4', '5', '6']
//
  colarray.forEach ((element, index) => {
    statusArray[index] = document.getElementById(element + Col.charAt(Col.length - 1)).textContent
  })
//console.log('stats array : '+statusArray);
//console.log('player : ' + currentPlayer);
//console.log(statusArray.lastIndexOf('one')+'  '+statusArray.lastIndexOf('two'))
//
//
  if (statusArray.lastIndexOf('one') && statusArray.lastIndexOf('two')) updateStat(currentPlayer, -1, Col)
  if (statusArray.lastIndexOf('one') > statusArray.lastIndexOf('two')) updateStat(currentPlayer, statusArray.lastIndexOf('one'), Col)
  if (statusArray.lastIndexOf('one') < statusArray.lastIndexOf('two')) updateStat(currentPlayer, statusArray.lastIndexOf('two'), Col)
//
//
  /*if (statusArray.lastIndexOf('one') < statusArray.lastIndexOf('two')) {
    console.log('one > two');
    statusArray[statusArray.lastIndexOf('one')] = 'one'
    document.getElementById((statusArray.lastIndexOf('one') + 1).toString(10) + Col.charAt(Col.length - 1)).textContent = 'one'
    statusBoard[(statusArray.lastIndexOf('one')+ 1).toString(10) + Col.charAt(Col.length - 1)] = currentPlayer
  }

  if (statusArray.lastIndexOf('one') > statusArray.lastIndexOf('two')) {
    console.log('one < two');
    statusArray[statusArray.lastIndexOf('two')] = 'two'
    document.getElementById((statusArray.lastIndexOf('two') +1 ).toString(10) + Col.charAt(Col.length - 1)).textContent = 'two'
    statusBoard[(statusArray.lastIndexOf('two') + 1).toString(10) + Col.charAt(Col.length - 1)] = currentPlayer
  }*/
  //
  //
  //
  //
  currentPlayer === 'one' ? currentPlayer = 'two' : currentPlayer = 'one'
  console.log(statusBoard)
// console.log('next player : ' + currentPlayer)
}

function updateStat (player, row, column) {
  statusArray[row] = player
//  console.log('in updateStat, row: ' + row )
//  console.log('in updateStat, column: ' + column)
  document.getElementById((row + 1).toString(10) + column.charAt(column.length - 1)).textContent = player
  statusBoard[(row + 1).toString(10) + column.charAt(column.length - 1)] = player
}
  /* else {
    statusArray[0] = 'A'
    document.getElementById('0' + Col.charAt(Col.length - 1)).textContent = 'A'
    var update = ('0' + Col.charAt(Col.length - 1))
    statusBoard[update] = currentPlayer
//    console.log('in 0 ', document.getElementById('0' + Col.charAt(Col.length - 1)).textContent)
  }
  colarray.forEach(x => {
    console.log(document.getElementById(x + Col.charAt(Col.length - 1)).textContent)
    console.log(statusBoard)
  })
}
/* event => {
  var tileboard = event.target
  console.log(event)
  if (tileboard.textContent) return
  if (currentPlayer === 'one') {
    console.log(currentPlayer)
    currentPlayer = 'two'
  } else {
    console.log(currentPlayer)
    currentPlayer = 'one'
  }
})
*/
