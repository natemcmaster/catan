
var catan = require('byu-catan')
  , hexgrid = catan.models.hexgrid
  , HexLocation = hexgrid.HexLocation
  , EdgeDirection = hexgrid.EdgeDirection
  , EdgeLoc = catan.mapview.EdgeLoc
  , VertexLoc = catan.mapview.VertexLoc

module.exports = {
  draw: draw,
  drawBase: drawBase
}

function drawBase(view, model, colors) {
  model.getAllHexes().forEach(function (hex) {
    view.addHex(hex.getLocation(), hex.getType(), true)
  })
  drawNumbers(view, model.getNumbers().getNumberPositions())
  drawPorts(view, model.ports)
  var layers = 'hex port number'.split(' ')
  layers.forEach(function (layer) {
    var name = 'get' + layer[0].toUpperCase() + layer.slice(1) + 'Layer'
    view[name]().draw()
  })
}

function draw(view, model, colors) {
  drawRobber(view, model.getRobberPos())
  drawEdges(view, model.getOwnedEdges(), colors)
  drawVertices(view, model.getOwnedVertices(), colors)

  var layers = 'robber edge vertex drag'.split(' ')
  layers.forEach(function (layer) {
    var name = 'get' + layer[0].toUpperCase() + layer.slice(1) + 'Layer'
    view[name]().draw()
  })
}

function newLoc(o) {
  return new HexLocation(o.x, o.y)
}

function drawNumbers(view, numbers) {
  for (var num in numbers) {
    for (var i in numbers[num]) {
      view.addNumber(newLoc(numbers[num][i]), num, true)
    }
  }
  view.getNumberLayer().draw()
}

function portLoc(o, rot) {
  var loc = newLoc(o)
  loc.getRotation = function () {
    return EdgeDirection[rot]
  }
  return loc
}

function drawPorts(view, ports) {
  ports.forEach(function (port) {
    view.addPort(portLoc(port.location, port.orientation), port.getType(), true)
  })
}

function drawRobber(view, loc) {
  view.placeRobber(loc, true)
}

function edgeLoc(loc) {
  var x = loc.x
    , y = loc.y
    , dirs = ["NW","N","NE","SE","S","SW"]
    , dir = dirs[loc.getDirection()]
    , trans = {
        N: ['S', 0, -1],
        NW: ['SE', -1, 0],
        NE: ['SW', 1, -1]
      }
  if (trans[dir]) {
    x += trans[dir][1]
    y += trans[dir][2]
    dir = trans[dir][0]
  }
  return new EdgeLoc(x, y, dir)
}

function vertexLoc(loc) {
  var x = loc.x
    , y = loc.y
    , dirs = ["W","NW","NE","E","SE","SW"]
    , dir = dirs[loc.getDirection()]
    , trans = {
        NW: ['E', -1, 0],
        NE: ['W', 1, -1],
        SW: ['E', -1, 1],
        SE: ['W', 1, 0]
      }
  if (trans[dir]) {
    x += trans[dir][1]
    y += trans[dir][2]
    dir = trans[dir][0]
  }
  return new VertexLoc(x, y, dir)
}

function drawEdges(view, edges, colors) {
  edges.forEach(function (edge) {
    view.placeRoad(edgeLoc(edge.location), colors[edge.getOwner()], true)
    console.log(edge, edge.getOwner())
  })
}

function drawVertices(view, vertices, colors) {
  vertices.forEach(function (vertex) {
    view['place' + (vertex.hasCity() ? 'City' : 'Settlement')](vertexLoc(vertex.location), colors[vertex.getOwner()], true)
  })
}

