export function checkWinner (givenLoc, statusBoard, currentPlayer) {
  // var given = '01'
  var arrayobj = {}
  var arrayprocess = Array.of(3)
  var Astatus = []
  arrayobj['10'] = 'one'
  arrayobj['00'] = 'one'
  arrayobj['01'] = 'two'
//    arrayobj['21'] = 'two'
  //  arrayobj['30'] = 'one'
  //  arrayobj['00'] = 'one'
  //  arrayobj['01'] = 'two'
  // arrayobj.apple = 1
  var indexarray = [-1, 0, 1]
  var colgiven = parseInt(givenLoc.charAt(givenLoc.length - 1), 10)
  var rowgiven = parseInt(givenLoc.charAt(givenLoc.length - givenLoc.length), 10)
  console.log('given row : ' + rowgiven + ' given col : ' + colgiven)
  console.log(givenLoc + ' | ' + currentPlayer)
  console.log(statusBoard)
  console.log(' function checkWinner')
  //
  //
  indexarray.forEach(rowIndex => {
    indexarray.forEach(columnIndex => {
      [1,2,3].forEach((element, elementIndex) => {
        // arrayprocess[elementIndex] = (columnIndex*element).toString(10) + (rowIndex*element).toString(10)
        // if ((columnIndex != 0) && (rowIndex !=0)) {
        if ((columnIndex.toString(10) + rowIndex.toString(10)) !== '00') {
        //  arrayprocess[elementIndex] = (columnIndex*element).toString(10) + (rowIndex*element).toString(10)
                    arrayprocess[elementIndex] = statusBoard[((rowIndex * element) + colgiven).toString(10) + ((columnIndex * element) + rowgiven).toString(10)]
      //  console.log(typeof(arrayprocess[elementIndex]));
         console.log('col : ' + (columnIndex * element) + ' | row : ' + (rowIndex * element) + ' | arrayprocess ' + arrayprocess)
      }

        //  if (element === 3)
      //    console.log('arrayprocess : ' + arrayprocess)

    //    console.log(arrayprocess);
    //    arrayprocess[elementIndex] = arrayobj[(rowIndex*element + rowgiven).toString(10) + (columnIndex*element + colgiven).toString(10)]
      //  arrayprocess.push(arrayobj[(rowIndex*element + rowgiven).toString(10) + (columnIndex*element + colgiven).toString(10)])
    //  if (((rowIndex*element + rowgiven).toString(10) !== 0) && ((columnIndex*element + colgiven).toString(10) !== 0)) {
      //  console.log('row : ' + (rowIndex*element + rowgiven).toString(10) + ' | col : ' + (columnIndex*element + colgiven).toString(10) + ' | array :' + arrayprocess)}

    //  if ( (element === 3) && (arrayprocess.every( ele => ele==='one')) ) console.log('tested ok')
      })

  // console.log('before clear arrayprocess : ' + arrayprocess);
  //    if (arrayprocess.every( ele => ele === 'one') ) console.log('matched' + ' | arrayprocess : ' + arrayprocess );

      if (arrayprocess.every(ele => ele === 'one')) Astatus.push('matched')
        console.log(Astatus)
      arrayprocess = Array.of(3)
    //  console.log('after clear arrayprocess : ' + arrayprocess);
    })
  })
}
