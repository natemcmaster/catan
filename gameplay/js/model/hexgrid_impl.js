catan.models.studentMap = (function(){
    
    var hexgrid = catan.models.hexgrid;
    
    var Map = (function Map_Class(){
       
       //// ..... 
       ////
       //// this.hexgrid = hexgrid.HexGrid.getRegular(radius, CatanHex)
       ////
       //// ....
    });
    
    /**
	This class represent an edge. It's a container.
    The data on this class (that you get from the JSON model) is independent of the hexgrid, except for the location.
    Therefore, we leave it up to you to decide how to implement it.
    It must however implement one function that the hexgrid looks for 'isOccupied' - look at its documentation.
    From the JSON, the object will have 2 pieces of data: location, and ownerID.
    Besides the 'isOccupied' method, any other methods you add will be for your personal use (probably one or two)
    
    @constructor
    @extends hexgrid.BaseContainer
	
	@class CatanEdge
	*/
    var CatanEdge = (function CatanEdge_Class(){
        core.forceInherit(CatanEdge, hexgrid.BaseEdge);
        function CatanEdge(){}
        
        // once you override this, put in some documentation
        function isOccupied(){
            return false; // default implementation, change this!
        }
        
        return CatanEdge;
    });
    
    /**
	This class represent an vertex. It's a container.
    The data on this class (that you get from the JSON model) is independent of the hexgrid, except for the location.
    Therefore, we leave it up to you to decide how to implement it.
    It must however implement one function that the hexgrid looks for 'isOccupied' - look at its documentation.
    * from the JSON, this object will have 3 properties: location, ownerID and worth
    Besides the 'isOccupied' function, any other functions you add will be for your convenience and personal use.
    
    @constructor
    @extends hexgrid.BaseContainer
	
	@class CatanVertex
	*/
    var CatanVertex = (function CatanVertex_Class(){
        core.forceInherit(CatanVertex, hexgrid.BaseVertex);
        function CatanVertex(){}
        
        // once you override this, put in some documentation
        function isOccupied(){ 
            return false; // default implementation, change this!
        }
        
        return CatanVertex;
    }) 
    
    
    /**
	This class represent a Hex. It's your hex, so put any methods you'll need on (ie. to tell get the resource/hex type, etc)
    
    In order to work with the hexgrid, this class needs to extend hexgrid.BasicHex (already done in the code). You'll need to implement
    a BaseVertex and a BaseEdge class (we give you stubs) and pass them in to the superconstructor (also already done in the code).
    Look at the the CatanVertex and CatanEdge class docs to see what needs to be done there.
     
    The hexgrid will be passed in an instance of this class to use as the model and will pull the constructor from the instance. 
    (The core.forceInherit sets the constructor, in case you were curious how that worked)
    
    So, basically... add functions as needed. Any you add will be for your personal use and convenience in writing the map class.
    
    To interact with hexes in relation to other hexes, put those functions in your map class
    
    @constructor
    @param {hexgrid.HexLocation} location - the location of this hex. It's used to generate locations for the vertexes and edges.
    @extends hexgrid.BasicHex
	
	@class CatanVertex
	*/
    var CatanHex = (function CatanHex_Class(){
        core.forceInherit(CatanHex, hexgrid.BasicHex);
        function CatanHex(location){          
            hexgrid.BasicHex.call(this,location,CatanEdge,CatanVertex);
        } 
        
        return CatanHex;
    });
    
    return {
        CatanHex:CatanHex,
        CatanVertex:CatanVertex,
        CatanEdge:CatanEdge
    }
}())

