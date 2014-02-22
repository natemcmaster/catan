module.exports = TradeOffer;

function TradeOffer(data){
	this.senderID = data.sender;
	this.receiverID = data.receiver;
	this.offer = data.offer;
}