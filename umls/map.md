
# Functional Spec MAP

## Display (just getters)

- hex type @ pos
- hex value @ pos (num / port)
- robber pos
- last robber pos
- all hexes [{x, y, type, value}, ...]
- owned edges [{x, y, owner}, ...] for roads
- owned verticies [{x, y, owner, city?}, ...] for settlements/cities

## Player Turn

### Roll for Resources

- resources for roll [{player, wood: int, wool:,...}, ...]

### Trade

#### Domestic Trade

- managed by the player model

#### Maritime Trade

- ports for player [{type, ratio}, ...]

### Build

- can place road?
- can place robber?
- can place settlement?
- can place city?

# Implementationish MAP

## Map:
- hexGrid O
- numbers O
- ports [Port]
- lastRobber Location
- robber Location

### getHexAt(x, y)
hexGrid.getHex(Location(x, y))
### getRobberPos() #
### getLastRobberPos() #
### getAllHexes()
hexGrid.getHexes()
### getOwnedEdges()
hexGrid.getEdges().map...
### getOwnedVertexes()
hexGrid.getVertexes().map...

### resourcesForRoll(num)
numbers.getHexPositions(num).map(pos
  hexGrid.getHex(pos).getVertecies().map(vx
    vx.player && resources[vx.player][hex.resource]+= vx.city ? 2 : 1
  )
)

### portsForPlayer(int)
ports = []
ports.map(port
  hx = hexGrid.getHex(port.location)
  port.getVertecies().map(vx
    hx.getVertex(vx).player == player ? ports.push(port)
  )
)

### canPlaceRoad(player, EdgeLoc)
hexGrid.getHex(loc.location).getVxForEdge(loc.direction).some(vx
  <- vx.owner == player
)
### canPlaceRobber(HexLoc)
!loc.eq(robber) && !loc.eq(lastRobber) && hexGrid.getHex(loc).type not in (desert, water)
### canPlaceSettlement(player, VxLoc)
...more complex
hexGrid.getHex(loc.location).getEdgesForVx(loc.direction).some(edge
  <- edge.owner == player
)
### canPlaceCity(player, VxLoc)
vx = hexGrid.getVx(VxLoc)
<- vx.owneer == player && !vx.city

## Port
getVertecies() -> [VertextLocation]

## Ports

## Numbers
getHexPositions(num)
update(arr)

## HexGrid

## Hex
getVertecies() - [vx]
getVxsForEdge(direction) - []

## Vertex
- player (null or int)
- city (bool)


