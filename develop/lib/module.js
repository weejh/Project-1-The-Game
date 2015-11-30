export function checkWinner (column, player, statusBoard) {
  // always check for next 3 location in all direction
  var colGiven = parseInt(column.charAt(column.length - 1), 10)
  var rowGiven = parseInt(column.charAt(column.length - column.length), 10)
  var indexArray = [-1, 0, 1]
  var arrayProcess = []
  var arrayCoordinate = []
  var arrayCoordinatewinner4 = []
  var winner4 = false
  var aStatus = []
  // required status of the board, location and its player
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
          arrayCoordinate[elementIndex] = (row + column)
          arrayProcess[elementIndex] = statusBoard[row + column]
        })
//        console.log('out => ' + arrayCoordinate + ' | ' + arrayProcess + ' | ' + player)
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

export function nextChip (column, currentPlayer, statusBoard, inOrout) {
// location of the last cell occupied
  var oneLocation = statusBoard.lastIndexOf('♢')
  var twoLocation = statusBoard.lastIndexOf('☆')
  var cellLocation = ''
  if ((statusBoard.indexOf('') <= 6) && statusBoard.indexOf('') > -1) {
    if (oneLocation === twoLocation) {
      cellLocation = updateStat(currentPlayer, -1, column, statusBoard, inOrout)
    }
    if ((oneLocation > twoLocation)) {
      cellLocation = updateStat(currentPlayer, oneLocation, column, statusBoard, inOrout)
    }
    if ((oneLocation < twoLocation)) {
      cellLocation = updateStat(currentPlayer, twoLocation, column, statusBoard, inOrout)
    }
  }
//  console.log('next chip, column | cellLocation => ' + column + ' | ' + cellLocation)
//  console.log(statusBoard)
//  console.log('oneLocation | twoLocation => ' + oneLocation + ' | ' + twoLocation)
  return cellLocation
}

function updateStat (player, row, column, statusArray, inOrout) {
  // location of last cell
  if ((row + 1) > 6) return
  var cellLocation = (row + 1).toString(10) + column.charAt(column.length - 1)
  let pX = document.getElementById(cellLocation)
  inOrout ? pX.style.borderColor = '#AAE9E5' : pX.style.borderColor = 'green'
  inOrout ? pX.textContent = player : pX.textContent = ''
  return cellLocation
}
