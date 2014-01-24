
/**
 * This model governs the map
 */

var catan = catan || {};
catan.models = catan.models || {};

catan.models.MapModel = (function mapModelNameSpace() {
	/**
	 * This is the Map model.
	 *
	 * @class MapModel
	 * @constructor
	 * @param {json} the data to initialize the map model
	 */
	var MapModel = (function MapModelClass(){
		function MapModel(data) {
		}

		/**
		 * Get the Hex at a specific location.
		 * <pre>
		 * @precondition x and y are valid corrdinates
		 * @postcondition NONE
		 * </pre>
		 *
		 * @method getHexAt
		 * @param {integer} x coordinate
		 * @param {integer} y coordinate
		 * @return {hexgrid.Hex} The hex
		 */
		MapModel.prototype.getHexAt = function (x, y) {
			return this.hexGrid.getHex(catan.models.hexgrid.HexLocation(x, y));
		};

		/**
		 * Get the robber position
		 * <pre>
		 * @precondition NONE
		 * @postcondition NONE
		 * </pre>
		 *
		 * @method getRobberPos
		 * @return {hexgrid.HexLocation} the current position of the robber
		 */
		MapModel.prototype.getRobberPos = function () {
			return this.robberPos;
		};

		/**
		 * Get the last robber position
		 * <pre>
		 * @preconditon NONE
		 * @postcondition NONE
		 * </pre>
		 *
		 * @method getLastRobberPos
		 * @return {hexgrid.HexLocation} the last location of the robber
		 */
		MapModel.prototype.getLastRobberPos = function () {
			return this.lastRobberPos;
		};

		/**
		 * Get a list of all of the hexes.
		 * <pre>
		 * @preconditon NONE
		 * @postcondition NONE
		 * </pre>
		 *
		 * @method getAllHexes
		 * @return {list of hexgrid.Hex} the hexes in the map
		 */
		MapModel.prototype.getAllHexes = function () {
			return this.hexGrid.getHexes();
		};

		/**
		 * Get the edges that have roads on them
		 * <pre>
		 * @precondition NONE
		 * @postcondition NONE
		 * </pre>
		 *
		 * @method getOwnedEdges
		 * @return {list of hexgrid.Edge}
		 */
		MapModel.prototype.getOwnedEdges = function () {
			return this.hexGrid.getEdges().filter(function (edge) {
				return edge.owner !== -1;
			});
		};

		/**
		 * Get the verticies tha have a settlement or a city on them
		 * <pre>
		 * @precondition NONE
		 * @postcondition NONE
		 * </pre>
		 *
		 * @method getOwnedVertexes
		 * @return {list of hexgrid.Vertex}
		 */
		MapModel.prototype.getOwnedVertexes = function () {
			return this.hexGrid.getVertexes().filter(function (vx) {
				return vx.owner !== -1;
			});
		};

		/**
		 * Get the resources due to each user when a number is rolled
		 * <pre>
		 * @precondition NONE
		 * @postcondition NONE
		 * </pre>
		 *
		 * @method resourcesForRoll
		 * @param {integer} the number that was rolled
		 */
		MapModel.prototype.resourcesForRoll = function () {
			var resources = {};
			this.hexGrid.getHexes().map(function (hex) {
				// check for ownership, etc.
			});
			return resources;
		};

		return MapModel;
	})();

	return MapModel;
})();

