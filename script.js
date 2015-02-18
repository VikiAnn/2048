function tile(num) {
  return {  number: num,
            cssClass: "tile",
          };
};

function gridSquare(occupant, gridPosition) {
  return { occupant: occupant,
           gridPosition: gridPosition };
}


function gridRow(tiles) {
  return [gridSquare(tiles[0]), gridSquare(tiles[1]), gridSquare(tiles[2]), gridSquare(tiles[3])];
}

function gridColumn(tiles) {
  return [gridSquare(tiles[0]), gridSquare(tiles[1]), gridSquare(tiles[2]), gridSquare(tiles[3])];
}

$(document).ready( function () {
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

function appendTileToCorrespondingSquare (square) {
  if (square.occupant) {
    tag = "<div class='tile'>" + square.occupant.number + "</div>"
    $("." + square.gridPosition).append(tag)
  }
}

function slideAllTiles (direction) {
  var rowsOrColumns;
  switch (direction) {
    case "left":
      rowsOrColumns = reverseRowsOrColumns(rows);
      break;
    case "up":
      rowsOrColumns = reverseRowsOrColumns(columns);
      break;
    case "right":
      rowsOrColumns = rows;
      break;
    case "down":
      rowsOrColumns = columns;
      break;
  }
  return rowsOrColumns.forEach(slideTilesAndCombineMatches)
}

function setToNull(square) {
  square.occupant = null;
};

function reverseRowsOrColumns(rowsOrColumns) {
  rowsOrColumns.map(function(rowOrColumn) {
    rowOrColumn.reverse();
  });
  return rowsOrColumns;
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

var row1col1 = gridSquare(null, "row1col1");
var row1col2 = gridSquare(null, "row1col2");
var row1col3 = gridSquare(null, "row1col3");
var row1col4 = gridSquare(null, "row1col4");

// var row2col1 = gridSquare(tile(2), "row2col1");
// var row2col2 = gridSquare(tile(2), "row2col2");
// var row2col3 = gridSquare(tile(4), "row2col3");

var row2col1 = gridSquare(null, "row2col1");
var row2col2 = gridSquare(null, "row2col2");
var row2col3 = gridSquare(null, "row2col3");
var row2col4 = gridSquare(null, "row2col4");

var row3col1 = gridSquare(null, "row3col1");
var row3col2 = gridSquare(null, "row3col2");
var row3col3 = gridSquare(null, "row3col3");
var row3col4 = gridSquare(null, "row3col4");


var row4col1 = gridSquare(null, "row4col1");
var row4col2 = gridSquare(null, "row4col2");
var row4col3 = gridSquare(null, "row4col3");
var row4col4 = gridSquare(null, "row4col4");

var column1 = [row1col1, row2col1, row3col1, row4col1];
var column2 = [row1col2, row2col2, row3col2, row4col2];
var column3 = [row1col3, row2col3, row3col3, row4col3];
var column4 = [row1col4, row2col4, row3col4, row4col4];

var row1 = [row1col1, row1col2, row1col3, row1col4];
var row2 = [row2col1, row2col2, row2col3, row2col4];
var row3 = [row3col1, row3col2, row3col3, row3col4];
var row4 = [row4col1, row4col2, row4col3, row4col4];

var columns = [column1, column2, column3, column4];

var rows = [row1, row2, row3, row4];

var board = [
  row1col1,
  row1col2,
  row1col3,
  row1col4,

  row2col1,
  row2col2,
  row2col3,
  row2col4,

  row3col1,
  row3col2,
  row3col3,
  row3col4,

  row4col1,
  row4col2,
  row4col3,
  row4col4
];

function logBoard () {
  for (var i = 0; i < board.length; i++) {
    console.log(board[i])
  }
}
