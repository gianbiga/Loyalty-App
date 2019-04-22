var btoa = require('btoa');

/*var memberNumber = ls.get("MemberID");*/
/*ls.set("MemberID", "300000176112379");*/

loyalty = {
	environment : "adc4-zbia-fa-ext",
	username : "john.dunbar",
	password : process.env.envPassword,
	loyaltyProgram : "Programa de Fidelidade",
	pointType : "Pontos"
};

commerce = {
	environment : "ucf4-occ0040-occ",
	productCollection : "ofertasEspeciais"
};

engagement ={
	environment : "adc4-zbia-fa-ext",
	username : "john.dunbar",
	password : process.env.envPassword
}

basicAuth = function (subject){
	return btoa(eval(subject+'.username')+":"+eval(subject+'.password'));
}


module.exports = {
	loyalty : loyalty,
	commerce : commerce,
	basicAuth : basicAuth
}



