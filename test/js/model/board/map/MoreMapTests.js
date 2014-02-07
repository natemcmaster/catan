var fixture = require('./model_formatted.json');
var Map = require('./impl').Map;
var assert = require('chai').assert;
var catan = require('byu-catan');
var hexgrid = catan.models.hexgrid;
var HexLocation = hexgrid.HexLocation;
var VertexLocation = hexgrid.VertexLocation;
var VertexDirection = hexgrid.VertexDirection;
var EdgeLocation = hexgrid.EdgeLocation;
var EdgeDirection = hexgrid.EdgeDirection;

var goodPlaces = [
	{
		pid: 0,
		x: 2,
		y: -2,
		dir: 'E'
	},
	{
		pid: 0,
		x: 3,
		y: -3,
		dir: 'SW'
	},
	{
		pid: 0,
		x: 1,
		y: 0,
		dir: 'E'
	}
]

var badPlaces = [
	{
		pid: 1,
		x: 2,
		y: -2,
		dir: 'E'
	},
	{
		pid: 0,
		x: 3,
		y: -2,
		dir: 'W'
	},
	{
		pid: 1,
		x: 3,
		y: -3,
		dir: 'SW'
	},
	{
		pid: 1,
		x: 1,
		y: 0,
		dir: 'E'
	}
]
