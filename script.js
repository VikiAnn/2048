function moveRowRight(row) {
  do {
    var startingRow = []
    rowContents(row, startingRow)
    var newRow = getNextRowIteration(row);
  } while (!_.isEqual(rowContents(newRow, []), startingRow));
  return newRow;
};

function rowContents(row, newArray) {
  for (i=0; i < row.length; i++) {
    newArray[i] = Boolean(row[i].occupant)
  };
  return newArray
};

function getNextRowIteration(row) {
  for (i=0; i < (row.length - 1); i++) {
    var newRow = moveTileRightIfTileExists(row, i);
  };
  return row
}

function moveTileRightIfTileExists(row, index) {
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
