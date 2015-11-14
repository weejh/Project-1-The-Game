// var currentPlayer = 'one'
var body = document.querySelector('body')
// console.log(body)
body.addEventListener('click', clickevent)
body.addEventListener('mouseover', mouseoverevent)
body.addEventListener('mouseout', mouseoutevent)

function clickevent () {
  console.log('click event')
  var board = event.target
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
}

function mouseoutevent () {
  var board = event.target
  if (board.className !== 'tileboard') return
//  console.log('past : ' + board.id );
  highlightColumn(board.id, 'black')
}

function highlightColumn (Col, Color) {
  var colarray = ['chip', '0', '1', '2', '3', '4', '5', '6']
  // console.log(pastColumnelement);
  // pastColumnelement.style.backgroundColor='black'

  colarray.forEach(element => {
  // console.log(element + Col.charAt(Col.length-1))
    document.getElementById(element + Col.charAt(Col.length - 1)).style.backgroundColor = Color
  // console.log(Columnelement)
  })

//   pastColumnelement = currentColumnelement || ''
//   colarray.forEach ((Col) => {
//     board.id
//   })
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
