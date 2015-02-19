var board = new Board
$(document).ready( function () {
  board.assignTile(0, 2, 4)
  board.assignTile(2, 2, 4)
  board.assignTile(3, 2, 4)
  renderBoard(board);

  $('body').keydown( function (e) {
    switch (e.which){
      case 37:
        slideAllTiles(board, "left");
        clearRenderedBoard();
        renderBoard(board);
        break;
      case 38:
        slideAllTiles(board, "up");
        clearRenderedBoard();
        renderBoard(board);
        break;
      case 39:
        slideAllTiles(board, "right");
        clearRenderedBoard();
        renderBoard(board);
        break;
      case 40:
        slideAllTiles(board, "down");
        clearRenderedBoard();
        renderBoard(board);
        break;
    };
  })

  function clearRenderedBoard() {
    $('.square').empty()
  };

  function renderBoard (board) {
    board.board.forEach(function (row, x) {
      row.forEach(function (tileNumber, y) {
        appendTileToCorrespondingSquare(x, y, tileNumber)
      })
    })
  };

  function appendTileToCorrespondingSquare (x, y, tileNumber) {
    var squareCoordinates = generateSquareCoordinates(x, y)
    var tag = "<div class='tile'>" + tileNumber + "</div>";
    if (tileNumber) {
      $(squareCoordinates).append(tag);
    }
  }

  function generateSquareCoordinates (x, y) {
    return (".row" + x + "col"+ y);
  }
});
