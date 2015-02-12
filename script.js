function slideTilesAndCombineMatches(row) {
  moveRowRight(row)
  if (!hasMatches(row)) {
    return row;
  } else {
    moveRowRight(combineMatchesWhereMatchesExist(row));
  };
  return row
};

function moveRowRight (row) {
  do {
    var startingRow = []
    rowContents(row, startingRow)
    row = getNextRowIteration(row);
  } while (!_.isEqual(rowContents(row, []), startingRow));
};

function hasMatches (row) {
  for (var i = 0; i < (row.length - 1); i++){
    if (!row[i].occupant) {
      continue;
    } else if (row[i].occupant.number === row[i + 1].occupant.number) {
      return true;
    };
  };
};

function combineMatchesWhereMatchesExist (row) {
  var skipThisIteration = false
  for (var i = 0; i < (row.length - 1); i++){
    if (skipThisIteration === true) {
      continue;
      skipThisIteration = false;
    };
    if (!row[i].occupant) {
      continue;
    } else if (row[i].occupant.number === row[i + 1].occupant.number) {
      row[i].occupant = null;
      row[i + 1].occupant.number *= 2;
      skipThisIteration = true
    };
  };
  return row
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
