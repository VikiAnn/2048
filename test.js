module('slideTilesAndCombineMatches()');

test('it slides a tile', function(assert) {
  var row = [2, 0, 0, 0];
  var movedRow = [0, 0, 0, 2];

  assert.deepEqual(slideTilesAndCombineMatches(row), movedRow);
});

test('it combines two tiles', function(assert) {
  var row = [2, 2, 0, 0]

  var movedRow = [0, 0, 0, 4]

  assert.deepEqual(slideTilesAndCombineMatches(row), movedRow);
});

test('it combines tiles only once', function(assert) {
  var row = [2, 0, 2, 4]

  var movedRow = [0, 0, 4, 4]

  assert.deepEqual(slideTilesAndCombineMatches(row), movedRow);
});

module('slideAllTiles()', {
  setup: function () {
    this.board = new Board
  }
});

test('it slides a tile to the left when given the direction of left', function(assert) {
  var board = this.board
  board.assignTile(2, 0, 4)
  board.assignTile(2, 2, 4)
  board.assignTile(2, 3, 4)

  slideAllTiles(board, "left");

  assert.strictEqual(board.tile(2, 0), 4);
  assert.strictEqual(board.tile(2, 1), 8);
  assert.strictEqual(board.tile(2, 2), 0);
  assert.strictEqual(board.tile(2, 3), 0);
});

test('it slides a tile to the right when given the direction of right', function(assert) {
  var board = this.board
  board.assignTile(2, 0, 4)
  board.assignTile(2, 2, 4)
  board.assignTile(2, 3, 4)

  slideAllTiles(board, "right");

  assert.strictEqual(board.tile(2, 0), 0);
  assert.strictEqual(board.tile(2, 1), 0);
  assert.strictEqual(board.tile(2, 2), 8);
  assert.strictEqual(board.tile(2, 3), 4);
});

test('it slides a tile up when given the direction of up', function(assert) {
    var board = this.board

    board.assignTile(0, 2, 4)
    board.assignTile(2, 2, 4)
    board.assignTile(3, 2, 4)

    slideAllTiles(board, "up");

    assert.strictEqual(board.tile(0, 2), 4);
    assert.strictEqual(board.tile(1, 2), 8);
    assert.strictEqual(board.tile(2, 2), 0);
    assert.strictEqual(board.tile(3, 2), 0);
});

test('it slides a tile down when given the direction of down', function(assert) {
  var board = this.board
  board.assignTile(0, 2, 4)
  board.assignTile(2, 2, 4)
  board.assignTile(3, 2, 4)

  slideAllTiles(board, "down");

  assert.strictEqual(board.tile(0, 2), 0);
  assert.strictEqual(board.tile(1, 2), 0);
  assert.strictEqual(board.tile(2, 2), 8);
  assert.strictEqual(board.tile(3, 2), 4);
});
