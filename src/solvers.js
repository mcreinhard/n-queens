/*           _
   ___  ___ | |_   _____ _ __ ___
  / __|/ _ \| \ \ / / _ \ '__/ __|
  \__ \ (_) | |\ V /  __/ |  \__ \
  |___/\___/|_| \_/ \___|_|  |___/

*/

// hint: you'll need to do a full-search of all possible arrangements of pieces!  (There
// are also optimizations that will allow you to skip a lot of the dead search space) take
// a look at solversSpec.js to see what the tests are expecting


// return a matrix (an array of arrays) representing a single nxn chessboard, with n rooks
// placed such that none of them can attack each other

window.findNRooksSolution = function(n) {
  var solution = _.map(_.range(n), function(row) {
    return _.map(_.range(n), function(col) {return row === col ? 1 : 0;});
  });
  
  console.log('Single solution for ' + n + ' rooks:', JSON.stringify(solution));
  return solution;
};



// return the number of nxn chessboards that exist, with n rooks placed such that none of
// them can attack each other
window.countNRooksSolutions = function(n) {
  var solutionCount = factorial(n);

  console.log('Number of solutions for ' + n + ' rooks:', solutionCount);
  return solutionCount;
};



// return a matrix (an array of arrays) representing a single nxn chessboard, with n
// queens placed such that none of them can attack each other
window.findNQueensSolution = function(n) {
  var board = new Board({n: n});
  var solution = null;
  
  var search = function(numQueens, iStart, jStart) {
    for (var i = iStart || 0; i < n; i++) {
      for (var j = i === iStart ? jStart : 0; j < n; j++) {
        if (!board.get(i)[j]) {
          board.togglePiece(i, j);
          if (!board.hasAnyQueensConflicts()) {
            if (numQueens + 1 === n) {
              solution = solution || board.rows();
            }
            else search(numQueens + 1, i, j);
            if (solution) return;
          }
          board.togglePiece(i, j);
        }
      }
    }
  };
  
  search(0);
  console.log('Single solution for ' + n + ' queens:', JSON.stringify(solution));
  return solution;
};


// return the number of nxn chessboards that exist, with n queens placed such that none of
// them can attack each other
window.countNQueensSolutions = function(n) {
  var board = new Board({n: n});
  var solutionCount = n === 0 ? 1 : 0;
  
  var search = function(numQueens, iStart, jStart) {
    for (var i = iStart || 0; i < n; i++) {
      for (var j = i === iStart ? jStart : 0; j < n; j++) {
        if (!board.get(i)[j]) {
          board.togglePiece(i, j);
          if (!board.hasAnyQueensConflicts()) {
            if (numQueens + 1 === n) {
              solutionCount++;
              console.log(n + ' Queens: Found ' + solutionCount +
                          ' solution' + (solutionCount === 1 ? '' : 's'));
            }
            else search(numQueens + 1, i, j);
          }
          board.togglePiece(i, j);
        }
      }
    }
  };
  
  search(0); 
  console.log('Number of solutions for ' + n + ' queens:', solutionCount);
  return solutionCount;
};

var factorial = function(n) {return n ? n * factorial(n - 1) : 1;};
