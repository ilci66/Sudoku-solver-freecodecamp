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
    //I handled it in the routes
  }

  checkColPlacement(grid, row, column, value) {
    for (let i = 0; i < 9; i++) {
        const m = 3 * Math.floor(row / 3) + Math.floor(i / 3);
        const n = 3 * Math.floor(column / 3) + i % 3;
        if (grid[row][i] == value) {
          return false;
        }
    }
    return true;
  }

  checkRowPlacement(grid, row, column, value) {
    for (let i = 0; i < 9; i++) {
        const m = 3 * Math.floor(row / 3) + Math.floor(i / 3);
        const n = 3 * Math.floor(column / 3) + i % 3;
        if (grid[i][column] == value) {
          return false;
        }
    }
    return true;
  }


  checkRegionPlacement(grid, row, column, value) {
    for (let i = 0; i < 9; i++) {
        const m = 3 * Math.floor(row / 3) + Math.floor(i / 3);
        const n = 3 * Math.floor(column / 3) + i % 3;
        if (grid[m][n] == value) {
          return false;
        }
    }
    return true;

  }
  isValid(grid, row, column, value) {
    for (let i = 0; i < 9; i++) {
        const m = 3 * Math.floor(row / 3) + Math.floor(i / 3);
        const n = 3 * Math.floor(column / 3) + i % 3;
        if (grid[row][i] == value || grid[i][column] == value || grid[m][n] == value) {
          return false;
        }
    }
    return true;

  }
  solve(grid) { 
    for (let i = 0; i < 9; i++) {
      for (let j = 0; j < 9; j++) {
        if (grid[i][j] == '.') {
          for (let value = 1; value <= 9; value++) {
            if (this.isValid(grid, i, j, value)) {
              grid[i][j] = `${value}`;
            if (this.solve(grid)) {
            // console.log(grid)
            if(grid.flat(9).indexOf(".") >= 0){
              return true
            }
            return grid.flat(9);
            } else {
            grid[i][j] = '.';
            }
          }
        }
        return false;
      }
    }
  }
  // console.log(grid.flat(9))
  return true ;
  }


}

module.exports = SudokuSolver;

