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
      catch (error) {solver = error.message}
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
// Logic handles an invalid row placement
// Logic handles a valid column placement
// Logic handles an invalid column placement
// Logic handles a valid region (3x3 grid) placement
// Logic handles an invalid region (3x3 grid) placement
// Valid puzzle strings pass the solver
// Invalid puzzle strings fail the solver
// Solver returns the the expected solution for an incomplete puzzle
});
