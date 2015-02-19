var board = new Board
$(document).ready( function () {
  board.assignRandomTile()

  renderBoard(board);

  $('body').keydown( function (e) {
    switch (e.which){
      case 37:
        slideTilesAndResetBoard(board, "left")
        break;
      case 38:
        slideTilesAndResetBoard(board, "up")
        break;
      case 39:
        slideTilesAndResetBoard(board, "right")
        break;
      case 40:
        slideTilesAndResetBoard(board, "down")
        break;
    };
  })

  function slideTilesAndResetBoard(board, direction) {
    slideAllTiles(board, direction);
    clearRenderedBoard();
    renderBoard(board);
  }

  function clearRenderedBoard() {
    $('.square').empty()
  };

  function renderBoard (board) {
    board.assignRandomTile()
    board.board.forEach(function (row, x) {
      row.forEach(function (tileNumber, y) {
        appendTileToCorrespondingSquare(x, y, tileNumber)
      })
    })
  };

  function appendTileToCorrespondingSquare (x, y, tileNumber) {
    var squareCoordinates = generateSquareCoordinates(x, y)
    var tag = "<div class='tile tile-" + tileNumber + " '><span>" + tileNumber + "</span></div>";
    if (tileNumber) {
      $(squareCoordinates).append(tag);
    }
  }

//function assignRandomTile (board) {
//  var x = _.sample([0, 1, 2, 3])
//  var y = _.sample([0, 1, 2, 3])
//  if (board.tile(x, y) === 0) {
//    board.assignTile(x, y, _.sample([2, 2, 2, 2, 4]))
//  } else {
//    assignRandomTile(board)
//  }
//}

  function generateSquareCoordinates (x, y) {
    return (".row" + x + "col"+ y);
  }
});
