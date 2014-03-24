module.exports = {
	gridMaxX: gridMaxX,
	gridMinX: gridMinX,
	isGridEdge: isGridEdge
};

function gridMaxX(y) {
	if (y <= 0) return 3;
	else if (y <= 3) return 3 - y;
	throw new Error('out of range');
}

function gridMinX(y) {
	if (y >= 0) return -3;
	else if (y >= -3) return -y;
	throw new Error('out of range');
}

function isGridEdge(x, y) {
	return (y == -3 || y == 3) && (x == gridMinX(y) || x == gridMaxX(y));
}
