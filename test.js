module('slideTilesAndCombineMatches()');

test('it slides a tile', function(assert) {
  var row = gridRow([tile(2), null, null, null])

  var movedRow = gridRow([null, null, null, tile(2)]);

  assert.deepEqual(slideTilesAndCombineMatches(row), movedRow);
});

test('it combines two tiles', function(assert) {
  var row = gridRow([tile(2), tile(2), null, null]);

  var movedRow = gridRow([null, null, null, tile(4)])

  assert.deepEqual(slideTilesAndCombineMatches(row), movedRow);
});

test('it combines tiles only once', function(assert) {
  var row = gridRow([tile(2), null, tile(2), tile(4)])

  var movedRow = gridRow([null, null, tile(4), tile(4)])

  assert.deepEqual(slideTilesAndCombineMatches(row), movedRow);
});

module('slideAllTiles()');

test('it slides a tile to the left when given the direction of left', function(assert) {
  row2col1.occupant = tile(2);
  row2col2.occupant = tile(2);
  row2col4.occupant = tile(4);

  slideAllTiles("left");
  assert.strictEqual(row2col1.occupant.number, 4);
  assert.strictEqual(row2col2.occupant.number, 4);
  assert.strictEqual(row2col3.occupant, null);
  assert.strictEqual(row2col4.occupant, null);

  board.forEach(setToNull);
});

test('it slides a tile to the right when given the direction of right', function(assert) {
  row2col1.occupant = tile(2);
  row2col2.occupant = tile(2);
  row2col4.occupant = tile(4);

  slideAllTiles("left");
  assert.strictEqual(row2col1.occupant, null);
  assert.strictEqual(row2col2.occupant, null);
  assert.strictEqual(row2col3.occupant.number, 4);
  assert.strictEqual(row2col4.occupant.number, 4);

  board.forEach(setToNull);
});

test('it slides a tile up when given the direction of up', function(assert) {
  row1col1.occupant = tile(2);
  row2col1.occupant = tile(2);
  row4col1.occupant = tile(4);

  slideAllTiles("up");
  assert.strictEqual(row1col1.occupant.number, 4);
  assert.strictEqual(row2col1.occupant.number, 4);
  assert.strictEqual(row3col1.occupant, null);
  assert.strictEqual(row4col1.occupant, null);

  board.forEach(setToNull);
});
