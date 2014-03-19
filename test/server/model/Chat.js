
var expect = require('chai').expect
  , Chat = require('../../../src/server/model/Chat')

describe('Chat', function () {
  it('should initialize', function () {
    var chat = new Chat();
    expect(chat.getData()).to.eql({lines: []});
  })

  it('should initialize from data', function () {
    var data = {lines: [2,3,4]};
    var chat = new Chat(data);
    expect(chat.getData()).to.eql(data);
  })

  describe('.sendChat', function () {
    it('should work', function () {
      var chat = new Chat();
      chat.sendChat('Jess', 'Hello frank');
      expect(chat.getData().lines).to.eql([
        {
          source: 'Jess',
          message: 'Hello frank'
        }
      ]);
    })
  })

})

