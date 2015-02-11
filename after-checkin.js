require('locus')
var tile2 = function() {
  return { number: 2, cssClass: "tile" };
};

var row1col1 = {
  occupant: tile2(),
};
var row1col2 = {
  occupant: null,
};
var row1col3 = {
  occupant: null,
};
var row1col4 = {
  occupant: null,
};


var row1 =[row1col1, row1col2, row1col3, row1col4]

var moveRowRight = function(row) {
  do {
    startingRow = row
    var newRow = getNextRowIteration(row);
  } while (newRow !== startingRow);
  return newRow;
};


var getNextRowIteration = function(row) {
  for (i=0; i < (row.length - 1); i++) {
    var newRow = moveTileRightIfTileExists(row, i);
  };
  return row
}


var moveTileRightIfTileExists = function(row, index) {
  var currentSquare = row[index];
  var currentTile   = currentSquare.occupant;
  var nextSquare    = row[index + 1];
  if (!currentTile || nextSquare.occupant) {
    return;
  } else {
    nextSquare.occupant    = currentTile;
    currentSquare.occupant = null;
  };
  return row
};

console.log(row1)
var finalRow = moveRowRight(row1)
console.log(row1)
