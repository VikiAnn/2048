module('testing some stuff');

test('moveRowRight()', function(assert) {
  var tile = function(num) {
    return { number: num, cssClass: "tile" };
  };

  var row1col1 = {
    occupant: tile(2),
  };

  var row1col2 = {
    occupant: null,
  };

  var row1col3 = {
    occupant: null,
  };

  var row1col4 = {
    occupant: null,
  };

  var movedRow = [
    { occupant: null },
    { occupant: null },
    { occupant: null },
    { occupant: { number: 2, cssClass: "tile" } },
  ];

  var row = [row1col1, row1col2, row1col3, row1col4];

  assert.deepEqual(moveRowRight(row), movedRow);
});