$(document).ready( function () {
  var board = new Board
  renderBoard();

  $('body').keydown( function (e) {
    switch (e.which){
      case 37:
        slideAllTiles(board, "left");
        clearRenderedBoard();
        renderBoard();
        break;
      case 38:
        slideAllTiles(board, "up");
        clearRenderedBoard();
        renderBoard();
        break;
      case 39:
        slideAllTiles(board, "right");
        clearRenderedBoard();
        renderBoard();
        break;
      case 40:
        slideAllTiles(board, "down");
        clearRenderedBoard();
        renderBoard();
        break;
    };
  })
});

function clearRenderedBoard() {
  $('.square').empty()
};

function renderBoard () {
  this.board.forEach(appendTileToCorrespondingSquare)
};
