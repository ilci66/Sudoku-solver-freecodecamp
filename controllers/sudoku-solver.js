class SudokuSolver {

  letterToNumber(letter){
    if(letter == 'A'){return 1}
    else if(letter == 'B'){return 2}
    else if(letter == 'C'){return 3}
    else if(letter == 'D'){return 4}
    else if(letter == 'E'){return 5}
    else if(letter == 'F'){return 6}
    else if(letter == 'G'){return 7}
    else if(letter == 'H'){return 8}
    else if(letter == 'I'){return 9}
  }

  stringToGrid(puzzleString){
    let gridOutput = []

    for(let i = 0; i < 81; i+=9){
      gridOutput.push(puzzleString.split("").splice(i,9))
    }
    
    return gridOutput;
  }

  validate(puzzleString) {

  }

  checkRowPlacement(puzzleString, row, column, value) {

    return;
  }

  checkColPlacement(puzzleString, row, column, value) {

    return;
  }

  checkRegionPlacement(puzzleString, row, column, value) {

    return;
  }

  solve(puzzleString) {
//   for (let i = 0; i < 9; i++) {
//     for (let j = 0; j < 9; j++) {
//       if (data[i][j] == '.') {
//         for (let k = 1; k <= 9; k++) {
//           if (isValid(data, i, j, k)) {
//             data[i][j] = `${k}`;
//           if (sodokoSolver(data)) {
//            return true;
//           } else {
//            data[i][j] = '.';
//           }
//          }
//        }
//        return false;
//      }
//    }
//  }
//  return true;
    return;
  }
}

module.exports = SudokuSolver;

// sodokoSolver(_board);
// console.log(_board);

// function isValid(board, row, col, k) {
//     for (let i = 0; i < 9; i++) {
//         const m = 3 * Math.floor(row / 3) + Math.floor(i / 3);
//         const n = 3 * Math.floor(col / 3) + i % 3;
//         if (board[row][i] == k || board[i][col] == k || board[m][n] == k) {
//           return false;
//         }
//     }
//     return true;
// }


// function sodokoSolver(data) {
//   for (let i = 0; i < 9; i++) {
//     for (let j = 0; j < 9; j++) {
//       if (data[i][j] == '.') {
//         for (let k = 1; k <= 9; k++) {
//           if (isValid(data, i, j, k)) {
//             data[i][j] = `${k}`;
//           if (sodokoSolver(data)) {
//            return true;
//           } else {
//            data[i][j] = '.';
//           }
//          }
//        }
//        return false;
//      }
//    }
//  }
//  return true;
// }