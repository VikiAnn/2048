function Board()  {
  this.board = [
    [null, null, null, null],
    [null, null, null, null],
    [null, null, null, null],
    [null, null, null, null],
  ]
}

Board.prototype.tile = function(x, y) {
  return this.board[x][y];
}

Board.prototype.row = function (row) {
  return this.board[row];
}

Board.prototype.allColumns = function () {
  return [0, 1, 2, 3].map(function (index) {
    return this.board.column(index);
  })
}

Board.prototype.allRows = this.board

Board.prototype.column = function (column) {
  return this.board.map(function (row) {
    return row[column];
  })
}

Board.prototype.render = function () {

}
