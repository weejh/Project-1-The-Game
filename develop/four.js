var currentPlayer = 'one'
var board = document.querySelector('tileboard')

board.addEventListener('click', event => {
  var tileboard = event.target
  console.log(event)
  if (tileboard.textContent) return
  if (currentPlayer === 'one') {
    currentPlayer = 'two'
  } else {
    currentPlayer = 'one'
  }
})
