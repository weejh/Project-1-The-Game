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
  return cellLocation
}

function updateStat (player, row, column, statusArray, inOrout) {
  // location of last cell
  if ((row + 1) > 6) return
  var cellLocation = (row + 1).toString(10) + column.charAt(column.length - 1)
//  displayCellmessage(cellLocation, player)
//  statusBoard[cellLocation] = player
//  console.log('player => ' + player + '   inOrout => ' + inOrout + '  cellLocation => ' + cellLocation)
  let pX = document.getElementById(cellLocation)
  inOrout ? pX.style.borderColor = '#AAE9E5' : pX.style.borderColor = 'green'
  if (inOrout) {
    pX.textContent = player
  } else {
    let cellRowT = parseInt(cellLocation.charAt(cellLocation.length - cellLocation.length), 10)
    let cellCol = cellLocation.charAt(cellLocation.length - 1)
    console.log(' before cellrow => ' + cellRowT)
    cellRowT = cellRowT - 1
    console.log(' cellrow => ' + cellRowT)
    let cellRow = cellRowT.toString(10)
    let pXa = document.getElementById(cellRow + cellCol)
    console.log(' moveout cellLocation=> ' + cellRow + cellCol)
    pXa.textContent = ''
  }

  return cellLocation
}
