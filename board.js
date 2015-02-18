function Board()  {
  this.board = [
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
  ]
}

Board.prototype.tile = function (x, y) {
  return this.board[x][y];
}

Board.prototype.assignTile = function (x, y, number) {
  this.board[x][y] = number
}

Board.prototype.row = function (row) {
  return this.board[row];
}

Board.prototype.allColumns = function () {
  return [0, 1, 2, 3].map(function (index) {
    return this.board.column(index);
  })
}

Board.prototype.allRows = function () {
  return this.board
}

Board.prototype.column = function (column) {
  return this.board.map(function (row) {
    return row[column];
  })
}

Board.prototype.render = function () {

}
