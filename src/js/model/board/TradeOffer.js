module.exports = TradeOffer;

function TradeOffer(data){
	this.senderIndex = data.sender;
	this.receiverIndex = data.receiver;
	this.offer = data.offer;
}