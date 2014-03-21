module.exports = MemoryUserProvider;

function MemoryUserProvider($User,$UserIDGenerator){
	this.users=[
	 	$User('Sam','sam',0),
	 	$User('Brooke','brooke',1),
	 	$User('Quinn','quinn',3),
	 	$User('Mark','mark',5),
	 	$User('Nate','nate',39),
	 	$User('Jared','jared',40),
	 	$User('Spence','spence',41),
	 	$User('Alan','alan',42),
	 	$User('Chris','chris',42),
	 	$User('chuck','norris',9999999999),
	];
	this.idGen = $UserIDGenerator();
	this.userConstruct = $User;
}

MemoryUserProvider.prototype.create = function(u,p){
	var newUser=this.userConstruct(u,p,this.idGen.next());
	this.users.push(newUser);
	return newUser();
}

MemoryUserProvider.prototype.getAll = function(){
	return this.users;
}