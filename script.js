function slideAllTiles (board, direction) {
  var rowsOrColumns;
  switch (direction) {
    case "left":
      rowsOrColumns = reverseRowsOrColumns(board.allRows());
      break;
    case "up":
      rowsOrColumns = reverseRowsOrColumns(board.allColumns());
      break;
    case "right":
      rowsOrColumns = board.allRows();
      break;
    case "down":
      rowsOrColumns = board.allColumns();
      break;
  }

  rowsOrColumns.forEach(slideTilesAndCombineMatches);

  if (direction === "left" || direction === "up") {
    reverseRowsOrColumns(rowsOrColumns);
  }

  if (direction === "up" || direction === "down") {
    rowsOrColumns = convertColumnsToRows(rowsOrColumns);
    board.replaceAll(rowsOrColumns)
    return board
  } else {
    return rowsOrColumns
  }

}

function reverseRowsOrColumns(rowsOrColumns) {
  return rowsOrColumns.map(function(rowOrColumn) {
    return rowOrColumn.reverse();
  });
}



function slideTilesAndCombineMatches(rowOrColumn) {
  moveRowRight(rowOrColumn)
  if (!hasMatches(rowOrColumn)) {
    return rowOrColumn;
  } else {
    moveRowRight(combineMatchesWhereMatchesExist(rowOrColumn));
  };
  return rowOrColumn;
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
    if (!row[i]) {
      continue;
    } else if (row[i] === row[i + 1]) {
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
    if (!row[i]) {
      continue;
    } else if (row[i] === row[i + 1]) {
      row[i] = 0;
      row[i + 1] *= 2;
      skipThisIteration = true
    };
  };
  return row
};

function rowContents(row, newArray) {
  for (i=0; i < row.length; i++) {
    newArray[i] = Boolean(row[i])
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
  var nextSquare    = row[index + 1];
  if (!currentSquare || nextSquare) {
    return;
  } else {
    row[index + 1] = currentSquare;
    row[index]     = 0;
  };
  return row
};


function convertColumnsToRows (cols) {
  return [0, 1, 2, 3].map(function (index) {
    return cols.map(function (col) {
      return col[index];
    });
  });
}
