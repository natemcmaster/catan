var Map = require('../../../src/server/model/Map.js');
var expect = require('chai').expect;
var fixture = require('./fixtures/model.json');

describe('Map tests', function() {
  var map;
  beforeEach(function () {
    map = new Map(fixture.map);
  })

  describe('#getCardsRolled', function () {
    it('should work', function () {
      expect(map.getCardsRolled(8)).to.eql({
        0: {
          wheat: 1
        },
        1: {
          brick: 1
        }
      });
    });

    describe("when there's a robber", function () {
      beforeEach(function () {
        map.moveRobber(0, 2);
      });
      it("should not return resources for the robbed tile", function () {
        expect(map.getCardsRolled(8)).to.eql({
          1: {
            brick: 1
          }
        });
      });
    });
  });
});

