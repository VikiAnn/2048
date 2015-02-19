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

Board.prototype.replaceAll = function (rows) {
  this.board = rows
}

Board.prototype.assignTile = function (x, y, number) {
  this.board[x][y] = number
}

Board.prototype.row = function (row) {
  return this.board[row];
}

Board.prototype.allColumns = function () {
  var parent = this
  return [0, 1, 2, 3].map(function (index) {
    return parent.column(index);
  })
}

Board.prototype.allRows = function () {
  return this.board
}

Board.prototype.column = function (col) {
  return this.board.map(function (row) {
    return row[col];
  })
}

Board.prototype.assignRandomTile = function () {
  var x = _.sample([0, 1, 2, 3])
  var y = _.sample([0, 1, 2, 3])
  if (this.tile(x, y) === 0) {
    this.assignTile(x, y, _.sample([2, 2, 2, 2, 4]))
  } else {
    this.assignRandomTile(this.board)
  }
}
