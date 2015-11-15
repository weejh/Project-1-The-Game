// var currentPlayer = 'one'
var body = document.querySelector('body')
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
}

function mouseoutevent () {
  var board = event.target
  if (board.className !== 'tileboard') return
//  console.log('past : ' + board.id );
  highlightColumn(board.id, 'green')
  DisplayChip(board.id, '')
}

function highlightColumn (Col, Color) {
  var colarray = ['chip', '0', '1', '2', '3', '4', '5', '6']
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
  var colarray = ['chip', '0', '1', '2', '3', '4', '5', '6']
  var statusArray = Array.from(colarray, x => '')
 // var statusArray = ['A', 'A', 'A', '', '']
//
// read status
  colarray.forEach((ele, index) => {
    statusArray[index] = document.getElementsByName(ele + Col.charAt(Col.length - 1)).textContent
  })

/*  colarray.forEach(element => {
  // console.log(element + Col.charAt(Col.length-1))
    x = document.getElementById(element + Col.charAt(Col.length - 1))
//    console.log('drop chip at ' + (element + Col.charAt(Col.length - 1)))
    statusArray = x.textContent

  //  .style.borderColor = Color
//  console.log(element)
  })*/
  var index = statusArray.lastIndexOf('A')
  console.log(statusArray, index)
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
