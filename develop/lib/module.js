export function checkWinner (column, player, statusBoard) {
  // always check for next 3 location in all direction
  var rowGiven = parseInt(column.charAt(column.length - 1), 10)
  var colGiven = parseInt(column.charAt(column.length - column.length), 10)
  var indexArray = [-1, 0, 1]
  var arrayProcess = []
  var arrayCoordinate = []
  var arrayCoordinatewinner4 = []
  var winner4 = false
  var aStatus = []
  // compute winning status
  computeStatus([1, 2, 3])
  if (aStatus.some(e => e === true)) return [arrayCoordinatewinner4, column, true]
  aStatus = []
  computeStatus([-1, 1, 2])
  if (aStatus.some(e => e === true)) return [arrayCoordinatewinner4, column, true]
  return [arrayCoordinatewinner4, column, false]
  function computeStatus (elementRequired) {
    indexArray.forEach(rowIndex => {
      indexArray.forEach(columnIndex => {
        elementRequired.forEach((element, elementIndex) => {
          var column = ((columnIndex * element) + colGiven).toString(10)
          var row = ((rowIndex * element) + rowGiven).toString(10)
          arrayCoordinate[elementIndex] = (column + row)
          arrayProcess[elementIndex] = statusBoard[column + row]
        })
        winner4 = (arrayCoordinate.every(cord => cord !== column) && arrayProcess.every(ele => ele === player))
        winner4 ? arrayCoordinatewinner4 = arrayCoordinate : arrayCoordinate = []
        aStatus.push(winner4)
        arrayCoordinate = []
      })
    })
  }
}

export function clearBoard () {
  var col = ['0', '1', '2', '3', '4', '5', '6', '7']
  var row = ['0', '1', '2', '3', '4', '5', '6']
  row.forEach(erow => {
    col.forEach(ecol => {
      var cellLocation = document.getElementById(erow + ecol)
      if (cellLocation.textContent !== '') {
        cellLocation.textContent = ''
        cellLocation.style.backgroundColor = 'black'
        cellLocation.style.borderColor = 'green'
      }
    })
  })
}

export function moveChip (finalDest) {
  var sourceLocation = 'chip' + finalDest.charAt(finalDest.length - 1)
  var finialLocaiton = finalDest
  finialLocaiton
  sourceLocation
}
