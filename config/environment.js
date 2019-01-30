var btoa = require('btoa');
var ls = require('local-storage');

/*var memberNumber = ls.get("MemberID");*/
/*ls.set("MemberID", "300000176112379");*/

loyalty = {
	environment : "adc4-zevg-fa-ext",
	username : "john.dunbar",
	password : "pjv76689",
	memberNumber : ls.get("MemberID"),
	loyaltyProgram : "Programa de Fidelidade",
	pointType : "Pontos"
};

commerce = {
	environment : "ucf4-occ0077-occ",
	productCollection : "ofertasEspeciais"
};


basicAuth = function (){
	return btoa(loyalty.username+":"+loyalty.password);
}


module.exports = {
	loyalty : loyalty,
	commerce : commerce,
	basicAuth : basicAuth
}



