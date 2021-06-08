const chai = require("chai");
const chaiHttp = require('chai-http');
const assert = chai.assert;
const server = require('../server');
const { puzzlesAndSolutions } = require('../controllers/puzzle-strings.js')
chai.use(chaiHttp);

suite('Functional Tests', () => {
// Solve a puzzle with valid puzzle string: POST request to /api/solve
  let validPuzzleString = puzzlesAndSolutions[0][0]
  let validPuzzleSolution = puzzlesAndSolutions[0][1]
  test('solve, valid puzzle', (done) => {
    let puzzle = validPuzzleString
    chai
      .request(server)
      .post('/api/solve')
      .send({puzzle})
      .end((err, res) => {
        assert.equal(res.status, 200)
        assert.equal(res.body.solution, validPuzzleSolution)
        done();
      })
  })
// Solve a puzzle with missing puzzle string: POST request to /api/solve
  test('solve, missing puzzle string', (done) => {
    chai
      .request(server)
      .post('/api/solve')
      .send({puzzle:''})
      .end((err, res) => {
        assert.equal(res.status, 200)
        assert.equal(res.body.error, "Required field missing")
        done();
      })
  })
// Solve a puzzle with invalid characters: POST request to /api/solve
  let invalidPuzzle = puzzlesAndSolutions[0][0].replace('.','/')
  test('solve, invalid puzzle string', (done) => {
    let puzzle = invalidPuzzle
    chai
      .request(server)
      .post('/api/solve')
      .send({puzzle})
      .end((err, res) => {
        assert.equal(res.status, 200)
        assert.equal(res.body.error, 'Invalid characters in puzzle')
        done();
      })
  })

// Solve a puzzle with incorrect length: POST request to /api/solve
  test('solve, puzzle with incorrect length', (done) => {
    let puzzle = '1.5.7'
    chai
      .request(server)
      .post('/api/solve')
      .send({puzzle})
      .end((err, res) => {
        assert.equal(res.status, 200)
        assert.equal(res.body.error, 'Expected puzzle to be 81 characters long')
        done()
      })
  })
// Solve a puzzle that cannot be solved: POST request to /api/solve
  test('solve, can\'t be solved', (done) => {
    let puzzle = validPuzzleString.replace('.','1')
    chai  
      .request(server)
      .post('/api/solve')
      .send({puzzle})
      .end((err, res) => {
        assert.equal(res.status, 200)
        assert.equal(res.body.error, 'Puzzle cannot be solved')
        done();
      })
  })
// Check a puzzle placement with all fields: POST request to /api/check
  test('check, puzzle with all the fields', (done) => {
    let puzzle = validPuzzleString;
    let coordinate = 'A1'
    let value = 7
    chai  
      .request(server)
      .post('/api/check')
      .send({puzzle, coordinate, value})
      .end((err, res) => {
        assert.equal(res.status, 200)
        assert.isTrue(res.body.valid)
        done()
      })
  })
// Check a puzzle placement with single placement conflict: POST request to /api/check
  test('check, placement with one conflict', (done) => {
    let puzzle = validPuzzleString
    let coordinate = 'A2';
    let value = '5';
    chai  
      .request(server)
      .post('/api/check')
      .send({puzzle, coordinate, value})
      .end((err, res) =>{
        assert.equal(res.status, 200)
        assert.equal(res.body.conflict[0], 'row')
        done()
      })
  })
// Check a puzzle placement with multiple placement conflicts: POST request to /api/check
  test('check, placement with multiple conflicts', (done) => {
    let puzzle = validPuzzleString
    let coordinate = 'A2';
    let value = '1';
    chai
      .request(server)
      .post('/api/check')
      .send({puzzle, coordinate, value})
      .end((err, res) => {
        assert.equal(res.status, 200)
        assert.isTrue(res.body.conflict.length > 1)
        done()
      }) 
  })
// Check a puzzle placement with all placement conflicts: POST request to /api/check
  test('check, placement with all conflicts', (done) => {
    let puzzle = validPuzzleString
    let coordinate = 'A2';
    let value = '1';
    chai
      .request(server)
      .post('/api/check')
      .send({puzzle, coordinate, value})
      .end((err, res) => {
        assert.equal(res.status, 200)
        assert.isTrue(res.body.conflict.length > 1)
        done()
      }) 
  })
// Check a puzzle placement with missing required fields: POST request to /api/check
  test('check, missing required fields', (done) => {
    chai
      .request(server)
      .post('/api/check')
      .send({})
      .end((err, res) => {
        assert.equal(res.status, 200)
        assert.equal(res.body.error, 'Required field(s) missing')
        done()
      })
  })
// Check a puzzle placement with invalid characters: POST request to /api/check
  test('check, puzzle with invalid characters', (done) => {
    let puzzle = invalidPuzzle
    let coordinate = 'A2';
    let value = '1';
    chai
      .request(server)
      .post('/api/check')
      .send({puzzle, coordinate, value})
      .end((err, res) => {
        assert.equal(res.status, 200)
        assert.equal(res.body.error, 'Invalid characters in puzzle')
        done()
      })
  })
// Check a puzzle placement with incorrect length: POST request to /api/check
  test('check, incorrect length', (done) => {
    let coordinate = 'A2';
    let puzzle = '1.2.3.4'
    let value = '1';
    chai
      .request(server)
      .post('/api/check')
      .send({coordinate, puzzle, value})
      .end((err, res) => {
        assert.equal(res.status, 200)
        assert.equal(res.body.error, 'Expected puzzle to be 81 characters long')
        done();
      })
  })
// Check a puzzle placement with invalid placement coordinate: POST request to /api/check
  test('check, invalid coordinate placement', (done) => {
    let puzzle = validPuzzleString
    let coordinate = 'T2'
    let value = '1';
    chai
      .request(server)
      .post('/api/check')
      .send({puzzle, coordinate, value})
      .end((err, res) => {
        assert.equal(res.status, 200)
        assert.equal(res.body.error, 'Invalid coordinate')
        done();
      })

  })
// Check a puzzle placement with invalid placement value: POST request to /api/check
  test('check, ivalid value placement', (done) => {
    let puzzle = validPuzzleString
    let coordinate = 'A2'
    let value = '10';
    chai
      .request(server)
      .post('/api/check')
      .send({puzzle, coordinate, value})
      .end((err, res) => {
        assert.equal(res.status, 200)
        assert.equal(res.body.error, 'Invalid value')
        done();
      })   
  })
});

