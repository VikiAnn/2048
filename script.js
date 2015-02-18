$(document).ready( function () {
  this.board = new Board
  renderBoard();

  $('body').keydown( function (e) {
    switch (e.which){
      case 37:
        slideAllTiles("left");
        clearBoard();
        renderBoard();
        break;
      case 38:
        slideAllTiles("up");
        clearBoard();
        renderBoard();
        break;
      case 39:
        slideAllTiles("right");
        clearBoard();
        renderBoard();
        break;
      case 40:
        slideAllTiles("down");
        clearBoard();
        renderBoard();
        break;
    };
  })
});

function clearBoard() {
  $('.square').empty()
};

function renderBoard () {
  board.forEach(appendTileToCorrespondingSquare)
};

function appendTileToCorrespondingSquare (x, y) {
  var square = this.board.tile(x, y)
  var squareCoordinates = generateSquareCoordinates(x, y)
  var tag = "<div class='tile'>" + square + "</div>";
  if (square) {
    $(squareCoordinates).append(tag);
  }
}

function generateSquareCoordinates (x, y) {
  return (".row" + x + "col"+ y);
}

function slideAllTiles (direction) {
  var rowsOrColumns;
  switch (direction) {
    case "left":
      rowsOrColumns = reverseRowsOrColumns(this.board.allRows);
      break;
    case "up":
      rowsOrColumns = reverseRowsOrColumns(this.board.allColumns);
      break;
    case "right":
      rowsOrColumns = this.board.allRows;
      break;
    case "down":
      rowsOrColumns = this.board.allColumns;
      break;
  }
  return rowsOrColumns.forEach(slideTilesAndCombineMatches)
}

function reverseRowsOrColumns(rowsOrColumns) {
  rowsOrColumns = rowsOrColumns.slice();
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
