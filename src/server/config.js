var model = require('./model');

exports.runtime = flatten(model,{});

function flatten(obj,d){
	for(var x in obj){
		if(typeof obj[x] === 'object'){
			flatten(obj[x],d);
		}
		else{
			d[x]=obj[x];
		}
	}
	return d;
}