module.exports = {
	gridMaxX: gridMaxX,
	gridMinX: gridMinX,
	isGridEdge: isGridEdge
};

var gridMaxX = function(y) {
	if (y <= 0) return 3;
	else if (y <= 3) return 3 - y;
	throw new Error('out of range');
};

var gridMinX = function(y) {
	if (y >= 0) return -3;
	else if (y >= -3) return -y;
	throw new Error('out of range');
};

var isGridEdge = function(x, y) {
	return (y == -3 || y == 3) && (x == gridMinX(y) || x == gridMaxX(y));
};