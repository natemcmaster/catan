module.exports = MemoryUserIDGenerator;

function MemoryUserIDGenerator(start){
	this.id = start || 0;
}

MemoryUserIDGenerator.prototype.next = function(){
	return this.id++;
}