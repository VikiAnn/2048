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
  slideRowOrColumn(rowOrColumn)
  if (!hasMatches(rowOrColumn)) {
    return rowOrColumn;
  } else {
    slideRowOrColumn(combineMatchesWhereMatchesExist(rowOrColumn));
  };
  return rowOrColumn;
};

function slideRowOrColumn (rowOrColumn) {
  do {
    var startingRowOrColumn = rowOrColumn.slice();
    rowOrColumn = getNextSlidingIteration(rowOrColumn);
  } while (!_.isEqual(rowOrColumn, startingRowOrColumn));
};

function hasMatches (rowOrColumn) {
  for (var i = 0; i < (rowOrColumn.length - 1); i++){
    if (rowOrColumn[i] === rowOrColumn[i + 1]) {
      return true;
    };
  };
};

function combineMatchesWhereMatchesExist (rowOrColumn) {
  rowOrColumn.reverse()
  var skipThisIteration = false
  for (var i = 0; i < (rowOrColumn.length - 1); i++){
    if (skipThisIteration === true) {
      skipThisIteration = false;
    };
    if (rowOrColumn[i] === rowOrColumn[i + 1]) {
      rowOrColumn[i] = 0;
      rowOrColumn[i + 1] *= 2;
      skipThisIteration = true
    };
  };
  return rowOrColumn.reverse()
};

function getNextSlidingIteration(rowOrColumn) {
  for (i=0; i < (rowOrColumn.length - 1); i++) {
    slideTileIfTileExists(rowOrColumn, i);
  };
  return rowOrColumn
}

function slideTileIfTileExists(rowOrColumn, index) {
  var currentSquare = rowOrColumn[index];
  var nextSquare    = rowOrColumn[index + 1];
  if (!currentSquare || nextSquare) {
    return;
  } else {
    rowOrColumn[index + 1] = currentSquare;
    rowOrColumn[index]     = 0;
  };
  return rowOrColumn
};


function convertColumnsToRows (cols) {
  return [0, 1, 2, 3].map(function (index) {
    return cols.map(function (col) {
      return col[index];
    });
  });
}
