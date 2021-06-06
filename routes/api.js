'use strict';

const SudokuSolver = require('../controllers/sudoku-solver.js');
const puzzlesAndSolutions = require('../controllers/puzzle-strings.js')

module.exports = function (app) {
  
  let solver = new SudokuSolver();

  app.route('/api/check')
    .post((req, res) => {
      const {coordinate} = req.body;
      const {value} = req.body;
      const {puzzle} = req.body;
      // let number = coordinate.match(/[.\d\/]+/g);

      let coordinateArray = ['A','B','C','D','E','F','G','H','I']; 
      let numbersArray = ['1','2','3','4','5','6','7','8','9'];
      let letter;
      // if(coordinate && parseInt(coordinate) != NaN){
      //   let letter = coordinate.match(/[a-zA-Z]+/g);
      //   console.log(letter[0].toUpperCase())
      // }

      if(!coordinate || !value || !puzzle){
        res.json({ error: 'Required field(s) missing' })
        return;
      }else if( puzzle.length != 81){
        res.json({ error: 'Expected puzzle to be 81 characters long' })
        return;
      }else if(puzzle.match(/[^0-9.]/g)){
        res.json({ error: 'Invalid characters in puzzle' })
        return;
      }else if(coordinate.length != 2 || 
        coordinateArray.indexOf(coordinate[0].toUpperCase()) < 0 ||
        numbersArray.indexOf(coordinate[1]) < 0){
          res.json({ error: 'Invalid coordinate'})
          return;
      }else if(value.length != 1 ||
        numbersArray.indexOf(value) < 0){
          res.json({ error: 'Invalid value' })
          return;
      }else{
        res.json('success')
        return;
      }

    });
    
  app.route('/api/solve')
    .post((req, res) => {
      const {puzzle} = req.body;
      if(!puzzle){
        res.json({ error: 'Required field missing' })
        return;
      }else if(puzzle.length != 81){
        res.json({ error: 'Expected puzzle to be 81 characters long' })
        return;
      }else if(puzzle.match(/[^0-9.]/g)){
        res.json({ error: 'Invalid characters in puzzle' })
        return;
      }
      
      // console.log(puzzlesAndSolutions.puzzlesAndSolutions[0][0])

      // let gridded = solver.stringToGrid(puzzlesAndSolutions.puzzlesAndSolutions[0][0])
      // console.log(gridded)
    });
};
