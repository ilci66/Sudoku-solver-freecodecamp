const chai = require('chai');
const assert = chai.assert;
const { puzzlesAndSolutions } = require('../controllers/puzzle-strings.js')
const Solver = require('../controllers/sudoku-solver.js');
let solver = new Solver();
suite('UnitTests', () => {

// Logic handles a valid puzzle string of 81 characters
  test('valid puzzle 81 characters', (done) => {   
     let validPuzzle = puzzlesAndSolutions[0][0]
    // assert.equal(validPuzzle, solver.build(validPuzzle))
    // done();
      let errorMessage = null
      try {solver.build(validPuzzle)} 
      catch (error) {errorMessage = error.message}
      assert.isNull(errorMessage)
      done();

  })

// Logic handles a puzzle string with invalid characters (not 1-9 or .)
  test('invalid in puzzle string', (done) => {
    let errorMessage;
    let invalidPuzzle = puzzlesAndSolutions[0][0].replace(".","/")
    try {solver.build(invalidPuzzle)}
    catch (error) {errorMessage = error.message }
    assert.equal(errorMessage, 'Invalid characters in puzzle')
    done();
  })
// Logic handles a puzzle string that is not 81 characters in length
  test('puzzle not 81 characters', (done) => {
    let errorMessage;
    let invalidPuzzle = "...11..1"
    try{solver.build(invalidPuzzle)}
    catch(error){errorMessage=error.message}
    assert.equal(errorMessage, 'Expected puzzle to be 81 characters long')
    done();
  })
// Logic handles a valid row placement
  test('valid row input', (done) => {
    let puzzleString = puzzlesAndSolutions[0][0]
    solver.build(puzzleString)
    let placement = solver.checkRowPlacement(0, 3)
    assert.isTrue(placement)
    done();
  })
// Logic handles an invalid row placement
  test('invalid row input', (done) => {
    let puzzleString = puzzlesAndSolutions[0][0]
    solver.build(puzzleString)
    let placement = solver.checkRowPlacement(0, 5)
    assert.isFalse(placement)
    done();
  })
// Logic handles a valid column placement
  test('valid column input', (done) => {
    let puzzleString = puzzlesAndSolutions[0][0]
    solver.build(puzzleString)
    let placement = solver.checkColPlacement(0, 5)
    assert.isTrue(placement)
    done();
  })
// Logic handles an invalid column placement
  test('invalid column input', (done) => {
    let puzzleString = puzzlesAndSolutions[0][0]
    solver.build(puzzleString)
    let placement = solver.checkColPlacement(0, 1)
    assert.isFalse(placement)
    done();
  })
// Logic handles a valid region (3x3 grid) placement
  test('valid region input', (done) => {
    let puzzleString = puzzlesAndSolutions[0][0]
    solver.build(puzzleString)
    let placement = solver.checkColPlacement(1, 1, 1)
    assert.isTrue(placement)
    done();
  })
// Logic handles an invalid region (3x3 grid) placement
  test('invalid region input', (done) => {
    let puzzleString = puzzlesAndSolutions[0][0]
    solver.build(puzzleString)
    let placement = solver.checkColPlacement(1, 6, 2)
    assert.isFalse(placement)
    done();
  })
// Valid puzzle strings pass the solver
  test('valid puzzle pass solver', (done) => {
    let puzzleString = puzzlesAndSolutions[0][0]
    let grid = solver.build(puzzleString)
    let result = solver.solve(grid)
    assert.equal(result, puzzlesAndSolutions[0][1])
    done();
  })
// Invalid puzzle strings fail the solver
  test('invalid puzzle pass solver', (done) => {
    let puzzleString = puzzlesAndSolutions[0][0].replace('.',9)
    let grid = solver.build(puzzleString)
    // let result = solver.solve(grid)
    let errorMessage;
    let result;
    try{
      result = solver.solve(solver.build(puzzleString))
      if (!result) throw new Error('Puzzle cannot be solved')
    }catch(error){errorMessage = error.message}
    assert.equal(errorMessage, 'Puzzle cannot be solved')
    done();
  })
// Solver returns the the expected solution for an incomplete puzzle
  test('valid puzzle returns solution', (done) => {
    let puzzleString = puzzlesAndSolutions[0][0]
    let grid = solver.build(puzzleString)
    let result;
    result = solver.solve(solver.build(puzzleString))
    assert.equal(result, puzzlesAndSolutions[0][1])
    done();
  })
});
