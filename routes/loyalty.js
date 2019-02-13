module.exports = function (app) {
    'use strict';

	const axios = require('axios');
	var btoa = require('btoa');
	var env = require('../config/environment.js');
	var bodyParser = require('body-parser');
	var ls = require('local-storage');
	var cors = require('cors');

	//O body parser é necessário para fazer os POSTs
	app.use(bodyParser.json());
	app.use(bodyParser.urlencoded({ extended: true }));
	app.use(cors());

	//Create Base Path for Loyalty Calls
	var loyaltyInstance = axios.create({
		baseURL: "https://"+loyalty.environment+".oracledemos.com/salesApi/resources/latest",
		headers: {
			'authorization': "Basic "+env.basicAuth()+"",
			'Content-Type': "application/json",
			'Content-Type':"application/vnd.oracle.adf.resourceitem+json"
		},
		dataType  : "json"
	})

	//Create Base Path for Commerce Cloud Calls
	var commerceInstance = axios.create({
		baseURL: "https://"+commerce.environment+".oracledemos.com",
		headers: {
			'Content-Type': "application/json"
		},
		dataType  : "json"
	})

	//Criação de um novo usuário
	app.post('/registerMember',function(req, res){

			//Cria usuário no OCC
			commerceInstance.post('/ccstoreui/v1/profiles',{
				email : req.body.EmailAddress,
				password : req.body.ContactPassword,
				firstName : req.body.ContactFirstName,
				lastName : req.body.ContactLastName,
				receiveEmail : "no",
				shippingAddresses : [],
				locale : "en",
				loyaltyMemberNumber : loyalty.memberNumber
			})
		.then(function(response1){

			//Cria usuário no Loyalty
			loyaltyInstance.post('/loyaltyMembers/',{
				ProgramName : loyalty.loyaltyProgram,
				ContactFirstName : req.body.ContactFirstName,
				ContactLastName: req.body.ContactLastName,
				WorkPhoneNumber: req.body.WorkPhoneNumber,
				EmailAddress: req.body.EmailAddress,
				ReferredByNumber: req.body.ReferredByNumber
			})
			.then(function(response2){
				res.json({
					commerceData : response1.data,
					loyaltyData : response2.data
				});
			})
			.catch(function(err){
				console.log(err);
				res.redirect('/templates/register.html');
			})

		})
		.catch(function(err){
			console.log('Errado -->',err);
			res.redirect('/templates/register.html');
		})
	})

	//Get Loyalty Member
	app.get('/getMember/:memberNumber',function(req, res){

		console.log("MEMBRO -> ",req.params.memberNumber);

		loyaltyInstance.get('/loyaltyMembers/'+ req.params.memberNumber,{
		})
		.then(function(response){
			console.log(response.data);
			res.send(response.data);
		})
		.catch(function(err){
			/*console.log(err);*/
		})

	})


/*GET MEMBER INFORMATION*/
function getMemberPoints(info){
	var settings = {
		"async": true,
		"crossDomain": true,
		"url": "https://"+environment+".oracledemos.com/crmRestApi/resources/latest/loyaltyMembers/"+memberNumber+"",
		"method": "GET",
		"headers": {
			"authorization": "Basic "+basicAuth()+""
		}
	}

	switch(info){
		case "tier":
		$.ajax(settings).done(function (response) {
/*				document.getElementsByClassName("level-val")[0].innerHTML = response.TierName;
				
				//O Ambiente ecor está com problema na API
				if(response.TierName == null){
  					document.getElementsByClassName("level-val")[0].innerHTML = "Intermediate";
  				}*/
  			})
		break;
		case "balance":
		$.ajax(settings).done(function (response) {
			document.getElementsByClassName("points-val")[0].innerHTML = response.PointTypeAAvlVal;


		})
		break;
		case "NBO":
		$.ajax(settings).done(function (response) {
			/*$(".NBO").addClass("hide");*/
			//console.log(eval("response."+NBO));
			if(eval("response."+NBO) == 1){$("#cardNBO1").removeClass("hide")}
				if(eval("response."+NBO) == 6){$("#cardNBO6").removeClass("hide")}
					if(eval("response."+NBO) == 7){$("#cardNBO7").removeClass("hide")}
						if(eval("response."+NBO) == 2){$("#creditcardNBO").removeClass("hide")}
							if(eval("response."+NBO) == 4){$("#lojaNBO").removeClass("hide")}
								if(eval("response."+NBO) == 5){$("#surveyNBO").removeClass("hide")}
						//console.log(response);
				})
		break;
		case "ThirdVoucher17D":
		$.ajax(settings).done(function (response) {
			if(response.PointTypeFVal == 1){
				document.getElementById("Mc BigTasty").classList.remove("color_disabled");
				document.getElementById("Mc BigTasty").classList.remove("secret");
			}
		})
		break;
		default:
		return $.ajax(settings);
		break;
	}
}



	//Create Transaction
	app.post('/createTransaction',function(req, res){
		loyaltyInstance.post('/loyTransactions/',{
			MemberNumber : loyalty.memberNumber,
			ProgramName : loyalty.loyaltyProgram,
			PointTypeName : loyalty.pointType,
			TypeCode : req.body.TypeCode,
			SubTypeCode : req.body.SubTypeCode,
			AmountValue : req.body.AmountValue,
			Comments : req.body.Comments
		})
		.then(function(response){
			console.log('Certo -->', response.data);
			res.send(response.data);
		})
		.catch(function(err){
			console.log('Errado -->',err);
			res.send(err);
		})
	})


	//Create Transaction
	app.get('/getTransactions',function(req, res){
		loyaltyInstance.get('/loyMembers/'+loyalty.memberNumber+'/child/MemberTransactions/')
		.then(function(response){
			console.log('Certo -->', response.data);
			res.send(response.data);
		})
		.catch(function(err){
			console.log('Errado -->',err);
			res.send(err);
		})
	})

    module.exports = app;
};
