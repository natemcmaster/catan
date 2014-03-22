module.exports = MemoryUserProvider;

function MemoryUserProvider($User){
	this.users=[
	 	$User('Sam','sam',0),
	 	$User('Brooke','brooke',1),
	 	$User('Quinn','quinn',3),
	 	$User('Mark','mark',5),
	 	$User('Nate','nate',39),
	 	$User('Jared','jared',40),
	 	$User('Spence','spence',41),
	 	$User('Alan','alan',42),
	 	$User('Chris','chris',43),
	 	$User('chuck','norris',9999999999),
	];
	this.nextId = 101;
	this.constructUser = $User;
}

MemoryUserProvider.prototype.create = function(u,p){
	var newUser=this.constructUser(u,p,this.nextId++);
	this.users.push(newUser);
	return newUser;
}

MemoryUserProvider.prototype.getAll = function(){
	return this.users;
}