
module.exports = Hexgrid

function makeMap(data) {
  var map = {};
  data.forEach(function (line) {
    line.forEach(function (hex) {
      map[hex.location.x + ',' + hex.location.y] = hex
    });
  });
  return map;
}

var HEXDIRS = {
  'NW': {
    x: -1,
    y: 0
  },
  'N': {
    x: 0,
    y: -1
  },
  'NE': {
    x: 1,
    y: -1
  },
  'SE': {
    x: 1,
    y: 0
  },
  'S': {
    x: 0,
    y: 1
  },
  'SW': {
    x: -1,
    y: 1
  }
};

function equivalentEdgeLocs(loc) {
  var ix = EDGEDIRS.indexOf(loc.dir)
    , opposite = (ix + 3) % 6
    , delta = HEXDIRS[loc.dir];
  return [loc, {
    x: loc.x + delta.x,
    y: loc.y + delta.y,
    dir: EDGEDIRS[opposite]
  }]
}

function equivalentVertexLocs(loc) {
  var ix = VTEXDIRS.indexOf(loc.dir)
    , delta1 = HEXDIRS[EDGEDIRS[ix]]
    , delta2 = HEXDIRS[EDGEDIRS[(ix + 5) % 6]]
    , dir1 = (ix + 4) % 6
    , dir2 = (ix + 2) % 6
  return [loc, {
    x: loc.x + delta1.x,
    y: loc.y + delta1.y,
    dir: VTEXDIRS[dir1]
  }, {
    x: loc.x + delta2.x,
    y: loc.y + delta2.y,
    dir: VTEXDIRS[dir2]
  }]
}

function Hexgrid(data) {
  this.data = data;
  this._map = makeMap(data.hexGrid.hexes);
}

Hexgrid.equivalentEdgeLocs = equivalentEdgeLocs;
Hexgrid.equivalentVertexLocs = equivalentVertexLocs;

var EDGEDIRS = ['NW', 'N', 'NE', 'SE', 'S', 'SW']
  , VTEXDIRS = ['W', 'NW', 'NE', 'E', 'SE', 'SW'];

Hexgrid.prototype = {
  getHex: function (x, y) {
    return this._map[x + ',' + y] || null;
  },
  getEdge: function (x, y, dir) {
    if (arguments.length === 1) {
      dir = x.dir;
      y = x.y;
      x = x.x;
    }
    var hex = this.getHex(x, y)
      , ix = EDGEDIRS.indexOf(dir.toUpperCase());
    if (!hex) return null;
    if (ix === -1) throw new Error('Invalid hex direction: ' + dir);
    return hex.edges[ix];
  },
  getVertex: function (x, y, dir) {
    if (arguments.length === 1) {
      dir = x.dir;
      y = x.y;
      x = x.x;
    }
    var hex = this.getHex(x, y)
      , ix = VTEXDIRS.indexOf(dir.toUpperCase());
    if (!hex) return null;
    if (ix === -1) throw new Error('Invalid vertex direction: ' + dir);
    return hex.vertexes[ix];
  }
}

