var catan = catan || {};
catan.models = catan.models || {};

// IMPORTANT : never use "location" as a local variable. Just don't.
//				why? because it's also a chrome variable - and so when you
//				refer to it when you shouldn't, it won't end up as undefined,
//				it'll be a valid web-browser value

	/**
		This is the namespace for what abstracts the hex grid interface:
			locations, the hex grid, directions and a basic hex class
		@module catan.models
		@submodule catan.models.hexgrid
		@namespace hexgrid
	*/

catan.models.hexgrid = (function HexGrid_Namespace(){
	
	
    /**
     This class serves as the basis for the different hexes (water, desert, resource)
     You should extend this class - in you're constructor, pass in the proper edge and vertex classes 
     (they should extend the hexgrid.BaseContainer class)
    
     @class BasicHex
     @constructor
     @param {hexgrid.HexLocation} location - the location of the hex
     @param {hexgrid.BaseContainer} EdgeClass - the class (NOT AN INSTANCE) you use for an edge - must have an empty constructor
     @param {hexgrid.BaseContainer} VertexClass - the class (NOT AN INSTANCE) you use for an vertex - must have an empty constructor
     */
    var BasicHex = (function BasicHexClass(){
        
        core.defineProperty(BasicHex.prototype, "location");
        core.defineProperty(BasicHex.prototype, "vertexes");
        core.defineProperty(BasicHex.prototype, "edges");
        
        function BasicHex(baseLocation,EdgeClass, VertexClass){
            function makeEdge(){return EdgeClass ? new EdgeClass() : undefined}
            function makeVertex(){return VertexClass ? new VertexClass() : undefined}
            this.setEdges([makeEdge(),makeEdge(),makeEdge(),makeEdge(),makeEdge(),makeEdge()]);
            this.setVertexes([makeVertex(),makeVertex(),makeVertex(),makeVertex(),makeVertex(),makeVertex()]);
            this.setLocation(baseLocation);			 
        };
         /**
          Using this method sets the location on the hex and the right functions on all the edges and vertexes it has
          I don't think you'll have to use this... 
        
         @method setLocation
         @param {hexgrid.HexLocation} location - the new location of the hex
          */
        BasicHex.prototype.setLocation = function(location){
            this.edges.map(function(edge,index){
                if (edge)
                    edge.setLocation(new EdgeLocation(location,index));
            })
            this.vertexes.map(function(vertex,index){
                if (vertex)
                    vertex.setLocation(new VertexLocation(location,index))
            })
            this.location = location;
        }
         
         /**
          Use this to access the edge. You should never have to set new edge objects post initialization. So not setter.
        
         @method getEdge
         @param {hexgrid.EdgeDirection} edgeDirection - which of the hex to fetch
         @return {hexgrid.BaseContainer} The edge instance
          */
        BasicHex.prototype.getEdge = function getEdge(edgeDirection){
            return this.getEdges()[edgeDirection];
        }
         
         /**
          Use this to access the edge. You should never have to set new edge objects post initialization. So not setter.
        
         @method getVertex
         @param {hexgrid.VertexDirection} vertexDirection - which of the hex to fetch
         @return {hexgrid.BaseContainer} The edge instance
          */
        BasicHex.prototype.getVertex = function getVertex(vertexDirection){
            return this.getVertexes()[vertexDirection];
        }
        return BasicHex;
    }());
	
	function positiveModulo(lhs,rhs){
		// The inner paren makes the range -rhs to rhs
		// The addition puts it to 0 to 2rhs
		// The last modulo reduces it to 0 to rhs
		return ((lhs % rhs) + rhs) % rhs;
	}
	
	function getOppositeDirection(direction){
		return positiveModulo((direction + 3),6);
	}
	
	//Works on Hex, Edge and Vertex Directions
	function nextDirectionClockwise(direction){
		return positiveModulo((direction + 1),6);
	}
	
	//Works on Hex, Edge and Vertex Directions
	function nextDirectionCounterClockwise(direction){
		return positiveModulo((direction - 1),6);
	}
	
	/**
	These are the edge values in clockwise order starting at NW.
	They are in order so that modulo math makes this easy
	Edge and Vertex Directions give you the edge and then the vertex in clockwise order
    It's really just an enumeration
	
	@class EdgeDirection
	*/
    var edLookup = ["NW","N","NE","SE","S","SW"]
	var EdgeDirection = core.numberEnumeration(edLookup);
    
	/**
	These are simply a copy of EdgeDirections. They can be fed to a hexgrid.HexLocation to get 
	the location of the hex next to it in that direction.It's really just an enumeration.
	@class HexDirection
	*/
	var HexDirection = EdgeDirection;
	/**
	These are the vertex values in clockwise order starting at NW.
	They are in order so that modulo math makes this easy
	Edge and Vertex Directions give you the edge and then the vertex in clockwise order.
    It's really just an enumeration
	@class VertexDirection
	*/
    var vdLookup = ["W","NW","NE","E","SE","SW"]
	var VertexDirection = core.numberEnumeration(vdLookup);
    
	 
	/**
    This class will never be directly used by anything other than the map.
    It's purpose is to present an array-like interface for hex storage, 
    as well as reducing wasted space that naturally incurs. It also provides
    a clean interface for generating the initial tiles.

    This takes the length of 3 connected sides and returns a hexagonal
    grid object. Of necessity, two of the three dimensions must be 
    the same - this generates a hexagon that is symmetrical along two axis.
    This is perhaps overkill, but the implementation provides insight into 
    how hexagonal grids work.
    
    You'll want to use the static method 'getRegular' which takes radius and the prototype of your hex
    
    @class HexGrid
    @constructor
    @param {Integer} bWidth The length (width) of the bottom edge in tiles
    @param {Integer} lDiagonal The length of the lower right diagonal edge in tiles
    @param {Integer} rDiagonal The length of the lower left diagonal edge in tiles
    @param {Integer} x0 The x offset from the lower left corner for to place (0,0)
    @param {Integer} y0 The y offset from the lower left corner to place (0,0)
    @param {hexgrid.BasicHex} hex The default hex that will be used to populate the grid. 
    */
	var HexGrid = (function HexGridClass(){
		function HexGrid(bWidth,lDiagonal,rDiagonal,x0,y0,hex){
			// This function assumes that there is symmetry along at least two axis
			// in otherwords bw == ld OR ld == rd OR rd == bw
			var hexes = [];
			var offsets = [];
            var lengths = [];  
			var left;
			var right;
			var offset;
			this.x0 = x0;
			this.y0 = y0;
			var arrayHeight = lDiagonal+rDiagonal -1;
			
			for (var count = 0; count < arrayHeight; count++) {
				
				rightPad = (Math.max(0, count - lDiagonal + 1));
				leftPad = (Math.max(0, lDiagonal - count - 1));
				offset = leftPad;
				length = arrayHeight - rightPad - leftPad;
				offsets.push(offset);
				lengths.push(length);
				var currentLine = [];
				for (var cellCount = 0; cellCount < length; cellCount++){
					var hexToAdd = new hex.constructor(this._getLocation(offset,cellCount,count));
					hexToAdd.setLocation(this._getLocation(offset,cellCount, count));
					currentLine.push(hexToAdd);
				}
				
				hexes.push(currentLine);
			}
			this.offsets = offsets;
			this.hexes = hexes;
		};
        
        /**
         This calls the HexGrid conructor with the right arguements given a radius to 
          create a regular hexgrid, with the reference 0,0 pointing to the middle
        @method getRegular
		@static
		@param {Integer} radius The radius of the map, including the center. 
                                It's given in the json of the map. T
                                The width of the map in hexes is equal to (2 * radius - 1)
		@param {hexgrid.BasicHex} hex An instance of the base hex to be used as a template for all the hexes in the grid.
                         More copies are instantiated using the hex(.prototype).constructor property. So make sure you have it!
                         This should be your own custom hex class, which in it's constructor call the base hex constructor
		@return {hexgrid.HexGrid} A newly initialized HexGrid
		*/
        HexGrid.getRegular = function getRegularHexgrid(radius,hex){
            return new HexGrid(radius, radius, radius, radius-1,radius-1,hex);
        }
        
        
        /**
         Returns an array of all the hexes. It's useful in order to iterate over them (using [].map)
        @method getHexes
		@return hexgrid.BasicHex [Array]
		*/
        HexGrid.prototype.getHexes= function getHexes(){
			var self = this;
			return this.getAllLocations().map(function(hLocation){
				return self.getHex(hLocation);
			});
		}
		
        /* Internal use only - returns the location based of special numbers from within the constructor */
		HexGrid.prototype._getLocation = function(offset,cellCount,count){
			return new HexLocation(cellCount + offset - this.x0, count - this.y0);			
		};
		
        
        /* Internal use only - returns the location of a hex within the array via a reference from the outside */
		HexGrid.prototype._getInternalHexRef = function getHexRef(hexLocation){
			var translatedX = hexLocation.getX() + this.x0;
			var translatedY = hexLocation.getY() + this.y0;
			var arrayX = translatedX - this.offsets[translatedY];
			var arrayY = translatedY;
			return {x:arrayX, y:arrayY};
		}
		
        /**
         Returns the hex at the give spot. If you used the 'getRegular' function to make this hexgrid,
          the hexLocation (0,0) will return the hex in the middle of the hex
        @method getHex
		@return {hexgrid.BasicHex}
		*/
		HexGrid.prototype.getHex = function(hexLocation){
			var internalLoc = this._getInternalHexRef(hexLocation);
			if (this.hexes[internalLoc.y]){
				return this.hexes[internalLoc.y][internalLoc.x];
			} else {
				return undefined;
			}
		}
        
        function linkContainers(hexes, getList){
            var uniques = {}
            function store(object){
                uniques[object.getLocation().getIDString()] = object
            }
            function fetch(object){
                return uniques[object.getLocation().getIDString()]  || object
            }
            hexes.map(function(hex){
                var objects = getList.call(hex)
                objects.map(function(container){
                    store(fetch(container))
                })
            })
        }
        
        /**
         This method should link equivalent spots in hexes - 
         ie if three hexes share the same vertex, this should make it so 
         the corresponding vertex in each hex is a reference to the same object
         Possibly buggy.
        @method getHex
		@return {hexgrid.BasicHex}
		*/
        HexGrid.prototype.linkOverlaps = function(){
            linkContainers(this.getHexes(),BasicHex.prototype.getVertexes)
            linkContainers(this.getHexes(),BasicHex.prototype.getEdges)
        }
        
        /**
         Returns true if there is a hex at the given location
        @method getHex
        @param {hexgrid.HexLocation} hexLocation
		@return {Boolean}
		*/		
		HexGrid.prototype.hasHex = function(hexLocation){
			return (this.getHex(hexLocation) ? true : false);
		}
		
        /**
         Returns a list of hex locations that point to all the hexs 
         currently stored in the grid
        @method getHex
		@return {hexgrid.HexLocation} [Array]
		*/	
		HexGrid.prototype.getAllLocations = function (){
			var locations = [];
			var hexes = this.hexes;
			var offsets = this.offsets;
			for (var rowCounter = 0; rowCounter < hexes.length; rowCounter++){
				var row = hexes[rowCounter];
				for (var cellCol = 0; cellCol < row.length; cellCol++){
					locations.push(this._getLocation(offsets[rowCounter],cellCol,rowCounter));
				}
			}
			return locations;
		}
        
        /* private - given a hex, calls a function to get valid stuff from it. Useful, I know */
        function getValid(hexes, getValid){
            var objects = {}
            hexes.map(function(hex){
                hex[getValid]().map(function(object){
                    objects[object.getLocation().getIDString()] = object
                })
            })
            return Object.keys(objects).map(function(key){return objects[key]})
        }
        
        /**
         * This method depends on the class derived from BaseContainer for a Edge implementing the method 'isOccupied'
         * returning true iff the container has a road
         * 
         * @method getEdges
         * @return {hexgrid.BaseContainer} [Array] all the edges that have roads in the hexgrid
         */
        HexGrid.prototype.getEdges = function(){
            return getValid(this.hexGrid.getHexes(),"getValidEdges")
        }
        
        /**
         * This method depends on the class derived from BaseContainer for a Vertex implementing the method 'isOccupied'
         * returning true iff the container has a city/settlement
         * 
         * @method getVertexes
         * @return {hexgrid.BaseContainer} [Array] All the vertexes that have cities/settlements in the hexgrid
         */
        HexGrid.prototype.getVertexes = function(){
            return getValid(this.hexGrid.getHexes(),"getValidVertexes")
        }
		
		return HexGrid;
	}());
	
	/**
	  This represents a location of a hex on a hex grid.
	 
        @class HexLocation
		@constructor
		@param {Integer} x
		@param {Integer} y
	*/
	var HexLocation = (function HexLocationClass(){

		function HexLocation(x,y){
			this.x = x;
			this.y = y;
		}
		
		core.defineProperty(HexLocation.prototype,"x");
		core.defineProperty(HexLocation.prototype,"y");		
		
		HexLocation.prototype.equals =  function(otherHex){
			return (this.getX() == otherHex.getX() && otherHex.getY() == this.getY()); 
		}
		
		HexLocation.prototype.getNeighborLocation = function getNeighborLocation(hexDirection){
			var x,  y , z = 0;
		    switch (hexDirection) {
				case HexDirection.SE:
					x = 1; y = 0; z = -1;
					break;
				case HexDirection.S:
					x = 0; y = 1; z = -1;
					break;
				case HexDirection.SW:
					x = -1; y = 1; z = 0;
					break;
				case HexDirection.NW:
					x = -1; y = 0; z = 1;
					break;
				case HexDirection.N:
					x = 0; y = -1; z = 1;
					break;
				case HexDirection.NE:
					x = 1; y = -1; z = 0;
					break;
				default:
					console.log(hexDirection,this);
					core.assert(false);
					throw Error("Invalid Direction");
			}
			return new HexLocation(this.getX() + x,this.getY() + y);
		}
		
		return HexLocation;
	}());
	
	/**
		This is the base class for VertexLocation and EdgeLocation
        * 
        * -- This is NOT instantiable by itself --
        * 
		
		@class BaseLocation
        @constructor 
		*/
	var BaseLocation = (function BaseLocationClass(){
		
		BaseLocation.prototype = core.inherit(HexLocation.prototype)
		function BaseLocation(arg1,arg2,arg3){
			var x,y,direction;			
			if (arg1 instanceof HexLocation && arg2 !== undefined){
				var hl = arg1;
				direction = arg2;
				x = hl.getX();
				y = hl.getY();
			} else {
				x = arg1;
				y = arg2;
				direction = arg3;
			}
			this.setDirection(direction);
			this.setX(x);
			this.setY(y);
		}	
		core.defineProperty(BaseLocation.prototype,"direction");
		
		BaseLocation.prototype.getHexLocation = function(){
			return new HexLocation(this.getX(),this.getY());
		}
		
		/**
			Get the next logical location by traveling about the center ofthe hex in a clockwise direction
			@method rotateAboutHexCW
			@return {hexgrid.BaseLocation} The next location CW
			*/
		BaseLocation.prototype.rotateAboutHexCW = function(){
			return new this.constructor(
				this.getHexLocation(),
				nextDirectionClockwise(this.getDirection()));
		}
		
		/**
			Get the next logical location by traveling about the center of the hex in a counter-clockwise direction
			
			@method rotateAboutHexCCW
			@return {hexgrid.BaseLocation} [Array] The next location CCW
			*/
		BaseLocation.prototype.rotateAboutHexCCW = function(){
			return new this.constructor(
				this.getHexLocation(),
				nextDirectionCounterClockwise(this.getDirection()));
		}
		
		/** 
			Edge and VertexLocation's have class-specific implementations
			
			This function should return all Locations that refer to this spot on the map
			
			@method getEquivalenceGroup
			@return {hexgrid.BaseLocation} [Array] A list of equivalent locations including this one
		*/
		BaseLocation.prototype.getEquivalenceGroup = core.abstractMethod;
		
		/**
			Abstract function to be overridden in child-class
			
			@method getNeighborVertexes
			@return {hexgrid.VertexLocation} [Array] vertexes touching this location
			*/
		BaseLocation.prototype.getNeighborVertexes = core.abstractMethod;
		
		/**
			Abstract function to be overridden in child-class
			
			@method getConnectedEdges
			@return {hexgrid.VertexLocation} [Array] edges touching this locaiton
			*/
		BaseLocation.prototype.getConnectedEdges = core.abstractMethod;
		BaseLocation.prototype.forCommand = function(){
            console.log(this.direction,this.lookup);
            return new this.constructor(this.x,this.y,this.lookup[this.direction]);
        }
        
        		
        /**
		Returns a unique string id for this location
        All locations in any equivalence group will have the same  
		
        @method getIDString
		@return {String}
		*/
        BaseLocation.prototype.getIDString = core.abstractMethod;
		
		return BaseLocation;
	}());
	
	/**
	This class represent an edge location. It consists of a hex location
	and an edge direction
    This takes a hex location and a direction. Alternatively you can use
     (x,y,direction)
    
    @constructor
    @param {hexLocation} hexLocation The location of the parent hex
    @param {hexgrid.EdgeDirection} direction The direction of the edge relative to the hex
    @extends hexgrid.BaseLocation
	
	@class EdgeLocation
	*/
	var EdgeLocation = (function EdgeLocationClass(){

		core.forceClassInherit(EdgeLocation,BaseLocation);
		function EdgeLocation(hexLocation,direction,arg3){
			BaseLocation.call(this,hexLocation,direction,arg3);
		};
		
		EdgeLocation.prototype.extend = function(data){
			data.direction = EdgeDirection[data.direction];
			return $.extend(this,data);
		}
		/**
		This function returns this Edge location as well as the edge location for
		the other hex that this edge touches. 
		
        @method getEquivalenceGroup
		@return {hexgrid.EdgeLocation} [Array] The list of all edge locations that this 
		object is equivalent to (reflexive). Size = 2.
		*/
		EdgeLocation.prototype.getEquivalenceGroup = function(){
			var currentLocation = this;
			var otherHexDirection = this.getNeighborLocation(this.getDirection());
			var otherDirection = getOppositeDirection(this.getDirection());
			var otherObject = new EdgeLocation(otherHexDirection,otherDirection);
			return [currentLocation,otherObject];
		}
		
		EdgeLocation.prototype.getIDString = function(){
			var idString;
			this.getEquivalenceGroup().map(function(edge){
				var dir = edge.getDirection();
				if (dir == EdgeDirection.NW || dir == EdgeDirection.N || dir == EdgeDirection.NE){
					idString = "E:"+edge.x + "," + edge.y +":"+ dir;
				} 
			});
			return idString;
		}	
			
		EdgeLocation.prototype.getNeighborVertexes = getNeighborVertexes;
		EdgeLocation.prototype.getConnected = getNeighborVertexes;
		
		function getNeighborVertexes(){
			var vertexDirections = [];
			var e1 = this.rotateAboutHexCW();
			var e2 = this;
	
			vertexDirections.push(new VertexLocation(e2.getHexLocation(),e2.getDirection()));
			vertexDirections.push(new VertexLocation(e1.getHexLocation(),e1.getDirection()));
			return vertexDirections;
		}
		
		EdgeLocation.prototype.getConnectedEdges = function(){
			var edgeLocations = [];
			this.getEquivalenceGroup().map(function getEdges(edgeLocation){
                edgeLocations.push(edgeLocation.rotateAboutHexCCW());
                edgeLocations.push(edgeLocation.rotateAboutHexCW());
            });
			return edgeLocations;
		}
        
        EdgeLocation.prototype.lookup = edLookup;
		
		return EdgeLocation;
	}());
	/**
	This class represents a vertex location. It consists of a hex location
	and a vertex direction. Instead of (hexLocation, direction) you can use
    (x, y, direction).
    @constructor
    @param {hexgrid.HexLocation} hexLocation The location of the parent hex
    @param {hexgrid.VertexDirection} direction The direction of the vertex relative to the hex
	@class VertexLocation
	*/
	var VertexLocation = (function VertexLocationClass(){
		core.forceClassInherit(VertexLocation, BaseLocation);
		
		function VertexLocation(hexLocation,direction,arg3){
			if (hexLocation){
				core.assert(direction !== undefined);
				core.assert(0 <= direction < 6);
			}
			BaseLocation.call(this,hexLocation,direction,arg3);
		};
		
		VertexLocation.prototype.extend = function(data){
			data.direction = VertexDirection[data.direction];
			return $.extend(this,data);
		}
	
		/**
		This function returns this VertexLocation as well as the VertexLocation for
		the other 2 hexes that this VertexLocation touches. 
		
        @method getEquivalenceGroup
		@return {hexgrid.VertexLocation} [Array] The list of all VertexLocation that this 
		object is equivalent to (reflexive). Size = 3.
		*/
		
		VertexLocation.prototype.getEquivalenceGroup = function(){
			var group = [this,
					new VertexLocation(this.getHexLocation().getNeighborLocation(positiveModulo(this.getDirection()-1,6)),
										positiveModulo(this.getDirection()+2,6)),
					new VertexLocation(this.getHexLocation().getNeighborLocation(this.getDirection()),
										positiveModulo(this.getDirection()+4,6))];
			return group;					
		}

		VertexLocation.prototype.getIDString = function(){
			var idString;
			this.getEquivalenceGroup().map(function(vertex){
				var dir = vertex.getDirection();
				if (dir == VertexDirection.W || dir == VertexDirection.E){
					idString = "V:"+vertex.x + "," + vertex.y + ":"+dir;
				} 
			});
			return idString;
		}
		
		function getConnectedEdges(){
			var edgeLocations = [];
            this.getEquivalenceGroup().map( function getEdge(vLocation){
                edgeLocations.push(new EdgeLocation(vLocation.getHexLocation(),vLocation.getDirection()));
            });
			return edgeLocations;
		}
		
        /**
		Returns the three edge locations connected to this vertex location
		
        @method getConnectedEdges
		@return {hexgrid.EdgeLocation} [Array]
		*/
		VertexLocation.prototype.getConnectedEdges = getConnectedEdges;
		
        /**
		An alias for '.getConnectedEdges' - you could use it in tree traversal?
        @method getConnectedEdges
		@return {hexgrid.EdgeLocation} [Array]
		*/
		VertexLocation.prototype.getConnected = getConnectedEdges;
        
        VertexLocation.prototype.lookup = vdLookup; 
        
		return VertexLocation;
	}());
    
    /**
	This class represents a base container (to be used for Edge or Vertex). You'll need to pass a child-class (the constructor/
    class, not an instance) to the BasicHex constructor so that it knows how to store stuff. This is the default implementation
    which provides the the abstract the minimum functions. Extends this class to make an Edge/Vertex container class.
    @constructor
	@class BaseContainer
	*/
    function BaseContainer(){}
    core.defineProperty(BaseContainer.prototype,"location")
    
    /**
     * This function should return true if this edge or vertex is occupied. (ie it contains a city, settlement or edge)
     * 
     * @method isOccupied
     * @return {Boolean}
     */
    BaseContainer.prototype.isOccupied = core.abstractMethod;

	return {
		HexGrid:HexGrid,
		BasicHex:BasicHex,
		HexLocation:HexLocation,
		EdgeLocation:EdgeLocation,
		VertexLocation:VertexLocation,
		HexDirection:HexDirection,
		VertexDirection:VertexDirection,
		EdgeDirection:EdgeDirection,
        BaseContainer:BaseContainer
	}
}());

