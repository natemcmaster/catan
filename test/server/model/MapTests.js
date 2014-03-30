var Map = require('../../../src/server/model/Map.js');
var Hexgrid = require('../../../src/server/model/hexgrid.js');
var Injector = require('../../../src/common/Injector.js');
var expect = require('chai').expect;
var fixture = require('./fixtures/model.json');

describe('Map tests', function() {
  var map, inj;
  describe('with the real hexgrid', function () {
    beforeEach(function () {
      inj = new Injector();
      inj.register('Map', Map);
      inj.register('hexgrid', Hexgrid);
      map = inj.create('Map', fixture.map);
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

  describe('with a mock hexgrid', function () {
    beforeEach(function () {
      inj = new Injector();
      inj.register('Map', Map);
      function Fakegrid(data) {
      }
      Fakegrid.prototype.getHex = function (x, y) {
        return {
          isLand: true,
          landtype: 'wheat',
          vertexes: [
            {
              value: {
                ownerID: y == 1 ? 0 : -1,
                worth: x == 2 ? 1 : 2
              }
            }
          ],
          edges: []
        }
      }
      inj.register('hexgrid', Fakegrid);
      map = inj.create('Map', {
        numbers: {
          2: [
            {x: 2, y: 1},
            {x: 1, y: 1},
            {x: 3, y: 0}
          ]
        },
        robber: {x: 0, y: 0}
      });
    })

    it('should calculate the right number of cards', function () {
      expect(map.getCardsRolled(2)).to.eql({
        0: {
          wheat: 3
        }
      });
    });
  });
});

