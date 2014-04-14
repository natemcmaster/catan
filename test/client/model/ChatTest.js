var MockProxy = require('../MockProxy.js'),
	Chat = require('../../../src/client/model/Chat.js'),
	assert = require('chai').assert;

suite('ChatTest', function() {
	var chat, testData,mockProxy;

	setup(function() {
		testData={
			"lines": [
				{
			      	source:"Hitler",
			      	message: "I'm gonna make you cry like a girl."
				},
				{
					source:"Alexander",
					message:"Ooo, shivering in my boots."
				},
				{
					source:"Napolean",
					message:"I got your back H. Just don't attack Russia."
				}
    		]
		};
		mockProxy = new MockProxy();
		chat = new Chat(mockProxy, testData);
	});

	suite('#constructor', function() {
		test('should contain all entries', function() {

			assert.equal(testData.lines, chat.chat);
		});
	});

	suite('#sendChat()', function() {
		test('it sends the message to proxy', function() {

			var expected={
				type:'sendChat',
				playerIndex:1,
				content:'Monopoly, boys. Gimme your cards.'
			};

			chat.sendChat(1,expected.content);
			assert.deepEqual(mockProxy.lastCommand.getData(),expected);

		});
	});

});