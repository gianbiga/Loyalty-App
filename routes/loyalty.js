module.exports = function (app) {
    'use strict';

	const axios = require('axios');
	var btoa = require('btoa');
	var env = require('../config/environment.js');
	var bodyParser = require('body-parser');
	var ls = require('local-storage');

	//O body parser é necessário para fazer os POSTs
	app.use(bodyParser.json());
	app.use(bodyParser.urlencoded({ extended: true }));

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

	//Get Loyalty Member
	app.get('/getMember',function(req, res){

		loyaltyInstance.get('/loyaltyMembers/'+loyalty.memberNumber,{
		})
		.then(function(response){
			console.log(response.data);
			res.send(response.data);
		})
		.catch(function(err){
			console.log(err);
		})

	})

	function registerFriendMember(firstName, lastName, cellphone, email, loyaltyProgram, refByNumber){
	return $.ajax({
		"async": true,
		"crossDomain": true,
		"url": "https://"+environment+".oracledemos.com/salesApi/resources/latest/loyaltyMembers",
		"method": "POST",
		"headers": {
			"authorization": "Basic "+basicAuth()+"",
			"content-type": "application/vnd.oracle.adf.resourceitem+json"
		},
		"dataType"  : "json",
		"data": "{\r\n   \"ProgramName\": \""+loyaltyProgram+"\",\r\n   \"ContactFirstName\": \""+firstName+"\",\r\n   \"ContactLastName\": \""+lastName+"\",\r\n   \"WorkPhoneNumber\": \""+cellphone+"\",\r\n   \"EmailAddress\": \""+email+"\",\r\n   \"ReferredByNumber\": \""+refByNumber+"\"\r\n}"

	})
}


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