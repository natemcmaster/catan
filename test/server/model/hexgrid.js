
var expect = require('chai').expect
  , Hexgrid = require('../../../src/server/model/hexgrid')
  , fixture = require('./fixtures/model.json')

describe('hexgrid', function () {
  var hex;
  beforeEach(function () {
    hex = new Hexgrid(fixture.map);
  })

  describe('#getEdge', function () {
    it('should a a populated edge', function () {
      expect(hex.getEdge(-1, -1, 'S')).to.eql({
        value: {
          ownerID: 1
        }
      });
    })
    it('should get an empty edge', function () {
      expect(hex.getEdge(1, 0, 'SW')).to.eql({
        value: {
          ownerID: -1
        }
      });
    })
    it('should choke on an invalid edge direction', function () {
      expect(hex.getEdge.bind(hex, 1, 0, 'SN')).to.throw(/invalid/i);
    });
  });

  describe('#getVertex', function () {
    it('should get a settlement', function () {
      expect(hex.getVertex(1, -1, 'NE')).to.eql({
        value: {
          ownerID: 3,
          worth: 1
        }
      });
    });
    it('should get a city', function () {
      expect(hex.getVertex(2, -1, 'E')).to.eql({
        value: {
          ownerID: 0,
          worth: 2
        }
      });
    });
    it('should get an empty splot', function () {
      expect(hex.getVertex(0, -1, 'SE')).to.eql({
        value: {
          ownerID: -1,
          worth: 0
        }
      });
    });
  });

  describe('#equivalentEdgeLocs', function () {
    it('should return the right locations', function () {
      var edges = Hexgrid.equivalentEdgeLocs(0, -1, 'S')
      expect(edges).to.eql([
        {x: 0, y: -1, dir: 'S'},
        {x: 0, y: 0, dir: 'N'}
      ]);
    });
  });
  describe('#equivalentVertexLocs', function () {
    it('should return the right locations', function () {
      var vertices = Hexgrid.equivalentVertexLocs(2, -1, 'NW');
      expect(vertices).to.eql([
        {x: 2, y: -1, dir: 'NW'},
        {x: 2, y: -2, dir: 'SW'},
        {x: 1, y: -1, dir: 'E'}
      ]);
    });
  });

  describe('#setEdge', function () {
    it('should set an empty edge', function () {
      hex.setEdge(0, -1, 'NE', 15);
      expect(hex.getEdge(0, -1, 'NE').value.ownerID).to.equal(15);
      expect(hex.getEdge(1, -2, 'SW').value.ownerID).to.equal(15);
    });

    it('should overwrite an owned edge', function () {
      hex.setEdge(1, 0, 'SE', 15);
      expect(hex.getEdge(1, 0, 'SE').value.ownerID).to.equal(15);
      expect(hex.getEdge(2, 0, 'NW').value.ownerID).to.equal(15);
    });
  });

  describe('#setVertex', function () {
    describe('setting an empty vertex', function () {
      beforeEach(function () {
        hex.setVertex(-1, 1, 'NW', 14, 2);
      });
      it('should set the one given', function () {
        expect(hex.getVertex(-1, 1, 'NW')).to.eql({
          value: {
            ownerID: 14,
            worth: 2
          }
        });
      });
      it('should set the next one clockwise', function () {
        expect(hex.getVertex(-1, 0, 'SW')).to.eql({
          value: {
            ownerID: 14,
            worth: 2
          }
        });
      });
      it('should set the final one', function () {
        expect(hex.getVertex(-2, 1, 'E')).to.eql({
          value: {
            ownerID: 14,
            worth: 2
          }
        });
      });
    });
  });
})

