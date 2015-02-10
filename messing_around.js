var nextAvailableSquare = function (squareCoordinate, direction) {
  if (!squareOccupied(nextSquareCoordinates(squareCoordinates, direction))) {
    nextAvailableSquare(squareCoordinates, direction);
  } else {
    return squareFromCoordinates(squareCoordinates)
  };
};

var nextSquareCoordinates = function (squareCoordinates, direction) {
  switch (direction) {
    case 'left':
      if (squareCoordinates[0] === 1) {
        return squareCoordinates;
      } else {
        squareCoordinates[0] -= 1;
        return squareCoordinates;
      };
    case 'up':
      if (squareCoordinates[1] === 4) {
        return squareCoordinates;
      } else {
        squareCoordinates[1] += 1;
        return squareCoordinates;
      };
    case 'right':
      if (squareCoordinates[0] === 4) {
        return squareCoordinates;
      } else {
        squareCoordinates[0] += 1;
        return squareCoordinates;
      };
    case 'down':
      if (squareCoordinates[1] === 1) {
        return squareCoordinates;
      } else {
        squareCoordinates[1] -= 1;
        return squareCoordinates;
      };
  };
};

var squareOccupied = function (squareCoordinates) {
  square = squareFromCoordinates(squareCoordinates)
  return square.children().length === true;
}

var squareFromCoordinates = function(squareCoordinates) {
  var x = squareCoordinates[0];
  var y = squareCoordinates[1];
  return document.getElementByClassName("row" + x + " col" + y);
};

var getTileCoordinates = function(tile) {
  $(tile).parent().className.match(/row(\d) col(\d)/);
}

$(function () {
    $('html').keydown(function (e) {
        var tileCoordinates = getTileCoordinates('.child')
        if (e.which === 40) {
            $('.child').appendTo(nextAvailableSquare(tileCoordinates, 'down'));
        } else if (e.which === 38) {
            $('.child').appendTo('.parent-up');
        } else if (e.which === 37) {
            $('.child').appendTo('.parent-left');
        } else if (e.which === 39) {
            $('.child').appendTo('.parent-right');
        }
    });
});
