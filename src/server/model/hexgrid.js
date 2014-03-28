
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

function equivalentEdgeLocs(x, y, dir) {
  var ix = EDGEDIRS.indexOf(dir)
    , opposite = (ix + 3) % 6
    , delta = HEXDIRS[dir];
  return [{
    x: x,
    y: y,
    dir: dir
  }, {
    x: x + delta.x,
    y: y + delta.y,
    dir: EDGEDIRS[opposite]
  }]
}

function equivalentVertexLocs(x, y, dir) {
  var ix = VTEXDIRS.indexOf(dir)
    , delta1 = HEXDIRS[EDGEDIRS[ix]]
    , delta2 = HEXDIRS[EDGEDIRS[(ix + 5) % 6]]
    , dir1 = (ix + 4) % 6
    , dir2 = (ix + 2) % 6
  return [{
    x: x,
    y: y,
    dir: dir
  }, {
    x: x + delta1.x,
    y: y + delta1.y,
    dir: VTEXDIRS[dir1]
  }, {
    x: x + delta2.x,
    y: y + delta2.y,
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
    if (ix === -1) throw new Error('Invalid Edge direction: ' + dir);
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
  },
  setEdge: function (x, y, dir, owner) {
    if (arguments.length === 1) {
      owner = y;
      dir = x.dir;
      y = x.y;
      x = x.x;
    }
    equivalentEdgeLocs(x, y, dir).forEach(function (loc) {
      this.getEdge(loc).value.ownerID = owner;
    }.bind(this));
  },
  setVertex: function (x, y, dir, owner, worth) {
    if (arguments.length === 1) {
      worth = dir;
      owner = y;
      dir = x.dir;
      y = x.y;
      x = x.x;
    }
    equivalentVertexLocs(x, y, dir).forEach(function (loc) {
      var value = this.getVertex(loc).value
      value.ownerID = owner;
      value.worth = worth;
    }.bind(this));
  },
  hexesForVertex: function (x, y, dir) {
    var getHex = this.getHex.bind(this);
    return equivalentVertexLocs(x, y, dir).map(function (loc) {
      return getHex(loc.x, loc.y);
    });
  },
  edgeIsOccupied: function (x, y, dir) {
    return this.getEdge(x, y, dir).value.ownerID !== -1
  },
  vertexIsOccupied: function (x, y, dir) {
    return this.getVertex(x, y, dir).value.ownerID !== -1
  },
  vertexHasMySettlement: function (x, y, dir, owner) {
    var value = this.getVertex(x, y, dir).value
    return value.ownerID === owner && value.worth === 1
  }
}

