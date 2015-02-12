require('locus');
var _ = require("underscore");

var tile = function(num) {
  return { number: num, cssClass: "tile" };
};

var row1col1 = {
  occupant: tile(2),
};

var row1col2 = {
  occupant: null,
};

var row1col3 = {
  occupant: tile(2),
};

var row1col4 = {
  occupant: tile(4),
};

var row1 = [row1col1, row1col2, row1col3, row1col4]

var moveRowRight = function(row) {
  do {
    var startingRow = []
    rowContents(row, startingRow)
    row = getNextRowIteration(row);
  } while (!_.isEqual(rowContents(row, []), startingRow));

  if (row === combineMatchIfMatchExists(row)) {
    return row;
  } else {
    moveRowRight(combineMatchIfMatchExists(row));
  };
};

var combineMatchIfMatchExists = function(row) {
  for (var i = 0; i < (row.length - 1); i++){
    if (!row[i].occupant) {
      continue;
    } else if (row[i].occupant.number === row[i + 1].occupant.number) {
      row[i].occupant = null;
      row[i + 1].occupant.number *= 2;
    };
  };
  return row
};

var rowContents = function(row, newArray) {
  for (i=0; i < row.length; i++) {
    newArray[i] = Boolean(row[i].occupant)
  };
  return newArray
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
