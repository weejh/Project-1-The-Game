// var currentPlayer = 'one'
var body = document.querySelector('body')
// console.log(body)
body.addEventListener('click', clickevent)
body.addEventListener('mouseover', mouseoverevent)

function clickevent () {
  console.log('clickevnet')
  var board = event.target
  console.log(board)
}
function mouseoverevent () {
//  console.log('mouseover')
  var board = event.target
  if (board.className !== 'tileboard') return
  console.log(board.className)

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
