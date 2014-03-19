
var expect = require('chai').expect
  , Messager = require('../../../src/server/model/Messager')

describe('Messager', function () {
  it('should initialize', function () {
    var messager = new Messager();
    expect(messager.getData()).to.eql({lines: []});
  })

  it('should initialize from data', function () {
    var data = {lines: [2,3,4]};
    var messager = new Messager(data);
    expect(messager.getData()).to.eql(data);
  })

  describe('.add', function () {
    it('should work', function () {
      var messager = new Messager();
      messager.add('Jess', 'Hello frank');
      expect(messager.getData().lines).to.eql([
        {
          source: 'Jess',
          message: 'Hello frank'
        }
      ]);
    })
  })

})

