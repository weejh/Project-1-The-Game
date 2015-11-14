var currentPlayer = 'one'
var body = document.querySelector('.body')
console.log(board);
board.addEventListener('click', event => {
  var board = event.target
  console.log(event)
//  if (board.textContent) return
  if (currentPlayer === 'one') {
    console.log(currentPlayer);
    currentPlayer = 'two'

  } else {
    console.log(currentPlayer);
    currentPlayer = 'one'

  }
})
