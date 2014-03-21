module.exports=function() {
	console.log('Smoke Test: Called');
	return Array.prototype.slice.call(arguments, 0);
};