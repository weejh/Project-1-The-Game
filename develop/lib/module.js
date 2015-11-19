export default function checkWinner (column, player, statusBoard) {
  // always check for next 3 location in all direction
  var rowGiven = parseInt(column.charAt(column.length - 1), 10)
  var colGiven = parseInt(column.charAt(column.length - column.length), 10)
  var indexArray = [-1, 0, 1]
  var arrayProcess = []
  var arrayCoordinate = []
  var arrayCoordinatewinner4 = []
  var winner4 = false
  var aStatus = []
//  console.log('in check winner, location: ' + colGiven + rowGiven + ' | player : ' + player)
//  console.log(statusBoard)
  computeStatus([1, 2, 3])
  if (aStatus.some(e => e === true)) return [arrayCoordinatewinner4, column, true]
  aStatus = []
  computeStatus([-1, 1, 2])
  if (aStatus.some(e => e === true)) return [arrayCoordinatewinner4, column, true]
  return [arrayCoordinatewinner4, column, false]
  // console.log('player ' + player + ' win is '+ Astatus.some(e => e === true))
// compute the status of the board
  function computeStatus (elementRequired) {
    indexArray.forEach(rowIndex => {
      indexArray.forEach(columnIndex => {
        elementRequired.forEach((element, elementIndex) => {
          var column = ((columnIndex * element) + colGiven).toString(10)
          var row = ((rowIndex * element) + rowGiven).toString(10)
          arrayCoordinate[elementIndex] = (column + row)
          arrayProcess[elementIndex] = statusBoard[column + row]
        })
      // console.log('player:' + player + ' | loc : '+ arraycoordinate + ' | arrayprocess : ' + arrayprocess )
        winner4 = (arrayCoordinate.every(cord => cord !== column) && arrayProcess.every(ele => ele === player))
        winner4 ? arrayCoordinatewinner4 = arrayCoordinate : arrayCoordinate = []
        aStatus.push(winner4)
        arrayCoordinate = []
      })
    })
//    console.log('end of computeStatus: ' + arrayCoordinatewinner4 + ' | ' + column + ' | ' + aStatus)
  }
}
